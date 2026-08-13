import fs from "fs";
import path from "path";

import { Client, Collection } from "discord.js";

import { SlashCommand } from "../types/command";
import { Logger } from "../config/logger";

declare module "discord.js" {
  interface Client {
    commands: Collection<string, SlashCommand>;
  }
}

export async function registerCommands(client: Client) {
  client.commands = new Collection();

  const commandsPath = path.join(__dirname, "../commands");

  if (!fs.existsSync(commandsPath)) {
    Logger.warn("Commands folder not found.");
    return;
  }

  const categories = fs.readdirSync(commandsPath);

  for (const category of categories) {
    // Prefix commands have their own handler.
    // Do not load them as slash commands.
    if (category === "prefix") {
      continue;
    }

    const categoryPath = path.join(commandsPath, category);

    const files = fs
      .readdirSync(categoryPath)
      .filter(
        (file) =>
          file.endsWith(".ts") ||
          file.endsWith(".js")
      );

    for (const file of files) {
      Logger.info(
        `Importing ${category}/${file}`
      );

      const imported = await import(
        path.join(categoryPath, file)
      );

      const command =
        imported.default?.default ??
        imported.default ??
        imported;

      if (!command.data?.name) {
        Logger.error(
          `Invalid command: ${category}/${file}`
        );

        console.dir(command, { depth: 2 });

        continue;
      }

      client.commands.set(
        command.data.name,
        command
      );

      Logger.info(
        `Loaded command: ${command.data.name}`
      );
    }
  }
}