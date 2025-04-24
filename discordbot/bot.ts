import { createBot } from "npm:@discordeno/bot";
import { parse } from "jsr:@std/toml";

// get cwd
const cwd = Deno.cwd();
console.log(cwd);

const file_str = await Deno.readTextFile("discord.env.toml");
const env = parse(file_str);
console.info(env);

const bot = createBot({
  token: env.BOT_APPLICATION_ID,
  events: {
    ready: ({ shardId }) => console.log(`Shard ${shardId} ready`),
  },
});

await bot.start();
