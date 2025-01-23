
import { BigNumber, ContractTransaction, ethers } from "ethers";
import { askForInput } from "./helpers";
import { getVaultsWithoutTransactions, signTx, submitTransaction } from "@intuweb3/exp-node";
import { broadcasting_network_provider, signer } from "./constants";
import WrappedTokenGatewayV3 from "../contracts/Protocol/Aave/abi/WrappedTokenGatewayV3.json"
import ERC20 from "../contracts/ERC20/abi/ERC20.json";

const aETHWETHContractAddress = '0x5b071b590a59395fE4025A0Ccc1FcC931AAc1830';
const WrappedTokenGatewayV3ContractAddress = '0x387d311e47e80b498169e6fb51d3193167d89F7D';  
const poolContractAddress = '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951'; 

export async function deposit() {
    const vaultAddress = await askForInput(`\nPlease enter the account (public key) from where you wish to execute the transfer: `);

    if(!ethers.utils.isAddress(vaultAddress)) {
        console.log('You need a valid account address to propose a transaction');  
        return; 
    }

    const managedVaults = await getVaultsWithoutTransactions(signer.address,signer.provider); 

    const vault = managedVaults.find(v => v.masterPublicAddress === vaultAddress); 

    if(!vault) {
        console.log('No Managed account found for address: '+vaultAddress); 
        return; 
    }
    const nonce = await broadcasting_network_provider.getTransactionCount(vault.masterPublicAddress); 

    // get the fee data on the broadcasting network
    const feeData = await broadcasting_network_provider.getFeeData();

    const depositAmountInEth = '0.0001' // REPLACE WITH ANY AMOUNT
    
    const contractInterface = new ethers.utils.Interface(WrappedTokenGatewayV3); 
    const data = contractInterface.encodeFunctionData('depositETH',[poolContractAddress,vault.masterPublicAddress,0]); 
    
    const submitTransactionTx = await submitTransaction(
        WrappedTokenGatewayV3ContractAddress,
        depositAmountInEth,
        process.env.BROADCASTING_NETWORK_ID,
        nonce,
        data,
        BigNumber.from(feeData.gasPrice).toNumber(),
        300000, // hardcoded because gase estimates fail on testnet aave smart contract
        vault.vaultAddress,
        signer,
        'SERVER',
        false); 
    
    const submitTransactionResult = await (submitTransactionTx as ContractTransaction).wait();
    const submitTransactionEvents = submitTransactionResult.events;
    const event = submitTransactionEvents[0];
    
    const eventData =  {
        txId: event.args[0]._hex,
        txInfo: event.args[1],
      };

    
    console.log('transaction submitted successfully',eventData.txId); 

    const approval = await askForInput(`\nPlease confirm you want to sign the transaction, you cannot cancel the transaction after this point? [yes/no] `);

    if(approval !== 'yes') {
        console.log('transaction proposal cannot carry on without the signature'); 
        return;
    }

    const tx = await signTx(vault.vaultAddress, Number(eventData.txId), signer) as ethers.ContractTransaction
    
    await tx.wait(); 

    console.log('transaction signed successfully'); 
}

