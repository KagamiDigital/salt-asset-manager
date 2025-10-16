import { BigNumber, ContractTransaction, ethers, Contract } from "ethers";
import { askForInput } from "../../helpers";
import { broadcasting_network_provider, signer } from "../../constants";
import ERC20ContractABI from "../../../contracts/ERC20/abi/ERC20.json";
import { Salt, TransferType } from "salt-sdk";

export async function transfer(
	{
		token_address,
		to,
		amount,
	}: {
		token_address?: string;
		to?: string;
		amount?: string;
	} = {
		token_address: undefined,
		to: undefined,
		amount: undefined,
	},
) {
	// const myBalance = await broadcasting_network_provider.getBalance(
	// 	"0xe29B0395e5E0C6dF2D900a5369509aCEBd98da60",
	// );
	// console.log(`My balance: `, ethers.utils.formatUnits(myBalance, 18));

	token_address = token_address ?? (await askForInput("Token address: "));
	to = to ?? (await askForInput("Recipient address: "));
	amount =
		amount ??
		(await askForInput(
			"Transfer amount (this will take into account decimals, e.g. 1.5 = 1.5ETH): ",
		));

	const erc20Contract = new Contract(
		token_address,
		ERC20ContractABI,
		// daiAbi,
		broadcasting_network_provider,
	);
	const name = await erc20Contract.name();
	console.log(`Name: ${name}`);

	const decimals = Number(await erc20Contract.decimals());

	erc20Contract.on("Transfer", (from, to, amount, event) => {
		console.log(`from, to, amount, even`, from, to, amount, event);
	});

	const data = erc20Contract.interface.encodeFunctionData(
		"transfer(address, unit256)",
		[to, amount],
	);

	transaction({
		value: "0",
		decimals,
		recipient: to,
		data,
	});
}