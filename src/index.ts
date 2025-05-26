import { signer } from "./constants";
import { askForInput, printRectangle, rl } from "./helpers";
import { approve, deposit, withdraw } from "./strategy/aave/aave";
import depositDAIToSpark  from "./strategy/depositDAIToSpark/depositDAIToSpark";

import { transaction } from "./transaction";

(async () => {
    const publicAddress = await signer.getAddress();
    printRectangle(`ASSET MANAGER ${publicAddress.toUpperCase()} CONNECTED`); 
    
    let done = false; 

    while(!done) {
        const input = await askForInput('Do you wish to: \n [1] make a native currency transfer \n [2] execute a strategy \n [3] exit \n Please choose one of the options listed above: '); 
        if(input === '1') {
            await transaction().catch((error) => {
                console.error('Error:', error);
            });
        } else if(input === '2') {
            const input = await askForInput('Do you wish to: \n [1] deposit into the Aave strategy \n [2] approve funds withdrawal from the Aave strategy \n [3] withdraw from the Aave strategy \n [4] run DAI → sDAI Spark strategy \n [5] exit \n Please choose one of the options listed above: '); 

            if(input === '1') {
                await deposit().catch((error) => {
                    console.error('Error:', error);
                });
            } else if(input === '2') {
                await approve().catch((error) => {
                    console.log('Error:', error); 
                })
            } else if(input === '3') {
                await withdraw().catch((error) => {
                    console.log('Error:', error); 
                })
            } else if(input === '4') {
                await depositDAIToSpark({ signer, }).catch((error) => {
                    console.error('Error:', error);
                  });
            } else if(input === '5') {
                done = true; 
            }
             else {
                console.log('Please enter a valid choice'); 
                console.log('Do you wish to: \n [1] deposit into the Aave strategy \n [2] approve funds withdrawal from the Aave strategy \n [3] withdraw from the Aave strategy \n [4] run DAI → sDAI Spark strategy \n [5] exit \n Please choose one of the options listed above: ')
            }
        } else if(input === '3') {
            done = true; 
        } else {
            console.log('Please enter a valid choice'); 
            console.log('Do you wish to: \n [1] make a native currency transfer \n [2] setup the asset manager bot \n [3] exit \n Please choose one of the options listed above: ');
        }
    }
    rl.close(); 
})(); 