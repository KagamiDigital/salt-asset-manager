//! Provides a type-safe and checked access to expected environment variables
//! Also, loads these from a .env file

import * as dotenv from "dotenv";
dotenv.config();

export class Env {
	static expected = {
		ORCHESTRATION_NETWORK_RPC_NODE_URL: String,
		PRIVATE_KEY: String,
		BROADCASTING_NETWORK_RPC_NODE_URL: String,
		BROADCASTING_NETWORK_ID: String,
	};
	ORCHESTRATION_NETWORK_RPC_NODE_URL: string;
	PRIVATE_KEY: string;
	BROADCASTING_NETWORK_RPC_NODE_URL: string;
	BROADCASTING_NETWORK_ID: string;

	constructor(raw_input) {
		const input = raw_input ?? process.env;
		for (const key in Env.expected) {
			if (!input[key]) {
				throw new Error(
					`${key} is not defined in new Config(input) after looking in local .env file`,
				);
			}
			try {
				input[key] = Env.expected[key](input[key]);
			} catch (err) {
				throw new Error(
					`ENV input at key ${key} wasn't of the expected type (see cause)`,
					{ cause: err },
				);
			}
		}
	}
}