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
		user: {
			id: true,
		},
		message: {
			id: true,
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
		{
			name: "arbitrum-sepolia-etherium",
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

const ret = await bot.rest.upsertGlobalApplicationCommands([
	transaction_command,
]);
console.log("Upserted application commands", ret);

// const ret2 = await bot.rest.sendMessage(env.BOT_LOGGING_CHANNEL_ID, {
//   content: "Bot started",
// });
// console.log("Sent logging message", ret2);

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

		const somnia_shannon = transaction_command.options[0].name;
		const sepolia_arbitrum = transaction_command.options[1].name;
		if (parsed[somnia_shannon]) {
			// handle somnia shannon case
			const parsed2 = parsed[somnia_shannon] as { recipient_address: string };
			const recipientAddress = parsed2["recipient_address"] as string;
			const rpc_node = env.SOMNIA_SHANNON_RPC_ENDPOINT;
			// somnia shannon chain ID, effectively a constant
			const somnia_shannon_chain_id = 50312;
			const amount = 0.01;

			await interaction.respond({
				content: `Doing transaction ...\nTransferring ${amount} SST to ${recipientAddress}`,
			});

			try {
				await transaction(
					recipientAddress,
					amount,
					rpc_node,
					somnia_shannon_chain_id,
				);
				await interaction.respond({
					content: "Transaction successful!",
				});
			} catch (err) {
				await interaction.respond({
					content: "Transaction failed",
				});
				let err_msg = String(err);
				const max_len = 1500;
				err_msg = err_msg.substring(0, Math.min(max_len, err_msg.length));
				const truncated_note = err_msg.length > max_len ? "...<truncated>" : "";

				await interaction.respond({
					content:
						"A transaction failed, pasting the error here:\n" +
						String(err) +
						truncated_note,
				});
			}
		} else if (parsed[sepolia_arbitrum]) {
			// handle sepolia arbitrum case
			const parsed2 = parsed[sepolia_arbitrum] as { recipient_address: string };
			const recipientAddress = parsed2["recipient_address"] as string;
			const rpc_node = env.SEPOLIA_ARBITRUM_RPC_ENDPOINT;
			// somnia shannon chain ID, effectively a constant
			const sepolia_arbitrum_chain_id = 421614;
			const amount = 0.01;

			await interaction.respond({
				content: `Doing transaction ...\nTransferring ${amount} ETH to ${recipientAddress}`,
			});

			try {
				await transaction(
					recipientAddress,
					amount,
					rpc_node,
					sepolia_arbitrum_chain_id,
				);
				await interaction.respond({
					content: "Transaction successful!",
				});
			} catch (err) {
				await interaction.respond({
					content: "Transaction failed",
				});
				let err_msg = String(err);
				const max_len = 1500;
				err_msg = err_msg.substring(0, Math.min(max_len, err_msg.length));
				const truncated_note = err_msg.length > max_len ? "...<truncated>" : "";

				await interaction.respond({
					content:
						"A transaction failed, pasting the error here:\n" +
						String(err) +
						truncated_note,
				});
				console.log("Finished handling error");
			}
		}
	}
};

const events = {
	interactionCreate: event_handler,
};
bot.events = events;

console.log("Starting");
await bot.start();
