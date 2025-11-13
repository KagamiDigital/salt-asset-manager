/**
 * Somnia staking bot / strategy
 * with a nicer API surface than the underlying smart contract
 */

import { BigNumber } from "ethers";
import * as somnia from ".";
import { ethers } from "ethers";
import { broadcasting_network_provider } from "../../../config";
import validators from "../../../../contracts/somnia/validators.json";

const log = console.log;

/**
 * the complete delegation report
 * @param accountAddressthe delegator's address
 * @returns balance the current balance of the delegator
 * @returns totalDelegated the total amount that was delegated so far
 * @returns totalPendingRetwards the total amount of rewards so far
 * @delegatedByValidator the amount delegated per validator
 */
export async function getInfo({
  accountAddress,
}: {
  accountAddress: string;
}): Promise<{
  balance: string;
  totalDelegated: string;
  totalPendingRewards: string;
  delegatedByValidator: {};
}> {
  const { delegatedStake } = await somnia.delegatedStakes({
    address: accountAddress,
  });

  const delegatedStakeFormatted = ethers.utils.formatEther(delegatedStake ?? 0);

  let totalPendingRewards = BigNumber.from(0);
  const { delegatedValidators: delegationsRaw } = await somnia.getDelegations({
    address: accountAddress,
  });

  const delegations = {};
  for (const validatorAddress of delegationsRaw ?? []) {
    const info = await somnia.getDelegationInfo({
      address: accountAddress,
      validatorAddress,
    });
    delegations[validatorAddress] = {
      amount: ethers.utils.formatEther(info.amount),
      pendingRewards: ethers.utils.formatEther(info.pendingRewards),
    };
    totalPendingRewards = totalPendingRewards.add(info.pendingRewards);
  }
  const balance = ethers.utils.formatEther(
    await broadcasting_network_provider.getBalance(accountAddress)
  );
  return {
    balance,
    totalDelegated: delegatedStakeFormatted,
    totalPendingRewards: ethers.utils.formatEther(totalPendingRewards),
    delegatedByValidator: delegations,
  };
}

/**
 * delegate stake to the first available validator
 * @param accountAddress the delegator's address
 * @param amount the amount to delegate
 */
export async function delegateStake({
  accountAddress,
  amount,
}: {
  accountAddress: string;
  amount: BigNumber;
}) {
  let emptyValidator = undefined;
  for (const validatorAddress of Object.keys(validators)) {
    const info = await somnia.getDelegationInfo({
      address: accountAddress,
      validatorAddress,
    });
    if (info.amount.isZero()) {
      emptyValidator = validatorAddress;
      break;
    }
  }
  if (!emptyValidator) {
    throw new Error(`All the validators are already delegated too!`);
  }

  await somnia.delegateStake({ amount, validatorAddress: emptyValidator });
}

/**
 * claim all the rewards from all validators
 * @param address the delegator's address
 */
export async function claimAllRewards({
  accountAddress,
}: {
  accountAddress: string;
}) {
  const initialBalance = await broadcasting_network_provider.getBalance(
    accountAddress
  );

  const { delegatedValidators: delegations } = await somnia.getDelegations({
    address: accountAddress,
  });
  for (const validatorAddress of delegations) {
    const expected = (
      await somnia.getDelegationInfo({
        validatorAddress,
        address: accountAddress,
      })
    ).pendingRewards;

    if (expected.isZero()) {
      log(`Skipped claiming rewards for ${validatorAddress}`);
      continue;
    }

    const preBalance = await broadcasting_network_provider.getBalance(
      accountAddress
    );
    await somnia.claimDelegatorRewards({ validatorAddress });
    const newBalance = await broadcasting_network_provider.getBalance(
      accountAddress
    );

    const diff = newBalance.sub(preBalance);
    log(
      `Claimed ${ethers.utils.formatEther(
        diff
      )} (including gas fees) and expected ${ethers.utils.formatEther(
        expected
      )} (without gas) from ${validatorAddress}`
    );
  }

  const finalBalance = await broadcasting_network_provider.getBalance(
    accountAddress
  );
  const diff = finalBalance.sub(initialBalance);
  log(`Claimed all rewards for a total of ${ethers.utils.formatEther(diff)} `);
}

/**
 * undelegate all stakes from all validators
 * @param accountAddressthe delegator's address
 */
export async function undelegateEverything({
  accountAddress,
}: {
  accountAddress: string;
}) {
  const { delegatedStake } = await somnia.delegatedStakes({
    address: accountAddress,
  });
  if (delegatedStake.isZero()) {
    log(`No need to undelegate, ${accountAddress} has nothing delegated`);
    return;
  } else {
    log(
      `Undelegating all your stake, for a total of ${ethers.utils.formatEther(
        delegatedStake
      )}`
    );
  }
  const { delegatedValidators: existingDelegations } =
    await somnia.getDelegations({
      address: accountAddress,
    });
  for (const validatorAddress of existingDelegations) {
    const amount = (
      await somnia.getDelegationInfo({
        address: accountAddress,
        validatorAddress,
      })
    ).amount;
    await somnia.undelegateStake({ validatorAddress, amount });
  }

  const { delegatedStake: totalStaked } = await somnia.delegatedStakes({
    address: accountAddress,
  });
  if (!totalStaked.isZero()) {
    throw new Error(`Failed to unstake everything from ${accountAddress}`);
  }
  log(`Unstaked everything from ${accountAddress}`);
}
