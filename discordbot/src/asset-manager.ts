//! Manages the integration between this `deno` runtime and the `node` runtime of the
//! asset manager
//! This is done by assuming a checkout of this repo exists *WITHOUT* a .env file,
//! and uses a CLI interface instead of a user-friendly terminal interface

import env from "./config.ts";
import { which } from "jsr:@david/which";

/** Calls across the CLI boundary, reads from discord.toml */
export async function transaction(
  recipientAddress: string,
  amount: string | number,
  broadcasting_rpc_node_url: string,
  broadcasting_network_id: string | number,
) {
  const npm_path = await which("npm");
  if (!npm_path) {
    throw new Error("npm not found");
  }

  // spawns sub process with cli args
  const command = new Deno.Command(npm_path, {
    args: [
      "run",
      "startwebpacked",
      "--",
      "-use-cli-only",
      "-vault-address",
      env.FAUCET_TESTNET_SALT_ACCOUNT_ADDRESS,
      "-recipient-address",
      recipientAddress,
      "-amount",
      String(amount),
    ],
    clearEnv: true,
    env: {
      PATH: Deno.env.get("PATH"),
      ORCHESTRATION_NETWORK_RPC_NODE_URL:
        env.ORCHESTRATION_NETWORK_RPC_NODE_URL,
      PRIVATE_KEY: env.PRIVATE_KEY,
      BROADCASTING_NETWORK_RPC_NODE_URL: broadcasting_rpc_node_url,
      BROADCASTING_NETWORK_ID: String(broadcasting_network_id),
    },
    cwd: env.ASSET_MANAGER_FOLDER,
    stdout: "piped",
    stderr: "piped",
    stdin: "null",
  });

  const process = command.spawn();

  const { code, stdout, stderr } = await process.output();
  const stdout2 = new TextDecoder("utf-8").decode(stdout);
  const stderr2 = new TextDecoder("utf-8").decode(stderr);
  console.log("asset-manager subprocess finished:", stdout2, stderr2);
  if (code !== 0) {
    const msg = `asset-manager subprocess failed with code ${code}\nStderr:\n${stderr2}\nStdout:\n${stdout2}`;
    console.error(msg);
    throw new Error(msg);
  }
}
