export declare const ARBITRUM_SEPOLIA_GRAPHQL_ENDPOINT_WSS = "wss://indexer.hyperindex.xyz/501af95/v1/graphql";
export declare const ARBITRUM_SEPOLIA_GRAPHQL_ENDPOINT = "https://indexer.hyperindex.xyz/501af95/v1/graphql";
export declare const XFI_GRAPHQL_ENDPOINT = "https://graph.intu.xyz/subgraphs/name/xfi-test2/";
export declare const NOSTR_URL = "https://nostr.intu.xyz";
export declare const ARBITRUM_ONE_GRAPHQL_ENDPOINT = "https://gateway-testnet-arbitrum.network.thegraph.com/api/70bb07548b4596ddde82d039ee7aad5c/subgraphs/id/5hse1wR3m4ZJGktbF6Rvn9nAhvZSp9CjSDu2Lu9h897X";
export declare const ETHERLINK_GRAPHQL_ENDPOINT = "https://rpc.intu.xyz/graph/subgraphs/name/etherlink";
export declare const getGraphEndpoint: (chainId: number) => string;
export declare function chainConfig(chainId: number, transport: any): {
    chain: any;
    transport: any;
} | undefined;
