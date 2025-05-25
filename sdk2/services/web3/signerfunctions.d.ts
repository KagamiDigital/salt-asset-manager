import { ethers, Signer } from "ethers";
import { PromiseOrValue } from "./types/index.js";
export declare function createVault(proposedAddresses: any[], vaultName: string, rotateThreshold: number, transactionThreshold: number, adminThreshold: number, message: string, groupRng: string, signer: Signer, returnHash: boolean): Promise<unknown>;
export declare function preRegisterStep(vaultAddress: string, parisEncKey: string, megaPublicKey: string, encSharedKey: string, dbKey: string, signer: Signer, returnHash?: boolean): Promise<string | ethers.ContractTransaction>;
export declare function registerUserAll(vaultAddress: string, step1Dealings: string, pedersenOpeningKey: string, pedersenOpeningKappa: string, pedersenOpeningLambda: string, simpleDealingKey: string, simpleDealingLambda: string, pedersenTranscriptKey: string, pedersenTranscriptKappa: string, pedersenTranscriptLambda: string, step3Crypto: string, signer: Signer, returnHash?: boolean): Promise<string | ethers.ContractTransaction>;
export declare function registerUserAllReshare(vaultAddress: string, step1Dealings: string, simpleOpeningKeyResharedOnce: string, pedersenOpeningKappaReshare: string, pedersenOpeningLambdaReshare: string, simpleDealingKeyReshareTwice: string, simpleDealingKappaReshareTwice: string, transcriptKeyResharedOnce: string, transcriptKappaResharedOnce: string, transcriptLambdaResharedOnce: string, step3Crypto: string, signer: Signer, returnHash: boolean): Promise<string | ethers.ContractTransaction>;
export declare function userCompleteVault(vaultAddress: string, userAddresses: [
    PromiseOrValue<string>,
    PromiseOrValue<string>,
    PromiseOrValue<string>
], MPK: string, signer: Signer, returnHash: boolean): Promise<string | ethers.ContractTransaction>;
export declare function proposeTransaction(vaultAddress: string, abiEncodedTx: string, signer: Signer, notes: string, returnHash: boolean): Promise<string | ethers.ContractTransaction>;
export declare function userConfirmTx(vaultAddress: string, txId: number, confirmation: string, signer: Signer, returnHash: boolean): Promise<string | ethers.ContractTransaction>;
export declare function proposeAddUserInVault(vaultAddress: string, userToAdd: string[], signer: Signer): Promise<ethers.ContractTransaction>;
export declare function proposeRotateUserInVault(vaultAddress: string, userToAdd: string, userToRemove: string, signer: Signer): Promise<ethers.ContractTransaction>;
export declare function cancelAddUserInVault(vaultAddress: string, signer: Signer): Promise<ethers.ContractTransaction>;
export declare function voteFor(vaultAddress: string, proposalId: number, signer: Signer): Promise<ethers.ContractTransaction>;
export declare function voteAgainst(vaultAddress: string, proposalId: number, signer: Signer): Promise<ethers.ContractTransaction>;
export declare function executeProposal(vaultAddress: string, proposalId: number, signer: Signer): Promise<ethers.ContractTransaction>;
