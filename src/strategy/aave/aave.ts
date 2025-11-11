/**
 * https://aave.com/docs/developers/smart-contracts/wrapped-token-gateway
 */

//! NOTE: Untested!

import { BigNumber, ContractTransaction, ethers } from "ethers";
import { askForInput } from "../../helpers";
import { broadcasting_network_provider } from "../../constants";
import WrappedTokenGatewayV3 from "../../../contracts/Protocols/Aave/abi/WrappedTokenGatewayV3.json";
import ERC20 from "../../../contracts/ERC20/abi/ERC20.json";
import { transfer } from "../../transaction";
import { formatEther, formatUnits, parseEther } from "ethers/lib/utils";

// https://aave.com/docs/resources/addresses - only testnet that is supported it eth sep
// https://github.com/bgd-labs/aave-address-book/blob/main/src/AaveV3ArbitrumSepolia.sol

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

export const aaveWETHContract = new ethers.Contract(
	aETHWETHContractAddress,
	ERC20,
	broadcasting_network_provider,
);

let doneSanity = false;
export async function sanityCheck() {
	// if this sanity check fails, its likely because you are on a chain that
	// doesn't support Aave (e.g. Somnia)
	if (doneSanity) return Promise.resolve();
	await aaveContract.getWETHAddress().then((address) => {
		doneSanity = true;
		if (address !== wETHContractAddress) {
			console.error(
				`\n(Warning: WETH addresses differ for aave smart contract, this likely means the chain you are on doesn't support Aave)\n`,
				`Returned address:`,
				address,
				`Address we have hardcoded:`,
				wETHContractAddress,
			);
		}
	});
}

export async function deposit({
	me,
	amount,
}: {
	me: string;
	amount?: BigNumber;
}) {
	await sanityCheck();

	const data = aaveContract.interface.encodeFunctionData(
		"depositETH(address, address onBehalfOf, uint16 referralCode)",
		[poolContractAddress, me, 0],
	);

	const value =
		amount ?? parseEther(await askForInput("Deposit amount (ETH): "));
	console.log(`Depositing ${formatEther(value)} ETH from ${me}`);
	await transfer({
		recipient: aaveContract.address,
		value,
		data,
	});
}

export async function approve({ me }: { me: string }) {
	await sanityCheck();

	const balance = await aaveWETHContract.balanceOf(me);
	const data = aaveWETHContract.interface.encodeFunctionData(
		"approve(address, uint256)",
		[aaveContract.address, balance],
	);

	console.log(`approving ${formatEther(balance)} aave WETH from ${me}`);
	transfer({
		recipient: aaveWETHContract.address,
		value: BigNumber.from(0),
		data: data,
	});
}

export async function withdraw({ me }: { me: string }) {
	await sanityCheck();

	const balance = await aaveWETHContract.balanceOf(me);

	const data = aaveContract.interface.encodeFunctionData(
		"withdrawETH(address, uint256 amount, address to)",
		[poolContractAddress, balance, me],
	);

	console.log(`withdrawing ${formatEther(balance)} aave WETH from ${me}`);
	transfer({
		value: BigNumber.from(0),
		recipient: aaveContract.address,
		data,
	});
}
