import { Events } from "discord.js";

import { client } from "./client";

import { env } from "./config/env";
import { Logger } from "./config/logger";

import { registerCommands } from "./handlers/command-handler";
import { registerEvents } from "./handlers/event-handler";

import { HealthService } from "./services/health.service";
import { StatusDashboardService } from "./services/status-dashboard.service";

async function bootstrap() {
  await registerCommands(client);
  await registerEvents(client);

  await client.login(env.DISCORD_TOKEN);
}

bootstrap().catch((error) => {
  Logger.error("Failed to start bot:", error);
  process.exit(1);
});

// Client Ready
client.once(Events.ClientReady, (readyClient) => {
  Logger.success(`Logged in as ${readyClient.user.tag}`);
  Logger.info(`${client.commands.size} command(s) loaded.`);

  HealthService.start();
  StatusDashboardService.start();
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (reason) => {
  Logger.error("Unhandled Promise Rejection:", reason);
});

// Uncaught Exceptions
process.on("uncaughtException", (error) => {
  Logger.error("Uncaught Exception:", error);
});

// Graceful Shutdown
async function shutdown(signal: string) {
  Logger.warn(`${signal} received. Shutting down...`);

  try {
    HealthService.stop();
    StatusDashboardService.stop();

    client.destroy();

    Logger.success("Discord client disconnected.");
  } catch (error) {
    Logger.error("Error during shutdown:", error);
  } finally {
    process.exit(0);
  }
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});