import { PublicClient } from "viem";
import { providers } from "ethers";
import FactoryContractType from "../contracts/FactoryContractType.js";
import FeeContractType from "../contracts/FeeContractType.js";
import VaultContractType from "../contracts/VaultContractType.js";
declare global {
    interface Window {
        ethereum: any;
    }
}
export declare function createViemClient(provider: any): Promise<PublicClient>;
export declare function createViemClientForTransaction(provider: any): Promise<PublicClient>;
export declare function getVaultContractViem(address: string, client: PublicClient): Promise<any>;
export declare function getVaultFactoryContractViem(provider: providers.Provider): Promise<any>;
export declare function getVaultFactoryContract(provider: providers.Provider): Promise<FactoryContractType>;
export declare function getFeeContract(provider: providers.Provider): Promise<FeeContractType>;
export declare function getVaultContract(vaultAddress: string, provider: providers.Provider): Promise<VaultContractType>;
export declare function encodeStringToHex(str: string): string;
export declare function hexToString(hexString: string): string;
