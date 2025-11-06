import { Salt, TransferType } from "salt-sdk";
import { broadcasting_network_provider, signer } from "./constants";
import { askForInput } from "./helpers";
import { ethers, BigNumber, BigNumberish } from "ethers";

export let orgIndex = undefined;
export let accIndex = undefined;

/**
 * Convenient interactive wrapper around Salt sdk.transfer function.
 *
 * Will interactively ask for the organisation index and account index of the
 * desired Salt MPC account and save this information in `orgIndex` and `accIndex`
 * respectively
 *
 * @param value Amount of native currency to transfer (e.g. ETH on chain-id = 1)
 * @param recipient Address of the recipient
 * @param data Data to include in the transaction. Used to make contract calls
 */
export async function transfer({
	value,
	recipient,
	data,
}: {
	value?: BigNumberish;
	recipient?: string;
	data?: string;
}) {
	const sdk = new Salt({ environment: "TESTNET" });
	await sdk.authenticate(signer);

	const orgs = await sdk.getOrganisations();
	if (!orgIndex) {
		for (let i = 0; i < orgs.length; i++) {
			console.log(`[${i}] ${orgs[i].name}`);
		}
		orgIndex = await askForInput(
			"Please choose one of the organisations above to fetch the accounts from: ",
		);
	}

	const accounts = await sdk.getAccounts((orgs[orgIndex] as any)._id);
	if (!accIndex) {
		for (let i = 0; i < accounts.length; i++) {
			console.log(`[${i}] ${accounts[i].name}`);
		}

		accIndex = await askForInput(
			"Please choose one of the accounts above to send a transaction from: ",
		);
	}

	value =
		value ??
		ethers.utils.parseEther(
			await askForInput(
				"Please enter the amount you wish to transfer (in ETH): ",
			),
		);

	recipient =
		recipient ?? (await askForInput("Please enter the recipient's address: "));

	console.log(
		`Transferring ${ethers.utils.formatEther(value)} to ${recipient} with data ${data}`,
	);

	// REMOVEME for debugging purposes only
	if (process.env.DEBUG_SALT_ASSET_MANAGER_NATIVE) {
		console.warn(`Natively sending tx from address`, await signer.getAddress());
		const tx = await new ethers.Wallet(process.env.PRIVATE_KEY)
			// send tx to broadcasing network directly
			.connect(broadcasting_network_provider)
			.sendTransaction({
				to: recipient,
				value: value,
				gasLimit: BigNumber.from("100000000"),
				data: data,
			})
			.then((tx) => {
				console.log(`Native TX successful`, tx);
				return tx;
			})
			.catch((err) => {
				console.error(`Couldn't natively send tx:`, err);
			});
		// @ts-ignore
		const recipt = await tx.wait();
		console.log(`Natively sent tx`, recipt);
		return;
	}

	const transfer = await sdk.transfer({
		accountId: accounts[accIndex].id,
		to: recipient,
		value: value.toString(),
		chainId: broadcasting_network_provider.network.chainId,
		type: TransferType.Native,
		signer: signer,
		sendingProvider: broadcasting_network_provider,
		// This is a known type issue, see https://teamkagamiworkspace.slack.com/archives/C06KZD0J11S/p1760574546543829
		// @ts-ignore
		data,
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
