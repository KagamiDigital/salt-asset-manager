import { signer } from "./constants";
import { askForInput, printRectangle, rl } from "./helpers";
import {
	requestStatus,
	stake,
	unstake,
	withdraw,
} from "./strategy/chorus-one/chorus-one";
import * as erc20 from "./strategy/simple-erc20/erc20";
import * as hype from "./strategy/hype/hype";
import * as somnia from "./strategy/somnia/somnia";
import { transfer } from "./transaction";
import { ethers } from "ethers";

(async () => {
	const publicAddress = await signer.getAddress();
	printRectangle(`ASSET MANAGER ${publicAddress.toUpperCase()} CONNECTED`);

	let done = false;

	// REMOVEME for development / debugging purposes only
	if (process.env.DEBUG_SALT_ASSET_MANAGER) {
		const totalDelegated = await somnia.delegatedStakes({
			address: signer.address,
		});
		const delegationValidators = await somnia.getDelegations({
			address: signer.address,
		});
		const delegationsByValidator = {};
		for (const validatorAddress of delegationValidators) {
			const info = await somnia.getDelegationInfo({
				address: signer.address,
				validatorAddress,
			});
			delegationsByValidator[validatorAddress] = ethers.utils.formatEther(
				info.amount,
			);
		}
		console.log(
			`Already delegated`,
			ethers.utils.formatEther(totalDelegated),
			delegationValidators,
			delegationsByValidator,
		);
		// await somnia.delegateStake({
		// 	amount: ethers.utils.parseEther("1"),
		// 	// validatorAddress: "0xAf43e6f892ba3D9fE110f78568ecbF68250C840F",
		// 	validatorAddress: "0x8CaA4E607c6c2AE7b345014a0E9E084dC57B4FBa",
		// });
		// await hype.fromEVMToCore();
		// await erc20.transfer({
		// 	// token_address: "0xADcb2f358Eae6492F61A5F87eb8893d09391d160", // WETH
		// 	// token_address: "0x0000000000000000000000000000000000000000",
		// 	// token_address: "0x5555555555555555555555555555555555555555",
		// 	// token_address: "0xb88339CB7199b77E23DB6E890353E22632Ba630f",
		// 	// token_address: "0x0b80659a4076e9e93c7dbe0f10675a16a3e5c206", // HypeEVM bridging USDC from Core
		// 	token_address: "0xeb62eee3685fc4c43992febcd9e75443",
		// 	// HYPE/USDC USDC spot on HypeEVM
		// 	// token_address: "0xe29b0395e5e0c6df2d900a5369509acebd98da60",
		// });
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
					await stake().catch((error) => {
						console.error("Error:", error);
					});
				} else if (input === "2") {
					await unstake().catch((error) => {
						console.log("Error:", error);
					});
				} else if (input === "3") {
					await requestStatus().catch((error) => {
						console.log("Error:", error);
					});
				} else if (input === "4") {
					await withdraw().catch((error) => {
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
