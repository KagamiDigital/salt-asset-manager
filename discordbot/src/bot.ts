import {
  createBot,
  InteractionTypes,
  ApplicationCommandOptionTypes,
  commandOptionsParser,
} from "npm:@discordeno/bot";
import env from "./config.ts";
import { transaction } from "./asset-manager.ts";
// import { InteractionTypes } from "npm:@discordeno/bot"

const bot = createBot({
  applicationId: env.BOT_APPLICATION_ID as string,
  token: env.BOT_TOKEN as string,
  events: {
    ready: ({ shardId }) => console.log(`Shard ${shardId} ready`),
  },
  desiredProperties: {
    interaction: {
      id: true,
      data: true,
      type: true,
      token: true,
      channelId: true,
    },
  },
});

/// https://discordeno.js.org/docs/examples/reactionroles
const transaction_command = {
  name: "salt-faucet",
  description:
    "A faucet showcasing Salt's multi-signer authentication process in action",
  options: [
    {
      name: "somnia-shannon",
      description: "Faucet Somnia Shannon tokens",
      type: ApplicationCommandOptionTypes.SubCommand,
      options: [
        {
          name: "recipient_address",
          description: "Your personal/Salt Somnia Shannon wallet address",
          type: ApplicationCommandOptionTypes.String,
          required: true,
        },
      ],
    },
  ],
};

let ret = await bot.rest.upsertGlobalApplicationCommands([transaction_command]);
console.log("Upserted application commands", ret);

export const event_handler: typeof bot.events.interactionCreate = async (
  interaction,
) => {
  if (interaction.type === InteractionTypes.ApplicationCommand) {
    if (!interaction.data) return;

    if (interaction.data.name !== transaction_command.name) {
      console.warn(
        "Skipping handling command with invalid name",
        interaction.data.name,
      );
      return;
    }
    // const command = commands.get(interaction.data.name);
    // if (!command) return;

    console.log("Handling slash command", interaction.data);

    const parsed = commandOptionsParser(interaction);
    console.log("Parsed slash command", parsed);

    // handle somnia shannon case
    const somnia_shannon = transaction_command.options[0].name;
    if (parsed[somnia_shannon]) {
      const parsed2 = parsed[somnia_shannon] as { recipient_address: string };
      const recipientAddress = parsed2["recipient_address"] as string;
      const rpc_node = env.SOMNIA_SHANNON_RPC_ENDPOINT;
      // somnia shannon chain ID, effectively a constant
      const somnia_shannon_chain_id = 50312;
      const amount = 0.01;
      
      await transaction(
        recipientAddress,
        amount,
        rpc_node,
        somnia_shannon_chain_id,
      );
    }
  }
};

const events = {
  interactionCreate: event_handler,
};
bot.events = events;

console.log("Starting");
await bot.start();
