//! Loads config found in config.toml

import { parse } from "jsr:@std/toml";

// get cwd
const cwd = Deno.cwd();
console.log(cwd);

const file_str = await Deno.readTextFile("discord.toml");
const env = parse(file_str) as {
  BOT_APPLICATION_ID: string;
  BOT_TOKEN: string;
  SOMNIA_SHANNON_RPC_ENDPOINT: string;
  FAUCET_TESTNET_SALT_ACCOUNT_ADDRESS: string;
  PRIVATE_KEY: string;
  ORCHESTRATION_NETWORK_RPC_NODE_URL: string;
};
console.info(env);

if (
  !env.BOT_APPLICATION_ID ||
  !env.BOT_TOKEN ||
  !env.SOMNIA_SHANNON_RPC_ENDPOINT ||
  !env.FAUCET_TESTNET_SALT_ACCOUNT_ADDRESS ||
  !env.PRIVATE_KEY ||
  !env.ORCHESTRATION_NETWORK_RPC_NODE_URL
) {
  console.error("Missing required key in discord.toml");
  Deno.exit(1);
}

export default env;
