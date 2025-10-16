import { Salt, TransferType } from "salt-sdk";
import { broadcasting_network_provider, signer } from "./constants";
import { askForInput } from "./helpers";

/** Parameterized transfer function */
export async function transaction() {
	const sdk = new Salt({ environment: "TESTNET" });
	await sdk.authenticate(signer);

	const orgs = await sdk.getOrganisations();

	for (let i = 0; i < orgs.length; i++) {
		console.log(`[${i}] ${orgs[i].name}`);
	}
	const orgIndex = await askForInput(
		"Please choose one of the organisations above to fetch the accounts from: ",
	);
	const accounts = await sdk.getAccounts((orgs[orgIndex] as any)._id);

	for (let i = 0; i < accounts.length; i++) {
		console.log(`[${i}] ${accounts[i].name}`);
	}

	const accIndex = await askForInput(
		"Please choose one of the accounts above to send a transaction from: ",
	);

	const value = await askForInput(
		"Please enter the amount you wish to transfer (in ETH): ",
	);

	const recipient = await askForInput("Please enter the recipient's address: ");

	const transfer = await sdk.transfer({
		accountId: accounts[accIndex].id,
		to: recipient,
		value: value,
		chainId: broadcasting_network_provider.network.chainId,
		decimals: 18,
		type: TransferType.Native,
		signer: signer,
		sendingProvider: broadcasting_network_provider,
	});

	transfer.onTransition(0, 1, (data) => console.log("IDLE->PROPOSE:", data));
	transfer.onTransition(1, 2, (data) => console.log("PROPOSE->SIGN:", data));
	transfer.onTransition(2, 5, (data) => console.log("SIGN->END:", data));
	transfer.onTransition(2, 3, (data) => console.log("SIGN->COMBINE:", data));
	transfer.onTransition(3, 4, (data) =>
		console.log("COMBINE->BROADCAST:", data),
	);
	transfer.onTransition(4, 5, (data) => console.log("BROADCAST->END:", data));
}

/** Interactively performs a native currency transaction */
export async function transfer() {
	const sdk = new Salt({ environment: "TESTNET" });
	await sdk.authenticate(signer);

	const orgs = await sdk.getOrganisations();

	for (let i = 0; i < orgs.length; i++) {
		console.log(`[${i}] ${orgs[i].name}`);
	}
	const orgIndex = await askForInput(
		"Please choose one of the organisations above to fetch the accounts from: ",
	);
	const accounts = await sdk.getAccounts((orgs[orgIndex] as any)._id);

	for (let i = 0; i < accounts.length; i++) {
		console.log(`[${i}] ${accounts[i].name}`);
	}

	const accIndex = await askForInput(
		"Please choose one of the accounts above to send a transaction from: ",
	);

	const value = await askForInput(
		"Please enter the amount you wish to transfer (in ETH): ",
	);

	const recipient = await askForInput("Please enter the recipient's address: ");

	const transfer = await sdk.transfer({
		accountId: accounts[accIndex].id,
		to: recipient,
		value: value,
		chainId: broadcasting_network_provider.network.chainId,
		decimals: 18,
		type: TransferType.Native,
		signer: signer,
		sendingProvider: broadcasting_network_provider,
	});

	transfer.onTransition(0, 1, (data) => console.log("IDLE->PROPOSE:", data));
	transfer.onTransition(1, 2, (data) => console.log("PROPOSE->SIGN:", data));
	transfer.onTransition(2, 5, (data) => console.log("SIGN->END:", data));
	transfer.onTransition(2, 3, (data) => console.log("SIGN->COMBINE:", data));
	transfer.onTransition(3, 4, (data) =>
		console.log("COMBINE->BROADCAST:", data),
	);
	transfer.onTransition(4, 5, (data) => console.log("BROADCAST->END:", data));
}
