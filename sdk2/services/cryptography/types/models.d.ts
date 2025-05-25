export interface KeygenRequest {
    participants: string[];
    threshold: number;
    encryptionkeys: string[];
}
export interface EncryptResponse {
    encryptedData: string;
}
export interface DecryptResponse {
    decryptedData: string;
}
export interface KeygenResponse {
    encryptedShares: string[];
    masterPublicKey: string;
}
export interface FormTxRequest {
    to: string;
    value: string;
    nonce: any;
    chainid: number;
    data: string;
}
export interface FormTxResponse {
    emptyTx: string;
}
export interface RandomMessageResponse {
    message: string;
}
export interface PolybaseKeyResponse {
    key: string;
}
export interface PreRegisterResponse {
    encryptionKey: string;
    megaPublicKey: string;
    encMegaSecretKey: string;
}
export interface RegisterStepOneResponse {
    pedersenDealingArray: string[];
}
export interface ReshareRegisterStepOneResponse {
    reshareSimpleDealing: string;
}
export interface RegisterStepTwoResponse {
    pedersenOpeningArray: string[];
    simpleDealingArray: string[];
    pedersenTranscriptArray: string[];
}
export interface RegisterStepThreeResponse {
    simpleOpeningArray: string[];
    multiplyDealingArray: string[];
    simpleTranscriptArray: string[];
}
export interface SignTransactionResponse {
    signedTransaction: string;
}
export interface CombineTransactionsResponse {
    finalSignedTransaction: string;
}
export interface SeedResponse {
    seed: string;
}
export interface SignTxRequest {
    signaturekey: string;
    userconfig: string;
    transaction: string;
}
export interface SignTxResponse {
    signedTxForStorage: string;
}
export interface ParseTransactionRequest {
    txData: string;
}
export interface ParseTransactionResponse {
    to: string;
    value: string;
    chainId: string;
    nonce: string;
    gas: string;
    gasPrice: string;
    data: string;
}
export interface CombineSignaturesRequest {
    userconfig: string;
    signaturekey: string;
    signedtransactions: string[];
    transaction: string;
}
export interface CombineSignaturesResponse {
    combinedSignature: string;
}
