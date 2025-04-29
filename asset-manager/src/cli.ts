import argsObj from "command-line-parser";
import { transaction_raw } from "./transaction";

export async function handleCLIArgs(): Promise<boolean> {
  let args = argsObj();
  console.log("CLI args:", args);
  // if -use-cli-only then returns true
  if (args.useCliOnly === true) {
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

    await transaction_raw(vaultAddress, recipientAddress, amount, true);

    return true;
  }
  return false;
}
