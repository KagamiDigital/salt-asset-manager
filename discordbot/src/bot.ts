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

const command_somnia_shannon = {
	name: "somnia-shannon",
	description: "Faucet Somnia Shannon tokens",
	type: ApplicationCommandOptionTypes.SubCommand,
	options: [
		{
			name: "recipient_address",
			description: "Your personal wallet address",
			type: ApplicationCommandOptionTypes.String,
			required: true,
		},
	],
};

const command_sepolia_arbitrum = {
	name: "arbitrum-sepolia-etherium",
	description: "Faucet Arbitrum Sepolia (Etherium) tokens",
	type: ApplicationCommandOptionTypes.SubCommand,
	options: [
		{
			name: "recipient_address",
			description: "Your personal wallet address",
			type: ApplicationCommandOptionTypes.String,
			required: true,
		},
	],
};

const command_sepolia_etherium = {
	name: "sepolia-etherium",
	description: "Faucet Sepolia (Etherium testnet) tokens",
	type: ApplicationCommandOptionTypes.SubCommand,
	options: [
		{
			name: "recipient_address",
			description: "Your personal wallet address",
			type: ApplicationCommandOptionTypes.String,
			required: true,
		},
	],
};

/// https://discordeno.js.org/docs/examples/reactionroles
const transaction_command = {
	name: "salt-faucet",
	description:
		"A faucet showcasing Salt's multi-signer authentication process in action",
	options: [
		// command_somnia_shannon,
		// command_sepolia_arbitrum,
		command_sepolia_etherium,
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

async function botTransfer(
	interaction: any,
	token_name: string,
	recipientAddress: string,
	rpc_node: string,
	chain_id: number,
	amount: number,
) {
	await interaction.respond({
		content: `Doing transaction ...\nTransferring ${amount} ${token_name} to ${recipientAddress}`,
	});

	try {
		await transaction(recipientAddress, amount, rpc_node, chain_id);
		await interaction.respond({
			content: "Transaction successful!",
		});
	} catch (err) {
		await interaction.respond({
			content: "Transaction failed",
		});
		let err_msg = String(err);
		const max_len = 1500;
		const truncated_note = err_msg.length > max_len ? "...<truncated>" : "";
		err_msg = err_msg.substring(0, Math.min(max_len, err_msg.length));

		await interaction.respond({
			content:
				"A transaction failed, pasting the error here:\n" +
				err_msg +
				truncated_note,
		});
	}
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

		console.log("Handling slash command", interaction.data);
		const parsed = commandOptionsParser(interaction) as any;
		console.log("Parsed slash command", parsed);

		if (parsed[command_somnia_shannon.name]) {
			// handle somnia shannon case
			await botTransfer(
				interaction,
				"SST",
				parsed[command_somnia_shannon.name].recipient_address,
				env.SOMNIA_SHANNON_RPC_ENDPOINT,
				50312,
				0.01,
			);
		} else if (parsed[command_sepolia_arbitrum.name]) {
			// handle sepolia arbitrum case
			await botTransfer(
				interaction,
				"ETH",
				parsed[command_sepolia_arbitrum.name].recipient_address,
				env.SEPOLIA_ARBITRUM_RPC_ENDPOINT,
				421614,
				0.01,
			);
		} else if (parsed[command_sepolia_etherium.name]) {
			// handle sepolia arbitrum case
			await botTransfer(
				interaction,
				"SepoliaETH",
				parsed[command_sepolia_etherium.name].recipient_address,
				env.SEPOLIA_ETHERIUM_RPC_ENDPOINT,
				11155111,
				0.01,
			);
		} else {
			await interaction.respond({
				content: "Invalid command",
			});
		}
	}
};

const events = {
	interactionCreate: event_handler,
};
bot.events = events;

console.log("Starting");
await bot.start();
