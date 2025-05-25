import { arbitrumSepolia, arbitrum, sepolia, optimismSepolia, } from "viem/chains";
import { defineChain } from "viem";
export const ARBITRUM_SEPOLIA_GRAPHQL_ENDPOINT_WSS = "wss://indexer.hyperindex.xyz/501af95/v1/graphql";
export const ARBITRUM_SEPOLIA_GRAPHQL_ENDPOINT = "https://indexer.hyperindex.xyz/501af95/v1/graphql";
export const XFI_GRAPHQL_ENDPOINT = "https://graph.intu.xyz/subgraphs/name/xfi-test2/";
export const NOSTR_URL = "https://nostr.intu.xyz";
export const ARBITRUM_ONE_GRAPHQL_ENDPOINT = "https://gateway-testnet-arbitrum.network.thegraph.com/api/70bb07548b4596ddde82d039ee7aad5c/subgraphs/id/5hse1wR3m4ZJGktbF6Rvn9nAhvZSp9CjSDu2Lu9h897X";
export const ETHERLINK_GRAPHQL_ENDPOINT = "https://rpc.intu.xyz/graph/subgraphs/name/etherlink";
export const getGraphEndpoint = (chainId) => {
    if (chainId === 4157) {
        return XFI_GRAPHQL_ENDPOINT;
    }
    else if (chainId === 421614) {
        return ARBITRUM_SEPOLIA_GRAPHQL_ENDPOINT;
    }
    else if (chainId === 42793) {
        return ETHERLINK_GRAPHQL_ENDPOINT;
    }
    else
        return ARBITRUM_ONE_GRAPHQL_ENDPOINT;
};
const BNB_TESTNET = defineChain({
    id: 97,
    name: "BNB Chain Testnet",
    nativeCurrency: { name: "tBNB", symbol: "tBNB", decimals: 18 },
    rpcUrls: {
        default: { http: ["https://data-seed-prebsc-1-s1.binance.org:8545/"] },
    },
});
const POLYGON_AMOY = defineChain({
    id: 80002,
    name: "Polygon Amoy",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: { default: { http: ["https://rpc-amoy.polygon.technology/"] } },
});
const AVALANCHE_FUJI = defineChain({
    id: 43113,
    name: "Avalanche Fuji",
    nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
    rpcUrls: {
        default: { http: ["https://avalanche-fuji-c-chain-rpc.publicnode.com"] },
    },
});
const FANTOM_TESTNET = defineChain({
    id: 4002,
    name: "Fantom Testnet",
    nativeCurrency: { name: "FTM", symbol: "FTM", decimals: 18 },
    rpcUrls: { default: { http: ["https://fantom.api.onfinality.io/public"] } },
});
const MOONBASE_ALPHA = defineChain({
    id: 1287,
    name: "Moonbase Alpha",
    nativeCurrency: { name: "DEV", symbol: "DEV", decimals: 18 },
    rpcUrls: { default: { http: ["https://moonbase-alpha.public.blastapi.io"] } },
});
const BASE_SEPOLIA = defineChain({
    id: 84532,
    name: "Base Sepolia",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: { default: { http: ["https://base-sepolia.gateway.tenderly.co"] } },
});
const DOGECHAIN = defineChain({
    id: 2000,
    name: "Dogechain",
    nativeCurrency: { name: "DOGE", symbol: "DOGE", decimals: 18 },
    rpcUrls: { default: { http: ["https://rpc.dogechain.dog"] } },
});
const CROSSFI_TESTNET = defineChain({
    id: 4157,
    name: "CrossFi Testnet",
    nativeCurrency: { name: "XFI", symbol: "XFI", decimals: 18 },
    rpcUrls: {
        default: { http: ["https://crossfi-testnet.public.blastapi.io/"] },
    },
});
const ETHERLINK_MAINNET = defineChain({
    id: 42793,
    name: "Etherlink Mainnet",
    nativeCurrency: { name: "ELINK", symbol: "ELINK", decimals: 18 },
    rpcUrls: { default: { http: ["https://node.mainnet.etherlink.com"] } },
});
export function chainConfig(chainId, transport) {
    switch (chainId) {
        case 421614:
            return { chain: arbitrumSepolia, transport };
        case 42161:
            return { chain: arbitrum, transport };
        case 11155111:
            return { chain: sepolia, transport };
        case 11155420:
            return { chain: optimismSepolia, transport };
        case 97:
            return { chain: BNB_TESTNET, transport };
        case 80002:
            return { chain: POLYGON_AMOY, transport };
        case 43113:
            return { chain: AVALANCHE_FUJI, transport };
        case 4002:
            return { chain: FANTOM_TESTNET, transport };
        case 1287:
            return { chain: MOONBASE_ALPHA, transport };
        case 84532:
            return { chain: BASE_SEPOLIA, transport };
        case 2000:
            return { chain: DOGECHAIN, transport };
        case 4157:
            return { chain: CROSSFI_TESTNET, transport };
        case 42793:
            return { chain: ETHERLINK_MAINNET, transport };
        default:
            console.warn(`Chain ID ${chainId} not found in predefined configurations.`);
            return undefined;
    }
}
//# sourceMappingURL=constants.js.map