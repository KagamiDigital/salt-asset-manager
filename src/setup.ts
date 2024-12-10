import { automateRegistration, getUserPreRegisterInfos, getUserRegistrationAllInfos, preRegistration, registerAllSteps } from "@intuweb3/exp-node";
import { ethers } from "ethers";

export const preRegisterBot = async (accountAddress:string, bot:ethers.Signer, provider: ethers.providers.JsonRpcProvider) => {
    const botAddress = await bot.getAddress(); 
    try {
        const preRegisterInfo = await getUserPreRegisterInfos(accountAddress,botAddress,provider);
     
        if(preRegisterInfo.registered) {
            console.log('The asset manager bot has already been pre-registered to this account.'); 
            return; 
        } 
        console.log('pregegister:start'); 
        const tx = await preRegistration(accountAddress, bot) as ethers.ContractTransaction
        const res = await tx.wait();
        console.log('preregister:success');
        return res;
    } catch(err) {
        console.log('pregister:failure',err); 
        return; 
    }
}

export const registerBot = async (accountAddress:string, bot:ethers.Signer,provider:ethers.providers.JsonRpcProvider) => {
    const botAddress = await bot.getAddress(); 
    try {
        const registerAllInfo = await getUserRegistrationAllInfos(accountAddress,botAddress,provider);
        
        if(registerAllInfo.registered) {
            console.log('The asset manager bot has already been registered'); 
            return; 
        }
        console.log('automaticRegistration:start'); 
        // open the nostr db connection
        await automateRegistration(accountAddress, bot,undefined, 'wss://relay.nostrdice.com', undefined); 

        console.log('automaticRegistration:success'); 

        console.log('registerAllSteps:start'); 

        const tx = await registerAllSteps(accountAddress, bot,undefined, 'wss://relay.nostrdice.com', undefined) as ethers.ContractTransaction
        const res = await tx.wait(); 

        console.log('registerAllSteps:success'); 

    } catch(err) {
        console.log('register:failure',err); 
    }
}