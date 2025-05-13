import { BigNumber, ContractTransaction, ethers } from "ethers";
import { askForInput } from "./helpers";
import {
  getVaultsWithoutTransactions,
  signTx,
  submitTransaction,
} from "@intuweb3/exp-node";
import { broadcasting_network_provider, signer } from "./constants";
import env from "./env";

/** Will ask using stdin for missing arguments if not provided */
export async function transaction(
  vaultAddressI?: string | undefined,
  recipientAddressI?: string | undefined,
  amountI?: string | Number | undefined,
  skipConfirmation?: boolean | undefined,
) {
  const vaultAddress =
    vaultAddressI ||
    (await askForInput(
      `Please enter the account address from where you wish to execute the transfer: `,
    ));
  if (!ethers.utils.isAddress(vaultAddress)) {
    throw "You need a valid account address to propose a transaction";
  }

  const managedVaults = await getVaultsWithoutTransactions(
    signer.address,
    signer.provider,
  );

  const recipientAddress =
    recipientAddressI ||
    (await askForInput(`Please enter the recipient's address: `));
  if (!ethers.utils.isAddress(recipientAddress)) {
    throw "You need a valid recipient address to propose a transaction";
  }

  const amount =
    amountI || (await askForInput(`Please enter the amount to transfer: `));

  // skips if string
  if (+amount < 0) {
    throw "You need a positive amount to propose a transaction";
  }

  console.info("Beginning transaction ...");
  console.info("vaultAddress:", vaultAddress);
  console.info("recipientAddress:", recipientAddress);
  console.info("amount:", amount);

  const vault = managedVaults.find(
    (v) => v.masterPublicAddress === vaultAddress,
  );

  const nonce = await broadcasting_network_provider.getTransactionCount(
    vault.masterPublicAddress,
  );

  // get the fee data on the broadcasting network
  const feeData = await broadcasting_network_provider.getFeeData();

	console.info("Using custom sending provider", env.BROADCASTING_NETWORK_RPC_NODE_URL, "chainID", env.BROADCASTING_NETWORK_ID);
  const sendingProvider = new ethers.providers.JsonRpcProvider(
    env.BROADCASTING_NETWORK_RPC_NODE_URL,
    // env.BROADCASTING_NETWORK_ID,
  );
	const actualChainId = await sendingProvider.getNetwork().then((network) => network.chainId);
	if (actualChainId !== Number(env.BROADCASTING_NETWORK_ID)) {
		throw new Error(`Expected chain ID ${env.BROADCASTING_NETWORK_ID} but got ${actualChainId}`);
	}
  const submitTransactionTx = await submitTransaction(
    recipientAddress,
    amount,
    env.BROADCASTING_NETWORK_ID,
    nonce,
    "",
    BigNumber.from(feeData.gasPrice).toNumber(),
    21000,
    vault.vaultAddress,
    signer,
    "SERVER",
    false,
    // this is technically undocumented, but otherwise
    // this function relies on hard-coded RPC node URLs
    // based on the network ID you provide (above),
    // and somnia shannon isn't in this list which requires use to manually specify this
    // sendingProvider as any,
    broadcasting_network_provider as any
  );

  const submitTransactionResult = await (
    submitTransactionTx as ContractTransaction
  ).wait();
  const submitTransactionEvents = submitTransactionResult.events;
  const event = submitTransactionEvents[0];

  const eventData = {
    txId: event.args[0]._hex,
    txInfo: event.args[1],
  };

  console.log("transaction submitted successfully", eventData.txId);

  console.log("Note the transaction details:");
  console.log("recipient: " + recipientAddress);
  console.log("amount: " + amount);
  console.log("chainId: " + env.BROADCASTING_NETWORK_ID);
  console.log("nonce: " + nonce);
  console.log(
    "gasPrice: " +
      ethers.utils
        .parseEther(BigNumber.from(feeData.gasPrice).toString())
        .toString(),
  );
  console.log("gas: 21000");

  if (!skipConfirmation) {
    const approval = await askForInput(
      `\nPlease confirm you want to sign the transaction, you cannot cancel the transaction after this point? [yes/no] `,
    );

    if (approval !== "yes") {
      console.log("You haven't manually approved the transaction");
      console.log("transaction proposal cannot carry on without the signature");
      return;
    }
  }

  const tx = (await signTx(
    vault.vaultAddress,
    Number(eventData.txId),
    signer,
  )) as ethers.ContractTransaction;

	console.info("Waiting for tx ...");
  await tx.wait();

  console.log("Transaction signed successfully");
}
