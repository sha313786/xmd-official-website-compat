import http from "http";
import { Events } from "discord.js";

import { client } from "./client";

import { env } from "./config/env";
import { Logger } from "./config/logger";
import { liveLogs, recordLiveLog } from "./utils/live-logger";

import { registerCommands } from "./handlers/command-handler";
import { registerEvents } from "./handlers/event-handler";

import { HealthService } from "./services/health.service";
import { StatusDashboardService } from "./services/status-dashboard.service";
import { RecruitmentDMMonitorService } from "./services/recruitment-dm-monitor.service";

let lastLoginError: string | null = null;

// HTTP keep-alive server for Render & UptimeRobot health checks
const PORT = Number(process.env.PORT) || 3000;
const server = http.createServer((_req, res) => {
  const isReady = client.isReady();
  const statusCode = isReady ? 200 : (lastLoginError ? 503 : 200);

  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify(
      {
        status: isReady ? "online" : (lastLoginError ? "error" : "connecting"),
        gateway: isReady ? "connected" : "disconnected",
        bot: client.user ? client.user.tag : null,
        ping: isReady ? client.ws.ping : null,
        guildCount: isReady ? client.guilds.cache.size : 0,
        guilds: isReady ? client.guilds.cache.map(g => ({ id: g.id, name: g.name })) : [],
        error: lastLoginError,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        recentLogs: liveLogs,
      },
      null,
      2
    )
  );
});

server.listen(PORT, "0.0.0.0", () => {
  Logger.info(`Health check HTTP server listening on http://0.0.0.0:${PORT}`);
});

// Async bootstrap to ensure commands and events load sequentially before login
async function bootstrap() {
  try {
    recordLiveLog("Starting bootstrap...");
    await registerCommands(client);
    await registerEvents(client);
    recordLiveLog("Commands and events registered successfully");

    recordLiveLog("Connecting to Discord Gateway...");
    await client.login(env.DISCORD_TOKEN);
  } catch (error: any) {
    lastLoginError = error?.message || String(error);
    recordLiveLog(`Bootstrap/Login Error: ${lastLoginError}`);
    Logger.error("Failed during bot bootstrap or login:", error);
    if (error?.code === "TokenInvalid") {
      Logger.error(
        "CRITICAL: The provided DISCORD_TOKEN is invalid or revoked. Please reset the token in the Discord Developer Portal and update Render environment variables."
      );
    }
  }
}

// Client Ready
client.once(Events.ClientReady, (readyClient) => {
  lastLoginError = null;
  recordLiveLog(`Logged in to Gateway as ${readyClient.user.tag}`);
  Logger.success(`Logged in as ${readyClient.user.tag}`);
  Logger.info(`${client.commands.size} command(s) loaded.`);

  // Start production monitoring
  HealthService.start();

  // Start Discord status dashboard
  StatusDashboardService.start();

  // Start Recruitment DM Monitor
  RecruitmentDMMonitorService.start();
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (reason) => {
  recordLiveLog(`Unhandled Promise Rejection: ${String(reason)}`);
  Logger.error("Unhandled Promise Rejection:", reason);
});

// Uncaught Exceptions
process.on("uncaughtException", (error) => {
  recordLiveLog(`Uncaught Exception: ${error?.message || String(error)}`);
  Logger.error("Uncaught Exception:", error);
});

// Graceful Shutdown
async function shutdown(signal: string) {
  Logger.warn(`${signal} received. Shutting down...`);

  try {
    server.close();
    HealthService.stop();
    StatusDashboardService.stop();
    RecruitmentDMMonitorService.stop();

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

bootstrap();
