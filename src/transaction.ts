import { BigNumber, ContractTransaction, ethers } from "ethers";
import { askForInput } from "./helpers";
import { getVaultsWithoutTransactions, signTx, submitTransaction } from "intu";
import { Config } from "./config";

/** Information required to complete a transaction */
export type TransactionInfo = {
	vaultAddress: string;
	recipientAddress: string;
	amount: string | Number;
	skipConfirmation?: boolean | undefined;
	gasEstimate?: GasEstimateConstructor;
	data?: string;
};

export type GasEstimateConstructor =
	| GasEstimate
	| ((initial: number) => number)
	| undefined;

/** See [GasEstimate.estimate] */
export class GasEstimate {
	handler: (initial: number) => number;

	constructor(input: GasEstimateConstructor) {
		if (input instanceof GasEstimate) {
			this.handler = input.handler;
		} else if (typeof input === "function") {
			this.handler = input;
		} else if (typeof input === "number") {
			this.handler = (initial) => initial * input;
		} else {
			throw new Error(
				`Invalid input type ${typeof input}, expected function or number`,
			);
		}
	}

	/** Takes as input an initial estimate and uses the result */
	estimate(initial: number): number {
		return this.handler(initial);
	}
}

/** Will ask using stdin for missing info fields if not provided */
export async function transaction(
	info: Partial<TransactionInfo>,
	config: Config,
) {
	if (typeof info !== "object")
		throw new TypeError(
			`Expected info to be of type object, not ${typeof info}`,
		);
	const gasEstimate = new GasEstimate(info.gasEstimate);
	const vaultAddress =
		info.vaultAddress ||
		(await askForInput(
			`Please enter the account address from where you wish to execute the transfer: `,
		));
	if (!ethers.utils.isAddress(vaultAddress)) {
		throw "You need a valid account address to propose a transaction";
	}

	const managedVaults = await getVaultsWithoutTransactions(
		config.signer.address,
		config.signer.provider,
	);

	const recipientAddress =
		info.recipientAddress ||
		(await askForInput(`Please enter the recipient's address: `));
	if (!ethers.utils.isAddress(recipientAddress)) {
		throw "You need a valid recipient address to propose a transaction";
	}

	const amount =
		info.amount || (await askForInput(`Please enter the amount to transfer: `));

	// skips if string
	if (+amount < 0) {
		throw "You need a positive amount to propose a transaction";
	}

	console.info("Beginning transaction ...");
	console.info("vaultAddress:", vaultAddress);
	console.info("recipientAddress:", recipientAddress);
	console.info("amount:", amount);

	const vault = managedVaults.find(
		(v) => v.masterPublicAddress === vaultAddress,
	);
	if (vault === undefined || !vault) {
		throw new Error("Vault is undefined");
	}

	const nonce = await config.broadcasting_network_provider.getTransactionCount(
		vault.masterPublicAddress!,
	);

	// get the fee data on the broadcasting network
	const feeData = await config.broadcasting_network_provider.getFeeData();
	const gasPrice = BigNumber.from(feeData.gasPrice).toNumber();
	const gas = gasEstimate.estimate(21000);
	const data = info.data ?? "";

	const submitTransactionTx = await submitTransaction(
		recipientAddress,
		amount,
		config.env.BROADCASTING_NETWORK_ID,
		nonce,
		data,
		gasPrice,
		gas,
		vault.vaultAddress,
		config.signer,
		"SERVER",
		false,
		// this is technically undocumented, but otherwise
		// this function relies on hard-coded RPC node URLs
		// based on the network ID you provide (above),
		// and somnia shannon isn't in this list which requires us to manually specify this
		config.broadcasting_network_provider,
	);

	const submitTransactionResult = await (
		submitTransactionTx as ContractTransaction
	).wait();
	const submitTransactionEvents = submitTransactionResult.events;
	if (submitTransactionEvents === undefined || !vault) {
		throw new Error("submitTransactionEvents is undefined");
	}
	const event = submitTransactionEvents[0];
	if (event.args === undefined || !event.args) {
		throw new Error("event args is undefined");
	}

	const eventData = {
		txId: event.args[0]._hex,
		txInfo: event.args[1],
	};

	console.log("transaction submitted successfully", eventData.txId);

	console.log("Note the transaction details:");
	console.log("recipient: " + recipientAddress);
	console.log("amount: " + amount);
	console.log("chainId: " + config.env.BROADCASTING_NETWORK_ID);
	console.log("nonce: " + nonce);
	console.log(
		"gasPrice: " +
			ethers.utils
				.parseEther(BigNumber.from(feeData.gasPrice).toString())
				.toString(),
	);
	console.log("gas: 21000");

	if (!info.skipConfirmation) {
		const approval = await askForInput(
			`\nPlease confirm you want to sign the transaction, you cannot cancel the transaction after this point? [yes/no] `,
		);

		if (approval !== "yes") {
			console.log("You haven't manually approved the transaction");
			console.log("transaction proposal cannot carry on without the signature");
			return;
		}
	}

	const tx = (await signTx(
		vault.vaultAddress,
		Number(eventData.txId),
		config.signer,
	)) as ethers.ContractTransaction;

	console.info("Waiting for tx ...");
	await tx.wait();

	console.log("Transaction signed successfully");
}
