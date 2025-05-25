import { createPublicClient, http, getContract, custom, defineChain, } from "viem";
import { ethers } from "ethers";
import { loadJson, JSON_PATHS } from "../../../utils/json-imports.js";
let VaultJson;
let VaultFactoryJson;
let FeeFactoryJson;
async function getVaultJson() {
    if (!VaultJson)
        VaultJson = await loadJson(JSON_PATHS.VAULT);
    return VaultJson;
}
async function getVaultFactoryJson() {
    if (!VaultFactoryJson)
        VaultFactoryJson = await loadJson(JSON_PATHS.VAULT_FACTORY);
    return VaultFactoryJson;
}
async function getFeeFactoryJson() {
    if (!FeeFactoryJson)
        FeeFactoryJson = await loadJson(JSON_PATHS.FEE);
    return FeeFactoryJson;
}
import getContractsDetails from "../contracts/contractInfos.js";
import { chainConfig } from "../../../tools/constants.js";
export async function createViemClient(provider) {
    let transport;
    let finalClient;
    let accounts;
    const isMetaMaskMobile = (provider?.provider?.namespace === "eip155" &&
        provider?.provider?.name?.includes("MetaMask")) ||
        (provider?.namespace === "eip155" &&
            provider?.name?.includes("MetaMask")) ||
        provider?.provider?.namespace === "eip155" ||
        provider?.namespace === "eip155";
    const isBrowserExtension = typeof window !== "undefined" && window.ethereum;
    const isValidRpcUrl = (url) => /^(https?|wss?):\/\//.test(url);
    const isDirectRpcProvider = (!!provider?.connection?.url && isValidRpcUrl(provider.connection.url)) ||
        (!!provider?.provider?.connection?.url &&
            isValidRpcUrl(provider.provider.connection.url));
    if (isDirectRpcProvider) {
        let p = provider;
        transport = http(p.connection.url);
        const chainId = await provider
            .getNetwork()
            .then((network) => network.chainId);
        const chainResult = chainConfig(chainId, transport);
        finalClient = createPublicClient(chainResult || {
            chain: defineChain({
                name: "Unknown Chain",
                id: chainId,
                rpcUrls: {
                    default: {
                        http: [p.connection.url],
                    },
                },
                nativeCurrency: {
                    name: "Unknown",
                    symbol: "UNK",
                    decimals: 18,
                },
            }),
            transport,
        });
        return finalClient;
    }
    if (isMetaMaskMobile) {
        try {
            if (provider?.provider) {
                accounts = await provider.provider.request({ method: "eth_accounts" });
            }
            else {
                accounts = await provider.request({ method: "eth_accounts" });
            }
        }
        catch (error) {
            console.error("Error getting accounts from MetaMask Mobile:", error);
        }
    }
    else if (isBrowserExtension) {
        try {
            accounts = await window.ethereum.request({ method: "eth_accounts" });
        }
        catch (error) { }
    }
    if (isMetaMaskMobile || isBrowserExtension) {
        console.log("extension provider");
        if (provider?.provider) {
            transport = custom(provider.provider);
        }
        else if (isBrowserExtension &&
            (window.ethereum?.isMetaMask ||
                window.ethereum?.isRainbow ||
                window.ethereum?.isCoinbaseWallet ||
                window.ethereum?.isTrust)) {
            transport = custom(window.ethereum);
        }
        else {
            transport = custom(provider);
        }
        const chainId = await provider
            .getNetwork()
            .then((network) => network.chainId);
        const chainResult = chainConfig(chainId, transport);
        finalClient = createPublicClient(chainResult || {
            chain: defineChain({
                name: "Unknown Chain",
                id: chainId,
                rpcUrls: {
                    default: {
                        http: [],
                    },
                },
                nativeCurrency: {
                    name: "Unknown",
                    symbol: "UNK",
                    decimals: 18,
                },
            }),
            transport,
        });
    }
    else {
        console.log("NOT extension provider -- shouldn't reach here");
        let p = provider;
        transport = http(p.connection.url);
        const chainId = await provider
            .getNetwork()
            .then((network) => network.chainId);
        const chainResult = chainConfig(chainId, transport);
        finalClient = createPublicClient(chainResult || {
            chain: defineChain({
                name: "Unknown Chain",
                id: chainId,
                rpcUrls: {
                    default: {
                        http: [],
                    },
                },
                nativeCurrency: {
                    name: "Unknown",
                    symbol: "UNK",
                    decimals: 18,
                },
            }),
            transport,
        });
    }
    return finalClient;
}
export async function createViemClientForTransaction(provider) {
    let transport = http(provider.connection.url);
    const cpc = createPublicClient({
        transport,
    });
    console.log(cpc);
    return cpc;
}
export async function getVaultContractViem(address, client) {
    const vaultJson = await getVaultJson();
    return getContract({
        address: address,
        abi: vaultJson.abi,
        client,
    });
}
export async function getVaultFactoryContractViem(provider) {
    const client = await createViemClient(provider);
    const FACTORY_ADDRESS = getContractsDetails((await provider.getNetwork()).chainId)?.VaultFactory.address;
    const vaultJson = await getVaultJson();
    return getContract({
        address: FACTORY_ADDRESS,
        abi: vaultJson.abi,
        client,
    });
}
export async function getVaultFactoryContract(provider) {
    const FACTORY_ADDRESS = getContractsDetails((await provider.getNetwork()).chainId)?.VaultFactory.address;
    const vaultFactoryJson = await getVaultFactoryJson();
    return new ethers.Contract(FACTORY_ADDRESS, vaultFactoryJson.abi, provider);
}
export async function getFeeContract(provider) {
    const vaultFactoryContract = await getVaultFactoryContract(provider);
    const FEE_ADDRESS = await vaultFactoryContract.feeContractAddress();
    const feeFactoryJson = await getFeeFactoryJson();
    return new ethers.Contract(FEE_ADDRESS, feeFactoryJson.abi, provider);
}
export async function getVaultContract(vaultAddress, provider) {
    const vaultJson = await getVaultJson();
    return new ethers.Contract(vaultAddress, vaultJson.abi, provider);
}
export function encodeStringToHex(str) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}
export function hexToString(hexString) {
    const hex = hexString.startsWith("0x") ? hexString.slice(2) : hexString;
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
}
//# sourceMappingURL=index.js.map