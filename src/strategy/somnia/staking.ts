//! Somnia staking example code

import { BigNumber, BigNumberish, Contract } from "ethers";
import { ethers } from "ethers";
import { broadcasting_network_provider, signer } from "../../constants";
import { transfer } from "../../transaction";
import ABI from "../../../contracts/somnia/STAKER.json";

export const stakingContractAddress =
	"0xBe367d410D96E1cAeF68C0632251072CDf1b8250";
export const stakingContractABI = ABI;

export const stakingContract = new Contract(
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

	await transfer({
		value: amount,
		recipient: stakingContractAddress,
		data: txData,
	});
	console.info(`Delegation successful`);
}

/** Total sum */
export async function delegatedStakes({
	address,
}: {
	address: string;
}): Promise<BigNumber> {
	return await stakingContract.delegatedStakes(address);
}

/** Info only about that validator, nothing concerning the user */
export async function getStake({
	validatorAddress,
}: {
	validatorAddress: string;
}): Promise<{
	validator: string;
	stakedAmount: BigNumber;
	accumulatedRewards: BigNumber;
	delegatedStake: BigNumber;
}> {
	return await stakingContract.getStake(validatorAddress);
}

/** All validators that the user has delegated to */
export async function getDelegations({
	address,
}: {
	address: string;
}): Promise<string[]> {
	return await stakingContract.getDelegations(address);
}

export async function getDelegationInfo({
	address,
	validatorAddress,
}: {
	address: string;
	validatorAddress: string;
}): Promise<{ amount: BigNumber; pendingRewards: BigNumber }> {
	return await stakingContract.getDelegationInfo(address, validatorAddress);
}

/**
 * Example tx: https://shannon-explorer.somnia.network/tx/0x676bd44018af5da348e5607361b316c7712bb0c0511f74a4219e7f44d170d122?tab=index
 */
export async function undelegateStake({
	validatorAddress,
	amount,
}: {
	validatorAddress: string;
	amount: BigNumber;
}) {
	const txData = stakingContract.interface.encodeFunctionData(
		"undelegateStake(address, uint256)",
		[validatorAddress, amount],
	);

	await transfer({
		value: BigNumber.from(0),
		recipient: stakingContractAddress,
		data: txData,
	});

	console.info(
		`Just unstaked ${ethers.utils.formatEther(amount)} from ${validatorAddress}`,
	);
}

export async function claimDelegatorRewards({
	validatorAddress,
}: {
	validatorAddress: string;
}) {
	console.log(`claimDelegatorRewards(${validatorAddress})`);
	const txData = stakingContract.interface.encodeFunctionData(
		"claimDelegatorRewards(address)",
		[validatorAddress],
	);
	await transfer({
		value: BigNumber.from(0),
		recipient: stakingContractAddress,
		data: txData,
	});
	console.info(`Just claimed rewards from ${validatorAddress}`);
}
