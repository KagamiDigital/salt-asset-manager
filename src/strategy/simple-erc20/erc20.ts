import { BigNumber, ContractTransaction, ethers, Contract } from "ethers";
import { askForInput } from "../../helpers";
import { transaction } from "../../transaction";
import { broadcasting_network_provider } from "../../constants";
import ERC20ContractABI from "../../../contracts/ERC20/abi/ERC20.json";

export async function transfer(
	{ token_address } = { token_address: undefined },
) {
	token_address = token_address ?? (await askForInput("Token address: "));

	const erc20Contract = new Contract(
		token_address,
		ERC20ContractABI,
		// daiAbi,
		broadcasting_network_provider,
	);
	const name = await erc20Contract.name();
	console.log(`Name: ${name}`);
}
