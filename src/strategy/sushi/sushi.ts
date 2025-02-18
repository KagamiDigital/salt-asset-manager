import { BigNumber, ContractTransaction, ethers } from "ethers";
import { askForInput } from "../../helpers";
import { getVaultsWithoutTransactions, signTx, submitTransaction } from "@intuweb3/exp-node";
import { broadcasting_network_provider, signer } from "../../constants";
import ERC20 from "../../../contracts/ERC20/abi/ERC20.json";

// SushiSwap Router Contract Address (Sepolia Testnet)
const sushiSwapRouterAddress = '0xeaBcE3E74EF41FB40024a21Cc2ee2F5dDc615791';

// Replace with the ERC-20 token you want to trade on SushiSwap
const tokenAddress = '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9'; // 🔴 Replace this with actual token contract address

// SushiSwap Router ABI (Only necessary functions)
const sushiSwapRouterABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "token", "type": "address" },
            { "internalType": "uint256", "name": "amountTokenDesired", "type": "uint256" },
            { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" },
            { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "deadline", "type": "uint256" }
        ],
        "name": "addLiquidityETH",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "token", "type": "address" },
            { "internalType": "uint256", "name": "liquidity", "type": "uint256" },
            { "internalType": "uint256", "name": "amountTokenMin", "type": "uint256" },
            { "internalType": "uint256", "name": "amountETHMin", "type": "uint256" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "deadline", "type": "uint256" }
        ],
        "name": "removeLiquidityETH",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export async function deposit() {
    const vaultAddress = await askForInput(`\nEnter wallet address to deposit ETH & Token into SushiSwap: `);

    if (!ethers.utils.isAddress(vaultAddress)) {
        console.log('Invalid wallet address.');
        return;
    }

    const managedVaults = await getVaultsWithoutTransactions(signer.address, signer.provider);
    const vault = managedVaults.find(v => v.masterPublicAddress === vaultAddress);

    if (!vault) {
        console.log('No managed account found for: ' + vaultAddress);
        return;
    }

    const nonce = await broadcasting_network_provider.getTransactionCount(vault.masterPublicAddress);
    const feeData = await broadcasting_network_provider.getFeeData();
    const depositAmountInEth = ethers.utils.parseEther('0.0001');
    const amountTokenDesired = ethers.utils.parseUnits('0.01', 18);
    const amountTokenMin = ethers.utils.parseUnits('0', 18);
    const amountETHMin = ethers.utils.parseEther('0');
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

    const contract = new ethers.utils.Interface(sushiSwapRouterABI);
    const data = contract.encodeFunctionData('addLiquidityETH', [
        tokenAddress,
        amountTokenDesired,
        amountTokenMin,
        amountETHMin,
        vault.masterPublicAddress,
        deadline
    ]);

    const submitTransactionTx = await submitTransaction(
        sushiSwapRouterAddress,
        depositAmountInEth.toString(),
        process.env.BROADCASTING_NETWORK_ID,
        nonce,
        data,
        BigNumber.from(feeData.gasPrice).toNumber(),
        300000,
        vault.vaultAddress,
        signer,
        'SERVER',
        false
    );

    const submitTransactionResult = await (submitTransactionTx as ContractTransaction).wait();
    console.log('Deposit transaction submitted:', submitTransactionResult.transactionHash);
}

export async function approve() {
    const vaultAddress = await askForInput(`\nEnter wallet address to approve SushiSwap Router: `);

    if (!ethers.utils.isAddress(vaultAddress)) {
        console.log('Invalid wallet address.');
        return;
    }

    const managedVaults = await getVaultsWithoutTransactions(signer.address, signer.provider);
    const vault = managedVaults.find(v => v.masterPublicAddress === vaultAddress);

    if (!vault) {
        console.log('No managed account found for: ' + vaultAddress);
        return;
    }

    const nonce = await broadcasting_network_provider.getTransactionCount(vault.masterPublicAddress);
    const feeData = await broadcasting_network_provider.getFeeData();

    const tokenContract = new ethers.Contract(tokenAddress, ERC20, broadcasting_network_provider);
    const balance = await tokenContract.balanceOf(vault.masterPublicAddress);

    const contractInterface = new ethers.utils.Interface(ERC20);
    const data = contractInterface.encodeFunctionData('approve', [sushiSwapRouterAddress, balance]);

    const gas = await tokenContract.estimateGas.approve(sushiSwapRouterAddress, balance);

    const submitTransactionTx = await submitTransaction(
        tokenAddress,
        0,
        process.env.BROADCASTING_NETWORK_ID,
        nonce,
        data,
        BigNumber.from(feeData.gasPrice).toNumber(),
        gas.toNumber(),
        vault.vaultAddress,
        signer,
        'SERVER',
        false
    );

    const submitTransactionResult = await (submitTransactionTx as ContractTransaction).wait();
    console.log('Approval transaction submitted:', submitTransactionResult.transactionHash);
}

export async function withdraw() {
    const vaultAddress = await askForInput(`\nEnter wallet address to withdraw liquidity from SushiSwap: `);

    if (!ethers.utils.isAddress(vaultAddress)) {
        console.log('Invalid wallet address.');
        return;
    }

    const managedVaults = await getVaultsWithoutTransactions(signer.address, signer.provider);
    const vault = managedVaults.find(v => v.masterPublicAddress === vaultAddress);

    if (!vault) {
        console.log('No managed account found for: ' + vaultAddress);
        return;
    }

    const nonce = await broadcasting_network_provider.getTransactionCount(vault.masterPublicAddress);
    const feeData = await broadcasting_network_provider.getFeeData();

    const lpTokenAddress = '0xYourLPTokenAddress'; // 🔴 Replace with the correct LP token address
    const lpTokenContract = new ethers.Contract(lpTokenAddress, ERC20, broadcasting_network_provider);
    const balance = await lpTokenContract.balanceOf(vault.masterPublicAddress);

    const contractInterface = new ethers.utils.Interface(sushiSwapRouterABI);
    const data = contractInterface.encodeFunctionData('removeLiquidityETH', [
        tokenAddress,
        balance,
        0,
        0,
        vault.masterPublicAddress,
        Math.floor(Date.now() / 1000) + 60 * 10
    ]);

    const submitTransactionTx = await submitTransaction(
        sushiSwapRouterAddress,
        0,
        process.env.BROADCASTING_NETWORK_ID,
        nonce,
        data,
        BigNumber.from(feeData.gasPrice).toNumber(),
        350000,
        vault.vaultAddress,
        signer,
        'SERVER',
        false
    );

    const submitTransactionResult = await (submitTransactionTx as ContractTransaction).wait();
    console.log('Withdraw transaction submitted:', submitTransactionResult.transactionHash);
}
