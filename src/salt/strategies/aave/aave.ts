/**
 * https://aave.com/docs/developers/smart-contracts/wrapped-token-gateway
 */

import { BigNumber, ethers } from "ethers";
import { askForInput } from "../../../helpers";
import { broadcasting_network_provider } from "../../../config";
import WrappedTokenGatewayV3 from "../../../../contracts/Protocols/Aave/abi/WrappedTokenGatewayV3.json";
import ERC20 from "../../../../contracts/ERC20/abi/ERC20.json";
import { sendTransaction } from "../../salt";
import { formatEther, parseEther } from "ethers/lib/utils";

// https://aave.com/docs/resources/addresses - only testnet that is supported it ethereum sepolia
// https://github.com/bgd-labs/aave-address-book/blob/main/src/AaveV3ArbitrumSepolia.sol

const aETHWETHContractAddress = "0x5b071b590a59395fE4025A0Ccc1FcC931AAc1830";
const WrappedTokenGatewayV3ContractAddress =
  "0x387d311e47e80b498169e6fb51d3193167d89F7D";
const poolContractAddress = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";

const aaveContract = new ethers.Contract(
  WrappedTokenGatewayV3ContractAddress,
  WrappedTokenGatewayV3,
  broadcasting_network_provider
);

export const aaveWETHContract = new ethers.Contract(
  aETHWETHContractAddress,
  ERC20,
  broadcasting_network_provider
);

export const ETH_SEPOLIA = 11155111;
/**
 * deposit into an Aave liquidity pool
 * @param accountAddress the address of the liquidity provider
 * @param amount the amount to deposit
 */
export async function deposit({
  accountAddress,
  amount,
}: {
  accountAddress: string;
  amount?: BigNumber;
}) {
  const data = aaveContract.interface.encodeFunctionData(
    "depositETH(address, address onBehalfOf, uint16 referralCode)",
    [poolContractAddress, accountAddress, 0]
  );

  const value =
    amount ?? parseEther(await askForInput("Deposit amount (ETH): "));

  console.log(`Depositing ${formatEther(value)} ETH from ${accountAddress}`);

  await sendTransaction({
    recipient: aaveContract.address,
    value,
    data,
  });
}

/**
 * approve LP tokens for withdrawal
 * @param accountAddress the address of the liquidity provider
 */
export async function approve({ accountAddress }: { accountAddress: string }) {
  const balance = await aaveWETHContract.balanceOf(accountAddress);
  const data = aaveWETHContract.interface.encodeFunctionData(
    "approve(address, uint256)",
    [aaveContract.address, balance]
  );

  console.log(
    `approving ${formatEther(balance)} aave WETH from ${accountAddress}`
  );

  await sendTransaction({
    recipient: aaveWETHContract.address,
    value: BigNumber.from(0),
    data: data,
  });
}

/**
 * Withdraw for equivalent of all approved LP tokens
 * @param accountAddress the address of the liquidity provider
 */
export async function withdraw({ accountAddress }: { accountAddress: string }) {
  const balance = await aaveWETHContract.balanceOf(accountAddress);

  const data = aaveContract.interface.encodeFunctionData(
    "withdrawETH(address, uint256 amount, address to)",
    [poolContractAddress, balance, accountAddress]
  );

  console.log(
    `withdrawing ${formatEther(balance)} aave WETH from ${accountAddress}`
  );
  await sendTransaction({
    value: BigNumber.from(0),
    recipient: aaveContract.address,
    data,
  });
}
