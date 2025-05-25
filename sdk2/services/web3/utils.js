import { ethers } from "ethers";
import { getVaultContract } from "./helper/index.js";
import { createViemClient, getVaultContractViem } from "./helper/index.js";
import { gql, request } from "graphql-request";
import { getGraphEndpoint } from "../../tools/constants.js";
import { getQuery } from "../../tools/graph.js";
export async function fetchSubgraphData(chainId, query) {
    const graphqlEndpoint = getGraphEndpoint(chainId);
    try {
        const response = await request(graphqlEndpoint, query);
        return response;
    }
    catch (error) {
        if (error.response) {
            console.error("Error response:", JSON.stringify(error.response, null, 2));
        }
        return null;
    }
}
export async function getUserIndex(vaultAddress, userAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = await getVaultContractViem(vaultAddress, client);
    const vaultInfos = await vaultContract.read.vaultInfos();
    const users = vaultInfos.users;
    const index = users.findIndex((address) => address.toLowerCase() === userAddress.toLowerCase());
    if (index < 0) {
        const userToAdd = await vaultContract.getUserToAdd();
        const matchedUserIndex = userToAdd.findIndex((user) => user.toLowerCase() === userAddress.toLowerCase());
        if (matchedUserIndex >= 0) {
            return users.length + matchedUserIndex;
        }
        else {
            throw new Error(`the given userAddress: ${userAddress} is not found in the user list of the vault address: ${vaultAddress}`);
        }
    }
    return index;
}
export async function getUserPreRegisterInfos(vaultAddress, userAddress, provider) {
    if (provider.isMetaMask || provider.isRainbow) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    const chainId = (await provider.getNetwork()).chainId;
    const queryString = getQuery("vaultUserPreRegister", chainId, {
        vaultAddress,
        userAddress,
    });
    const query = gql `
    ${queryString}
  `;
    const data = await fetchSubgraphData(chainId, query);
    if (!data) {
        return {
            user: userAddress,
            registered: false,
            parisEncKey: "",
            megaPublicKey: "",
            encMegaSecretKey: "",
            dbKey: "",
        };
    }
    const resultKey = chainId === 421614 ? "VaultUserPreRegister" : "vaultUserPreRegisters";
    if (data[resultKey] && data[resultKey].length > 0) {
        const userPreRegister = data[resultKey].find((entry) => entry.user.toLowerCase() === userAddress.toLowerCase());
        if (userPreRegister) {
            return {
                user: userPreRegister.user,
                registered: true,
                parisEncKey: userPreRegister.parisEncKey,
                megaPublicKey: userPreRegister.megaPublicKey,
                encMegaSecretKey: userPreRegister.encSharedKey,
                dbKey: userPreRegister.dbKey,
            };
        }
    }
    return {
        user: userAddress,
        registered: false,
        parisEncKey: "",
        megaPublicKey: "",
        encMegaSecretKey: "",
        dbKey: "",
    };
}
export async function getUserRegistrationAllInfos(vaultAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = await getVaultContractViem(vaultAddress, client);
    const [vaultInfo] = await Promise.all([
        vaultContract.read.vaultInfos(),
        client.getBlockNumber(),
    ]);
    let users = vaultInfo.users;
    const userRegistrations = new Array(users.length).fill(null);
    const chainId = (await provider.getNetwork()).chainId;
    const queryString = getQuery("vaultUserRegisteredAll", chainId, {
        vaultAddress,
    });
    const query = gql `
    ${queryString}
  `;
    const data = await fetchSubgraphData(chainId, query);
    const resultKey = chainId === 421614 ? "VaultUserRegisteredAll" : "vaultUserRegisteredAlls";
    if (data && data[resultKey]) {
        data[resultKey].forEach((registration) => {
            const userIndex = users.findIndex((user) => user.toLowerCase() === registration.user.toLowerCase());
            if (userIndex !== -1) {
                userRegistrations[userIndex] = {
                    user: registration.user,
                    registered: true,
                    step1Dealings: registration.step1Dealings || "",
                    pedersenOpeningKey: registration.openingKey || "",
                    pedersenOpeningKappa: registration.openingKappa || "",
                    pedersenOpeningLambda: registration.openingLambda || "",
                    simpleDealingKey: registration.simpleDealingKey || "",
                    simpleDealingKappa: registration.simpleDealingKappa || "",
                    pedersenTranscriptKey: registration.transcriptKey || "",
                    pedersenTranscriptKappa: registration.transcriptKappa || "",
                    pedersenTranscriptLambda: registration.transcriptLambda || "",
                    step3Crypto: registration.step3Crypto || "",
                };
            }
        });
    }
    return userRegistrations;
}
export async function getPreRegisterInfos(vaultAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = await getVaultContractViem(vaultAddress, client);
    const [vaultInfos, userToAdd = [], userToRemove = []] = await Promise.all([
        vaultContract.read.vaultInfos(),
        vaultContract.read.getUserToAdd().catch(() => []),
        vaultContract.read.getUserToRemove().catch(() => []),
    ]);
    let users = vaultInfos.users;
    if (userToAdd.length > 0) {
        users = [...users, ...userToAdd];
    }
    const parisEncKeyArray = new Array(users.length).fill("");
    const megaPublicKeyArray = new Array(users.length).fill("");
    const encMegaSecretKeyArray = new Array(users.length).fill("");
    const dbPublicKeyArray = new Array(users.length).fill("");
    const chainId = (await provider.getNetwork()).chainId;
    const queryString = getQuery("vaultUserPreRegister", chainId, {
        vaultAddress,
    });
    const query = gql `
    ${queryString}
  `;
    const data = await fetchSubgraphData(chainId, query);
    const resultKey = chainId === 421614 ? "VaultUserPreRegister" : "vaultUserPreRegisters";
    if (data && data[resultKey]) {
        data[resultKey].forEach((preRegister) => {
            const userIndex = users.findIndex((user) => user.toLowerCase() === preRegister.user.toLowerCase());
            if (userIndex !== -1) {
                parisEncKeyArray[userIndex] = preRegister.parisEncKey || "";
                megaPublicKeyArray[userIndex] = preRegister.megaPublicKey || "";
                encMegaSecretKeyArray[userIndex] = preRegister.encSharedKey || "";
                dbPublicKeyArray[userIndex] = preRegister.dbKey || "";
            }
        });
    }
    return {
        parisEncKeyArray,
        megaPublicKeyArray,
        encMegaSecretKeyArray,
        dbPublicKeyArray,
    };
}
export async function getRegistrationStep3InfosDB(vaultAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = await getVaultContractViem(vaultAddress, client);
    const { users } = await vaultContract.read.vaultInfos();
    const simpleKeyArray = [];
    const simpleKappaArray = [];
    const dealingKeyXLambdaArray = [];
    const dealingKappaXLambdaArray = [];
    const chainId = (await provider.getNetwork()).chainId;
    const queryString = getQuery("vaultUserRegisteredAll", chainId, {
        vaultAddress,
    });
    const query = gql `
    ${queryString}
  `;
    const data = await fetchSubgraphData(chainId, query);
    const resultKey = chainId === 421614 ? "VaultUserRegisteredAll" : "vaultUserRegisteredAll";
    if (data && data[resultKey]) {
        data[resultKey].forEach((registration) => {
            const userIndex = users.findIndex((user) => user.toLowerCase() === registration.user.toLowerCase());
            if (userIndex !== -1) {
                const step3Result = JSON.parse(atob(registration.step3Crypto));
                simpleKeyArray[userIndex] = step3Result[0];
                simpleKappaArray[userIndex] = step3Result[1];
                dealingKeyXLambdaArray[userIndex] = step3Result[2];
                dealingKappaXLambdaArray[userIndex] = step3Result[3];
            }
        });
    }
    return {
        simpleKeyArray,
        simpleKappaArray,
        dealingKeyXLambdaArray,
        dealingKappaXLambdaArray,
    };
}
export async function getRegistrationReshareStep3InfosDB(vaultAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = await getVaultContractViem(vaultAddress, client);
    const { users } = await vaultContract.read.vaultInfos();
    const pedersenDealingsLambdaReshareArray = [];
    const dealingsKeyXLambdaReshareArray = [];
    const dealingsKappaXLambdaReshareArray = [];
    const chainId = (await provider.getNetwork()).chainId;
    const queryString = getQuery("getUserReSharingStep1Info", chainId, {
        vaultAddress,
    });
    const query = gql `
    ${queryString}
  `;
    const data = await fetchSubgraphData(chainId, query);
    const resultKey = chainId === 421614 ? "UserReSharingStep1Info" : "userReSharingStep1Infos";
    if (data && data[resultKey]) {
        data[resultKey].forEach((registration) => {
            const userIndex = users.findIndex((user) => user.toLowerCase() === registration.user.toLowerCase());
            if (userIndex !== -1) {
                const step3Result = JSON.parse(atob(registration[userIndex].step3Crypto));
                const step1Result = JSON.parse(atob(registration[userIndex].step1Dealings));
                pedersenDealingsLambdaReshareArray[userIndex] = step1Result[2];
                dealingsKeyXLambdaReshareArray[userIndex] = step3Result[2];
                dealingsKappaXLambdaReshareArray[userIndex] = step3Result[3];
            }
        });
    }
    return {
        pedersenDealingsLambdaReshareArray,
        dealingsKeyXLambdaReshareArray,
        dealingsKappaXLambdaReshareArray,
    };
}
export async function getUtilsParams(vaultAddress, userAddress, provider) {
    const client = await createViemClient(provider);
    const vaultContract = await getVaultContractViem(vaultAddress, client);
    const { transactionThreshold, seed } = await vaultContract.read.vaultInfos();
    const index = await getUserIndex(vaultAddress, userAddress, provider);
    let megaPublicKeyArray = [];
    let encMegaSecretKey = [];
    let dbKeyArray = [];
    let result = await getPreRegisterInfos(vaultAddress, provider);
    megaPublicKeyArray = result.megaPublicKeyArray;
    encMegaSecretKey = result.encMegaSecretKeyArray;
    dbKeyArray = result.dbPublicKeyArray;
    return {
        seed: seed,
        threshold: Number(transactionThreshold),
        index: index,
        megaPkArray: megaPublicKeyArray,
        encMegaSecretKey: encMegaSecretKey,
        dbKeyArray: dbKeyArray,
    };
}
export async function getUserSignature(vaultAddress, signer) {
    const vaultContract = await getVaultContract(vaultAddress, signer.provider);
    let { encryptionMessage } = await vaultContract.vaultInfos();
    const domain = {};
    const types = {
        SigningVaultEncryptionMessage: [
            { name: "to use your secret share", type: "string" },
        ],
    };
    const value = {
        "to use your secret share": encryptionMessage,
    };
    const finalSigner = signer;
    let result = await finalSigner._signTypedData(domain, types, value);
    return result;
}
//# sourceMappingURL=utils.js.map