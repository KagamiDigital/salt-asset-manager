import { BigNumber, ContractTransaction, ethers } from "ethers";
import { askForInput } from "./helpers";
import {
	combineSignedTx,
	getVaultsWithoutTransactions,
	signTx,
	submitTransaction,
} from "intu";
import { Config } from "./config";
import {
	TransactionInfo,
	TransactionInfoConstructor,
} from "./transaction/info";

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

	const vault = managedVaults.find(
		(v) => v.masterPublicAddress === info.saltPublicAddress,
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

	info.log(
		`Stage 0: Beginning transaction`,
		`*Observe the orchestration smart contract here: <https://sepolia.arbiscan.io/address/${vault.vaultAddress}>*`,
		// `Salt account public address: ${info.saltPublicAddress}`,
		// `Recipient address: ${info.recipientAddress}`,
		// `Amount: ${info.amount}`,
		// `Arbitrum Sepolia RPC URL for orchestration: ${config.env.ORCHESTRATION_NETWORK_RPC_NODE_URL}`,
		// `Broadcasting RPC URL: ${config.env.BROADCASTING_NETWORK_RPC_NODE_URL}`,
	);

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
		tx: event.args[1],
	};

	const transactionHash = submitTransactionResult.transactionHash;
	info.log(
		`Stage 1: proposeTransaction finished`,
		`*See this transaction here: <https://sepolia.arbiscan.io/tx/${transactionHash}>*`,
		// `TX ID: ${eventData.txId}`,
	);

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
	console.log(`gas: ${gas}`);

	if (info.skipConfirmation !== true) {
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
	const signTransactionResult = await tx.wait();

	info.log(
		`Stage 2: signTx / User Confirm Tx finished`,
		`*See this transaction here: <https://sepolia.arbiscan.io/tx/${signTransactionResult.transactionHash}>*`,
	);

	info.log(
		`Stage 3: Policy checks in progress. Waiting for robo-guardians to co-sign`,
	);
	const txId = eventData.txId;
	let broadcastableTx: string | undefined = undefined;
	while (!broadcastableTx) {
		await delay(1000);
		try {
			broadcastableTx = await combineSignedTx(
				vault.vaultAddress,
				txId,
				config.signer,
			);
		} catch (err) {
			console.info(`Still waiting for Robos to co-sign`, err);
		}
	}
	info.log(
		`Stage 4: Robos have co-signed, and the threshold for broadcasting the transaction has been reached!`,
	);

	info.log({ BroadcastedTx: broadcastableTx });
}

const TIMEOUT = Symbol("timeout");
const delay = (durationMs: number) => {
	return new Promise((resolve) =>
		setTimeout(() => resolve(TIMEOUT), durationMs),
	);
};
