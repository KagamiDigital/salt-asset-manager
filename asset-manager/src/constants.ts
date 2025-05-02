import { ethers } from "ethers";
import env from "./env";

export const orchestration_network_provider =
	new ethers.providers.StaticJsonRpcProvider({
		url: env.ORCHESTRATION_NETWORK_RPC_NODE_URL,
		skipFetchSetup: true,
	});
export const broadcasting_network_provider =
	new ethers.providers.StaticJsonRpcProvider({
		url: env.BROADCASTING_NETWORK_RPC_NODE_URL,
		skipFetchSetup: true,
	});

await broadcasting_network_provider.ready;
const network = await broadcasting_network_provider.getNetwork();
console.log("Network ready!", network.chainId);

const wallet = new ethers.Wallet(env.PRIVATE_KEY);

export const signer = wallet.connect(orchestration_network_provider);
