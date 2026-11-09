
import http from "http";
import cron from "node-cron";
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
import { dutyService } from "./services/duty.service";

let lastLoginError: string | null = null;
let isConnecting = false;

// Debug and error listeners for real-time telemetry
client.on(Events.Debug, (info: string) => {
  if (
    !info.includes("Heartbeat acknowledged") &&
    !info.includes("Sending a heartbeat")
  ) {
    recordLiveLog(`[GATEWAY DEBUG] ${info}`);
  }
});

client.on(Events.Warn, (warning: string) => {
  recordLiveLog(`[GATEWAY WARN] ${warning}`);
  Logger.warn(`[DISCORD WARN] ${warning}`);
});

client.on(Events.Error, (err: Error) => {
  recordLiveLog(`[GATEWAY ERROR] ${err.message}`);
  Logger.error("[DISCORD ERROR]", err);
});

client.rest.on("rateLimited", (info: any) => {
  recordLiveLog(
    `[REST RATE LIMITED] Route: ${info.route} | RetryAfter: ${info.timeToReset}ms`
  );

  Logger.warn("[DISCORD RATE LIMITED]", info);
});

// HTTP health-check server
const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/test-discord") {
    try {
      const start = Date.now();

      const testRes = await fetch(
        "https://discord.com/api/v10/gateway/bot",
        {
          headers: {
            Authorization: `Bot ${env.DISCORD_TOKEN}`,
          },
          signal: AbortSignal.timeout(10000),
        }
      );

      const text = await testRes.text();

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify(
          {
            statusCode: testRes.status,
            statusText: testRes.statusText,
            headers: Object.fromEntries(testRes.headers.entries()),
            body: text,
            durationMs: Date.now() - start,
          },
          null,
          2
        )
      );
    } catch (err: any) {
      res.writeHead(500, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          error: err.message,
          name: err.name,
          stack: err.stack,
        })
      );
    }

    return;
  }

  const isReady = client.isReady();
  const statusCode = isReady ? 200 : lastLoginError ? 503 : 200;

  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify(
      {
        status: isReady
          ? "online"
          : lastLoginError
            ? "error"
            : "connecting",

        gateway: isReady ? "connected" : "disconnected",

        bot: client.user ? client.user.tag : null,

        ping: isReady ? client.ws.ping : null,

        guildCount: isReady ? client.guilds.cache.size : 0,

        guilds: isReady
          ? client.guilds.cache.map((g) => ({
              id: g.id,
              name: g.name,
            }))
          : [],

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

// Start HTTP server
server.listen(PORT, "0.0.0.0", () => {
  Logger.info(
    `Health check HTTP server listening on port ${PORT}`
  );
});

// Discord Gateway connection
async function connectGateway(attempt = 1): Promise<void> {
  if (isConnecting || client.isReady()) return;

  isConnecting = true;

  try {
    recordLiveLog(
      `Connecting to Discord Gateway (attempt #${attempt})...`
    );

    await client.login(env.DISCORD_TOKEN);

    lastLoginError = null;
    isConnecting = false;

    recordLiveLog(
      `Gateway connection established successfully as ${client.user?.tag}`
    );
  } catch (err: any) {
    isConnecting = false;

    lastLoginError = err?.message || String(err);

    recordLiveLog(
      `Gateway connection attempt #${attempt} failed: ${lastLoginError}`
    );

    Logger.error(
      `Failed Gateway connection on attempt #${attempt}:`,
      err
    );

    if (err?.code === "TokenInvalid") {
      recordLiveLog(
        "CRITICAL: Invalid DISCORD_TOKEN. Check the hosting environment variables."
      );

      return;
    }

    const delaySec = Math.min(5 * attempt, 30);

    recordLiveLog(
      `Retrying Discord Gateway connection in ${delaySec}s...`
    );

    setTimeout(() => {
      void connectGateway(attempt + 1);
    }, delaySec * 1000);
  }
}

// Bootstrap
async function bootstrap(): Promise<void> {
  try {
    recordLiveLog("Starting bootstrap...");

    await registerCommands(client);
    await registerEvents(client);

    recordLiveLog(
      "Commands and events registered successfully"
    );

    await connectGateway(1);
  } catch (error: any) {
    recordLiveLog(
      `Bootstrap Error: ${error?.message || String(error)}`
    );

    Logger.error(
      "Failed during bot bootstrap:",
      error
    );
  }
}

// Client Ready
client.once(Events.ClientReady, (readyClient) => {
  lastLoginError = null;

  recordLiveLog(
    `Logged in to Gateway as ${readyClient.user.tag}`
  );

  Logger.success(
    `Logged in as ${readyClient.user.tag}`
  );

  Logger.info(
    `${client.commands.size} command(s) loaded.`
  );

  // Production monitoring
  HealthService.start();

  // Discord status dashboard
  StatusDashboardService.start();

  // Recruitment DM monitor
  RecruitmentDMMonitorService.start();

  // Daily Auto Off-Duty at 1:15 AM IST
  cron.schedule(
    "15 1 * * *",
    async () => {
      recordLiveLog(
        "⏰ [CRON] 1:15 AM IST reached. Running Auto Off-Duty..."
      );

      Logger.info(
        "⏰ [CRON] 1:15 AM IST reached. Running Auto Off-Duty..."
      );

      try {
        await dutyService.autoEndAllDuties(client);
      } catch (cronErr) {
        recordLiveLog(
          `⏰ [CRON ERROR] Failed 1:15 AM Auto Off-Duty: ${cronErr}`
        );

        Logger.error(
          "Error during 1:15 AM Auto Off-Duty:",
          cronErr
        );
      }
    },
    {
      timezone: "Asia/Kolkata",
    }
  );

  Logger.info(
    "⏰ 1:15 AM IST Auto Off-Duty cron job scheduled."
  );
});

// Client Disconnect / Reconnect monitoring
client.on(Events.ShardDisconnect, (event, shardId) => {
  recordLiveLog(
    `[GATEWAY DISCONNECT] Shard ${shardId} disconnected (code: ${event.code}, reason: ${event.reason || "none"}).`
  );

  Logger.warn(
    `[GATEWAY DISCONNECT] Shard ${shardId} disconnected. Discord.js will handle reconnection.`
  );
});

client.on(Events.ShardReconnecting, (shardId) => {
  recordLiveLog(
    `[GATEWAY RECONNECTING] Shard ${shardId} reconnecting...`
  );
});

client.on(Events.ShardResume, (shardId, replayedEvents) => {
  recordLiveLog(
    `[GATEWAY RESUMED] Shard ${shardId} resumed. Replayed events: ${replayedEvents}`
  );
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (reason) => {
  recordLiveLog(
    `Unhandled Promise Rejection: ${String(reason)}`
  );

  Logger.error(
    "Unhandled Promise Rejection:",
    reason
  );
});

// Uncaught Exceptions
process.on("uncaughtException", (error) => {
  recordLiveLog(
    `Uncaught Exception: ${error?.message || String(error)}`
  );

  Logger.error(
    "Uncaught Exception:",
    error
  );
});

// Graceful Shutdown
async function shutdown(signal: string): Promise<void> {
  Logger.warn(
    `${signal} received. Shutting down...`
  );

  try {
    server.close();

    HealthService.stop();
    StatusDashboardService.stop();
    RecruitmentDMMonitorService.stop();

    client.destroy();

    Logger.success(
      "Discord client disconnected."
    );
  } catch (error) {
    Logger.error(
      "Error during shutdown:",
      error
    );
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

// Start bot
void bootstrap();
