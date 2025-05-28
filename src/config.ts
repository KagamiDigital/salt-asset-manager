import { ethers } from "ethers";
import { Env } from "./env";

const private_symbol = Symbol();
export class Config {
	env: Env;
	orchestration_network_provider: ethers.providers.StaticJsonRpcProvider;
	broadcasting_network_provider: ethers.providers.StaticJsonRpcProvider;
	signer: ethers.Wallet;

	/** Use `Config.newFromEnv(env)` */
	constructor(dontcallme: Symbol) {
		if (dontcallme !== private_symbol) {
			throw new Error(
				"Don't manually construct instances of Config class, use Config.newFromEnv(env)",
			);
		}
	}

	/** Construct `Config` using this static method, e.g. `Config.newFromEnv(env)` */
	static async newFromEnv(env: Env) {
		const self = new Config(private_symbol);
		self.env = env;

		self.orchestration_network_provider =
			new ethers.providers.StaticJsonRpcProvider({
				url: self.env.ORCHESTRATION_NETWORK_RPC_NODE_URL,
				skipFetchSetup: true,
			});
		self.broadcasting_network_provider =
			new ethers.providers.StaticJsonRpcProvider({
				url: self.env.BROADCASTING_NETWORK_RPC_NODE_URL,
				skipFetchSetup: true,
			});

		await self.broadcasting_network_provider.ready;
		const network = await self.broadcasting_network_provider.getNetwork();
		console.log("Network ready!", network.chainId);

		self.signer = new ethers.Wallet(
			env.PRIVATE_KEY,
			self.orchestration_network_provider,
		);
		if (!self.signer.provider) {
			throw new Error("Provider for signer is undefined?");
		}

		return self;
	}
}
