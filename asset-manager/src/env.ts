//! Provides a type-safe and checked access to expected environment variables
//! Also, loads these from a .env file

import * as dotenv from "dotenv";

dotenv.config();

const env = process.env as {
  ORCHESTRATION_NETWORK_RPC_NODE_URL: string;
  PRIVATE_KEY: string;
  BROADCASTING_NETWORK_RPC_NODE_URL: string;
  BROADCASTING_NETWORK_ID: string;
};

if (!env.ORCHESTRATION_NETWORK_RPC_NODE_URL) {
  throw new Error("ORCHESTRATION_NETWORK_RPC_NODE_URL is not defined");
}

if (!env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not defined");
}

if (!env.BROADCASTING_NETWORK_RPC_NODE_URL) {
  throw new Error("BROADCASTING_NETWORK_RPC_NODE_URL is not defined");
}

if (!env.BROADCASTING_NETWORK_ID) {
  throw new Error("BROADCASTING_NETWORK_ID is not defined");
}

console.info("Env", env);
export default env;
