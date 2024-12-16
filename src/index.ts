import { signer } from "./constants";
import { askForInput, printRectangle, rl } from "./helpers";
import { setup } from "./setup";
import { transaction } from "./transaction";

(async () => {
    const publicAddress = await signer.getAddress();
    printRectangle(`ASSET MANAGER ${publicAddress.toUpperCase()} CONNECTED`); 
    
    let done = false; 

    while(!done) {
        const input = await askForInput('Do you wish to: \n [1] make a native currency transfer \n [2] setup the asset manager bot \n [3] exit \n Please choose one of the options listed above: '); 
        if(input === '1') {
            await transaction().catch((error) => {
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
            console.log('Do you wish to: \n [1] make a native currency transfer \n [2] setup the asset manager bot \n [3] exit \n Please choose one of the options listed above: ');
        }
    }
    rl.close(); 
})(); 