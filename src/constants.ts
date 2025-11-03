import * as dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

export const orchestration_network_provider =
	new ethers.providers.StaticJsonRpcProvider({
		url: process.env.ORCHESTRATION_NETWORK_RPC_NODE_URL || "",
		skipFetchSetup: true,
	});
export const broadcasting_network_provider =
	new ethers.providers.StaticJsonRpcProvider({
		url: process.env.BROADCASTING_NETWORK_RPC_NODE_URL || "",
		skipFetchSetup: true,
	});

export const ___local_wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
const wallet = ___local_wallet;

export const signer = wallet.connect(orchestration_network_provider);
