
import express from "express";
import { BigNumber, ContractTransaction, ethers } from "ethers";
import * as dotenv from 'dotenv'; 
import * as readline from 'readline'; 
import { submitTransaction, signTx, getVaults } from "@intuweb3/exp-node";

dotenv.config()

const provider = new ethers.providers.StaticJsonRpcProvider({url: process.env.RPC_NODE_URL || "",skipFetchSetup:true});
const sepoliaProvider = new ethers.providers.StaticJsonRpcProvider({url: process.env.SEPOLIA_NODE_URL || "",skipFetchSetup:true});
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

const signer = wallet.connect(provider);

(async () => {
    const publicAddress = await signer.getAddress();
    console.log(`\n***Asset Manager ${publicAddress} connected***`); 

    // Run the main function
main().catch((error) => {
    console.error('Error:', error);
});
})(); 

// Create an interface for reading input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to ask a question and return a promise with the answer
function askForInput(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// Main function to run the input logic
async function main() {
    const newTx = await askForInput('\nPropose a new transaction? [yes/no] ');

    if(newTx !== 'yes') {
        rl.close();
        return;  
    }

    const vaultAddress = await askForInput(`\nPlease enter the account address from where you wish to execute the transfer: `);

    if(!ethers.utils.isAddress(vaultAddress)) {
        console.log('You need a valid account address to propose a transaction'); 
        rl.close(); 
        return; 
    }

    const managedVaults = await getVaults(signer.address,signer.provider); 

    const vault = managedVaults.find(v => v.masterPublicAddress === vaultAddress); 

    if(!vault) {
        console.log('No Managed account found for address: '+vaultAddress); 
        rl.close(); 
        return; 
    }
    const nonce = await sepoliaProvider.getTransactionCount(vault.masterPublicAddress); 

    console.log(nonce); 

    // get the fee data on the broadcasting network
    const feeData = await sepoliaProvider.getFeeData();
    
    const submitTransactionTx = await submitTransaction(
        '0x447603546Ee18245d1640Aaa5150eB3A328256EF',
        '0.00001',
        '11155111',
        nonce,
        '',
        BigNumber.from(feeData.gasPrice).toNumber(),
        21000,
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

    console.log('Please review the transaction details:'); 
    console.log('recipient: 0x447603546Ee18245d1640Aaa5150eB3A328256EF'); 
    console.log('amount: 00001 SEPOLIA ETH');
    console.log('chainId: 11155111'); 
    console.log('nonce: '+nonce); 
    console.log('gasPrice: '+ BigNumber.from(feeData.gasPrice).toNumber()); 
    console.log('gas: 21000'); 

    const approval = await askForInput(`\nPlease confirm you want to sign the transaction, you cannot cancel the transaction after this point? [yes/no] `);

    if(approval !== 'yes') {
        console.log('transaction proposal cannot carry on without the signature'); 
        rl.close(); 
        return;
    }

    const tx = await signTx(vault.vaultAddress, Number(eventData.txId), signer) as ethers.ContractTransaction
    
    await tx.wait(); 

    console.log('transaction signed successfully'); 

    rl.close();
}