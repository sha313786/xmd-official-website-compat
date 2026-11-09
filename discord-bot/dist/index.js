"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const node_cron_1 = __importDefault(require("node-cron"));
const discord_js_1 = require("discord.js");
const client_1 = require("./client");
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
const live_logger_1 = require("./utils/live-logger");
const command_handler_1 = require("./handlers/command-handler");
const event_handler_1 = require("./handlers/event-handler");
const health_service_1 = require("./services/health.service");
const status_dashboard_service_1 = require("./services/status-dashboard.service");
const recruitment_dm_monitor_service_1 = require("./services/recruitment-dm-monitor.service");
const duty_service_1 = require("./services/duty.service");
let lastLoginError = null;
let isConnecting = false;
// Debug and error listeners for real-time telemetry
client_1.client.on(discord_js_1.Events.Debug, (info) => {
    if (!info.includes("Heartbeat acknowledged") &&
        !info.includes("Sending a heartbeat")) {
        (0, live_logger_1.recordLiveLog)(`[GATEWAY DEBUG] ${info}`);
    }
});
client_1.client.on(discord_js_1.Events.Warn, (warning) => {
    (0, live_logger_1.recordLiveLog)(`[GATEWAY WARN] ${warning}`);
    logger_1.Logger.warn(`[DISCORD WARN] ${warning}`);
});
client_1.client.on(discord_js_1.Events.Error, (err) => {
    (0, live_logger_1.recordLiveLog)(`[GATEWAY ERROR] ${err.message}`);
    logger_1.Logger.error("[DISCORD ERROR]", err);
});
client_1.client.rest.on("rateLimited", (info) => {
    (0, live_logger_1.recordLiveLog)(`[REST RATE LIMITED] Route: ${info.route} | RetryAfter: ${info.timeToReset}ms`);
    logger_1.Logger.warn("[DISCORD RATE LIMITED]", info);
});
// HTTP health-check server
const PORT = Number(process.env.PORT) || 3000;
const server = http_1.default.createServer(async (req, res) => {
    if (req.url === "/test-discord") {
        try {
            const start = Date.now();
            const testRes = await fetch("https://discord.com/api/v10/gateway/bot", {
                headers: {
                    Authorization: `Bot ${env_1.env.DISCORD_TOKEN}`,
                },
                signal: AbortSignal.timeout(10000),
            });
            const text = await testRes.text();
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify({
                statusCode: testRes.status,
                statusText: testRes.statusText,
                headers: Object.fromEntries(testRes.headers.entries()),
                body: text,
                durationMs: Date.now() - start,
            }, null, 2));
        }
        catch (err) {
            res.writeHead(500, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify({
                error: err.message,
                name: err.name,
                stack: err.stack,
            }));
        }
        return;
    }
    const isReady = client_1.client.isReady();
    const statusCode = isReady ? 200 : lastLoginError ? 503 : 200;
    res.writeHead(statusCode, {
        "Content-Type": "application/json",
    });
    res.end(JSON.stringify({
        status: isReady
            ? "online"
            : lastLoginError
                ? "error"
                : "connecting",
        gateway: isReady ? "connected" : "disconnected",
        bot: client_1.client.user ? client_1.client.user.tag : null,
        ping: isReady ? client_1.client.ws.ping : null,
        guildCount: isReady ? client_1.client.guilds.cache.size : 0,
        guilds: isReady
            ? client_1.client.guilds.cache.map((g) => ({
                id: g.id,
                name: g.name,
            }))
            : [],
        error: lastLoginError,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        recentLogs: live_logger_1.liveLogs,
    }, null, 2));
});
// Start HTTP server
server.listen(PORT, "0.0.0.0", () => {
    logger_1.Logger.info(`Health check HTTP server listening on port ${PORT}`);
});
// Discord Gateway connection
async function connectGateway(attempt = 1) {
    if (isConnecting || client_1.client.isReady())
        return;
    isConnecting = true;
    try {
        (0, live_logger_1.recordLiveLog)(`Connecting to Discord Gateway (attempt #${attempt})...`);
        await client_1.client.login(env_1.env.DISCORD_TOKEN);
        lastLoginError = null;
        isConnecting = false;
        (0, live_logger_1.recordLiveLog)(`Gateway connection established successfully as ${client_1.client.user?.tag}`);
    }
    catch (err) {
        isConnecting = false;
        lastLoginError = err?.message || String(err);
        (0, live_logger_1.recordLiveLog)(`Gateway connection attempt #${attempt} failed: ${lastLoginError}`);
        logger_1.Logger.error(`Failed Gateway connection on attempt #${attempt}:`, err);
        if (err?.code === "TokenInvalid") {
            (0, live_logger_1.recordLiveLog)("CRITICAL: Invalid DISCORD_TOKEN. Check the hosting environment variables.");
            return;
        }
        const delaySec = Math.min(5 * attempt, 30);
        (0, live_logger_1.recordLiveLog)(`Retrying Discord Gateway connection in ${delaySec}s...`);
        setTimeout(() => {
            void connectGateway(attempt + 1);
        }, delaySec * 1000);
    }
}
// Bootstrap
async function bootstrap() {
    try {
        (0, live_logger_1.recordLiveLog)("Starting bootstrap...");
        await (0, command_handler_1.registerCommands)(client_1.client);
        await (0, event_handler_1.registerEvents)(client_1.client);
        (0, live_logger_1.recordLiveLog)("Commands and events registered successfully");
        await connectGateway(1);
    }
    catch (error) {
        (0, live_logger_1.recordLiveLog)(`Bootstrap Error: ${error?.message || String(error)}`);
        logger_1.Logger.error("Failed during bot bootstrap:", error);
    }
}
// Client Ready
client_1.client.once(discord_js_1.Events.ClientReady, (readyClient) => {
    lastLoginError = null;
    (0, live_logger_1.recordLiveLog)(`Logged in to Gateway as ${readyClient.user.tag}`);
    logger_1.Logger.success(`Logged in as ${readyClient.user.tag}`);
    logger_1.Logger.info(`${client_1.client.commands.size} command(s) loaded.`);
    // Production monitoring
    health_service_1.HealthService.start();
    // Discord status dashboard
    status_dashboard_service_1.StatusDashboardService.start();
    // Recruitment DM monitor
    recruitment_dm_monitor_service_1.RecruitmentDMMonitorService.start();
    // Daily Auto Off-Duty at 1:15 AM IST
    node_cron_1.default.schedule("15 1 * * *", async () => {
        (0, live_logger_1.recordLiveLog)("⏰ [CRON] 1:15 AM IST reached. Running Auto Off-Duty...");
        logger_1.Logger.info("⏰ [CRON] 1:15 AM IST reached. Running Auto Off-Duty...");
        try {
            await duty_service_1.dutyService.autoEndAllDuties(client_1.client);
        }
        catch (cronErr) {
            (0, live_logger_1.recordLiveLog)(`⏰ [CRON ERROR] Failed 1:15 AM Auto Off-Duty: ${cronErr}`);
            logger_1.Logger.error("Error during 1:15 AM Auto Off-Duty:", cronErr);
        }
    }, {
        timezone: "Asia/Kolkata",
    });
    logger_1.Logger.info("⏰ 1:15 AM IST Auto Off-Duty cron job scheduled.");
});
// Client Disconnect / Reconnect monitoring
client_1.client.on(discord_js_1.Events.ShardDisconnect, (event, shardId) => {
    (0, live_logger_1.recordLiveLog)(`[GATEWAY DISCONNECT] Shard ${shardId} disconnected (code: ${event.code}, reason: ${event.reason || "none"}).`);
    logger_1.Logger.warn(`[GATEWAY DISCONNECT] Shard ${shardId} disconnected. Discord.js will handle reconnection.`);
});
client_1.client.on(discord_js_1.Events.ShardReconnecting, (shardId) => {
    (0, live_logger_1.recordLiveLog)(`[GATEWAY RECONNECTING] Shard ${shardId} reconnecting...`);
});
client_1.client.on(discord_js_1.Events.ShardResume, (shardId, replayedEvents) => {
    (0, live_logger_1.recordLiveLog)(`[GATEWAY RESUMED] Shard ${shardId} resumed. Replayed events: ${replayedEvents}`);
});
// Unhandled Promise Rejections
process.on("unhandledRejection", (reason) => {
    (0, live_logger_1.recordLiveLog)(`Unhandled Promise Rejection: ${String(reason)}`);
    logger_1.Logger.error("Unhandled Promise Rejection:", reason);
});
// Uncaught Exceptions
process.on("uncaughtException", (error) => {
    (0, live_logger_1.recordLiveLog)(`Uncaught Exception: ${error?.message || String(error)}`);
    logger_1.Logger.error("Uncaught Exception:", error);
});
// Graceful Shutdown
async function shutdown(signal) {
    logger_1.Logger.warn(`${signal} received. Shutting down...`);
    try {
        server.close();
        health_service_1.HealthService.stop();
        status_dashboard_service_1.StatusDashboardService.stop();
        recruitment_dm_monitor_service_1.RecruitmentDMMonitorService.stop();
        client_1.client.destroy();
        logger_1.Logger.success("Discord client disconnected.");
    }
    catch (error) {
        logger_1.Logger.error("Error during shutdown:", error);
    }
    finally {
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
