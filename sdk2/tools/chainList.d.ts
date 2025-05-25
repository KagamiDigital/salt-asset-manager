import { ethers } from "ethers";
interface ChainInfo {
    n: string;
    c: string;
    s: string;
    r: string;
    d?: number;
    cs?: string;
}
export declare const getProviderForChain: (chainId: string | Number) => Promise<ethers.providers.JsonRpcProvider>;
export declare const getChainInfo: (chainId: string | Number) => Promise<ChainInfo>;
export declare const getRpcUrl: (chainId: string | Number) => Promise<string>;
export declare const getSupportedChainIds: () => Promise<string[]>;
export declare const isChainSupported: (chainId: string | Number) => Promise<boolean>;
declare const _default: {
    getProviderForChain: (chainId: string | Number) => Promise<ethers.providers.JsonRpcProvider>;
    getChainInfo: (chainId: string | Number) => Promise<ChainInfo>;
    getRpcUrl: (chainId: string | Number) => Promise<string>;
    getSupportedChainIds: () => Promise<string[]>;
    isChainSupported: (chainId: string | Number) => Promise<boolean>;
};
export default _default;
