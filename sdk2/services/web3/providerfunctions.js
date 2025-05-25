import { getVaultContract, getVaultFactoryContract } from "./helper/index.js";
import { getProposal, getTransaction } from "../index.js";
import { getPreRegisterInfos, fetchSubgraphData } from "./utils.js";
import getContractsDetails from "./contracts/contractInfos.js";
import { gql } from "graphql-request";
import { getQuery } from "../../tools/graph.js";
async function retryTransactionInfos(vaultContract, txId, maxRetries = 5) {
    let attempt = 0;
    let lastError;
    while (attempt < maxRetries) {
        try {
            const result = await vaultContract.transactionInfos(txId);
            return result;
        }
        catch (error) {
            lastError = error;
            attempt++;
            await new Promise((resolve) => setTimeout(resolve, 200 * Math.pow(2, attempt)));
        }
    }
    throw lastError;
}
export async function getVault(vaultAddress, provider) {
    const date1 = new Date();
    const vaultContract = await getVaultContract(vaultAddress, provider);
    const vaultinfo = await vaultContract.vaultInfos();
    let rotateThreshold = vaultinfo.rotateThreshold;
    let transactionThreshold = vaultinfo.transactionThreshold;
    let adminThreshold = vaultinfo.adminThreshold;
    let createdDate = vaultinfo.createdDate;
    let createdBlock = vaultinfo.createdBlock.toNumber();
    let name = vaultinfo.name;
    const proposalCount = (await vaultContract.getProposalCounter()).toNumber();
    const txCount = vaultinfo.transactionCount.toNumber();
    const dEOA = vaultinfo.masterPublicKey;
    const users = Promise.all((await vaultContract.vaultInfos()).users.map(async (user) => {
        return _getVaultUser(vaultContract, user);
    }));
    const date2 = new Date();
    return {
        users: await users,
        transactionCount: txCount,
        proposalCount: proposalCount,
        vaultAddress: vaultAddress,
        name: name,
        rotateThreshold: Number(rotateThreshold),
        transactionThreshold: Number(transactionThreshold),
        adminThreshold: Number(adminThreshold),
        createdDate: createdDate.toNumber(),
        birthBlock: Number(createdBlock),
        masterPublicAddress: dEOA,
    };
}
export async function _getProposal(vaultAddress, proposalId, provider, abiCoder) {
    const vaultContract = await getVaultContract(vaultAddress, provider);
    const { createdBlock } = await vaultContract.vaultInfos();
    const filter = vaultContract.filters.ProposalCreated(proposalId);
    const proposalCreatedEvent = (await vaultContract.queryFilter({ topics: filter.topics }, Number(createdBlock)))[0];
    const logDescription = vaultContract.interface.parseLog({
        topics: proposalCreatedEvent.topics,
        data: proposalCreatedEvent.data,
    });
    const propInfo = await vaultContract.proposalInfos(proposalId);
    let data = "";
    switch (logDescription.args[1]) {
        case 0:
            data = abiCoder.decode(["address"], logDescription.args[2])[0];
            break;
        case 1:
            data = abiCoder.decode(["address"], logDescription.args[2])[0];
            break;
        case 2:
            data = abiCoder.decode(["uint"], logDescription.args[2])[0];
            break;
        case 3:
            data = abiCoder.decode(["uint"], logDescription.args[2])[0];
            break;
        case 4:
            data = abiCoder.decode(["uint"], logDescription.args[2])[0];
            break;
        case 5:
            data = abiCoder.decode(["string"], logDescription.args[2])[0];
            break;
    }
    const proposalUsers = [];
    const { users } = await vaultContract.vaultInfos();
    for (const u of users) {
        const voteInfo = await vaultContract.proposalVoteUserInfos(proposalId, u);
        proposalUsers.push({
            address: u,
            voteStatus: voteInfo,
        });
    }
    return {
        id: propInfo.id.toNumber(),
        voteForNeeded: propInfo.voteForNeeded,
        voteFor: propInfo.voteForCount,
        endTime: propInfo.endTime.toNumber(),
        executed: propInfo.executed,
        type: logDescription.args[1],
        data: data,
        users: proposalUsers,
    };
}
export async function _getTransactions(vaultAddress, provider) {
    const vaultContract = await getVaultContract(vaultAddress, provider);
    const { id, votesNeeded } = await retryTransactionInfos(vaultContract, 1);
    const chainId = (await provider.getNetwork()).chainId;
    const queryString = getQuery("getVaultTransactions", chainId, {
        vaultAddress,
    });
    const query = gql `
    ${queryString}
  `;
    try {
        const data = await fetchSubgraphData(chainId, query);
        const resultKey = chainId === 421614 ? "TransactionProposed" : "transactionProposeds";
        const confirmedKey = chainId === 421614
            ? "TransactionUserConfirmed"
            : "transactionUserConfirmeds";
        return (data[resultKey] || []).map((tx) => {
            const signedTransactions = (data[confirmedKey] || [])
                .filter((confirmedTx) => confirmedTx.txId === tx.txId)
                .map((confirmedTx) => ({
                user: confirmedTx.user,
                signedTransaction: confirmedTx.signedTransaction,
            }));
            return {
                id: tx.txId,
                transactionData: tx.transactionInfo,
                transactionNotes: tx.notes,
                signedTransactionsNeeded: Number(votesNeeded),
                userSignedTransactions: signedTransactions,
            };
        });
    }
    catch (error) {
        return [
            {
                id: 0,
                transactionData: "",
                transactionNotes: "",
                signedTransactionsNeeded: Number(votesNeeded),
                userSignedTransactions: [],
            },
        ];
    }
}
export async function _getTransaction(vaultAddress, txId, provider) {
    const vaultContract = await getVaultContract(vaultAddress, provider);
    const { id, votesNeeded } = await retryTransactionInfos(vaultContract, txId);
    const chainId = (await provider.getNetwork()).chainId;
    const queryString = getQuery("getTransactionById", chainId, {
        vaultAddress,
        txId: txId.toString(),
    });
    const query = gql `
    ${queryString}
  `;
    const data = await fetchSubgraphData(chainId, query);
    const resultKey = chainId === 421614 ? "TransactionProposed" : "transactionProposeds";
    const confirmedKey = chainId === 421614
        ? "TransactionUserConfirmed"
        : "transactionUserConfirmeds";
    if (!data || !data[resultKey] || data[resultKey].length === 0) {
        return {
            id: txId,
            transactionData: "",
            transactionNotes: "",
            signedTransactionsNeeded: Number(votesNeeded),
            userSignedTransactions: [],
        };
    }
    const tx = data[resultKey][0];
    const signedTransactions = data[confirmedKey]
        ? data[confirmedKey].map((confirmedTx) => ({
            user: confirmedTx.user,
            signedTransaction: confirmedTx.signedTransaction,
        }))
        : [];
    return {
        id: tx.txId,
        transactionData: tx.transactionInfo,
        transactionNotes: tx.notes,
        signedTransactionsNeeded: Number(votesNeeded),
        userSignedTransactions: signedTransactions,
    };
}
export async function _getTransactionLean(vaultAddress, txId, provider) {
    const vaultContract = await getVaultContract(vaultAddress, provider);
    const { id, votesNeeded } = await retryTransactionInfos(vaultContract, txId);
    const chainId = (await provider.getNetwork()).chainId;
    const queryString = getQuery("getTransactionById", chainId, {
        vaultAddress,
        txId: txId.toString(),
    });
    const query = gql `
    ${queryString}
  `;
    try {
        const data = await fetchSubgraphData(chainId, query);
        const resultKey = chainId === 421614 ? "TransactionProposed" : "transactionProposeds";
        const transaction = {
            id: id.toNumber(),
            transactionData: data[resultKey][0].transactionInfo,
            transactionNotes: data[resultKey][0].notes,
            signedTransactionsNeeded: Number(votesNeeded),
            userSignedTransactions: [],
        };
        return transaction;
    }
    catch (error) {
        return {
            id: 0,
            transactionData: "",
            transactionNotes: "",
            signedTransactionsNeeded: Number(votesNeeded),
            userSignedTransactions: [],
        };
    }
}
export async function getFilteredUserInitializedLogs(userAddress, provider) {
    let testFinalArray = [];
    const chainId = (await provider.getNetwork()).chainId;
    const queryString = getQuery("getVaultCreateds", chainId, { userAddress });
    const query = gql `
    ${queryString}
  `;
    try {
        const data = await fetchSubgraphData(chainId, query);
        const resultKey = chainId === 421614 ? "VaultCreated" : "vaultCreateds";
        if (data[resultKey]) {
            testFinalArray = data[resultKey].map((item) => item.vaultAddress);
        }
    }
    catch (error) {
    }
    const flatArray = testFinalArray.flat();
    return flatArray;
}
export async function getFilteredUserInitializedLogsSingle(userAddress, provider) {
    const date1 = new Date();
    const chainId = (await provider.getNetwork()).chainId;
    let testFinalArray = [];
    const queryString = getQuery("getVaultCreatedSingle", chainId, {
        userAddress,
    });
    const query = gql `
    ${queryString}
  `;
    try {
        const data = await fetchSubgraphData(chainId, query);
        const resultKey = chainId === 421614 ? "VaultCreated" : "vaultCreateds";
        if (data[resultKey]) {
            testFinalArray = data[resultKey].map((item) => item.vaultAddress);
        }
    }
    catch (error) {
    }
    const date2 = new Date();
    if (process.env.DEBUG) {
        console.log("getFilteredUserInitializedLogsSingle : ", date2.getTime() - date1.getTime());
    }
    return testFinalArray;
}
export async function getFilteredUserInitializedLogsSingleWithDeoa(masterPublicAddress, provider) {
    const date1 = new Date();
    const chainId = (await provider.getNetwork()).chainId;
    let testFinalArray = [];
    const queryString = getQuery("getVaultCompleted", chainId, {
        masterPublicAddress,
    });
    const query = gql `
    ${queryString}
  `;
    try {
        const data = await fetchSubgraphData(chainId, query);
        const resultKey = chainId === 421614 ? "VaultCompleted" : "vaultCompleteds";
        if (data[resultKey]) {
            testFinalArray = data[resultKey].map((item) => item.vaultAddress);
        }
    }
    catch (error) {
    }
    const date2 = new Date();
    if (process.env.DEBUG) {
        console.log("getFilteredUserInitializedLogsSingle : ", date2.getTime() - date1.getTime());
    }
    return testFinalArray;
}
async function _getVaultUser(vaultContract, userAddress) {
    const { isRegistered } = await vaultContract.userInfos(userAddress);
    return {
        address: userAddress,
        isRegistered: isRegistered,
    };
}
export async function getUsersMegaPublicKeysReShare(vaultAddress, provider) {
    const vaultContract = await getVaultContract(vaultAddress, provider);
    const { megaPublicKeyArray } = await getPreRegisterInfos(vaultAddress, provider);
    return megaPublicKeyArray;
}
export async function getRotationVaultAddresses(userAddress, provider) {
    const factoryContract = await getVaultFactoryContract(provider);
    const baseVaultAddress = await factoryContract.impl();
    const baseVault = await getVaultContract(baseVaultAddress, provider);
    const birthFactoryBlock = getContractsDetails((await provider.getNetwork()).chainId)?.VaultFactory.birthBlock;
    const filterVaultRotateUserRequested = baseVault.filters.VaultRotateUserRequested();
    const vaultRotateUserRequestedLogs = await provider.getLogs({
        ...filterVaultRotateUserRequested,
        fromBlock: birthFactoryBlock,
    });
    return vaultRotateUserRequestedLogs.map((log) => log.address);
}
export async function getSingleVaultDetails(vaultAddress, provider) {
    let vault = await getVault(vaultAddress, provider);
    const [proposals, transactions] = await Promise.all([
        Promise.all(Array.from({ length: vault.proposalCount }, (_, i) => getProposal(vaultAddress, i + 1, provider))),
        Promise.all(Array.from({ length: vault.transactionCount }, (_, i) => getTransaction(vaultAddress, i + 1, provider))),
    ]);
    return {
        ...vault,
        proposals: proposals,
        transactions: transactions,
    };
}
//# sourceMappingURL=providerfunctions.js.map