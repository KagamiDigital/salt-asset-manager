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
import { transfer } from "./transaction";

(async () => {
	const publicAddress = await signer.getAddress();
	printRectangle(`ASSET MANAGER ${publicAddress.toUpperCase()} CONNECTED`);

	let done = false;

	// only for quicker debug cycles, REMOVEME
	if (process.env.DEBUG_SALT_ASSET_MANAGER) {
		await hype.fromEVMToCore();
		// await erc20.transfer({
		// 	token_address: "0xADcb2f358Eae6492F61A5F87eb8893d09391d160",
		// 	// token_address: "0xe29b0395e5e0c6df2d900a5369509acebd98da60",
		// });
		done = true;
	}

	while (!done) {
		const input = await askForInput(
			"Do you wish to: \n [1] make a native currency transfer \n [2] execute a strategy \n [3] interact with HYPE \n [4] exit \n Please choose one of the options listed above: ",
		);
		if (input === "1") {
			await transfer().catch((error) => {
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
