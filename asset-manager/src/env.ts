//! Provides a type-safe and checked access to expected environment variables
//! Also, loads these from a .env file

import * as dotenv from "dotenv";

dotenv.config();

const expected = {
	ORCHESTRATION_NETWORK_RPC_NODE_URL: String,
	PRIVATE_KEY: String,
	BROADCASTING_NETWORK_RPC_NODE_URL: String,
	BROADCASTING_NETWORK_ID: String,
};
export type ENV = {
	ORCHESTRATION_NETWORK_RPC_NODE_URL: string;
	PRIVATE_KEY: string;
	BROADCASTING_NETWORK_RPC_NODE_URL: string;
	BROADCASTING_NETWORK_ID: string;
};

const env_raw = process.env;

for (const key in expected) {
	if (!env_raw[key]) {
		throw new Error(
			`${key} is not defined in process.env after looking in local .env file`,
		);
	}
}

const env = {
	ORCHESTRATION_NETWORK_RPC_NODE_URL:
		env_raw.ORCHESTRATION_NETWORK_RPC_NODE_URL,
	PRIVATE_KEY: env_raw.PRIVATE_KEY,
	BROADCASTING_NETWORK_RPC_NODE_URL: env_raw.BROADCASTING_NETWORK_RPC_NODE_URL,
	BROADCASTING_NETWORK_ID: env_raw.BROADCASTING_NETWORK_ID,
} as ENV;

export default env;
export { env };
