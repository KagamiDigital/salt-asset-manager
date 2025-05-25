export declare const normalizeQuery: (name: string, chainId: number) => string;
type QueryParams = {
    vaultAddress?: string;
    userAddress?: string;
    masterPublicAddress?: string;
    txId?: string;
};
export declare const getQuery: (queryName: string, chainId: number, params: QueryParams) => string;
export declare const subscribeToQuery: (queryName: string, params: QueryParams, callbacks: {
    next: (data: any) => void;
    error: (error: any) => void;
    complete: () => void;
}) => {
    unsubscribe: () => void;
};
export declare const testWebSocketConnection: () => Promise<boolean>;
export {};
