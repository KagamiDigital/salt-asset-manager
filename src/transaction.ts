import { BigNumber, ContractTransaction, ethers } from "ethers";
import { askForInput } from "./helpers";
import {
  getVaultsWithoutTransactions,
  signTx,
  submitTransaction,
} from "@intuweb3/sdk";
import { broadcasting_network_provider, signer } from "./constants";

export async function transaction() {
  const vaultAddress = await askForInput(
    `\nPlease enter the account address from where you wish to execute the transfer: `
  );

  if (!ethers.utils.isAddress(vaultAddress)) {
    console.log("You need a valid account address to propose a transaction");
    return;
  }

  const managedVaults = await getVaultsWithoutTransactions(
    signer.address,
    signer.provider
  );

  const vault = managedVaults.find(
    (v) => v.masterPublicAddress === vaultAddress
  );

  if (!vault) {
    console.log("No Managed account found for address: " + vaultAddress);
    return;
  }

  const recipient = await askForInput(`Please enter the recipient's address: `);

  if (!ethers.utils.isAddress(recipient)) {
    console.log("You need a valid recipient address to propose a transaction");
    return;
  }

  const amount = await askForInput(`Please enter the amount to transfer: `);

  if (+amount < 0) {
    console.log("You need a valid amount to propose a transaction");
    return;
  }

  const nonce = await broadcasting_network_provider.getTransactionCount(
    vault.masterPublicAddress
  );

  // get the fee data on the broadcasting network
  const feeData = await broadcasting_network_provider.getFeeData();

  let gas: BigNumber;
  try {
    // Get the estimated gas for the fully populated transaction
    const gasEstimate = await broadcasting_network_provider.estimateGas({
      from: vault.masterPublicAddress!,
      to: recipient,
      data: "",
      value: ethers.utils.parseEther(amount),
    });
    gas = gasEstimate.mul(155).div(100); // return the estimate with a 55% increase
  } catch (err) {
    gas = BigNumber.from(35000).mul(1000).div(100); // return 350k gas, i.e. just a large value
  }

  const submitTransactionTx = await submitTransaction(
    recipient,
    amount,
    process.env.BROADCASTING_NETWORK_ID,
    nonce,
    "",
    BigNumber.from(feeData.gasPrice).toNumber(),
    gas.toNumber(),
    vault.vaultAddress,
    signer,
    "SERVER",
    false,
    broadcasting_network_provider
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

  console.log("Please review the transaction details:");
  console.log("recipient: " + recipient);
  console.log("amount: " + amount);
  console.log("chainId: " + process.env.BROADCASTING_NETWORK_ID);
  console.log("nonce: " + nonce);

  const approval = await askForInput(
    `\nPlease confirm you want to sign the transaction, you cannot cancel the transaction after this point? [yes/no] `
  );

  if (approval !== "yes") {
    console.log("transaction proposal cannot carry on without the signature");
    return;
  }

  const tx = (await signTx(
    vault.vaultAddress,
    Number(eventData.txId),
    signer,
    undefined,
    undefined,
    undefined
  )) as ethers.ContractTransaction;

  await tx.wait();

  console.log("transaction signed successfully");
}
