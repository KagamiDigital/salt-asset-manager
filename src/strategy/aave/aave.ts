/**
 * https://aave.com/docs/developers/smart-contracts/wrapped-token-gateway
 */

import { BigNumber, ContractTransaction, ethers } from "ethers";
import { askForInput } from "../../helpers";
import {
	broadcasting_network_provider,
	orchestration_network_provider,
	signer,
} from "../../constants";
import WrappedTokenGatewayV3 from "../../../contracts/Protocols/Aave/abi/WrappedTokenGatewayV3.json";
import ERC20 from "../../../contracts/ERC20/abi/ERC20.json";
import { transfer } from "../../transaction";
import { formatEther, formatUnits, parseEther } from "ethers/lib/utils";

// specific to aave
// https://sepolia.etherscan.io/token/0x5b071b590a59395fe4025a0ccc1fcc931aac1830#readProxyContract
const aETHWETHContractAddress = "0x5b071b590a59395fE4025A0Ccc1FcC931AAc1830";
// generic, not affiliated with aave
const wETHContractAddress = "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c";

const WrappedTokenGatewayV3ContractAddress =
	"0x387d311e47e80b498169e6fb51d3193167d89F7D";
const poolContractAddress = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";

const aaveContract = new ethers.Contract(
	WrappedTokenGatewayV3ContractAddress,
	WrappedTokenGatewayV3,
	broadcasting_network_provider,
);

const aaveWETHContract = new ethers.Contract(
	aETHWETHContractAddress,
	ERC20,
	broadcasting_network_provider,
);

// // if this sanity check fails, its likely because you are on a chain that
// // doesn't support Aave (e.g. Somnia)
// aaveContract.getWETHAddress().then((address) => {
// 	if (address !== aETHWETHContractAddress) {
// 		console.error(
// 			`\n(Warning: WETH addresses differ for aave smart contract)\n`,
// 			address,
// 			aETHWETHContractAddress,
// 		);
// 	}
// });

export async function deposit({
	me,
	amount,
}: {
	me: string;
	amount?: BigNumber;
}) {
	const data = aaveContract.interface.encodeFunctionData(
		"depositETH(address, address onBehalfOf, uint16 referralCode)",
		[poolContractAddress, me, 0],
	);

	const value =
		amount ?? parseEther(await askForInput("Deposit amount (ETH): "));
	console.log(`Depositing ${formatEther(value)} ETH to ${me}`);
	await transfer({
		recipient: aaveContract.address,
		value,
		data,
	});
}

export async function getInfo({ me }: { me: string }) {
	// current balacne
	const nativeBalance = formatEther(
		await broadcasting_network_provider.getBalance(me),
	);
	const aaveWETHBalance = formatUnits(
		await aaveWETHContract.balanceOf(me),
		await aaveWETHContract.decimals(),
	);
	return {
		nativeBalance,
		aaveWETHBalance,
	};
}

export async function approve({ me }: { me: string }) {
	const balance = await aaveWETHContract.balanceOf(me);
	console.log(`Your current balance of aave WETH is: ${formatEther(balance)}`);
	const data = aaveWETHContract.interface.encodeFunctionData(
		"approve(address, uint256)",
		[aaveContract.address, balance],
	);
	return;

	transfer({
		recipient: aaveWETHContract.address,
		value: BigNumber.from(0),
		data: data,
	});
}

export async function withdraw() {
	return;
	// const vaultAddress = await askForInput(
	// 	`\nPlease enter the account (public key) from where you wish to execute the transfer: `,
	// );

	// if (!ethers.utils.isAddress(vaultAddress)) {
	// 	console.log("You need a valid account address to propose a transaction");
	// 	return;
	// }

	// const managedVaults = await getVaultsWithoutTransactions(
	// 	signer.address,
	// 	signer.provider,
	// );

	// const vault = managedVaults.find(
	// 	(v) => v.masterPublicAddress === vaultAddress,
	// );

	// if (!vault) {
	// 	console.log("No Managed account found for address: " + vaultAddress);
	// 	return;
	// }
	// const nonce = await broadcasting_network_provider.getTransactionCount(
	// 	vault.masterPublicAddress,
	// );

	// // get the fee data on the broadcasting network
	// const feeData = await broadcasting_network_provider.getFeeData();

	// const aETHWETH = new ethers.Contract(
	// 	aETHWETHContractAddress,
	// 	ERC20,
	// 	broadcasting_network_provider,
	// );
	// const balance = await aETHWETH.balanceOf(vault.masterPublicAddress);

	// const contractInterface = new ethers.utils.Interface(WrappedTokenGatewayV3);
	// const data = contractInterface.encodeFunctionData("withdrawETH", [
	// 	poolContractAddress,
	// 	balance,
	// 	vault.masterPublicAddress,
	// ]);

	// let gas: BigNumber;

	// try {
	// 	// Get the estimated gas for the fully populated transaction
	// 	const gasEstimate = await broadcasting_network_provider.estimateGas({
	// 		from: vault.masterPublicAddress!,
	// 		to: WrappedTokenGatewayV3ContractAddress,
	// 		data: data,
	// 	});
	// 	gas = gasEstimate.mul(155).div(100); // return the estimate with a 55% increase
	// } catch (err) {
	// 	gas = BigNumber.from(35000).mul(1000).div(100); // return 350k gas, i.e. just a large value
	// }

	// const submitTransactionTx = await submitTransaction(
	// 	WrappedTokenGatewayV3ContractAddress,
	// 	0,
	// 	process.env.BROADCASTING_NETWORK_ID,
	// 	nonce,
	// 	data,
	// 	BigNumber.from(feeData.gasPrice).toNumber(),
	// 	gas.toNumber(),
	// 	vault.vaultAddress,
	// 	signer,
	// 	"SERVER",
	// 	false,
	// 	broadcasting_network_provider,
	// );

	// const submitTransactionResult = await (
	// 	submitTransactionTx as ContractTransaction
	// ).wait();
	// const submitTransactionEvents = submitTransactionResult.events;
	// const event = submitTransactionEvents[0];

	// const eventData = {
	// 	txId: event.args[0]._hex,
	// 	txInfo: event.args[1],
	// };

	// console.log("transaction submitted successfully", eventData.txId);

	// const approval = await askForInput(
	// 	`\nPlease confirm you want to sign the transaction, you cannot cancel the transaction after this point? [yes/no] `,
	// );

	// if (approval !== "yes") {
	// 	console.log("transaction proposal cannot carry on without the signature");
	// 	return;
	// }

	// const tx = (await signTx(
	// 	vault.vaultAddress,
	// 	Number(eventData.txId),
	// 	signer,
	// )) as ethers.ContractTransaction;

	// await tx.wait();

	// console.log("transaction signed successfully");
}
