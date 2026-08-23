import fs from "fs";
import path from "path";

import {
  Client,
  Message,
} from "discord.js";

import { Logger } from "../config/logger";
import { PrefixConfig } from "../config/prefix";
import { PrefixCommand } from "../types/prefix-command";

const prefixCommands = new Map<string, PrefixCommand>();

let loaded = false;

function loadPrefixCommands() {
  if (loaded) return;

  const commandsPath = path.join(
    __dirname,
    "../commands/prefix"
  );

  if (!fs.existsSync(commandsPath)) {
    Logger.warn("Prefix commands folder not found.");
    return;
  }

  const files = fs
    .readdirSync(commandsPath)
    .filter(
      (file) =>
        file.endsWith(".ts") ||
        file.endsWith(".js")
    );

  for (const file of files) {
    const fullPath = path.join(
      commandsPath,
      file
    );

    try {
      const imported = require(fullPath);

      const command =
        imported.default?.default ??
        imported.default ??
        imported;

      if (!command?.name) {
        Logger.error(
          `Invalid prefix command: ${file}`
        );

        continue;
      }

      prefixCommands.set(
        command.name.toLowerCase(),
        command
      );

      for (const alias of command.aliases ?? []) {
        prefixCommands.set(
          alias.toLowerCase(),
          command
        );
      }

      Logger.info(
        `Loaded prefix command: ${command.name}`
      );
    } catch (error) {
      Logger.error(
        `Failed to load prefix command: ${file}`
      );

      console.error(error);
    }
  }

  loaded = true;
}

export async function handlePrefixCommand(
  client: Client,
  message: Message
) {
  if (message.author.bot) return;

  if (!message.guild) return;

  const prefix = PrefixConfig.PREFIX;

  if (!message.content.startsWith(prefix)) {
    return;
  }

  const content = message.content
    .slice(prefix.length)
    .trim();

  if (!content) return;

  const parts = content.split(/\s+/);

  const commandName = parts
    .shift()
    ?.toLowerCase();

  if (!commandName) return;

  loadPrefixCommands();

  const command =
    prefixCommands.get(commandName);

  if (!command) return;

  const args = parts;

  try {
    await command.execute(
      client,
      message,
      args
    );
    } catch (error) {
    Logger.error(
      `Prefix command failed: ${commandName}`
    );

    console.error(error);

    await message.reply(
      "❌ An error occurred while executing this command."
    );
  }
}