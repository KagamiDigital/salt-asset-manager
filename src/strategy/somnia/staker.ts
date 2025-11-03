//! Somnia staking bot / strategy

import { BigNumber } from "ethers";
import * as somnia from "./somnia";
import { ethers } from "ethers";

const log = console.log;

export async function info({ me }: { me: string }) {
	const totalDelegated = ethers.utils.formatEther(
		await somnia.delegatedStakes({ address: me }),
	);
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
	}
	return {
		total: totalDelegated,
		byValidator: delegations,
	};
}

export async function unstakeEverything({ me }: { me: string }) {
	const totalDelegated = await somnia.delegatedStakes({ address: me });
	if (totalDelegated.isZero()) {
		log(`No need to undelegate, ${me} has nothing delegated`);
		return;
	}
	const existingDelegations = await somnia.getDelegations({ address: me });
	for (const validatorAddress of existingDelegations) {
		await somnia.totalUnstake({ validatorAddress });
	}

	// check everything unstaked
	const newTotalDelegated = await somnia.delegatedStakes({ address: me });
	if (!newTotalDelegated.isZero()) {
		throw new Error(`Failed to unstake everything from ${me}`);
	}
	console.log(`Unstaked everything from ${me}`);
}

export async function stake({ me, amount }: { me: string; amount: BigNumber }) {
	// todo
}
