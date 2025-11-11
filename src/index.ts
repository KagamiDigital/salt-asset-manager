import { broadcasting_network_provider, signer } from "./constants";
import { askForInput, printRectangle, rl } from "./helpers";
import * as chorus_one from "./strategy/chorus-one/chorus-one";
import * as erc20 from "./strategy/simple-erc20/erc20";
import * as hype from "./strategy/hype/hype";
import * as somnia from "./strategy/somnia/staking";
import * as aave from "./strategy/aave/aave";
import * as somnia_staker from "./bots/somnia_staker";
import { chooseAccount, transfer } from "./transaction";
import { ethers } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";

// A basic TUI to demonstrate usage
(async () => {
	const publicAddress = await signer.getAddress();
	printRectangle(`ASSET MANAGER ${publicAddress.toUpperCase()} CONNECTED`);

	let done = false;

	while (!done) {
		const input = await askForInput(
			"Do you wish to: \n [1] make a native currency transfer \n [2] execute a strategy \n [3] interact with HYPE \n [4] exit \n Please choose one of the options listed above: ",
		);
		if (input === "1") {
			await transfer({}).catch((error) => {
				console.error("Error:", error);
			});
		} else if (input === "2") {
			const input = await askForInput(
				"Which strategy: \n [1] chorus-one \n [2] Somnia staking \n [3] aave \n [4] exit \n Please choose one of the options listed above: ",
			);

			if (input === "1") {
				// Chorous One
				const msg = `Do you wish to: \n [1] Stake \n [2] Unstake \n [3] Request status \n [4] Withdraw \n [5] exit \n Please choose one of the options listed above: `;
				const input = await askForInput(msg);
				if (input === "1") {
					await chorus_one.stake().catch((error) => {
						console.error("Error:", error);
					});
				} else if (input === "2") {
					await chorus_one.unstake().catch((error) => {
						console.log("Error:", error);
					});
				} else if (input === "3") {
					await chorus_one.requestStatus().catch((error) => {
						console.log("Error:", error);
					});
				} else if (input === "4") {
					await chorus_one.withdraw().catch((error) => {
						console.log("Error:", error);
					});
				} else if (input === "5") {
					done = true;
				} else {
					console.log(`Please enter a valid choice`);
				}
			} else if (input === "2") {
				// Somnia staking
				const { accountAddress: me } = await chooseAccount();
				console.log(
					`Printing information about your current Somnia staking delegations`,
				);
				const info = await somnia_staker.getInfo({ me });
				console.log(
					`Your Salt wallet currently at ${me} has ${info.balance} SST, and you have delegated ${info.totalDelegated} \
SST already with ${info.totalPendingRewards} pending rewards across ${Object.keys(info.delegatedByValidator).length} different validators`,
					info.delegatedByValidator,
				);

				const msg = `In Somnia staking, do you wish to: \n [1] Delegate stake \n [2] Collect rewards \n [3] Undelegate stake \n [4] Exit \n Please enter one of the options listed above: `;
				const input = await askForInput(msg);

				if (input === "1") {
					const amount = ethers.utils.parseEther(
						await askForInput("How much SST do you want to stake?: "),
					);
					await somnia_staker.delegateStake({ amount, me }).catch((error) => {
						console.log(`Error: `, error);
					});
				} else if (input === "2") {
					await somnia_staker.claimAllRewards({ me }).catch((error) => {
						console.log(`Error:`, error);
					});
				} else if (input === "3") {
					// const amount = ethers.utils.parseEther(
					// 	await askForInput("How much SST do you want to undelegate?: "),
					// );
					const input = await askForInput(
						`Are you sure you want to undelegate all your stake? (y/N): `,
					);
					if (input.toLowerCase() === "y") {
						await somnia_staker.undelegateEverything({ me }).catch((error) => {
							console.log(`Error: ${error}`);
						});
					} else {
						console.log("Undelegation cancelled");
					}
				} else if (input === "4") {
					done = true;
				} else {
					console.log(`Please enter a valid choice`);
				}
			} else if (input === "3") {
				// Aave
				const msg = `In Aave, do you wish to \n [1] Deposit \n [2] Approve \n [3] Withdraw [4] exit \n Please choose one of the options listed above: `;
				const input = await askForInput(msg);
				const { accountAddress: me } = await chooseAccount();

				// helpful information
				const nativeBalance = formatEther(
					await broadcasting_network_provider.getBalance(me),
				);
				const aaveWETHBalance = formatUnits(
					await aave.aaveWETHContract.balanceOf(me),
					await aave.aaveWETHContract.decimals(),
				);
				console.info(
					`Your native balance: ${nativeBalance}, your aave WETH balance: ${aaveWETHBalance}`,
				);

				if (input === "1") {
					await aave.deposit({ me }).catch((error) => {
						console.log(`Error: ${error}`);
					});
				} else if (input === "2") {
					await aave.approve({ me }).catch((error) => {
						console.log(`Error: ${error}`);
					});
				} else if (input === "3") {
					await aave.withdraw().catch((error) => {
						console.log(`Error: ${error}`);
					});
				} else if (input === "4") {
					done = true;
				} else {
					console.log(`Please enter a valid choice`);
				}
			} else if (input === "4") {
				done = true;
			} else {
				console.log("Please enter a valid choice");
			}
		} else if (input === "3") {
			const msg = `Do you wish to: \n [1] Transfer some of your EVM native HYPE to HypeCore \n [2] exit \n Please choose one of the options listed above`;
			const input = await askForInput(msg);
			if (input === "1") {
				await hype.fromEVMToCore().catch((error) => {
					console.log(`Error: `, error);
				});
			} else if (input === "2") {
				done = true;
			} else {
				console.log(`Please enver a valid choice`);
			}
		} else if (input === "4") {
			done = true;
		} else {
			console.log("Please enter a valid choice");
		}
	}
	rl.close();
})();
