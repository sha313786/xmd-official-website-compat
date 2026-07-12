import fs from "fs";
import path from "path";

import { REST, Routes } from "discord.js";

import { env } from "./config/env";
import { Logger } from "./config/logger";

const commands: object[] = [];

const commandsPath = path.join(__dirname, "commands");

function loadCommands(folder: string) {
  if (!fs.existsSync(folder)) return;

  const entries = fs.readdirSync(folder, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(folder, entry.name);

    if (entry.isDirectory()) {
      loadCommands(fullPath);
      continue;
    }

    if (!entry.name.endsWith(".ts") && !entry.name.endsWith(".js")) {
      continue;
    }

    const command = require(fullPath).default;

    if (command?.data) {
      commands.push(command.data.toJSON());
      Logger.info(`Found command: ${command.data.name}`);
    }
  }
}

loadCommands(commandsPath);

const rest = new REST({ version: "10" }).setToken(env.DISCORD_TOKEN);

(async () => {
  try {
    Logger.info(`Registering ${commands.length} slash command(s)...`);

    await rest.put(
      Routes.applicationGuildCommands(
        env.CLIENT_ID,
        env.GUILD_ID
      ),
      {
        body: commands,
      }
    );

    Logger.success("Slash commands registered.");
  } catch (error) {
    console.error(error);
  }
})();