import { signMessage, combineSignedMessages, createMessage, } from "../cryptography/index.js";
import { getUserSignature, getUtilsParams, getUserRegistrationAllInfos, getRegistrationStep3InfosDB, } from "./utils.js";
import { getVaultContract } from "./helper/index.js";
import { Keypair, Connection, PublicKey, Transaction, SystemProgram, } from "@solana/web3.js";
import { sha256 } from "@noble/hashes/sha256";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { submitTransactionSolana, getTransaction } from "../index.js";
import { userConfirmTx } from "./signerfunctions.js";
import { loadJson, JSON_PATHS } from "../../utils/json-imports.js";
import { hexToString, encodeStringToHex } from "./helper/index.js";
const idl = (await loadJson(JSON_PATHS.IDL));
export async function submitSolanaMessage(recipient, amountInLamports, vaultAddress, signer, notes = "n/a", returnHash = false) {
    try {
        if (!recipient || !recipient.trim()) {
            throw new Error("Recipient address is required");
        }
        if (typeof amountInLamports === "string") {
            amountInLamports = parseInt(amountInLamports, 10);
        }
        if (amountInLamports < 0) {
            throw new Error("Amount must be a positive number");
        }
        if (!vaultAddress) {
            throw new Error("Vault address is required");
        }
        const message = `${recipient}|${amountInLamports}`;
        const finalMessage = await encodeStringToHex(message);
        const response = await submitTransactionSolana(finalMessage, vaultAddress, signer, notes);
        return response;
    }
    catch (error) {
        console.error("Error submitting Solana message:", error);
    }
}
export async function signSolanaMessage(vaultAddress, txId, signer, intuSignature, experimental, returnHash) {
    try {
        const userAddress = await signer.getAddress();
        let signature = "";
        let rh = returnHash || false;
        intuSignature
            ? (signature = intuSignature)
            : (signature = await getUserSignature(vaultAddress, signer));
        const vc = await getVaultContract(vaultAddress, signer.provider);
        const { users, resharingOccurred } = await vc.vaultInfos();
        const userIndex = users.findIndex((address) => userAddress == address);
        if (userIndex === -1) {
            throw new Error(`User ${userAddress} not found in vault ${vaultAddress}`);
        }
        const utilsParams = await getUtilsParams(vaultAddress, userAddress, signer.provider);
        const { seed, threshold, index, megaPkArray, encMegaSecretKey } = utilsParams;
        const thresholdCount = Math.ceil((megaPkArray.length * threshold) / 100);
        const userEncMegaSecretKey = encMegaSecretKey[userIndex];
        const normalizedTxId = typeof txId === "bigint"
            ? Number(txId)
            : typeof txId === "string"
                ? parseInt(txId, 10)
                : txId;
        const tx = await getTransaction(vaultAddress, normalizedTxId, signer.provider);
        if (!tx) {
            throw new Error(`Transaction not found: ${vaultAddress} ${normalizedTxId}`);
        }
        const message = hexToString(tx.data);
        const finalMessage = await createMessage(message);
        const alluserRegInfo = await getUserRegistrationAllInfos(vaultAddress, signer.provider);
        const myRegInfo = alluserRegInfo[userIndex];
        if (!alluserRegInfo || myRegInfo.step3Crypto === "") {
            throw new Error("Registration step3Crypto data not found");
        }
        const step3Result = JSON.parse(atob(myRegInfo.step3Crypto));
        const { dealingKeyXLambdaArray, dealingKappaXLambdaArray } = await getRegistrationStep3InfosDB(vaultAddress, signer.provider);
        const signatureResult = await signMessage(seed, thresholdCount, index, finalMessage, signature, userEncMegaSecretKey, dealingKeyXLambdaArray, dealingKappaXLambdaArray, myRegInfo.pedersenOpeningLambda || "", step3Result[4], step3Result[5], myRegInfo.pedersenTranscriptLambda || "");
        return await userConfirmTx(vaultAddress, normalizedTxId, signatureResult.signedTransaction, signer, rh);
    }
    catch (error) {
        console.error("Error signing Solana message:", error);
    }
}
export async function sendSolanaTransaction(pdaInfo, recipient, amount, signature, vaultEthAddress, networkUrl = "https://api.devnet.solana.com") {
    try {
        let recipientAddress;
        try {
            recipientAddress = new PublicKey(recipient);
        }
        catch (err) {
            throw new Error("Invalid recipient Solana address");
        }
        const message = `${recipient}|${amount}`;
        const sendResult = await pdaInfo.program.methods
            .sendFromPdaWithSignatureValidationNew(message, signature, vaultEthAddress)
            .accounts({
            pdaAccount: pdaInfo.pdaPublicKey,
            recipient: recipientAddress,
            systemProgram: SystemProgram.programId,
        })
            .rpc();
        const connection = new Connection(networkUrl, { commitment: "confirmed" });
        const confirmation = await connection.confirmTransaction(sendResult);
        return {
            signature: sendResult,
            confirmed: confirmation.value.err === null,
            message,
        };
    }
    catch (error) {
        console.error("Error sending Solana transaction:", error);
    }
}
export const generateSolanaWallet = (uniqueness) => {
    try {
        const hash = sha256.create().update(uniqueness).digest();
        if (hash.length !== 32) {
            throw new Error("Seed must be exactly 32 bytes");
        }
        const keypair = Keypair.fromSeed(hash);
        const walletAddress = keypair.publicKey.toBase58();
        return { keypair, walletAddress };
    }
    catch (err) {
        console.error("Error generating wallet:", err);
        throw new Error("Failed to generate Solana wallet");
    }
};
export const createPda = async (solanaWallet, masterPublicKey, networkUrl = "https://api.devnet.solana.com") => {
    try {
        let seed1, seed2;
        if (masterPublicKey) {
            const address = masterPublicKey.startsWith("0x")
                ? masterPublicKey.slice(2)
                : masterPublicKey;
            seed1 = address.slice(0, address.length / 2);
            seed2 = address.slice(address.length / 2);
        }
        else {
            const walletAddress = solanaWallet.walletAddress;
            seed1 = walletAddress.slice(0, walletAddress.length / 2);
            seed2 = walletAddress.slice(walletAddress.length / 2);
        }
        const connection = new Connection(networkUrl, {
            commitment: "confirmed",
        });
        const provider = new AnchorProvider(connection, {
            publicKey: solanaWallet.keypair.publicKey,
            signTransaction: async (tx) => {
                if (tx instanceof Transaction) {
                    tx.sign(solanaWallet.keypair);
                }
                return tx;
            },
            signAllTransactions: async (txs) => {
                return txs.map((tx) => {
                    if (tx instanceof Transaction) {
                        tx.sign(solanaWallet.keypair);
                    }
                    return tx;
                });
            },
        }, { commitment: "confirmed" });
        const program = new Program(idl, provider);
        const [pdaPublicKey] = await PublicKey.findProgramAddressSync([Buffer.from(seed1), Buffer.from(seed2)], program.programId);
        return {
            pdaPublicKey,
            program,
            provider,
            seeds: { seed1, seed2 },
        };
    }
    catch (error) {
        console.error("Error creating PDA:", error);
    }
};
export const sendFromPda = async (pdaInfo, amount, recipient, eoa, message, signature) => {
    try {
        await pdaInfo.program.methods
            .sendFromPdaWithSignatureValidationNew(amount, eoa, message, signature)
            .accounts({
            pdaAccount: pdaInfo.pdaPublicKey,
            recipient: recipient,
            systemProgram: SystemProgram.programId,
        })
            .rpc();
        return {
            success: true,
            message: "Funds sent successfully",
            amount,
            recipient: recipient,
        };
    }
    catch (err) {
        console.error("Error sending from PDA:", err);
        throw new Error("Failed to send funds from PDA");
    }
};
export const formatWalletAddress = (address) => {
    if (!address || address.length < 10)
        return address;
    return `${address.slice(0, 5)}......${address.slice(-5)}`;
};
export async function combineSignedSolanaMessage(vaultAddress, txId, signer) {
    const userAddress = await signer.getAddress();
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    let seed;
    let threshold;
    let megaPkArray;
    let tx;
    let step3Data;
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    let { users } = await vaultContract.vaultInfos();
    const userIndex = users.findIndex((address) => userAddress == address);
    if (!seed || !threshold || !megaPkArray) {
        const utilsParams = await getUtilsParams(vaultAddress, userAddress, signer.provider);
        seed = utilsParams.seed;
        threshold = utilsParams.threshold;
        megaPkArray = utilsParams.megaPkArray;
    }
    if (!step3Data) {
        const alluserRegInfo = await getUserRegistrationAllInfos(vaultAddress, signer.provider);
        let myRegInfo = null;
        for (const regInfo of alluserRegInfo) {
            if (regInfo &&
                regInfo.user &&
                regInfo.user.toLowerCase() === userAddress.toLowerCase()) {
                myRegInfo = regInfo;
                break;
            }
        }
        step3Data = myRegInfo.step3Crypto;
    }
    let step3Result = JSON.parse(atob(step3Data));
    let true_threshold = Math.ceil((megaPkArray.length * threshold) / 100);
    let attempts = 0;
    let signedMessages = new Array(users.length).fill("");
    let message;
    let combinedInputMessage;
    while (signedMessages.filter((msg) => msg !== "").length < true_threshold &&
        attempts < 10) {
        console.log("attempts : " + attempts);
        attempts++;
        txId = typeof txId === "bigint" ? Number(txId) : txId;
        tx = await getTransaction(vaultAddress, txId, signer.provider);
        message = hexToString(tx.data);
        combinedInputMessage = await createMessage(message);
        let signedMessagesObject = tx.userSignedTransactions;
        signedMessagesObject.forEach((msg) => {
            const userIndex = users.findIndex((user) => user.toLowerCase() === msg.user.toLowerCase());
            if (userIndex !== -1) {
                signedMessages[userIndex] = msg.signedTransaction;
            }
            else {
                signedMessages.push("");
            }
        });
        await sleep(1000);
    }
    if (signedMessages.length < 2) {
        throw new Error("Hmm, one of the signing nodes failed to do it's job, sorry about that, please try again!");
    }
    if (!message) {
        throw new Error("Message not found");
    }
    const validSignatures = signedMessages.filter((msg) => msg !== "");
    if (validSignatures.length > 1 && message) {
        console.log(validSignatures);
        const combinedMessage = await combineSignedMessages(seed, true_threshold, combinedInputMessage || "", validSignatures, step3Result[4], step3Result[5]);
        return combinedMessage.finalSignedTransaction;
    }
}
//# sourceMappingURL=solana.js.map