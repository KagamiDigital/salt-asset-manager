import { BigNumber, BigNumberish, Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "ethers";
import { broadcasting_network_provider, signer } from "../../constants";
import { transfer } from "../../transaction";
import ABI from "./ABI-STAKER.json";

// All of this was undocumented, or I couldn't find any docs for it
// It appears you can't stake twice on the same validator

const stakingContractAddress = "0xBe367d410D96E1cAeF68C0632251072CDf1b8250";
const stakingContractABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_validator",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256",
			},
		],
		name: "delegateStake",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	...ABI,
];

const stakingContract = new Contract(
	stakingContractAddress,
	stakingContractABI,
	broadcasting_network_provider,
);

/**
 * Example tx: https://shannon-explorer.somnia.network/tx/0xefe52d003860d35622659ffe5f4ce4e5eee5366d0c8b7e506a3745a53849318f?tab=index
 */
export async function delegateStake({
	amount,
	validatorAddress,
}: {
	amount: BigNumber;
	validatorAddress: string;
}) {
	const txData = stakingContract.interface.encodeFunctionData(
		"delegateStake(address, uint256)",
		[validatorAddress, amount],
	);

	console.log(
		`Delegating ${ethers.utils.formatEther(amount)} STT to validator ${validatorAddress}`,
		txData,
	);

	// REMOVEME too native
	// await stakingContract
	// 	.connect(___local_wallet.connect(broadcasting_network_provider))
	// 	.delegateStake(validatorAddress, amount)
	// 	.then((tx) => tx.wait());

	await transfer({
		value: amount,
		recipient: stakingContractAddress,
		data: txData,
	});

	// todo
}

export async function delegatedStakes({
	address,
}: {
	address: string;
}): Promise<BigNumber> {
	return await stakingContract.delegatedStakes(address);
}

/**
 * Example tx: https://shannon-explorer.somnia.network/tx/0x676bd44018af5da348e5607361b316c7712bb0c0511f74a4219e7f44d170d122?tab=index
 */
export async function unstake() {}
