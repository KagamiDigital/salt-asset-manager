import {
  automateRegistration,
  getUserPreRegisterInfos,
  getUserRegistrationAllInfos,
  preRegistration,
  registerAllSteps,
} from "@intuweb3/exp-node";
import { ethers } from "ethers";
import { askForInput } from "./helpers";
import { orchestration_network_provider, signer } from "./constants";
import { getUserIndex } from "@intuweb3/exp-node/lib/services/web3/utils";

const preRegisterBot = async (
  accountAddress: string,
  bot: ethers.Signer,
  provider: ethers.providers.JsonRpcProvider,
) => {
  const botAddress = await bot.getAddress();
  try {
    const preRegisterInfo = await getUserPreRegisterInfos(
      accountAddress,
      botAddress,
      provider,
    );

    if (preRegisterInfo.registered) {
      console.log(
        "The asset manager bot has already been pre-registered to this account.",
      );
      return;
    }
    console.log("pregegister:start");
    const tx = (await preRegistration(
      accountAddress,
      bot,
    )) as ethers.ContractTransaction;
    const res = await tx.wait();
    console.log("preregister:success");
    return res;
  } catch (err) {
    console.log("pregister:failure", err);
    return;
  }
};

const registerBot = async (
  accountAddress: string,
  bot: ethers.Signer,
  provider: ethers.providers.JsonRpcProvider,
) => {
  const botAddress = await bot.getAddress();
  try {
    const botIdx = await getUserIndex(accountAddress, botAddress, provider);
    const registerAllInfo = await getUserRegistrationAllInfos(
      accountAddress,
      provider,
    );

    console.log("the bot idx is " + botIdx);
    console.log(registerAllInfo);

    if (
      registerAllInfo[botIdx] !== null &&
      registerAllInfo[botIdx].registered
    ) {
      console.log("The asset manager bot has already been registered");
      return;
    }
    console.log("automaticRegistration:start");
    // open the nostr db connection
    await automateRegistration(
      accountAddress,
      bot,
      // what and why?
      // https://docs.intu.xyz/intu-sdk-functions/core-functionality/automateregistration/#parameters
      // idk why this is here
      // related to this?: https://github.com/nostrdice/nostrdice
      "wss://relay.nostrdice.com",
    );

    console.log("automaticRegistration:success");

    console.log("registerAllSteps:start");

    const tx = (await registerAllSteps(
      accountAddress,
      bot,
    )) as ethers.ContractTransaction;

    await tx.wait();

    console.log("registerAllSteps:success");
  } catch (err) {
    console.log("register:failure", err);
  }
};

/**
 * the setup function allows one to join the account creation process initiated on the SALT web app.
 * pre-register bot must be selected at the ADD ASSET MANAGER BOT step in the account creation process
 * register bot must be selected at the generate key step.
 *
 * NB: if you choose to open a managed acount, the account creation process will not complete unless the bot is turned on and participates
 *      in the account creation process successfully.
 */
export async function setup() {
  const vaultAddress = await askForInput(
    `\nPlease enter the VAULT address from which you want to add the asset manager bot to: `,
  );

  let done = false;

  while (!done) {
    if (!ethers.utils.isAddress(vaultAddress)) {
      console.log("You need a valid account address to proceed.");
    } else {
      done = true;
    }
  }

  done = false;

  while (!done) {
    const input = await askForInput(
      "Do you wish to: \n [1] pre-register the bot \n [2] register the bot \n [3] exit \n Please choose one of the options listed above:  ",
    );
    if (input === "1") {
      await preRegisterBot(
        vaultAddress,
        signer,
        orchestration_network_provider,
      );
    } else if (input === "2") {
      await registerBot(vaultAddress, signer, orchestration_network_provider);
    } else if (input === "3") {
      done = true;
    } else {
      console.log("Please enter a valid choice");
      console.log(
        "Do you wish to: \n [1] pre-register the bot \n [2] register the bot \n [3] exit \n Please choose one of the options listed above: \n",
      );
    }
  }
}
