import {
  EthereumStaker,
  CHORUS_ONE_ETHEREUM_VALIDATORS,
} from "@chorus-one/ethereum";
import { askForInput } from "../../helpers";
import { BigNumber, ContractTransaction, ethers } from "ethers";
import {
  getVaultsWithoutTransactions,
  signTx,
  submitTransaction,
} from "@intuweb3/sdk";
import { broadcasting_network_provider, signer } from "../../constants";

export async function stake() {
  const vaultAddress = await askForInput(
    `\nPlease enter the account address from where you wish to execute the staking operation: `
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

  const staker = new EthereumStaker({
    network: "hoodi",
  });

  await staker.init();

  const validatorAddress = CHORUS_ONE_ETHEREUM_VALIDATORS.hoodi.mevMaxVault;

  if (!ethers.utils.isAddress(validatorAddress)) {
    console.log("You need a valid recipient address to propose a transaction");
    return;
  }

  const amount = await askForInput(`Please enter the amount to transfer: `);

  if (+amount < 0) {
    console.log("You need a valid amount to propose a transaction");
    return;
  }

  const { tx: stakeTx } = await staker.buildStakeTx({
    delegatorAddress: vault.masterPublicAddress! as `0x${string}`,
    validatorAddress,
    amount: amount, // Passed as string, e.g. '1' - 1 ETH
  });

  console.log(stakeTx);

  const nonce = await broadcasting_network_provider.getTransactionCount(
    vault.masterPublicAddress
  );

  // get the fee data on the broadcasting network
  const feeData = await broadcasting_network_provider.getFeeData();

  const submitTransactionTx = await submitTransaction(
    stakeTx.to!,
    amount,
    process.env.BROADCASTING_NETWORK_ID,
    nonce,
    stakeTx.data,
    BigNumber.from(feeData.gasPrice).toNumber(),
    31000,
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
  console.log("recipient: " + stakeTx.to);
  console.log("amount: " + amount);
  console.log("chainId: " + process.env.BROADCASTING_NETWORK_ID);
  console.log("nonce: " + nonce);
  console.log(
    "gasPrice: " +
      ethers.utils
        .parseEther(BigNumber.from(feeData.gasPrice).toString())
        .toString()
  );
  console.log("gas: 21000");

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
    signer
  )) as ethers.ContractTransaction;

  await tx.wait();

  console.log("transaction signed successfully");
}

export async function unstake() {
  const vaultAddress = await askForInput(
    `\nPlease enter the account address from where you wish to execute the staking operation: `
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

  const staker = new EthereumStaker({
    network: "hoodi",
  });

  await staker.init();

  const validatorAddress = CHORUS_ONE_ETHEREUM_VALIDATORS.hoodi.mevMaxVault;

  const { maxUnstake } = await staker.getStake({
    delegatorAddress: vault.masterPublicAddress as `0x${string}`,
    validatorAddress,
  });

  if (!ethers.utils.isAddress(validatorAddress)) {
    console.log("You need a valid recipient address to propose a transaction");
    return;
  }

  const { tx: unstakeTx } = await staker.buildUnstakeTx({
    delegatorAddress: vault.masterPublicAddress! as `0x${string}`,
    validatorAddress,
    amount: maxUnstake, // Passed as string, e.g. '1' - 1 ETH
  });

  const nonce = await broadcasting_network_provider.getTransactionCount(
    vault.masterPublicAddress
  );

  // get the fee data on the broadcasting network
  const feeData = await broadcasting_network_provider.getFeeData();

  const submitTransactionTx = await submitTransaction(
    unstakeTx.to!,
    ethers.utils.formatEther(unstakeTx.value),
    process.env.BROADCASTING_NETWORK_ID,
    nonce,
    unstakeTx.data,
    BigNumber.from(feeData.gasPrice).toNumber(),
    31000,
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
  console.log("recipient: " + unstakeTx.to);
  console.log("amount: " + unstakeTx.value);
  console.log("chainId: " + process.env.BROADCASTING_NETWORK_ID);
  console.log("nonce: " + nonce);
  console.log(
    "gasPrice: " +
      ethers.utils
        .parseEther(BigNumber.from(feeData.gasPrice).toString())
        .toString()
  );
  console.log("gas: 21000");

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
    signer
  )) as ethers.ContractTransaction;

  await tx.wait();

  console.log("transaction signed successfully");
}
