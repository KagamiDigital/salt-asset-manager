import { BigNumber, Contract, ethers } from "ethers";
import ERC20 from "../../../contracts/ERC20/abi/ERC20.json";
import WrappedTokenGatewayV3ABI from "../../../contracts/tokos.fi/WrappedTokenGatewayV3.json";
import { broadcasting_network_provider } from "../../constants";
import { formatEther } from "ethers/lib/utils";
import { transfer } from "../../transaction";

const tokosContractAddress = "0x29edCCDB3aE8CDF0ea6077cd3E682BfA6dD53f19";
const tokosContract = new ethers.Contract(
	tokosContractAddress,
	WrappedTokenGatewayV3ABI,
	broadcasting_network_provider,
);

// param1: 0x7Cb9df1bc191B16BeFF9fdEC2cd1ef91Cac18176

/**
 * Deposit native SST tokens to get aSOMIWSST tokens from the tokos pool
 *
 * Example tx: https://shannon-explorer.somnia.network/tx/0x7cf04ed6721e5e83fe08b15d328cfffa30a5b50bb83a559bb232467dfb093cc7
 */
export async function depositETH({
	me,
	amount,
}: {
	me: string;
	amount: BigNumber;
}) {
	console.log(`depositETH({ me: ${me}, amount: ${formatEther(amount)})`);

	const poolAddress = "0x7Cb9df1bc191B16BeFF9fdEC2cd1ef91Cac18176";
	const data = tokosContract.interface.encodeFunctionData(
		"depositETH(address arg0, address onBehalfOf, uint16 referralCode)",
		[poolAddress, me, 0],
	);

	transfer({
		recipient: tokosContract.address,
		data: data,
		value: amount,
	});
}

const wSSTContractAddress = "0x4A3BC48C156384f9564Fd65A53a2f3D534D8f2b7";
const wSSTContract = new ethers.Contract(
	wSSTContractAddress,
	ERC20,
	broadcasting_network_provider,
);

const aSOMIWSSTContractAddress = "0x0A197587EE751237FfBE555568d9485e467da2A3";
const aSOMIWSSTContract = new ethers.Contract(
	aSOMIWSSTContractAddress,
	ERC20,
	broadcasting_network_provider,
);

export async function getInfo({ me }: { me: string }) {
	const balance = await wSSTContract.balanceOf(me);
	console.log(`My wSST balance: ${formatEther(balance)}`);

	const tokos_balance = await aSOMIWSSTContract.balanceOf(me);
	console.log(
		`My aSOMIWSST / tokos SST balance: ${formatEther(tokos_balance)}`,
	);
}
