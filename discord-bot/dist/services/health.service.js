"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const os_1 = __importDefault(require("os"));
const client_1 = require("../client");
const supabase_1 = require("../config/supabase");
const logger_1 = require("../config/logger");
class HealthService {
    static interval = null;
    static INTERVAL_MS = 300_000; // Run every 5 minutes (reduced from 1 min)
    static start() {
        if (this.interval) {
            return;
        }
        logger_1.Logger.info("Health monitoring started.");
        // Run immediately
        void this.run();
        // Run every minute
        this.interval = setInterval(() => {
            void this.run();
        }, this.INTERVAL_MS);
    }
    static stop() {
        if (!this.interval) {
            return;
        }
        clearInterval(this.interval);
        this.interval = null;
        logger_1.Logger.info("Health monitoring stopped.");
    }
    static async run() {
        const database = await this.checkDatabase();
        const memory = process.memoryUsage();
        logger_1.Logger.info([
            "[Health]",
            `Discord=${client_1.client.isReady() ? "ONLINE" : "OFFLINE"}`,
            `Database=${database ? "ONLINE" : "OFFLINE"}`,
            `Guilds=${client_1.client.guilds.cache.size}`,
            `Users=${client_1.client.users.cache.size}`,
            `Ping=${client_1.client.ws.ping >= 0 ? `${client_1.client.ws.ping}ms` : "N/A"}`,
            `Uptime=${this.formatDuration(process.uptime())}`,
            `RAM=${this.formatBytes(memory.heapUsed)} / ${this.formatBytes(memory.heapTotal)}`,
            `SystemRAM=${this.formatBytes(os_1.default.totalmem() - os_1.default.freemem())} / ${this.formatBytes(os_1.default.totalmem())}`,
            `Node=${process.version}`,
        ].join(" | "));
    }
    static async checkDatabase() {
        try {
            const { error } = await supabase_1.supabase
                .from("bot_settings")
                .select("key")
                .limit(1);
            return !error;
        }
        catch {
            return false;
        }
    }
    static formatBytes(bytes) {
        const units = ["B", "KB", "MB", "GB", "TB"];
        let value = bytes;
        let index = 0;
        while (value >= 1024 && index < units.length - 1) {
            value /= 1024;
            index++;
        }
        return `${value.toFixed(2)} ${units[index]}`;
    }
    static formatDuration(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const parts = [];
        if (days > 0)
            parts.push(`${days}d`);
        if (hours > 0)
            parts.push(`${hours}h`);
        if (minutes > 0)
            parts.push(`${minutes}m`);
        parts.push(`${secs}s`);
        return parts.join(" ");
    }
}
exports.HealthService = HealthService;
