import { Proposal, Transaction } from "../types/index.js";
export interface Vault {
    vaultAddress: string;
    name: string;
    rotateThreshold: number;
    transactionThreshold: number;
    adminThreshold: number;
    createdDate: number;
    birthBlock: number;
    users: VaultUser[];
    proposalCount: number;
    transactionCount: number;
    masterPublicAddress?: string;
    dbAddress?: string;
}
export interface VaultUser {
    address: string;
    isRegistered: boolean;
}
export interface VaultEventInfo {
    name: string;
    encryptionMessage: string;
    groupRng: string;
    dbAddress: string;
    birthBlock: number;
}
export interface PreRegistrationStep {
    user: string;
    registered: boolean;
    parisEncKey: string;
    megaPublicKey: string;
    encMegaSecretKey: string;
    dbKey: string;
}
export interface RegistrationStep1 {
    user: string;
    registered: boolean;
    pedersenDealingKey: string;
    pedersenDealingKappa: string;
    pedersenDealingLambda: string;
}
export interface RegistrationStep2 {
    user: string;
    registered: boolean;
    pedersenOpeningKey: string;
    pedersenOpeningKappa: string;
    pedersenOpeningLambda: string;
    simpleDealingKey: string;
    simpleDealingKappa: string;
    pedersenTranscriptKey: string;
    pedersenTranscriptKappa: string;
    pedersenTranscriptLambda: string;
}
export interface RegistrationStep3 {
    user: string;
    registered: boolean;
    simpleOpeningKey: string;
    simpleOpeningKappa: string;
    dealingKeyXLambda: string;
    dealingKappaXLambda: string;
    simpleTranscriptKey: string;
    simpleTranscriptKappa: string;
}
export interface RegistrationAll {
    user: string;
    registered: boolean;
    step1Dealings: string;
    pedersenOpeningKey?: string;
    pedersenOpeningKappa?: string;
    pedersenOpeningLambda?: string;
    simpleDealingKey?: string;
    simpleDealingKappa?: string;
    pedersenTranscriptKey?: string;
    pedersenTranscriptKappa?: string;
    pedersenTranscriptLambda?: string;
    pedersenOpeningLambdaReshare?: string;
    simpleOpeningKeyResharedOnce?: string;
    pedersenOpeningKappaReshare?: string;
    simpleDealingKeyReshareTwice?: string;
    simpleDealingKappaReshareTwice?: string;
    transcriptKeyResharedOnce?: string;
    transcriptKappaResharedOnce?: string;
    transcriptLambdaResharedOnce?: string;
    step3Crypto: string;
}
export interface RegistrationAllUsers {
    user: string[];
    registered: boolean[];
    step1Dealings: string[];
    pedersenOpeningKey?: string[];
    pedersenOpeningKappa?: string[];
    pedersenOpeningLambda?: string[];
    simpleDealingKey?: string[];
    simpleDealingKappa?: string[];
    pedersenTranscriptKey?: string[];
    pedersenTranscriptKappa?: string[];
    pedersenTranscriptLambda?: string[];
    pedersenOpeningLambdaReshare?: string[];
    simpleOpeningKeyResharedOnce?: string[];
    pedersenOpeningKappaReshare?: string[];
    simpleDealingKeyReshareTwice?: string[];
    simpleDealingKappaReshareTwice?: string[];
    transcriptKeyResharedOnce?: string[];
    transcriptKappaResharedOnce?: string[];
    transcriptLambdaResharedOnce?: string[];
    step3Crypto: string[];
}
export interface ReshareStep1 {
    user: string;
    registered: boolean;
    simpleDealingsKeyResharedOnce: string;
    pedersenDealingsKappaReshare: string;
    pedersenDealingsLambdaReshare: string;
}
export interface ReshareStep2 {
    user: string;
    registered: boolean;
    simpleOpeningsKeyResharedOnce: string;
    pedersenOpeningKappaReshare: string;
    pedersenOpeningLambdaReshare: string;
    simpleDealingsKeyResharedTwice: string;
    simpleDealingsKappaReshare: string;
    transcriptKeyResharedOnce: string;
    transcriptKappaReshare: string;
    transcriptLambdaReshare: string;
}
export interface ReshareStep3 {
    user: string;
    registered: boolean;
    simpleOpeningsKeyResharedTwice: string;
    simpleOpeningsKappaReshare: string;
    dealingsKeyXLambdaReshare: string;
    dealingsKappaXLambdaReshare: string;
    transcriptKeyResharedTwice: string;
    simpleTranscriptKappaReshare: string;
}
export declare enum STEP {
    PREREGISTRATION = "PREREGISTRATION",
    STEP1 = "STEP1",
    STEP2 = "STEP2",
    STEP3 = "STEP3",
    DONE = "DONE"
}
export interface VaultUserPreRegisterEventArgs {
    user: `0x${string}`;
    _parisEncKey: `0x${string}`;
    _megaPublicKey: `0x${string}`;
    _encSharedKey: `0x${string}`;
    _dbKey: `0x${string}`;
}
export interface VaultInfos {
    users: string[];
    createdBlock: number;
    resharingOccurred: boolean;
}
export interface VaultAllInfo extends Vault {
    proposals: Proposal[];
    transactions: Transaction[];
}
