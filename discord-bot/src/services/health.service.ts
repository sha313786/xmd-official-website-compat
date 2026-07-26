import os from "os";

import { client } from "../client";
import { supabase } from "../config/supabase";
import { Logger } from "../config/logger";

export class HealthService {
  private static interval: NodeJS.Timeout | null = null;
  private static readonly INTERVAL_MS = 60_000;

  static start() {
    if (this.interval) {
      return;
    }

    Logger.info("Health monitoring started.");

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

    Logger.info("Health monitoring stopped.");
  }

  private static async run() {
    const database = await this.checkDatabase();

    const memory = process.memoryUsage();

    Logger.info(
      [
        "[Health]",
        `Discord=${client.isReady() ? "ONLINE" : "OFFLINE"}`,
        `Database=${database ? "ONLINE" : "OFFLINE"}`,
        `Guilds=${client.guilds.cache.size}`,
        `Users=${client.users.cache.size}`,
        `Ping=${client.ws.ping >= 0 ? `${client.ws.ping}ms` : "N/A"}`,
        `Uptime=${this.formatDuration(process.uptime())}`,
        `RAM=${this.formatBytes(memory.heapUsed)} / ${this.formatBytes(memory.heapTotal)}`,
        `SystemRAM=${this.formatBytes(os.totalmem() - os.freemem())} / ${this.formatBytes(os.totalmem())}`,
        `Node=${process.version}`,
      ].join(" | ")
    );
  }

  private static async checkDatabase(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("bot_settings")
        .select("key")
        .limit(1);

      return !error;
    } catch {
      return false;
    }
  }

  private static formatBytes(bytes: number): string {
    const units = ["B", "KB", "MB", "GB", "TB"];

    let value = bytes;
    let index = 0;

    while (value >= 1024 && index < units.length - 1) {
      value /= 1024;
      index++;
    }

    return `${value.toFixed(2)} ${units[index]}`;
  }

  private static formatDuration(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const parts: string[] = [];

    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${secs}s`);

    return parts.join(" ");
  }
}