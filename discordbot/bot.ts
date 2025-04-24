import { createBot } from "npm:@discordeno/bot";
import { parse } from "jsr:@std/toml";

// get cwd
const cwd = Deno.cwd();
console.log(cwd);

const file_str = await Deno.readTextFile("discord.toml");
const env = parse(file_str);
console.info(env);

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
  name: "Salt Faucet",
  description: "Provides tokens from the testing Salt account",
};

await bot.rest.upsertGlobalApplicationCommands([transaction_command]);

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

    console.log("Handling slash command", interaction);
    // await command.execute(interaction, commandOptionsParser(interaction));
  }
};

const events = {
  interactionCreate: event_handler,
};
bot.events = events;

await bot.start();
