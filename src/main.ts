import argsObj from "command-line-parser";
import { askForInput, printRectangle, rl } from "./helpers";
import { transaction } from "./transaction";
import { Env } from "./env";
import { Config } from "./config";

const env = new Env(process.env);
const config = await Config.newFromEnv(env);

const publicAddress = await config.signer.getAddress();
printRectangle(`ASSET MANAGER ${publicAddress.toUpperCase()} CONNECTED`);

let args = argsObj();
console.log("CLI args:", args);

// if -use-cli-only then returns true
if (args.useCliOnly === true) {
	rl.close();
	console.info("Using CLI only");

	const amount = args.amount;
	if (!amount) {
		console.error("-amount is required");
		process.exit(42 + 1);
	}

	const vaultAddress = args.vaultAddress;
	if (!vaultAddress) {
		console.error("-vault-address is required");
		process.exit(42 + 2);
	}

	const recipientAddress = args.recipientAddress;
	if (!recipientAddress) {
		console.error("-recipient-address is required");
		process.exit(42 + 3);
	}

	try {
		await transaction(
			{
				vaultAddress,
				recipientAddress,
				amount,
				skipConfirmation: true,
			},
			config,
		);
		console.log("Transaction successful");
	} catch (err) {
		console.error("Transaction failed:", err);
		process.exit(69);
	}

	console.log(
		"Since the user explicitely wants to use this as a CLI only, exiting the program now successfully",
	);
	process.exit(0);
}

// *** Start main user logic ***

let done = false;

const question =
	"Do you wish to: \n [1] make a native currency transfer \n [2] ~~execute a strategy~~ (removed) \n [3] exit \n Please choose one of the options listed above: ";

while (!done) {
	const input = await askForInput(question);
	if (input === "1") {
		await transaction({}, config).catch((error) => {
			console.error("Error:", error);
		});
	} else if (input === "2") {
		console.error("removed");
	} else if (input === "3") {
		done = true;
	} else {
		console.log("Please enter a valid choice");
		console.log(question);
	}
}
rl.close();
