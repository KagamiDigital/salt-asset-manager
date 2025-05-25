import VaultJson from "../services/web3/contracts/abi/Vault.json";
import VaultFactoryJson from "../services/web3/contracts/abi/VaultFactory.json";
import FeeJson from "../services/web3/contracts/abi/Fee.json";
import IdlJson from "./idl.json";
import ChainListJson from "./rawchainlist.json";
export async function loadJson(path) {
    const jsonMap = {
        [JSON_PATHS.VAULT]: VaultJson,
        [JSON_PATHS.VAULT_FACTORY]: VaultFactoryJson,
        [JSON_PATHS.FEE]: FeeJson,
        [JSON_PATHS.IDL]: IdlJson,
        [JSON_PATHS.CHAIN_LIST]: ChainListJson,
    };
    const data = jsonMap[path];
    if (!data) {
        throw new Error(`JSON file not found for path: ${path}`);
    }
    if (data.abi && path !== JSON_PATHS.IDL && path !== JSON_PATHS.CHAIN_LIST) {
        data.abi = data.abi.map((item) => ({
            ...item,
            gas: item.gas?.toString(),
        }));
    }
    return data;
}
export var JSON_PATHS;
(function (JSON_PATHS) {
    JSON_PATHS["VAULT"] = "VAULT";
    JSON_PATHS["VAULT_FACTORY"] = "VAULT_FACTORY";
    JSON_PATHS["FEE"] = "FEE";
    JSON_PATHS["CHAIN_LIST"] = "CHAIN_LIST";
    JSON_PATHS["IDL"] = "IDL";
})(JSON_PATHS || (JSON_PATHS = {}));
//# sourceMappingURL=json-imports.js.map