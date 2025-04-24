import { createBot } from "npm:@discordeno/bot";
import { parse } from "jsr:@std/toml";

// get cwd
const cwd = Deno.cwd();
console.log(cwd);

const file_str = await Deno.readTextFile("discord.toml");
const env = parse(file_str);
console.info(env);

const bot = createBot({
  token: env.BOT_TOKEN,
  events: {
    ready: ({ shardId }) => console.log(`Shard ${shardId} ready`),
  },
});

/// https://discordeno.js.org/docs/examples/reactionroles
const transaction_command = {
  name: "Salt Faucet",
  description: "Provides tokens from the testing Salt account",
};

/// First is testing, second is actual Salt server
const TESTING_GUILD = "1334470308198875252";
const PROD_GUILD = "1343280000144773242";
const guildIDs = ["1334470308198875252"];

for (const guildId in guildIDs) {
  await bot.rest.upsertGuildApplicationCommands(guildId, [transaction_command]);
}

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
