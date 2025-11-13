import { BigNumber, Contract } from "ethers";
import { ethers } from "ethers";
import { broadcasting_network_provider } from "../../../config";
import { sendTransaction } from "../../salt";
import ABI from "../../../../contracts/somnia/STAKER.json";

export const stakingContractAddress =
  "0xBe367d410D96E1cAeF68C0632251072CDf1b8250";
export const stakingContractABI = ABI;

export const stakingContract = new Contract(
  stakingContractAddress,
  stakingContractABI,
  broadcasting_network_provider
);

export const SOMNIA_SHANON = 50312;

/**
 *
 * Stakes the supplied amount with the speciifed validator
 * Example tx: https://shannon-explorer.somnia.network/tx/0xefe52d003860d35622659ffe5f4ce4e5eee5366d0c8b7e506a3745a53849318f?tab=index
 * @params amount the amount to be staked (in unit of wei)
 * @params validatorAddress: the address of the validator
 *
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
    [validatorAddress, amount]
  );

  console.log(
    `Delegating ${ethers.utils.formatEther(
      amount
    )} STT to validator ${validatorAddress}`,
    txData
  );

  await sendTransaction({
    value: amount,
    recipient: stakingContractAddress,
    data: txData,
  });
}

/**
 * Returns the total amount staked with validators
 *
 * @param address the address for which to get the total delegated stake
 * @returns delegatedStake the total delegated amount
 */
export async function delegatedStakes({
  address,
}: {
  address: string;
}): Promise<{ delegatedStake: BigNumber }> {
  return await stakingContract.delegatedStakes(address);
}

/**
 * Returns the staking information for a given validator
 * @param validatorAddress
 * @returns validator the validator's address
 * @returns stakedAmount the total amount staked
 * @returns accumulatedRewards the total rewards accumulated
 * @delegatedStake the total delegated stake
 */
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

/** All validators that the delegator has delegated to */
/**
 * Returns all the validators that the delegator has already delegated to
 * @params address the delegator's address
 * @returns validators[] the array of validators with delegations from delegator
 */
export async function getDelegations({
  address,
}: {
  address: string;
}): Promise<{ delegatedValidators: string[] }> {
  return await stakingContract.getDelegations(address);
}

/**
 * returns the delegation information for (delegator,validator) pair
 * @param address the delegator's address
 * @param validatorAddress the address of the validator
 * @returns amount the amount delegated with the validator
 * @returns pendingRewards the pending rewards
 */
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
 * Undelegate some or all of your stake with a validator
 * Example tx: https://shannon-explorer.somnia.network/tx/0x676bd44018af5da348e5607361b316c7712bb0c0511f74a4219e7f44d170d122?tab=index
 *
 * @param validatorAddress the address of the validator
 * @amount the amount to unstake
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
    [validatorAddress, amount]
  );

  await sendTransaction({
    value: BigNumber.from(0),
    recipient: stakingContractAddress,
    data: txData,
  });

  console.info(
    `Just unstaked ${ethers.utils.formatEther(amount)} from ${validatorAddress}`
  );
}

/**
 * claim your rewards from a validator
 * @param validatorAddress
 */
export async function claimDelegatorRewards({
  validatorAddress,
}: {
  validatorAddress: string;
}) {
  console.log(`claimDelegatorRewards(${validatorAddress})`);
  const txData = stakingContract.interface.encodeFunctionData(
    "claimDelegatorRewards(address)",
    [validatorAddress]
  );
  await sendTransaction({
    value: BigNumber.from(0),
    recipient: stakingContractAddress,
    data: txData,
  });
  console.info(`Just claimed rewards from ${validatorAddress}`);
}
