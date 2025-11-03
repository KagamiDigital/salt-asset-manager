//! Somnia staking bot / strategy

import * as somnia from "./somnia";

const log = console.log;

export async function unstakeEverything({ me }, { me: string }) {
	const totalDelegated = await somnia.delegatedStakes({ address: me });
	if (totalDelegated.isZero()) {
		log(`No need to undelegate, ${me} has nothing delegated`);
		return;
	}
	const existingDelegations = await somnia.getDelegations({ address: me });
	for (const validatorAddress of existingDelegations) {
		await somnia.totalUnstake({ validatorAddress });
	}
}