export async function approve() {

    const vaultAddress = await askForInput(`\nPlease enter the account (public key) from where you wish to execute the transfer: `);

    if(!ethers.utils.isAddress(vaultAddress)) {
        console.log('You need a valid account address to propose a transaction'); 
        return; 
    }

    const managedVaults = await getVaultsWithoutTransactions(signer.address,signer.provider); 

    const vault = managedVaults.find(v => v.masterPublicAddress === vaultAddress); 

    if(!vault) {
        console.log('No account found for address: '+vaultAddress); 
        return; 
    }
    const nonce = await broadcasting_network_provider.getTransactionCount(vault.masterPublicAddress); 

    // get the fee data on the broadcasting network
    const feeData = await broadcasting_network_provider.getFeeData();

    const contractInterface = new ethers.utils.Interface(ERC20); 
    const aETHWETH = new ethers.Contract(aETHWETHContractAddress,ERC20,broadcasting_network_provider); 
    
    const balance = await aETHWETH.balanceOf(vault.masterPublicAddress); 
    const data = contractInterface.encodeFunctionData('approve',[WrappedTokenGatewayV3ContractAddress,balance]); 
    const gas = await aETHWETH.estimateGas.approve(WrappedTokenGatewayV3ContractAddress,balance); 
    
    const submitTransactionTx = await submitTransaction(
        aETHWETHContractAddress,
        0,
        process.env.BROADCASTING_NETWORK_ID,
        nonce,
        data,
        BigNumber.from(feeData.gasPrice).toNumber(),
        gas.toNumber(),
        vault.vaultAddress,
        signer,
        'SERVER',
        false); 
    
    const submitTransactionResult = await (submitTransactionTx as ContractTransaction).wait();
    const submitTransactionEvents = submitTransactionResult.events;
    const event = submitTransactionEvents[0];
    
    const eventData =  {
        txId: event.args[0]._hex,
        txInfo: event.args[1],
      };

    console.log('transaction submitted successfully',eventData.txId); 

    const approval = await askForInput(`\nPlease confirm you want to sign the transaction, you cannot cancel the transaction after this point? [yes/no] `);

    if(approval !== 'yes') {
        console.log('the transaction proposal cannot carry on without the signature'); 
        return;
    }

    const tx = await signTx(vault.vaultAddress, Number(eventData.txId), signer) as ethers.ContractTransaction
    
    await tx.wait(); 

    console.log('transaction signed successfully'); 
}

export async function withdraw() {
    const vaultAddress = await askForInput(`\nPlease enter the account (public key) from where you wish to execute the transfer: `);

    if(!ethers.utils.isAddress(vaultAddress)) {
        console.log('You need a valid account address to propose a transaction');  
        return; 
    }

    const managedVaults = await getVaultsWithoutTransactions(signer.address,signer.provider); 

    const vault = managedVaults.find(v => v.masterPublicAddress === vaultAddress); 

    if(!vault) {
        console.log('No Managed account found for address: '+vaultAddress); 
        return; 
    }
    const nonce = await broadcasting_network_provider.getTransactionCount(vault.masterPublicAddress); 

    // get the fee data on the broadcasting network
    const feeData = await broadcasting_network_provider.getFeeData();

    const aETHWETH = new ethers.Contract(aETHWETHContractAddress,ERC20,broadcasting_network_provider); 
    const balance = await aETHWETH.balanceOf(vault.masterPublicAddress); 
    
    const contractInterface = new ethers.utils.Interface(WrappedTokenGatewayV3); 
    const data = contractInterface.encodeFunctionData('withdrawETH',[poolContractAddress,balance,vault.masterPublicAddress]); 
    
    const submitTransactionTx = await submitTransaction(
        WrappedTokenGatewayV3ContractAddress,
        0,
        process.env.BROADCASTING_NETWORK_ID ,
        nonce,
        data,
        BigNumber.from(feeData.gasPrice).toNumber(),
        350000, // hardcoded because gase estimates fail on testnet aave smart contract
        vault.vaultAddress,
        signer,
        'SERVER',
        false); 
    
    const submitTransactionResult = await (submitTransactionTx as ContractTransaction).wait();
    const submitTransactionEvents = submitTransactionResult.events;
    const event = submitTransactionEvents[0];
    
    const eventData =  {
        txId: event.args[0]._hex,
        txInfo: event.args[1],
      };

    console.log('transaction submitted successfully',eventData.txId); 

    const approval = await askForInput(`\nPlease confirm you want to sign the transaction, you cannot cancel the transaction after this point? [yes/no] `);

    if(approval !== 'yes') {
        console.log('transaction proposal cannot carry on without the signature'); 
        return;
    }

    const tx = await signTx(vault.vaultAddress, Number(eventData.txId), signer) as ethers.ContractTransaction
    
    await tx.wait(); 

    console.log('transaction signed successfully'); 
}