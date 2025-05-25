import { createClient } from "graphql-ws";
import ws from "ws";
const isBrowser = typeof window !== "undefined";
if (!isBrowser) {
    global.WebSocket = ws;
}
const getWebSocketImpl = () => {
    if (isBrowser) {
        return window.WebSocket;
    }
    if (typeof WebSocket === "undefined") {
        throw new Error("WebSocket implementation not found. Make sure ws package is installed for node environment.");
    }
    return WebSocket;
};
export const normalizeQuery = (name, chainId) => {
    if (chainId === 421614) {
        return name.slice(0, -1);
    }
    return name;
};
const arbitrumSepoliaQueries = {
    getVaultTransactions: ({ vaultAddress }) => `
    query {
      TransactionProposed(
        where: { vaultAddress: { _ilike: "${vaultAddress}" } }
        order_by: { blockNumber: asc }
      ) {
        txId
        transactionHash
        transactionInfo
        notes
      }
      TransactionUserConfirmed(
        where: { vaultAddress: { _ilike: "${vaultAddress}" } }
        order_by: { blockNumber: asc }
      ) {
        txId
        signedTransaction
        user
      }
    }
  `,
    getVaultCreateds: ({ userAddress }) => `
    query {
      VaultCreated(
        limit: 1000
        where: { proposedAddresses: { _contains: ["${userAddress}"] } }
        order_by: { blockNumber: asc }
      ) {
        vaultAddress
      }
    }
  `,
    getVaultCreatedSingle: ({ userAddress }) => `
    query {
      VaultCreated(
        where: { proposedAddresses: { _contains: ["${userAddress}"] } }
        order_by: { blockNumber: asc }
      ) {
        vaultAddress
      }
    }
  `,
    getVaultCompleted: ({ masterPublicAddress }) => `
    query {
      VaultCompleted(
        where: { masterPubKey: { _ilike: "${masterPublicAddress}" } }
        order_by: { blockNumber: asc }
      ) {
        vaultAddress
      }
    }
  `,
    getTransactionById: ({ vaultAddress, txId }) => `
    query {
      TransactionProposed(
        where: { 
          vaultAddress: { _ilike: "${vaultAddress}" },
          txId: { _eq: "${txId}" }
        }
        order_by: { blockNumber: asc }
      ) {
        txId
        transactionHash
        transactionInfo
        notes
      }
      TransactionUserConfirmed(
        where: {
          vaultAddress: { _ilike: "${vaultAddress}" },
          txId: { _eq: "${txId}" }
        }
        order_by: { blockNumber: asc }
      ) {
        signedTransaction
        user
      }
    }
  `,
    vaultUserPreRegister: ({ vaultAddress }) => `
    query {
      VaultUserPreRegister(
        where: {
          vaultAddress: { _ilike: "${vaultAddress}" }
        }
        order_by: { blockNumber: asc }
      ) {
        user
        dbKey
        encSharedKey
        megaPublicKey
        parisEncKey
      }
    }
  `,
    vaultUserRegisteredAll: ({ vaultAddress }) => `
    query {
      VaultUserRegisteredAll(
        where: {
          vaultAddress: { _ilike: "${vaultAddress}" }
        }
        order_by: { blockNumber: asc }
      ) {
        user
        step1Dealings
        openingKey
        openingKappa
        openingLambda
        simpleDealingKey
        simpleDealingKappa
        transcriptKey
        transcriptKappa
        transcriptLambda
        step3Crypto
      }
    }
  `,
    getUserRegistrationReshareStep3Info: ({ vaultAddress }) => `
    query {
      VaultUserReshareRegisteredAll(
        where: {
          vaultAddress: { _ilike: "${vaultAddress}" }
        }
        order_by: { blockNumber: asc }
      ) {
        user
        step3Crypto
      }
    }
  `,
    getUserReSharingStep1Info: ({ vaultAddress }) => `
    query {
      VaultUserReshareRegisteredAlls(
        where: {
          vaultAddress: { _ilike: "${vaultAddress}" }
        }
        order_by: { blockNumber: asc }
      ) {
        user
        step3Crypto
        step1Dealings
      }
    }
  `,
};
const standardQueries = {
    getVaultTransactions: ({ vaultAddress }) => `
    query {
      transactionProposeds(
        where: { vaultAddress: "${vaultAddress}" }
        orderBy: blockNumber, orderDirection: asc
      ) {
        txId
        transactionHash
        transactionInfo
        notes
      }
      transactionUserConfirmeds(
        where: { vaultAddress: "${vaultAddress}" }
        orderBy: blockNumber, orderDirection: asc
      ) {
        txId
        signedTransaction
        user
      }
    }
  `,
    getVaultCreateds: ({ userAddress }) => `
    query {
      vaultCreateds(
        first: 1000
        where: { proposedAddresses_contains: ["${userAddress}"] }
        orderBy: blockNumber, orderDirection: asc
      ) {
        vaultAddress
      }
    }
  `,
    getVaultCreatedSingle: ({ userAddress }) => `
    query {
      vaultCreateds(
        where: { proposedAddresses_contains: ["${userAddress}"] }
        orderBy: blockNumber, orderDirection: asc
      ) {
        vaultAddress
      }
    }
  `,
    getVaultCompleted: ({ masterPublicAddress }) => `
    query {
      vaultCompleteds(
        where: { masterPubKey: "${masterPublicAddress}" }
        orderBy: blockNumber, orderDirection: asc
      ) {
        vaultAddress
      }
    }
  `,
    getTransactionById: ({ vaultAddress, txId }) => `
    query {
      transactionProposeds(
        where: { vaultAddress: "${vaultAddress}", txId: "${txId}" }
        orderBy: blockNumber, orderDirection: asc
      ) {
        txId
        transactionHash
        transactionInfo
        notes
      }
      transactionUserConfirmeds(
        where: { vaultAddress: "${vaultAddress}", txId: "${txId}" }
        orderBy: blockNumber, orderDirection: asc
      ) {
        signedTransaction
        user
      }
    }
  `,
    vaultUserPreRegister: ({ vaultAddress }) => `
    query {
      vaultUserPreRegisters(
        where: {
          vaultAddress: "${vaultAddress}"
        }
        orderBy: blockNumber, orderDirection: asc
      ) {
        user
        dbKey
        encSharedKey
        megaPublicKey
        parisEncKey
      }
    }
  `,
    vaultUserRegisteredAll: ({ vaultAddress }) => `
    query {
      vaultUserRegisteredAlls(
        where: {
          vaultAddress: "${vaultAddress}"
        }
        orderBy: blockNumber, orderDirection: asc
      ) {
        user
        step1Dealings
        openingKey
        openingKappa
        openingLambda
        simpleDealingKey
        simpleDealingKappa
        transcriptKey
        transcriptKappa
        transcriptLambda
        step3Crypto
      }
    }
  `,
    getUserRegistrationReshareStep3Info: ({ vaultAddress }) => `
    query {
      VaultUserReshareRegisteredAlls(
        where: {
          vaultAddress: "${vaultAddress}"
        }
        orderBy: blockNumber, orderDirection: asc
      ) {
        user
        step3Crypto
      }
    }
  `,
    getUserReSharingStep1Info: ({ vaultAddress }) => `
    query {
      vaultUserReshareRegisteredAlls(
        where: {
          vaultAddress: "${vaultAddress}"
        }
        orderBy: blockNumber, orderDirection: asc
      ) {
        user
        step3Crypto
        step1Dealings
      }
    }
  `,
};
export const getQuery = (queryName, chainId, params) => {
    if (chainId === 421614) {
        return arbitrumSepoliaQueries[queryName](params);
    }
    return standardQueries[queryName](params);
};
const arbitrumSepoliaSubscriptions = {
    subscribeToVaultTransactions: ({ vaultAddress }) => `
    subscription {
      TransactionProposed(
        where: { vaultAddress: { _ilike: "${vaultAddress}" } }
        order_by: { blockNumber: asc }
      ) {
        txId
        transactionHash
        transactionInfo
        notes
      }
      TransactionUserConfirmed(
        where: { vaultAddress: { _ilike: "${vaultAddress}" } }
        order_by: { blockNumber: asc }
      ) {
        txId
        signedTransaction
        user
      }
    }
  `,
    subscribeToVaultCreateds: ({ userAddress }) => `
    subscription {
      VaultCreated(
        limit: 1000
        where: { proposedAddresses: { _contains: ["${userAddress}"] } }
        order_by: { blockNumber: asc }
      ) {
        vaultAddress
      }
    }
  `,
    subscribeToVaultCreatedSingle: ({ userAddress }) => `
    subscription {
      VaultCreated(
        where: { proposedAddresses: { _contains: ["${userAddress}"] } }
        order_by: { blockNumber: asc }
      ) {
        vaultAddress
      }
    }
  `,
    subscribeToVaultCompleted: ({ masterPublicAddress }) => `
    subscription {
      VaultCompleted(
        where: { masterPubKey: { _ilike: "${masterPublicAddress}" } }
        order_by: { blockNumber: asc }
      ) {
        vaultAddress
      }
    }
  `,
    subscribeToTransactionById: ({ vaultAddress, txId }) => `
    subscription {
      TransactionProposed(
        where: { 
          vaultAddress: { _ilike: "${vaultAddress}" },
          txId: { _eq: "${txId}" }
        }
        order_by: { blockNumber: asc }
      ) {
        txId
        transactionHash
        transactionInfo
        notes
      }
      TransactionUserConfirmed(
        where: {
          vaultAddress: { _ilike: "${vaultAddress}" },
          txId: { _eq: "${txId}" }
        }
        order_by: { blockNumber: asc }
      ) {
        signedTransaction
        user
      }
    }
  `,
    subscribeToVaultUserPreRegister: ({ vaultAddress }) => `
    subscription {
      VaultUserPreRegister(
        where: {
          vaultAddress: { _ilike: "${vaultAddress}" }
        }
        order_by: { blockNumber: asc }
      ) {
        user
        dbKey
        encSharedKey
        megaPublicKey
        parisEncKey
      }
    }
  `,
    subscribeToVaultUserRegisteredAll: ({ vaultAddress }) => `
    subscription {
      VaultUserRegisteredAll(
        where: {
          vaultAddress: { _ilike: "${vaultAddress}" }
        }
        order_by: { blockNumber: asc }
      ) {
        user
        step1Dealings
        openingKey
        openingKappa
        openingLambda
        simpleDealingKey
        simpleDealingKappa
        transcriptKey
        transcriptKappa
        transcriptLambda
        step3Crypto
      }
    }
  `,
    subscribeToUserRegistrationReshareStep3Info: ({ vaultAddress }) => `
    subscription {
      VaultUserReshareRegisteredAll(
        where: {
          vaultAddress: { _ilike: "${vaultAddress}" }
        }
        order_by: { blockNumber: asc }
      ) {
        user
        step3Crypto
      }
    }
  `,
    subscribeToUserReSharingStep1Info: ({ vaultAddress }) => `
    subscription {
      VaultUserReshareRegisteredAlls(
        where: {
          vaultAddress: { _ilike: "${vaultAddress}" }
        }
        order_by: { blockNumber: asc }
      ) {
        user
        step3Crypto
        step1Dealings
      }
    }
  `,
};
export const subscribeToQuery = (queryName, params, callbacks) => {
    if (typeof window === "undefined") {
        global.WebSocket = ws;
    }
    const client = createClient({
        url: "wss://indexer.hyperindex.xyz/501af95/v1/graphql",
        webSocketImpl: getWebSocketImpl(),
        connectionParams: {
            headers: {
                "Sec-WebSocket-Protocol": "graphql-ws",
            },
        },
        on: {
            connected: () => console.log("🚀 WebSocket Connected for", queryName),
            error: (err) => {
                callbacks.error(err);
            },
            closed: () => {
                callbacks.complete();
            },
        },
        retryAttempts: 10,
        shouldRetry: (errOrCloseEvent) => {
            return true;
        },
    });
    const getQuery = () => {
        if (!arbitrumSepoliaSubscriptions[queryName]) {
            throw new Error(`Missing subscription query: ${queryName}`);
        }
        const query = arbitrumSepoliaSubscriptions[queryName](params);
        return query;
    };
    let isActive = true;
    let subscription = null;
    const heartbeatInterval = setInterval(() => {
        if (!isActive) {
            clearInterval(heartbeatInterval);
            return;
        }
        try {
            client.subscribe({
                query: `subscription { __typename }`,
            }, {
                next: () => { },
                error: () => {
                    if (subscription) {
                        subscription();
                    }
                    createSubscription();
                },
                complete: () => { },
            })();
        }
        catch (error) {
        }
    }, 5000);
    const createSubscription = () => {
        try {
            subscription = client.subscribe({
                query: getQuery(),
            }, {
                next: (data) => {
                    if (isActive) {
                        callbacks.next(data);
                    }
                },
                error: (error) => {
                    if (isActive) {
                        callbacks.error(error);
                    }
                },
                complete: () => {
                    if (isActive) {
                        callbacks.complete();
                    }
                },
            });
        }
        catch (error) {
            if (isActive) {
                callbacks.error(error);
            }
        }
    };
    createSubscription();
    return {
        unsubscribe: () => {
            console.log("🛑 Unsubscribing from query:", queryName);
            isActive = false;
            clearInterval(heartbeatInterval);
            if (subscription) {
                subscription();
            }
        },
    };
};
export const testWebSocketConnection = async () => {
    try {
        const ws = new WebSocket("wss://indexer.hyperindex.xyz/501af95/v1/graphql");
        ws.onopen = function (event) {
            console.log("Connection opened");
        };
        ws.onmessage = function (event) {
            console.log("Received:", event.data);
        };
        ws.onerror = function (event) {
            console.error("WebSocket error:", event);
        };
        ws.onclose = function (event) {
            console.log("Connection closed");
        };
        return true;
    }
    catch (error) {
        console.error("WebSocket test failed:", error);
        throw error;
    }
};
//# sourceMappingURL=graph.js.map