import { ethers } from "ethers";
import { getFeeContract, getVaultContract, getVaultFactoryContract, createViemClient, } from "./helper/index.js";
import { loadJson, JSON_PATHS } from "../../utils/json-imports.js";
import { stringToHex, getAddress } from "viem";
const VaultJson = await loadJson(JSON_PATHS.VAULT);
const VaultFactoryJson = await loadJson(JSON_PATHS.VAULT_FACTORY);
export async function createVault(proposedAddresses, vaultName, rotateThreshold, transactionThreshold, adminThreshold, message, groupRng, signer, returnHash) {
    const provider = signer.provider;
    const chainId = await provider
        .getNetwork()
        .then((network) => network.chainId);
    let feeAmount;
    if (chainId == 4157) {
        feeAmount = await (await getFeeContract(provider)).getCreationFeeXFI();
    }
    else if (chainId == 42793) {
        feeAmount = await (await getFeeContract(provider)).getCreationFeeTezos();
    }
    else {
        feeAmount = await (await getFeeContract(provider)).getCreationFeeETH();
    }
    feeAmount = feeAmount.mul(102).div(100);
    if (proposedAddresses.length < 3) {
        console.error("Minimum of 3 participants required");
        return;
    }
    if (Math.ceil((proposedAddresses.length * transactionThreshold) / 100) ===
        proposedAddresses.length) {
        console.error("Signing threshold requirement cannot equal total participants");
        return;
    }
    let gasPrice = await provider.getFeeData();
    let finalgas = gasPrice.gasPrice || ethers.utils.parseUnits(".01", "gwei");
    const vaultFactoryContract = await getVaultFactoryContract(signer.provider);
    let client;
    if (signer.provider) {
        client = await createViemClient(provider);
    }
    else {
        client = await createViemClient(signer);
    }
    const contractAddress = vaultFactoryContract.address;
    const abi = VaultFactoryJson.abi;
    const signerAddress = await signer.getAddress();
    const estimateGas = async () => {
        try {
            const ethersEstimate = await vaultFactoryContract.estimateGas.createVault(proposedAddresses, ethers.utils.formatBytes32String(vaultName), rotateThreshold, transactionThreshold, adminThreshold, ethers.utils.formatBytes32String(message.substring(0, message.length - 1)), groupRng, { value: feeAmount });
            return BigInt(ethersEstimate.toString());
        }
        catch (error) {
            console.warn(`Viem estimation failed: ${error.message}`);
            try {
                return await client.estimateContractGas({
                    address: contractAddress.toLowerCase(),
                    abi,
                    functionName: "createVault",
                    args: [
                        proposedAddresses,
                        stringToHex(message.substring(0, message.length - 1), { size: 32 }),
                        rotateThreshold,
                        transactionThreshold,
                        adminThreshold,
                        ethers.utils.formatBytes32String(message.substring(0, message.length - 1)),
                        groupRng,
                    ],
                    account: getAddress(signerAddress),
                    value: BigInt(feeAmount.toString()),
                });
            }
            catch (ethersError) {
                console.warn(`Ethers estimation also failed: ${ethersError.message}`);
                return BigInt(3000000);
            }
        }
    };
    let gE;
    gE = await estimateGas();
    const gasLimit = (gE * BigInt(105)) / BigInt(100);
    if (returnHash) {
        const unsignedTx = await vaultFactoryContract.populateTransaction.createVault(proposedAddresses, ethers.utils.formatBytes32String(vaultName), rotateThreshold, transactionThreshold, adminThreshold, ethers.utils.formatBytes32String(message.substring(0, message.length - 1)), groupRng, {
            value: feeAmount,
            gasPrice: finalgas.mul(105).div(100),
            gasLimit,
        });
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit,
        });
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    try {
        let res = await vaultFactoryContract
            .connect(signer)
            .createVault(proposedAddresses, ethers.utils.formatBytes32String(vaultName), rotateThreshold, transactionThreshold, adminThreshold, ethers.utils.formatBytes32String(message.substring(0, message.length - 1)), groupRng, {
            value: feeAmount,
            gasPrice: finalgas.mul(105).div(100),
            gasLimit,
        });
        return res;
    }
    catch (e) {
        console.error("Error creating vault: ", e);
        return e;
    }
}
export async function preRegisterStep(vaultAddress, parisEncKey, megaPublicKey, encSharedKey, dbKey, signer, returnHash = false) {
    const provider = signer.provider;
    let gasPrice = await provider.getFeeData();
    let finalgas = gasPrice.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const connectedContract = vaultContract.connect(signer);
    const gasEstimate = await connectedContract.estimateGas.preRegister(parisEncKey, megaPublicKey, encSharedKey, dbKey);
    const gasLimit = gasEstimate.mul(105).div(100);
    if (returnHash) {
        const unsignedTx = await connectedContract.populateTransaction.preRegister(parisEncKey, megaPublicKey, encSharedKey, dbKey, {
            gasPrice: finalgas.mul(105).div(100),
            gasLimit,
        });
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit,
        });
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    return await connectedContract.preRegister(parisEncKey, megaPublicKey, encSharedKey, dbKey, {
        gasPrice: finalgas.mul(105).div(100),
        gasLimit,
    });
}
export async function registerUserAll(vaultAddress, step1Dealings, pedersenOpeningKey, pedersenOpeningKappa, pedersenOpeningLambda, simpleDealingKey, simpleDealingLambda, pedersenTranscriptKey, pedersenTranscriptKappa, pedersenTranscriptLambda, step3Crypto, signer, returnHash = false) {
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const connectedContract = vaultContract.connect(signer);
    const p = signer.provider;
    let gasPrice = await p.getFeeData();
    let finalGas = gasPrice.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const gasEstimate = await connectedContract.estimateGas.registerAllSteps(step1Dealings, pedersenOpeningKey, pedersenOpeningKappa, pedersenOpeningLambda, simpleDealingKey, simpleDealingLambda, pedersenTranscriptKey, pedersenTranscriptKappa, pedersenTranscriptLambda, step3Crypto);
    if (returnHash) {
        const unsignedTx = await connectedContract.populateTransaction.registerAllSteps(step1Dealings, pedersenOpeningKey, pedersenOpeningKappa, pedersenOpeningLambda, simpleDealingKey, simpleDealingLambda, pedersenTranscriptKey, pedersenTranscriptKappa, pedersenTranscriptLambda, step3Crypto, {
            gasPrice: finalGas.mul(105).div(100),
            gasLimit: gasEstimate.mul(110).div(100),
        });
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit: gasEstimate.mul(110).div(100),
        });
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    return await connectedContract.registerAllSteps(step1Dealings, pedersenOpeningKey, pedersenOpeningKappa, pedersenOpeningLambda, simpleDealingKey, simpleDealingLambda, pedersenTranscriptKey, pedersenTranscriptKappa, pedersenTranscriptLambda, step3Crypto, {
        gasPrice: finalGas.mul(105).div(100),
        gasLimit: gasEstimate.mul(110).div(100),
    });
}
export async function registerUserAllReshare(vaultAddress, step1Dealings, simpleOpeningKeyResharedOnce, pedersenOpeningKappaReshare, pedersenOpeningLambdaReshare, simpleDealingKeyReshareTwice, simpleDealingKappaReshareTwice, transcriptKeyResharedOnce, transcriptKappaResharedOnce, transcriptLambdaResharedOnce, step3Crypto, signer, returnHash) {
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const gasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const connectedContract = vaultContract.connect(signer);
    const gasEstimate = await connectedContract.estimateGas.registerAllReshareSteps(step1Dealings, simpleOpeningKeyResharedOnce, pedersenOpeningKappaReshare, pedersenOpeningLambdaReshare, simpleDealingKeyReshareTwice, simpleDealingKappaReshareTwice, transcriptKeyResharedOnce, transcriptKappaResharedOnce, transcriptLambdaResharedOnce, step3Crypto);
    const gasLimit = gasEstimate.mul(105).div(100);
    if (returnHash) {
        const unsignedTx = await connectedContract.populateTransaction.registerAllReshareSteps(step1Dealings, simpleOpeningKeyResharedOnce, pedersenOpeningKappaReshare, pedersenOpeningLambdaReshare, simpleDealingKeyReshareTwice, simpleDealingKappaReshareTwice, transcriptKeyResharedOnce, transcriptKappaResharedOnce, transcriptLambdaResharedOnce, step3Crypto, {
            gasPrice: gasPrice.mul(105).div(100),
            gasLimit,
        });
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit,
        });
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    return await connectedContract.registerAllReshareSteps(step1Dealings, simpleOpeningKeyResharedOnce, pedersenOpeningKappaReshare, pedersenOpeningLambdaReshare, simpleDealingKeyReshareTwice, simpleDealingKappaReshareTwice, transcriptKeyResharedOnce, transcriptKappaResharedOnce, transcriptLambdaResharedOnce, step3Crypto, {
        gasPrice: gasPrice.mul(105).div(100),
        gasLimit,
    });
}
export async function userCompleteVault(vaultAddress, userAddresses, MPK, signer, returnHash) {
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const gasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const connectedContract = vaultContract.connect(signer);
    const gasEstimate = await connectedContract.estimateGas.completeVault(userAddresses, MPK);
    const gasLimit = gasEstimate.mul(105).div(100);
    if (returnHash) {
        const unsignedTx = await connectedContract.populateTransaction.completeVault(userAddresses, MPK, {
            gasPrice: gasPrice.mul(105).div(100),
            gasLimit,
        });
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit,
        });
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    return await connectedContract.completeVault(userAddresses, MPK, {
        gasPrice: gasPrice.mul(105).div(100),
        gasLimit,
    });
}
export async function proposeTransaction(vaultAddress, abiEncodedTx, signer, notes, returnHash) {
    const provider = signer.provider;
    let transactionFee;
    const feeContract = await getFeeContract(signer.provider);
    const chainId = await provider
        .getNetwork()
        .then((network) => network.chainId);
    if (chainId === 4157) {
        transactionFee = await feeContract.getTransactionFeeXFI();
    }
    else if (chainId === 42793) {
        transactionFee = await feeContract.getTransactionFeeTezos();
    }
    else {
        transactionFee = await feeContract.getTransactionFeeETH();
    }
    let finalTransactionFee = transactionFee.mul(110).div(100);
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const finalGasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const connectedContract = vaultContract.connect(signer);
    let client;
    if (signer.provider) {
        client = await createViemClient(provider);
    }
    else {
        client = await createViemClient(signer);
    }
    const contractAddress = vaultAddress;
    const abi = VaultJson.abi;
    const signerAddress = await signer.getAddress();
    const gE = await client.estimateContractGas({
        address: contractAddress,
        abi,
        functionName: "proposeTransaction",
        args: [abiEncodedTx, notes || ""],
        account: signerAddress,
        value: transactionFee.toBigInt(),
    });
    const gasLimit = (gE * BigInt(105)) / BigInt(100);
    if (returnHash) {
        const unsignedTx = await connectedContract.populateTransaction.proposeTransaction(abiEncodedTx, notes, {
            gasPrice: finalGasPrice.mul(105).div(100),
            value: finalTransactionFee,
            gasLimit: gasLimit,
        });
        const tx = await signer.populateTransaction(unsignedTx);
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    return await connectedContract.proposeTransaction(abiEncodedTx, notes, {
        gasPrice: finalGasPrice.mul(105).div(100),
        value: finalTransactionFee,
        gasLimit: gasLimit,
    });
}
export async function userConfirmTx(vaultAddress, txId, confirmation, signer, returnHash) {
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const gasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const connectedContract = vaultContract.connect(signer);
    const gasEstimate = await connectedContract.estimateGas.userConfirmTx(txId, confirmation);
    const gasLimit = gasEstimate.mul(105).div(100);
    if (returnHash) {
        const unsignedTx = await connectedContract.populateTransaction.userConfirmTx(txId, confirmation, {
            gasPrice: gasPrice.mul(105).div(100),
            gasLimit,
        });
        const tx = await signer.populateTransaction({
            ...unsignedTx,
            gasLimit,
        });
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
    return await connectedContract.userConfirmTx(txId, confirmation, {
        gasPrice: gasPrice.mul(105).div(100),
        gasLimit,
    });
}
export async function proposeAddUserInVault(vaultAddress, userToAdd, signer) {
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const gasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, p);
    const connectedContract = vaultContract.connect(signer);
    return connectedContract.submitUserToAdd(userToAdd, { gasPrice: gasPrice });
}
export async function proposeRotateUserInVault(vaultAddress, userToAdd, userToRemove, signer) {
    const p = signer.provider;
    const gasResults = await p.getFeeData();
    const gasPrice = gasResults.gasPrice || ethers.utils.parseUnits(".1", "gwei");
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const connectedContract = vaultContract.connect(signer);
    return connectedContract.submitUsersToRotate(userToAdd, userToRemove, {
        gasPrice: gasPrice,
    });
}
export async function cancelAddUserInVault(vaultAddress, signer) {
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const connectedContract = vaultContract.connect(signer);
    return connectedContract.cancelUserToAdd();
}
export async function voteFor(vaultAddress, proposalId, signer) {
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const connectedContract = vaultContract.connect(signer);
    return connectedContract.voteFor(proposalId);
}
export async function voteAgainst(vaultAddress, proposalId, signer) {
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const connectedContract = vaultContract.connect(signer);
    return connectedContract.voteAgainst(proposalId);
}
export async function executeProposal(vaultAddress, proposalId, signer) {
    const feeValue = 1000 * 10 ** 9;
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    const connectedContract = vaultContract.connect(signer);
    return connectedContract.executeProposal(proposalId, { value: feeValue });
}
//# sourceMappingURL=signerfunctions.js.map