import fs from "fs";
import path from "path";

import { Client } from "discord.js";

import { Logger } from "../config/logger";

export async function registerEvents(client: Client) {
  const eventsPath = path.join(__dirname, "../events");

  if (!fs.existsSync(eventsPath)) {
    Logger.warn("Events folder not found.");
    return;
  }

  const files = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of files) {
    const { default: event } = await import(
  path.join(eventsPath, file)
);

    if (!event) continue;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }

    Logger.info(`Loaded event: ${event.name}`);
  }
}