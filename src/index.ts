import { BigNumber, ContractTransaction, ethers } from "ethers";
import * as dotenv from 'dotenv'; 
import * as readline from 'readline'; 
import { submitTransaction, signTx, getVaultsWithoutTransactions } from "@intuweb3/exp-node";
import { preRegisterBot, registerBot } from "./setup";

dotenv.config()

const orchestration_network_provider = new ethers.providers.StaticJsonRpcProvider({url: process.env.ORCHESTRATION_NETWORK_RPC_NODE_URL || "",skipFetchSetup:true});
const broadcasting_network_provider = new ethers.providers.StaticJsonRpcProvider({url: process.env.BROADCASTING_NETWORK_RPC_NODE_URL || "",skipFetchSetup:true});

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

const ETH_SEPOLIA = process.env.BROADCASTING_NETWORK_ID; 

const signer = wallet.connect(orchestration_network_provider);

(async () => {
    const publicAddress = await signer.getAddress();
    console.log(`\n***Asset Manager ${publicAddress} connected***`); 
    // Run the main function
    let done = false; 
    while(!done) {
        const input = await askForInput('Do you wish to: \n [1] make a native currency transfer \n [2] setup the asset manager bot \n [3] exit \n'); 
        if(input === '1') {
            await main().catch((error) => {
                console.error('Error:', error);
            });
        } else if(input === '2') {
            await setup().catch((error) => {
                console.log('Error:', error); 
            })
        } else if(input === '3') {
            done = true; 
        } else {
            console.log('Please enter a valid choice'); 
            console.log('Do you wish to: \n [1] make a native currency transfer \n [2] setup the asset manager bot \n [3] exit \n');
        }
    }
    rl.close(); 
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

async function setup() {

    const vaultAddress = await askForInput(`\nPlease enter the VAULT address from which you want to add the asset manager bot to: `); 

    if(!ethers.utils.isAddress(vaultAddress)) {
        console.log('You need a valid account address to proceed.');  
        return; 
    }

    let done = false; 

    while(!done) {
        const input = await askForInput('Do you wish to: \n [1] pre-register the bot \n [2] register the bot \n [3] exit \n Please choose one of the options listed above: \n '); 
        if(input === '1') {
            await preRegisterBot(vaultAddress, signer,orchestration_network_provider); 
        } else if(input === '2') {
            await registerBot(vaultAddress, signer, orchestration_network_provider); 
        } else if(input === '3') {
            done = true; 
        } else {
            console.log('Please enter a valid choice'); 
            console.log('Do you wish to: \n [1] pre-register the bot \n [2] register the bot \n [3] exit \n Please choose one of the options listed above: \n');
        }
    }
}

// Main function to run the input logic
async function main() {

    const vaultAddress = await askForInput(`\nPlease enter the account address from where you wish to execute the transfer: `);

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

    const recipient = await askForInput(`Please enter the recipient's address: `); 

    if(!ethers.utils.isAddress(recipient)) {
        console.log('You need a valid recipient address to propose a transaction');  
        return; 
    }

    const amount = await askForInput(`Please enter the amount to transfer: `); 

    if((+amount) < 0) {
        console.log('You need a valid amount to propose a transaction');  
        return; 
    }
        
    const nonce = await broadcasting_network_provider.getTransactionCount(vault.masterPublicAddress); 

    // get the fee data on the broadcasting network
    const feeData = await broadcasting_network_provider.getFeeData();
    
    const submitTransactionTx = await submitTransaction(
        recipient,
        amount,
        ETH_SEPOLIA,
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
    console.log('recipient: '+recipient); 
    console.log('amount: '+amount);
    console.log('chainId: '+ETH_SEPOLIA); 
    console.log('nonce: '+nonce); 
    console.log('gasPrice: '+ BigNumber.from(feeData.gasPrice).toNumber()); 
    console.log('gas: 21000'); 

    const approval = await askForInput(`\nPlease confirm you want to sign the transaction, you cannot cancel the transaction after this point? [yes/no] `);

    if(approval !== 'yes') {
        console.log('transaction proposal cannot carry on without the signature'); 
        return;
    }

    const tx = await signTx(vault.vaultAddress, Number(eventData.txId), signer) as ethers.ContractTransaction
    
    await tx.wait(); 

    console.log('transaction signed successfully'); 
}