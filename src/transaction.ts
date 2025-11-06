import { Salt, TransferType } from "salt-sdk";
import { broadcasting_network_provider, signer } from "./constants";
import { askForInput } from "./helpers";
import { ethers, BigNumber, BigNumberish } from "ethers";

const makeSDK = async () => {
	const sdk = new Salt({ environment: "TESTNET" });
	await sdk.authenticate(signer);
	return sdk;
};

export let orgIndex = undefined;
export let accIndex = undefined;
export let accountAddress = undefined;

/**
 * Interactively asks user for orgIndex and accIndex.
 *
 * @param sdk Salt SDK instance *already authenticated*
 * @returns accountAddress The public address of the chosen account
 * @returns id The id of the chosen account, **internal** to Salt usage only
 */
export async function chooseAccount(
	{ retry, sdk }: { retry?: boolean; sdk?: Salt } = { retry: false },
): Promise<{
	accountId: string;
	accountAddress: string;
}> {
	if (!sdk) {
		sdk = await makeSDK();
	}

	const orgs = await sdk.getOrganisations();
	if (!orgIndex || retry) {
		for (let i = 0; i < orgs.length; i++) {
			console.log(`[${i}] ${orgs[i].name}`);
		}
		orgIndex = await askForInput(
			"Please choose one of the organisations above to fetch the accounts from: ",
		);
	}

	const accounts = await sdk.getAccounts((orgs[orgIndex] as any)._id);
	if (!accIndex || retry) {
		for (let i = 0; i < accounts.length; i++) {
			console.log(`[${i}] ${accounts[i].name}`);
		}

		accIndex = await askForInput(
			"Please choose one of the accounts above to send a transaction from: ",
		);
	}

	const ret = accounts[accIndex];
	if (!ret) {
		throw new Error("Invalid account index");
	}
	return { accountId: ret.id, accountAddress: ret.publicKey };
}

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
	const sdk = await makeSDK();
	const { accountId } = await chooseAccount({ sdk });

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
		accountId: accountId,
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

	await new Promise((resolve, reject) => {
		// happy path
		transfer.onTransition(0, 1, (data) =>
			console.log("IDLE->PROPOSE Starting transfer:", data),
		);
		transfer.onTransition(1, 2, (data) =>
			console.log("PROPOSE->SIGN Proposal created:", data),
		);
		transfer.onTransition(2, 3, (data) =>
			console.log("SIGN->COMBINE Enough signatures provided:", data),
		);
		transfer.onTransition(3, 4, (data) =>
			console.log("COMBINE->BROADCAST Combined signatures:", data),
		);
		transfer.onTransition(4, 5, (data) => {
			console.log("BROADCAST->END Broadcased transaction:", data);
			resolve("Transaction successful");
		});

		transfer.onTransition(0, 5, (data) => {
			const err = new Error(`IDLE->END Error starting transfer`);
			console.error(err, data);
			reject(err);
		});
		transfer.onTransition(1, 5, (data) => {
			const err = new Error(`PROPOSE->END Policy breach`);
			console.error(err, data);
			reject(err);
		});
		transfer.onTransition(2, 5, (data) => {
			const err = new Error(`SIGN->END Error signing`);
			console.error(err, data);
			reject(err);
		});
		transfer.onTransition(3, 5, (data) => {
			const err = new Error(`COMBINE->END Error combining`);
			console.error(err, data);
			reject(err);
		});
	});
}
