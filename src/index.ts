import { BigNumber, ContractTransaction, ethers } from "ethers";
import * as dotenv from 'dotenv'; 
import * as readline from 'readline'; 
import { submitTransaction, signTx, getVaultsWithoutTransactions } from "@intuweb3/exp-node";
import BatchSender from "../contracts/abi/BatchSender.json"

dotenv.config()

const orchestration_network_provider = new ethers.providers.StaticJsonRpcProvider({url: process.env.ORCHESTRATION_NETWORK_RPC_NODE_URL || "",skipFetchSetup:true});
const broadcasting_network_provider = new ethers.providers.StaticJsonRpcProvider({url: process.env.BROADCASTING_NETWORK_RPC_NODE_URL || "",skipFetchSetup:true});

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

const signer = wallet.connect(orchestration_network_provider);

(async () => {
    const publicAddress = await signer.getAddress();
    console.log(`\n***Asset Manager ${publicAddress} connected***`); 
    // Run the main function
    let done = false; 
    while(!done) {
        const input = await askForInput('Do you wish to make a new batch native currency transfers [yes/no]: '); 
        if(input === 'yes') {
            await mainBatch().catch((error) => {
                console.error('Error:', error);
            });
        } else if(input === 'no') {
            done = true; 
        } else {
            console.log('Please enter a valid choice'); 
            console.log('Do you wish to make a transaction [yes/no]: ');
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

// Main function to run the input logic
async function mainBatch() {

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
    const recipientArray = []
    for (let i = 0; i < 50; i++) {
        recipientArray.push(recipient); 
    }

    
    const BatchSenderContractInterface = new ethers.utils.Interface(BatchSender.abi); 
    const data = BatchSenderContractInterface.encodeFunctionData('multisendEther',[recipientArray])

    if(!ethers.utils.isAddress(recipient)) {
        console.log('You need a valid recipient address to propose a transaction');  
        return; 
    }

    const amount = 0.001; 

    if((+amount) < 0) {
        console.log('You need a valid amount to propose a transaction');  
        return; 
    }
        
    const nonce = await broadcasting_network_provider.getTransactionCount(vault.masterPublicAddress); 

    // get the fee data on the broadcasting network
    const feeData = await broadcasting_network_provider.getFeeData();

    const gas = 500000; // 7392 units of gas / transaction in the batch
    
    const submitTransactionTx = await submitTransaction(
        process.env.BATCH_SENDER_SC_ADDRESS,
        amount,
        process.env.BROADCASTING_NETWORK_ID,
        nonce,
        data,
        BigNumber.from(feeData.gasPrice).toNumber(),
        gas,
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
    console.log('amount: '+amount);
    console.log('chainId: '+process.env.BROADCASTING_NETWORK_ID); 
    console.log('nonce: '+nonce); 
    console.log('gasPrice: '+ ethers.utils.formatEther(BigNumber.from(feeData.gasPrice))); 
    console.log('gas: '+gas); 

    const approval = await askForInput(`\nPlease confirm you want to sign the transaction, you cannot cancel the transaction after this point? [yes/no] `);

    if(approval !== 'yes') {
        console.log('transaction proposal cannot carry on without the signature'); 
        return;
    }

    const tx = await signTx(vault.vaultAddress, Number(eventData.txId), signer) as ethers.ContractTransaction
    
    await tx.wait(); 

    console.log('transaction signed successfully');

    console.log(`visit https://sepolia.arbiscan.io/address/${vault.vaultAddress} to follow along the orchestration in real time`); 
}