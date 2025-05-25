import { create_js_seed, pre_register, form_transaction, create_random_message, encrypt_data, decrypt_data, compute_pedersen_dealing, compute_pedersen_opening, compute_simple_dealing, compute_simple_opening, compute_multiply_dealing, compute_multiply_opening, user_sign_message, user_sign_message_without_lambda, combine_signed_shares, combine_signed_shares_without_lambda, combine_signed_shares_message, parse_transaction, compute_simple_dealing_reshare, generate_master_public_key_and_address, compute_simple_opening_reshare_once_or_twice, compute_multiply_opening_reshare, user_sign_message_reshare, combine_signed_shares_reshare, get_polybase_key, get_unique_hash, user_sign_msg, message, } from "./intu_crypto.mjs";
export async function _createSeed() {
    let seed_result = await create_js_seed();
    return { seed: seed_result };
}
export async function _createMessage(m) {
    let convertedMessage = await message(m);
    return convertedMessage;
}
export async function _createRandomMessage() {
    let randomMessage = await create_random_message();
    return { message: randomMessage };
}
export async function _getPolybaseKey(signature) {
    let pbk = await get_polybase_key(signature);
    return { key: pbk };
}
export async function _getUniqueHash(signature) {
    let did = await get_unique_hash(signature, 0);
    return { key: did };
}
export async function _preRegister(signature) {
    let pre_reg = pre_register(signature);
    return {
        encryptionKey: pre_reg[0],
        megaPublicKey: pre_reg[1],
        encMegaSecretKey: pre_reg[2],
    };
}
export async function _encryptData(encryptionKey, dataToEncrypt) {
    return await encrypt_data(encryptionKey, dataToEncrypt);
}
export async function _decryptData(encryptionSignature, dataToDecrypt) {
    return await decrypt_data(encryptionSignature, dataToDecrypt, 0);
}
export async function _formTransaction(to, value, chainId, nonce, data, gasPrice, gas, decimal) {
    return await form_transaction(to, value, chainId, nonce, data, gasPrice, gas, decimal);
}
export async function _parseTransaction(txdata) {
    let parsedTransaction = await parse_transaction(txdata);
    return {
        to: parsedTransaction[0],
        value: parsedTransaction[1],
        chainId: parsedTransaction[2],
        nonce: parsedTransaction[3],
        gas: parsedTransaction[4],
        gasPrice: parsedTransaction[5],
        data: parsedTransaction[6],
    };
}
export async function _registerStepOne(seed, threshold, index, megaPkArray) {
    const dealingArray = new Array();
    await dealingArray.push(compute_pedersen_dealing(seed, threshold, index, megaPkArray));
    await dealingArray.push(compute_pedersen_dealing(seed, threshold, index, megaPkArray));
    await dealingArray.push(compute_pedersen_dealing(seed, threshold, index, megaPkArray));
    return { pedersenDealingArray: dealingArray };
}
export async function _registerStepTwo(seed, threshold, index, megaPkArray, encryptionSignature, encryptedMegaSecret, dealingsKeyArray, dealingsKappaArray, dealingsLambdaArray) {
    const openingArray = new Array();
    const dealingArray = new Array();
    const transcriptArray = new Array();
    let opening1Array = await compute_pedersen_opening(seed, threshold, index, encryptionSignature, encryptedMegaSecret, dealingsKeyArray);
    let opening2Array = await compute_pedersen_opening(seed, threshold, index, encryptionSignature, encryptedMegaSecret, dealingsKappaArray);
    let opening3Array = await compute_pedersen_opening(seed, threshold, index, encryptionSignature, encryptedMegaSecret, dealingsLambdaArray);
    openingArray.push(opening1Array[0]);
    openingArray.push(opening2Array[0]);
    openingArray.push(opening3Array[0]);
    await transcriptArray.push(opening1Array[1]);
    await transcriptArray.push(opening2Array[1]);
    await transcriptArray.push(opening3Array[1]);
    await dealingArray.push(compute_simple_dealing(seed, threshold, index, encryptionSignature, megaPkArray, opening1Array[0]));
    await dealingArray.push(compute_simple_dealing(seed, threshold, index, encryptionSignature, megaPkArray, opening2Array[0]));
    return {
        pedersenOpeningArray: openingArray,
        simpleDealingArray: dealingArray,
        pedersenTranscriptArray: transcriptArray,
    };
}
export async function _registerStepThree(seed, threshold, index, megaPkArray, encryptionSignature, encryptedMegaSecret, simpleDealingKeyArray, simpleDealingKappaArray, pedersenTranscriptKey, pedersenTranscriptKappa, pedersenOpeningLambda) {
    const openingArray = new Array();
    const dealingArray = new Array();
    const transcriptArray = new Array();
    let opening1Array = await compute_simple_opening(seed, threshold, index, encryptionSignature, encryptedMegaSecret, simpleDealingKeyArray, pedersenTranscriptKey);
    let opening2Array = await compute_simple_opening(seed, threshold, index, encryptionSignature, encryptedMegaSecret, simpleDealingKappaArray, pedersenTranscriptKappa);
    openingArray.push(opening1Array[0]);
    openingArray.push(opening2Array[0]);
    transcriptArray.push(opening1Array[1]);
    transcriptArray.push(opening2Array[1]);
    await dealingArray.push(compute_multiply_dealing(seed, threshold, index, encryptionSignature, megaPkArray, opening1Array[0], pedersenOpeningLambda));
    await dealingArray.push(compute_multiply_dealing(seed, threshold, index, encryptionSignature, megaPkArray, opening2Array[0], pedersenOpeningLambda));
    return {
        simpleOpeningArray: openingArray,
        multiplyDealingArray: dealingArray,
        simpleTranscriptArray: transcriptArray,
    };
}
export async function _getMasterPublicKey(transcript_key) {
    let generatePublicKeys = await generate_master_public_key_and_address(transcript_key);
    return generatePublicKeys[1];
}
export async function _signTransaction(seed, threshold, index, message, encryptionSignature, encryptedMegaSecret, dealingKeyXLambdaArray, dealingKappaXLambdaArray, pedersenOpeningLambda, simpleTranscriptKey, simpleTranscriptKappa, pedersenTranscriptLambda) {
    let signedTransaction = "";
    const openings_key_times_lambda = compute_multiply_opening(seed, threshold, index, encryptionSignature, encryptedMegaSecret, dealingKeyXLambdaArray, simpleTranscriptKey, pedersenTranscriptLambda);
    const openings_kappa_times_lambda = compute_multiply_opening(seed, threshold, index, encryptionSignature, encryptedMegaSecret, dealingKappaXLambdaArray, simpleTranscriptKappa, pedersenTranscriptLambda);
    const key_times_lambda = await _decryptData(encryptionSignature, openings_key_times_lambda[0]);
    const kappa_times_lambda = await _decryptData(encryptionSignature, openings_kappa_times_lambda[0]);
    const opening_lambda = await _decryptData(encryptionSignature, pedersenOpeningLambda);
    signedTransaction = user_sign_message(kappa_times_lambda, key_times_lambda, opening_lambda, message, seed, simpleTranscriptKey, simpleTranscriptKappa);
    return { signedTransaction: signedTransaction };
}
export async function _signTransactionWithoutLambda(seed, message, encryptionSignature, openingSimpleKey, openingSimpleKappa, simpleTranscriptKey, simpleTranscriptKappa) {
    let signedTransaction = "";
    const simple_opening_key = await _decryptData(encryptionSignature, openingSimpleKey);
    const simple_opening_kappa = await _decryptData(encryptionSignature, openingSimpleKappa);
    signedTransaction = user_sign_message_without_lambda(simple_opening_kappa, simple_opening_key, message, seed, simpleTranscriptKey, simpleTranscriptKappa);
    return { signedTransaction: signedTransaction };
}
export async function _combineSignedTransactions(seed, threshold, message, signatureArray, transcript_key, transcript_kappa) {
    let combinedTransactions;
    try {
        combinedTransactions = combine_signed_shares(threshold, seed, message, signatureArray, transcript_key, transcript_kappa);
    }
    catch (exceptionVar) {
        console.log(exceptionVar);
    }
    return { finalSignedTransaction: combinedTransactions };
}
export async function _combineSignedTransactionsWithoutLambda(seed, threshold, message, signatureArray, transcript_key, transcript_kappa) {
    let combinedTransactions;
    try {
        combinedTransactions = combine_signed_shares_without_lambda(threshold, seed, message, signatureArray, transcript_key, transcript_kappa);
    }
    catch (exceptionVar) {
        console.log(exceptionVar);
    }
    return { finalSignedTransaction: combinedTransactions };
}
export async function _reshareStepByOriginalGroup(seed, threshold, index, encryptionSignature, simpleOpeningKey, newMegaPkArray) {
    const reshareDealings = new Array();
    reshareDealings.push(compute_simple_dealing_reshare(seed, threshold, index, encryptionSignature, newMegaPkArray, simpleOpeningKey));
    reshareDealings.push(compute_pedersen_dealing(seed, threshold, index, newMegaPkArray));
    reshareDealings.push(compute_pedersen_dealing(seed, threshold, index, newMegaPkArray));
    return { reshareDealings };
}
export async function _reshareStepOneByNewUser(seed, threshold, index, newMegaPkArray) {
    const reshareDealings = new Array();
    reshareDealings.push(compute_pedersen_dealing(seed, threshold, index, newMegaPkArray));
    reshareDealings.push(compute_pedersen_dealing(seed, threshold, index, newMegaPkArray));
    return { reshareDealings };
}
export async function _reshareStepTwo(seed, threshold_reshare, index, megaPkArray, encryptionSignature, encryptedMegaSecret, simple_dealings_key_reshared_once_or_twice, simpleTranscriptKey, pedersenDealingsKappaReshare, pedersenDealingsLambdaReshare) {
    const reshareOpenings = new Array();
    const reshareDealings = new Array();
    const reshareTranscripts = new Array();
    let openingReshareAndTranscript = new Array();
    openingReshareAndTranscript = compute_simple_opening_reshare_once_or_twice(seed, threshold_reshare, index, encryptionSignature, encryptedMegaSecret, simple_dealings_key_reshared_once_or_twice, simpleTranscriptKey);
    let resharePedersenOpening1 = compute_pedersen_opening(seed, threshold_reshare, index, encryptionSignature, encryptedMegaSecret, pedersenDealingsKappaReshare);
    let resharePedersenOpening2 = compute_pedersen_opening(seed, threshold_reshare, index, encryptionSignature, encryptedMegaSecret, pedersenDealingsLambdaReshare);
    reshareOpenings.push(openingReshareAndTranscript[0]);
    reshareOpenings.push(resharePedersenOpening1[0]);
    reshareOpenings.push(resharePedersenOpening2[0]);
    reshareTranscripts.push(openingReshareAndTranscript[1]);
    reshareTranscripts.push(resharePedersenOpening1[1]);
    reshareTranscripts.push(resharePedersenOpening2[1]);
    let reshareSimpleDealing1 = compute_simple_dealing_reshare(seed, threshold_reshare, index, encryptionSignature, megaPkArray, reshareOpenings[0]);
    let reshareSimpleDealing2 = compute_simple_dealing(seed, threshold_reshare, index, encryptionSignature, megaPkArray, reshareOpenings[1]);
    reshareDealings.push(reshareSimpleDealing1);
    reshareDealings.push(reshareSimpleDealing2);
    return { reshareOpenings, reshareDealings, reshareTranscripts };
}
export async function _reshareStepThree(seed, threshold_reshare, index, megaPkArray, encryptionSignature, encryptedMegaSecret, simpleDealingsKappaReshare, pedersenOpeningLambdaReshareArray, simple_dealings_key_reshared_once_or_twice, transcript_key_simple_or_reshared_once, transcriptKappaReshare) {
    const reshareOpenings = new Array();
    const reshareDealings = new Array();
    const reshareTranscripts = new Array();
    let openingReshareAndTranscript1 = compute_simple_opening_reshare_once_or_twice(seed, threshold_reshare, index, encryptionSignature, encryptedMegaSecret, simple_dealings_key_reshared_once_or_twice, transcript_key_simple_or_reshared_once);
    let openingReshareAndTranscript2 = compute_simple_opening(seed, threshold_reshare, index, encryptionSignature, encryptedMegaSecret, simpleDealingsKappaReshare, transcriptKappaReshare);
    reshareOpenings.push(openingReshareAndTranscript1[0]);
    reshareOpenings.push(openingReshareAndTranscript2[0]);
    reshareDealings.push(compute_multiply_dealing(seed, threshold_reshare, index, encryptionSignature, megaPkArray, reshareOpenings[0], pedersenOpeningLambdaReshareArray[index]));
    reshareDealings.push(compute_multiply_dealing(seed, threshold_reshare, index, encryptionSignature, megaPkArray, reshareOpenings[1], pedersenOpeningLambdaReshareArray[index]));
    reshareTranscripts.push(openingReshareAndTranscript1[1]);
    reshareTranscripts.push(openingReshareAndTranscript2[1]);
    return { reshareOpenings, reshareDealings, reshareTranscripts };
}
export async function _reshareSignTransaction(seed, threshold_reshare, index, message, encryptionSignature, encryptedMegaSecret, pedersenDealingsLambdaReshare, dealingsKeyXlambdaReshare, dealingsKappaXlambdaReshare, pedersenOpeningLambdaReshare, transcriptKeyResharedTwice, simpleTranscriptsKappaReshare) {
    let signedTransaction = "";
    const openings_key_times_lambda_reshare = compute_multiply_opening_reshare(seed, threshold_reshare, index, encryptionSignature, encryptedMegaSecret, dealingsKeyXlambdaReshare, pedersenDealingsLambdaReshare, transcriptKeyResharedTwice);
    const openings_kappa_times_lambda_reshare = compute_multiply_opening_reshare(seed, threshold_reshare, index, encryptionSignature, encryptedMegaSecret, dealingsKappaXlambdaReshare, pedersenDealingsLambdaReshare, transcriptKeyResharedTwice);
    const openings_kappa_times_lambda_reshare_decrypted = await _decryptData(encryptionSignature, openings_kappa_times_lambda_reshare);
    const openings_key_times_lambda_reshare_decrypted = await _decryptData(encryptionSignature, openings_key_times_lambda_reshare);
    const lambdaOpening = await _decryptData(encryptionSignature, pedersenOpeningLambdaReshare);
    signedTransaction = user_sign_message_reshare(openings_kappa_times_lambda_reshare_decrypted, openings_key_times_lambda_reshare_decrypted, lambdaOpening, transcriptKeyResharedTwice, simpleTranscriptsKappaReshare, message, seed);
    return { signedTransaction: signedTransaction };
}
export async function _reshareCombineSignedTransactions(simpleTranscriptKappaReshare, transcriptKeyResharedTwice, threshold, seed, message, signatureArray) {
    const combinedTransactions = await combine_signed_shares_reshare(simpleTranscriptKappaReshare, transcriptKeyResharedTwice, threshold, seed, message, signatureArray);
    return { finalSignedTransaction: combinedTransactions };
}
export async function _signMessage(seed, threshold, index, message, encryptionSignature, encryptedMegaSecret, dealingKeyXLambdaArray, dealingKappaXLambdaArray, pedersenOpeningLambda, simpleTranscriptKey, simpleTranscriptKappa, pedersenTranscriptLambda) {
    let signedMessage = "";
    const openings_key_times_lambda = compute_multiply_opening(seed, threshold, index, encryptionSignature, encryptedMegaSecret, dealingKeyXLambdaArray, simpleTranscriptKey, pedersenTranscriptLambda);
    const openings_kappa_times_lambda = compute_multiply_opening(seed, threshold, index, encryptionSignature, encryptedMegaSecret, dealingKappaXLambdaArray, simpleTranscriptKappa, pedersenTranscriptLambda);
    const key_times_lambda = await _decryptData(encryptionSignature, openings_key_times_lambda[0]);
    const kappa_times_lambda = await _decryptData(encryptionSignature, openings_kappa_times_lambda[0]);
    const opening_lambda = await _decryptData(encryptionSignature, pedersenOpeningLambda);
    signedMessage = user_sign_msg(kappa_times_lambda, key_times_lambda, opening_lambda, message, seed, simpleTranscriptKey, simpleTranscriptKappa);
    return { signedTransaction: signedMessage };
}
export async function _combineSignedSharesMessage(seed, threshold, message, signatureArray, transcript_key, transcript_kappa) {
    let combinedMessage;
    try {
        combinedMessage = combine_signed_shares_message(threshold, seed, message, signatureArray, transcript_key, transcript_kappa);
    }
    catch (exceptionVar) {
        console.log(exceptionVar);
    }
    return { finalSignedTransaction: combinedMessage };
}
//# sourceMappingURL=wasm_wrapper.js.map