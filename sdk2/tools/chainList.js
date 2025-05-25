import { ethers } from "ethers";
import { loadJson, JSON_PATHS } from "../utils/json-imports.js";
let chainListData = null;
const getChainList = async () => {
    if (!chainListData) {
        try {
            chainListData = await loadJson(JSON_PATHS.CHAIN_LIST);
        }
        catch (error) {
            throw error;
        }
    }
    return chainListData;
};
export const getProviderForChain = async (chainId) => {
    const chainIdStr = chainId.toString();
    const chainList = await getChainList();
    const chainInfo = chainList[chainIdStr];
    if (!chainInfo) {
        throw new Error(`Unsupported chainId: ${chainId}. This chain is not in our RPC list.`);
    }
    return new ethers.providers.JsonRpcProvider(chainInfo.r);
};
export const getChainInfo = async (chainId) => {
    const chainIdStr = chainId.toString();
    const chainList = await getChainList();
    const chainInfo = chainList[chainIdStr];
    if (!chainInfo) {
        throw new Error(`Unsupported chainId: ${chainId}`);
    }
    return chainInfo;
};
export const getRpcUrl = async (chainId) => {
    const chainInfo = await getChainInfo(chainId);
    return chainInfo.r;
};
export const getSupportedChainIds = async () => {
    const chainList = await getChainList();
    return Object.keys(chainList);
};
export const isChainSupported = async (chainId) => {
    const chainIdStr = chainId.toString();
    const chainList = await getChainList();
    return chainIdStr in chainList;
};
export default {
    getProviderForChain,
    getChainInfo,
    getRpcUrl,
    getSupportedChainIds,
    isChainSupported,
};
//# sourceMappingURL=chainList.js.map