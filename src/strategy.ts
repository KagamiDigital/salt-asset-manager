
import { BigNumber, ContractTransaction, ethers } from "ethers";
import { askForInput } from "./helpers";
import { getVaultsWithoutTransactions, signTx, submitTransaction } from "@intuweb3/exp-node";
import { broadcasting_network_provider, signer } from "./constants";

const fijaVaultContractAddress = '0x16aca5A3889cAaF62AF2346d302D60a93F6bB0D4'; 

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

    const depositAmountInEth = '0.0001'
    const depositAmountInWei = ethers.utils.parseEther(depositAmountInEth); 

    const contractInterface = new ethers.utils.Interface(FijaVault); 
    const data = contractInterface.encodeFunctionData('deposit',[depositAmountInWei,vault.masterPublicAddress]); 
    
    const submitTransactionTx = await submitTransaction(
        fijaVaultContractAddress,
        depositAmountInEth,
        process.env.BROADCASTING_NETWORK_ID ,
        nonce,
        data,
        BigNumber.from(feeData.gasPrice).toNumber(),
        250000,
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

    const depositAmountInEth = '0.0001'
    const depositAmountInWei = ethers.utils.parseEther(depositAmountInEth); 
 
    const contractInterface = new ethers.utils.Interface(FijaVault); 
    const data = contractInterface.encodeFunctionData('withdraw',[depositAmountInWei,vault.masterPublicAddress,vault.masterPublicAddress,]); 
    
    const submitTransactionTx = await submitTransaction(
        fijaVaultContractAddress,
        0,
        process.env.BROADCASTING_NETWORK_ID ,
        nonce,
        data,
        BigNumber.from(feeData.gasPrice).toNumber(),
        250000,
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