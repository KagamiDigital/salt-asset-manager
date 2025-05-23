import { askForInput, printRectangle, rl } from "./helpers";
import { transaction } from "./transaction";
import { handleCLIArgs } from "./cli";
import { Env } from "./env";
import { Config } from "./config";

const env = new Env(process.env);
const config = await Config.newFromEnv(env);

const publicAddress = await config.signer.getAddress();
printRectangle(`ASSET MANAGER ${publicAddress.toUpperCase()} CONNECTED`);

// if CLI args are passed, skip the user/terminal logic below
if (await handleCLIArgs(config)) {
	console.log(
		"Since the user explicitely wants to use this as a CLI only, exiting the program now successfully",
	);
	process.exit(0);
}

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
