import { Signer, providers } from "ethers";
import { PreRegistrationStep, RegistrationAll } from "./models/vault.js";
export declare function fetchSubgraphData(chainId: number, query: string): Promise<any>;
export declare function getUserIndex(vaultAddress: string, userAddress: string, provider: providers.Provider): Promise<number>;
export declare function getUserPreRegisterInfos(vaultAddress: string, userAddress: string, provider: providers.Provider): Promise<PreRegistrationStep>;
export declare function getUserRegistrationAllInfos(vaultAddress: string, provider: providers.Provider): Promise<RegistrationAll[]>;
export declare function getPreRegisterInfos(vaultAddress: string, provider: providers.Provider): Promise<{
    parisEncKeyArray: string[];
    megaPublicKeyArray: string[];
    encMegaSecretKeyArray: string[];
    dbPublicKeyArray: string[];
}>;
export declare function getRegistrationStep3InfosDB(vaultAddress: string, provider: providers.Provider): Promise<{
    simpleKeyArray: string[];
    simpleKappaArray: string[];
    dealingKeyXLambdaArray: string[];
    dealingKappaXLambdaArray: string[];
}>;
export declare function getRegistrationReshareStep3InfosDB(vaultAddress: string, provider: providers.Provider): Promise<{
    pedersenDealingsLambdaReshareArray: string[];
    dealingsKeyXLambdaReshareArray: string[];
    dealingsKappaXLambdaReshareArray: string[];
}>;
export declare function getUtilsParams(vaultAddress: string, userAddress: string, provider: providers.Provider): Promise<{
    seed: string;
    threshold: number;
    index: number;
    megaPkArray: string[];
    encMegaSecretKey: string[];
    dbKeyArray: string[];
}>;
export declare function getUserSignature(vaultAddress: string, signer: Signer): Promise<string>;
