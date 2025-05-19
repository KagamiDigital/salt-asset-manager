import argsObj from "command-line-parser";
import { transaction } from "./transaction";
import { rl } from "./helpers";

export async function handleCLIArgs(): Promise<boolean> {
	let args = argsObj();
	console.log("CLI args:", args);
	// if -use-cli-only then returns true
	if (args.useCliOnly === true) {
		rl.close();
		console.info("Using CLI only");

		const amount = args.amount;
		if (!amount) {
			console.error("-amount is required");
			return true;
		}

		const vaultAddress = args.vaultAddress;
		if (!vaultAddress) {
			console.error("-vault-address is required");
			return true;
		}

		const recipientAddress = args.recipientAddress;
		if (!recipientAddress) {
			console.error("-recipient-address is required");
			return true;
		}

		try {
			await transaction({
				vaultAddress,
				recipientAddress,
				amount,
				skipConfirmation: true,
			});
			console.log("Transaction successful");
		} catch (err) {
			console.error("Transaction failed:", err);
			process.exit(69);
		}

		return true;
	}
	return false;
}
