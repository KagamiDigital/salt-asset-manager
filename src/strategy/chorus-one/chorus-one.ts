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

  let gas: BigNumber;
  try {
    // Get the estimated gas for the fully populated transaction
    const gasEstimate = await broadcasting_network_provider.estimateGas({
      from: vault.masterPublicAddress!,
      to: CHORUS_ONE_ETHEREUM_VALIDATORS.hoodi.mevMaxVault,
      data: stakeTx.data,
    });
    gas = gasEstimate.mul(155).div(100); // return the estimate with a 55% increase
  } catch (err) {
    gas = BigNumber.from(35000).mul(1000).div(100); // return 350k gas, i.e. just a large value
  }

  const submitTransactionTx = await submitTransaction(
    stakeTx.to!,
    amount,
    process.env.BROADCASTING_NETWORK_ID,
    nonce,
    stakeTx.data,
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

  console.log(maxUnstake);

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

  let gas: BigNumber;
  try {
    // Get the estimated gas for the fully populated transaction
    const gasEstimate = await broadcasting_network_provider.estimateGas({
      from: vault.masterPublicAddress!,
      to: CHORUS_ONE_ETHEREUM_VALIDATORS.hoodi.mevMaxVault,
      data: unstakeTx.data,
    });
    gas = gasEstimate.mul(155).div(100); // return the estimate with a 55% increase
  } catch (err) {
    console.log(err);
    gas = BigNumber.from(35000).mul(1000).div(100); // return 350k gas, i.e. just a large value
  }

  const submitTransactionTx = await submitTransaction(
    unstakeTx.to!,
    0,
    process.env.BROADCASTING_NETWORK_ID,
    nonce,
    unstakeTx.data,
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

export async function requestStatus() {
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

  console.log("Fetching request status...");

  const getUnstakeQueue = await staker.getUnstakeQueue({
    delegatorAddress: vault.masterPublicAddress! as `0x${string}`,
    validatorAddress,
  });

  console.log(getUnstakeQueue);
}

export async function withdraw() {
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

  const { tx: withdrawTx } = await staker.buildWithdrawTx({
    delegatorAddress: vault.masterPublicAddress! as `0x${string}`,
    validatorAddress,
  });

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
      to: CHORUS_ONE_ETHEREUM_VALIDATORS.hoodi.mevMaxVault,
      data: withdrawTx.data,
    });
    gas = gasEstimate.mul(155).div(100); // return the estimate with a 55% increase
  } catch (err) {
    console.log(err);
    gas = BigNumber.from(35000).mul(1000).div(100); // return 350k gas, i.e. just a large value
  }

  const submitTransactionTx = await submitTransaction(
    withdrawTx.to!,
    0,
    process.env.BROADCASTING_NETWORK_ID,
    nonce,
    withdrawTx.data,
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
  console.log("recipient: " + withdrawTx.to);
  console.log("amount: " + withdrawTx.value);
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
