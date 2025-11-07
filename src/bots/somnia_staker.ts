//! Somnia staking bot / strategy

import { BigNumber } from "ethers";
import * as somnia from "../strategy/somnia/staking";
import { ethers } from "ethers";
import { broadcasting_network_provider } from "../constants";
import validators from "../../contracts/somnia/validators.json";

const log = console.log;
const info = console.info;

export async function getInfo({ me }: { me: string }) {
	const totalDelegated = ethers.utils.formatEther(
		await somnia.delegatedStakes({ address: me }),
	);
	let totalPendingRewards = BigNumber.from(0);
	const delegationsRaw = await somnia.getDelegations({ address: me });
	const delegations = {};
	for (const validatorAddress of delegationsRaw) {
		const info = await somnia.getDelegationInfo({
			address: me,
			validatorAddress,
		});
		delegations[validatorAddress] = {
			amount: ethers.utils.formatEther(info.amount),
			pendingRewards: ethers.utils.formatEther(info.pendingRewards),
		};
		totalPendingRewards = totalPendingRewards.add(info.pendingRewards);
	}
	const balance = ethers.utils.formatEther(
		await broadcasting_network_provider.getBalance(me),
	);
	return {
		balance,
		totalDelegated: totalDelegated,
		totalPendingRewards: ethers.utils.formatEther(totalPendingRewards),
		delegatedByValidator: delegations,
	};
}

export async function delegateStake({
	me,
	amount,
}: {
	me: string;
	amount: BigNumber;
}) {
	// loops through all validators until it finds one that hasn't been staked too
	// yet, then stakes the full amount to it.
	// This is quite a naive strategy but it does work
	let emptyValidator = undefined;
	for (const validatorAddress of Object.keys(validators)) {
		const info = await somnia.getDelegationInfo({
			address: me,
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
	
	// assert that the validator now displays that we have staked
	// 
}

export async function claimAllRewards({ me }: { me: string }) {
	const initialBalance = await broadcasting_network_provider.getBalance(me);

	const delegations = await somnia.getDelegations({ address: me });
	for (const validatorAddress of delegations) {
		const expected = (
			await somnia.getDelegationInfo({
				validatorAddress,
				address: me,
			})
		).pendingRewards;

		const preBalance = await broadcasting_network_provider.getBalance(me);
		await somnia.claimDelegatorRewards({ validatorAddress });
		const newBalance = await broadcasting_network_provider.getBalance(me);

		const diff = newBalance.sub(preBalance);
		log(
			`Claimed ${ethers.utils.formatEther(diff)} and expected ${ethers.utils.formatEther(expected)} from ${validatorAddress}`,
		);
	}

	const finalBalance = await broadcasting_network_provider.getBalance(me);
	const diff = finalBalance.sub(initialBalance);
	log(`Claimed all rewards for a total of ${ethers.utils.formatEther(diff)} `);
}

export async function undelegateEverything({ me }: { me: string }) {
	const totalDelegated = await somnia.delegatedStakes({ address: me });
	if (totalDelegated.isZero()) {
		log(`No need to undelegate, ${me} has nothing delegated`);
		return;
	} else {
		log(
			`Undelegating all your stake, for a total of ${ethers.utils.formatEther(totalDelegated)}`,
		);
	}
	const existingDelegations = await somnia.getDelegations({ address: me });
	for (const validatorAddress of existingDelegations) {
		const amount = (
			await somnia.getDelegationInfo({ address: me, validatorAddress })
		).amount;
		await somnia.undelegateStake({ validatorAddress, amount });
	}

	// check everything unstaked
	const newTotalDelegated = await somnia.delegatedStakes({ address: me });
	if (!newTotalDelegated.isZero()) {
		throw new Error(`Failed to unstake everything from ${me}`);
	}
	log(`Unstaked everything from ${me}`);
}
