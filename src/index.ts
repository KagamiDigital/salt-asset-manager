import { signer } from "./constants";
import { askForInput, printRectangle, rl } from "./helpers";
import * as chorus_one from "./strategy/chorus-one/chorus-one";
import * as erc20 from "./strategy/simple-erc20/erc20";
import * as hype from "./strategy/hype/hype";
import * as somnia from "./strategy/somnia/somnia";
import * as somnia_staker from "./strategy/somnia/staker";
import { transfer } from "./transaction";
import { ethers } from "ethers";

(async () => {
	const publicAddress = await signer.getAddress();
	printRectangle(`ASSET MANAGER ${publicAddress.toUpperCase()} CONNECTED`);

	let done = false;

	// REMOVEME for development / debugging purposes only
	if (process.env.DEBUG_SALT_ASSET_MANAGER) {
		const info = await somnia_staker.info({ me: signer.address });
		console.log(`Already delegated`, info);

		await somnia_staker.delegateStake({
			me: signer.address,
			amount: ethers.utils.parseEther("5.0"),
		});
		await somnia_staker.claimAllRewards({ me: signer.address });
		await somnia_staker.undelegateEverything({ me: signer.address });
		done = true;
	}

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
				"Which strategy: \n [1] chorus-one \n [2] ERC20 \n [3] exit \n Please choose one of the options listed above: ",
			);

			if (input === "1") {
				const msg = `Do you wish to: \n [1] Stake \n [2] Unstake \n [3] Request status \n [4] Withdraw \n [5] exit \n Please choose one of the options listed above`;
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
				const msg = `In ERC20, do you wish to: \n [1] \n [2] exit \n Please choose one of the options listed above`;
				const input = await askForInput(msg);
				if (input === "1") {
					await erc20.transfer().catch((error) => {
						console.log(`Error: `, error);
					});
				} else if (input === "2") {
					done = true;
				} else {
					console.log(`Please enter a valid choice`);
				}
			} else if (input === "3") {
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
