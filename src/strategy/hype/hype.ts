import { BigNumber, ContractTransaction, ethers, Contract } from "ethers";
import { askForInput } from "../../helpers";
import { broadcasting_network_provider, signer } from "../../constants";
import ERC20ContractABI from "../../../contracts/ERC20/abi/ERC20.json";
import { Salt, TransferType } from "salt-sdk";
import { transfer } from "../../transaction";

export async function fromEVMToCore() {
	// interactively picks the rest of the required options
	await transfer({
		recipient: "0x2222222222222222222222222222222222222222",
	});
}
