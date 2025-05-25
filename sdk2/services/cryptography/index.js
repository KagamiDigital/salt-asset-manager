import { _combineSignedTransactions, _combineSignedTransactionsWithoutLambda, _createRandomMessage, _createSeed, _decryptData, _encryptData, _formTransaction, _getMasterPublicKey, _parseTransaction, _preRegister, _registerStepOne, _registerStepThree, _registerStepTwo, _reshareCombineSignedTransactions, _reshareSignTransaction, _reshareStepByOriginalGroup, _reshareStepOneByNewUser, _reshareStepThree, _reshareStepTwo, _signTransaction, _signTransactionWithoutLambda, _getPolybaseKey, _getUniqueHash, _signMessage, _combineSignedSharesMessage, _createMessage, } from "./web_assembly/wasm_wrapper.js";
export async function createSeed() {
    return await _createSeed();
}
export async function createRandomMessage() {
    return await _createRandomMessage();
}
export async function getPolybaseKey(signature) {
    return await _getPolybaseKey(signature);
}
export async function getUniqueHashFromSignature(signature) {
    return await _getUniqueHash(signature);
}
export async function preRegister(signature) {
    return await _preRegister(signature);
}
export async function encryptData(encryptionKey, dataToEncrypt) {
    return await _encryptData(encryptionKey, dataToEncrypt);
}
export async function decryptData(encryptionSignature, dataToDecrypt) {
    return await _decryptData(encryptionSignature, dataToDecrypt);
}
export async function formTransaction(to, value, chainId, nonce, data, gasPrice, gas, decimal) {
    return await _formTransaction(to, value, chainId, nonce, data, gasPrice, gas, decimal);
}
export async function parseTransaction(txdata) {
    return await _parseTransaction(txdata);
}
export async function registerStepOne(seed, threshold, index, megaPkArray) {
    return await _registerStepOne(seed, threshold, index, megaPkArray);
}
export async function registerStepTwo(seed, threshold, index, megaPkArray, encryptionSignature, encryptedMegaSecret, dealingsKeyArray, dealingsKappaArray, dealingsLambdaArray) {
    return await _registerStepTwo(seed, threshold, index, megaPkArray, encryptionSignature, encryptedMegaSecret, dealingsKeyArray, dealingsKappaArray, dealingsLambdaArray);
}
export async function registerStepThree(seed, threshold, index, megaPkArray, encryptionSignature, encryptedMegaSecret, dealingsKeyArray, dealingsKappaArray, transcriptKeySingle, transcriptKappaSingle, pedersenOpeningLambda) {
    return await _registerStepThree(seed, threshold, index, megaPkArray, encryptionSignature, encryptedMegaSecret, dealingsKeyArray, dealingsKappaArray, transcriptKeySingle, transcriptKappaSingle, pedersenOpeningLambda);
}
export async function getMasterPublicKey(transcript_key) {
    return await _getMasterPublicKey(transcript_key);
}
export async function signTransaction(seed, threshold, index, message, encryptionSignature, encryptedMegaSecret, dealingKeyXLambdaArray, dealingKappaXLambdaArray, pedersenOpeningsLambda, simpleTranscriptKey, simpleTranscriptKappa, transcriptLambda) {
    return await _signTransaction(seed, threshold, index, message, encryptionSignature, encryptedMegaSecret, dealingKeyXLambdaArray, dealingKappaXLambdaArray, pedersenOpeningsLambda, simpleTranscriptKey, simpleTranscriptKappa, transcriptLambda);
}
export async function signTransactionWithoutLambda(seed, message, encryptionSignature, openingSimpleKey, openingSimpleKappa, simpleTranscriptKey, simpleTranscriptKappa) {
    return await _signTransactionWithoutLambda(seed, message, encryptionSignature, openingSimpleKey, openingSimpleKappa, simpleTranscriptKey, simpleTranscriptKappa);
}
export async function combineSignedTransactions(seed, threshold, message, signatureArray, transcript_key, transcript_kappa) {
    return _combineSignedTransactions(seed, threshold, message, signatureArray, transcript_key, transcript_kappa);
}
export async function combineSignedMessages(seed, threshold, message, signatureArray, transcript_key, transcript_kappa) {
    return _combineSignedSharesMessage(seed, threshold, message, signatureArray, transcript_key, transcript_kappa);
}
export async function combineSignedTransactionsWithoutLambda(seed, threshold, message, signatureArray, transcript_key, transcript_kappa) {
    return _combineSignedTransactionsWithoutLambda(seed, threshold, message, signatureArray, transcript_key, transcript_kappa);
}
export async function reshareStepByOriginalGroup(seed, threshold, index, encryptionSignature, simpleOpeningKey, newMegaPkArray) {
    return await _reshareStepByOriginalGroup(seed, threshold, index, encryptionSignature, simpleOpeningKey, newMegaPkArray);
}
export async function reshareStepOneByNewUser(seed, threshold, index, newMegaPkArray) {
    return await _reshareStepOneByNewUser(seed, threshold, index, newMegaPkArray);
}
export async function reshareStepTwo(seed, threshold_reshare, index, megaPkArray, encryptionSignature, encryptedMegaSecret, simple_dealings_key_reshared_once, simpleTranscriptKey, pedersenDealingsKappaReshare, pedersenDealingsLambdaReshare) {
    return await _reshareStepTwo(seed, threshold_reshare, index, megaPkArray, encryptionSignature, encryptedMegaSecret, simple_dealings_key_reshared_once, simpleTranscriptKey, pedersenDealingsKappaReshare, pedersenDealingsLambdaReshare);
}
export async function reshareStepThree(seed, threshold_reshare, index, megaPkArray, encryptionSignature, encryptedMegaSecret, simpleDealingsKappaReshare, pedersenOpeningLambdaReshareArray, simple_dealings_key_reshared_once_or_twice, transcript_key_simple_or_reshared_once, transcriptKappaReshare) {
    return await _reshareStepThree(seed, threshold_reshare, index, megaPkArray, encryptionSignature, encryptedMegaSecret, simpleDealingsKappaReshare, pedersenOpeningLambdaReshareArray, simple_dealings_key_reshared_once_or_twice, transcript_key_simple_or_reshared_once, transcriptKappaReshare);
}
export async function reshareSignTransaction(seed, threshold_reshare, index, message, encryptionSignature, encryptedMegaSecret, pedersenDealingsLambdaReshare, dealingsKeyXlambdaReshare, dealingsKappaXlambdaReshare, pedersenOpeningLambdaReshare, transcriptKeyResharedTwice, simpleTranscriptKappaReshare) {
    return await _reshareSignTransaction(seed, threshold_reshare, index, message, encryptionSignature, encryptedMegaSecret, pedersenDealingsLambdaReshare, dealingsKeyXlambdaReshare, dealingsKappaXlambdaReshare, pedersenOpeningLambdaReshare, transcriptKeyResharedTwice, simpleTranscriptKappaReshare);
}
export async function reshareCombineSignedTransactions(simpleTranscriptKappaReshare, transcriptKeyResharedTwice, threshold, seed, message, signatureArray) {
    return await _reshareCombineSignedTransactions(simpleTranscriptKappaReshare, transcriptKeyResharedTwice, threshold, seed, message, signatureArray);
}
export async function signMessage(seed, threshold, index, message, encryptionSignature, encryptedMegaSecret, dealingKeyXLambdaArray, dealingKappaXLambdaArray, pedersenOpeningsLambda, simpleTranscriptKey, simpleTranscriptKappa, transcriptLambda) {
    return await _signMessage(seed, threshold, index, message, encryptionSignature, encryptedMegaSecret, dealingKeyXLambdaArray, dealingKappaXLambdaArray, pedersenOpeningsLambda, simpleTranscriptKey, simpleTranscriptKappa, transcriptLambda);
}
export async function createMessage(message) {
    return await _createMessage(message);
}
//# sourceMappingURL=index.js.map