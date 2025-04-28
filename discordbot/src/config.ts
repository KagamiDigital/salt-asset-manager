//! Loads config found in config.toml

const config_text = await Deno.readTextFile("discord.toml");
