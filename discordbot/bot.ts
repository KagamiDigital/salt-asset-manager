import { createBot } from "npm:@discordeno/bot";

const env = await load();

const bot = createBot({
  token: env.token,
  events: {
    ready: ({ shardId }) => console.log(`Shard ${shardId} ready`),
  },
});

await bot.start();
