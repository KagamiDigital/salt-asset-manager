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

	let gasEstimate: undefined | ((initial: number) => number) = undefined;
	if (typeof args.gas === "string") {
		let obj = JSON.parse(args.gas);
		if (typeof obj.Mul === "number") {
			gasEstimate = (initial: number) => initial * obj.Mul;
		} else {
			console.error("Unknown gas estimation method");
			process.exit(42 + 7);
		}
	}

	const TIMEOUT = Symbol("timeout");
	const delay = (durationMs: number) => {
		return new Promise((resolve) =>
			setTimeout(() => resolve(TIMEOUT), durationMs),
		);
	};

	let logging = console.info;
	let conn;
	process.on("beforeExit", () => {
		console.info(`Closing conn because of process exit`);
		conn && conn.close();
	});
	if (typeof args.loggingPort === "string") {
		if (Deno === undefined) {
			console.error("Can only use -logging-port when running with Deno");
			process.exit(42 + 5);
		}
		const port = parseInt(args.loggingPort);
		if (isNaN(port)) {
			console.error("-logging-port must be a number");
			process.exit(42 + 4);
		}

		// wait for a connection
		const conn_promise = async () => {
			console.info(`Going to connect to port ${port} ...`);
			conn = await Deno.connect({ port, hostname: "127.0.0.1" });
			console.info(`Connected`);
			logging = async (...things: any[]) => {
				const marker = "🪵";
				const str = things.join("\n") + marker;
				const encoder = new TextEncoder();
				const data = encoder.encode(str);
				// console.info(`Writing to conn`);
				await conn.write(data);
				// console.info(`Finished writing to conn`);
			};
		};
		const res = await Promise.any([delay(2000), conn_promise()]);

		if (res === TIMEOUT) {
			console.error("Ignoring sending logging to tcp socket");
		} else {
			// console.log(`Returned from conn Promise`, res);
		}

		// logging("Sending some cool data", 123, "this is cool!");
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
				gasEstimate,
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
