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

// Debug and error listeners for real-time telemetry
client.on(Events.Debug, (info: string) => {
  // Filter out noise heartbeats
  if (!info.includes("Heartbeat acknowledged") && !info.includes("Sending a heartbeat")) {
    recordLiveLog(`[GATEWAY DEBUG] ${info}`);
  }
});

client.on(Events.Warn, (warning: string) => {
  recordLiveLog(`[GATEWAY WARN] ${warning}`);
  Logger.warn(`[DISCORD WARN] ${warning}`);
});

client.on(Events.Error, (err: Error) => {
  recordLiveLog(`[GATEWAY ERROR] ${err.message}`);
  Logger.error(`[DISCORD ERROR]`, err);
});

client.rest.on("rateLimited", (info: any) => {
  recordLiveLog(`[REST RATE LIMITED] Route: ${info.route} | RetryAfter: ${info.timeToReset}ms`);
  Logger.warn(`[DISCORD RATE LIMITED]`, info);
});

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

    recordLiveLog(`Connecting to Gateway with token prefix ${env.DISCORD_TOKEN.slice(0, 10)}...`);
    
    // Login with timeout safety
    const loginPromise = client.login(env.DISCORD_TOKEN);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gateway connection timed out after 30 seconds")), 30000)
    );

    await Promise.race([loginPromise, timeoutPromise]);
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
