import argsObj from "command-line-parser";
import { askForInput, printRectangle, rl } from "./helpers";
import { transaction } from "./transaction";
import { Env } from "./env";
import { Config } from "./config";
import net from "net";

const env = new Env(process.env);
const config = await Config.newFromEnv(env);

const publicAddress = await config.signer.getAddress();
printRectangle(`ASSET MANAGER ${publicAddress.toUpperCase()} CONNECTED`);

let args = argsObj() as any;
console.log("CLI args:", args);

// handle CLI only
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

	let data = undefined;
	if (typeof args.data === "string") {
		data = args.data;
	}

	let logging = console.info;
	if (typeof args.loggingPort === "string") {
		const port = parseInt(args.loggingPort);
		if (isNaN(port)) {
			console.error("-logging-port must be a number");
			process.exit(42 + 4);
		}

		// wait for a connection
		const TIMEOUT = Symbol("timeout");
		const delay = (durationMs) => {
			return new Promise((resolve) => setTimeout(() => resolve(TIMEOUT), durationMs));
		};
		const conn = async () => {
			const socket = net.connect(`127.0.0.1:${port}`);
			logging = (...things: any[]) => {
				const marker = '🪵';
				const str = things.join('\n') + marker;
				socket.write(str);
			};
			logging("Sending some data!", 123, "this is cool");
		};
		const res = await Promise.any([
			delay(2000),
			conn,
		]);

		if (res === TIMEOUT) {
			console.error("Ignoring sending logging to tcp socket");
		}
	}

	try {
		await transaction(
			{
				vaultAddress,
				recipientAddress,
				amount,
				skipConfirmation: true,
				data,
				logging,
			},
			config,
		);
		console.log("Transaction successful");
	} catch (err) {
		if (err instanceof Error) {
			console.error(`Transaction failed: ${err.message}`);
		} else {
			// will include ugly stack trace
			console.error("Transaction failed:", err);
		}
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
