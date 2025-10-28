import { BigNumber, BigNumberish, Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { broadcasting_network_provider } from "../../constants";

export async function stake({
	amount,
	validatorAddress,
}: {
	amount: BigNumber;
	validatorAddress: string;
}) {
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
	];

	const stakingContract = new Contract(
		stakingContractAddress,
		stakingContractABI,
		broadcasting_network_provider,
	);
	const txData = stakingContract.interface.encodeFunctionData(
		"delegateStake(address, uint256)",
		[validatorAddress, amount],
	);
	// todo
}
