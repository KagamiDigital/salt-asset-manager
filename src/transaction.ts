import { BigNumber, ContractTransaction, ethers } from "ethers";
import { askForInput } from "./helpers";
import { getVaultsWithoutTransactions, signTx, submitTransaction } from "intu";
import { Config } from "./config";

/** Information required to complete a transaction */
export type TransactionInfoConstructor =
	| TransactionInfo
	| {
			vaultAddress?: string;
			recipientAddress?: string;
			amount?: string | Number;
			skipConfirmation?: boolean | undefined;
			gasEstimate?: GasEstimateConstructor;
			data?: string;
	  };

type InternalConstructor = {
	vaultAddress: string;
	recipientAddress: string;
	amount: string;
	skipConfirmation: boolean;
	gasEstimate: GasEstimateConstructor;
	data: string;
	key: Symbol;
};
const key = Symbol("Transaction Info private constructor key");

export class TransactionInfo {
	vaultAddress: string;
	recipientAddress: string;
	amount: string;
	skipConfirmation: boolean;
	gasEstimate: GasEstimate;
	data: string;

	/** @private */
	private constructor(info: InternalConstructor) {
		if (info.key !== key) {
			throw new Error(
				"Don't manually construct `new TransactionInfo({ ... })`, use `await Transaction.new({ ... })`",
			);
		}
		this.vaultAddress = info.vaultAddress;
		this.recipientAddress = info.recipientAddress;
		this.amount = info.amount;
	}

	static async new(info: TransactionInfoConstructor): Promise<TransactionInfo> {
		const self = { key } as any as InternalConstructor;
		if (info instanceof TransactionInfo) {
			return info;
		}
		if (typeof info !== "object") {
			throw new TypeError(
				`Expected info to be of type object, not ${typeof info}`,
			);
		}
		self.gasEstimate = new GasEstimate(info.gasEstimate);
		self.vaultAddress =
			info.vaultAddress ||
			(await askForInput(
				`Please enter the account address from where you wish to execute the transfer: `,
			));
		if (!ethers.utils.isAddress(self.vaultAddress)) {
			throw new Error(
				"You need a valid account address to propose a transaction",
			);
		}

		self.recipientAddress =
			info.recipientAddress ||
			(await askForInput(`Please enter the recipient's address: `));
		if (!ethers.utils.isAddress(self.recipientAddress)) {
			throw "You need a valid recipient address to propose a transaction";
		}

		if (typeof info.amount === "number" && info.amount <= 0) {
			throw new RangeError(
				"You need a positive amount to propose a transaction",
			);
		}
		self.amount =
			String(info.amount) ||
			(await askForInput(`Please enter the amount to transfer: `));

		self.skipConfirmation = info.skipConfirmation === true;
		self.data = info.data ?? "";

		return new TransactionInfo(self);
	}
}

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
	info2: TransactionInfoConstructor,
	config: Config,
) {
	const info = await TransactionInfo.new(info2);
	const managedVaults = await getVaultsWithoutTransactions(
		config.signer.address,
		config.signer.provider,
	);

	console.info("Beginning transaction ...");
	console.info("vaultAddress:", info.vaultAddress);
	console.info("recipientAddress:", info.recipientAddress);
	console.info("amount:", info.amount);

	const vault = managedVaults.find(
		(v) => v.masterPublicAddress === info.vaultAddress,
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
	const gas = info.gasEstimate.estimate(21000);
	const data = info.data ?? "";

	const submitTransactionTx = await submitTransaction(
		info.recipientAddress,
		info.amount,
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
		throw new TypeError("submitTransactionEvents is undefined");
	}
	const event = submitTransactionEvents[0];
	if (event.args === undefined || !event.args) {
		throw new TypeError("event args is undefined");
	}

	const eventData = {
		txId: event.args[0]._hex,
		txInfo: event.args[1],
	};

	console.log("transaction submitted successfully", eventData.txId);

	console.log("Note the transaction details:");
	console.log("recipient: " + info.recipientAddress);
	console.log("amount: " + info.amount);
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
