import {
  EmbedBuilder,
  TextChannel,
  Message,
} from "discord.js";

import { client } from "../client";
import { Logger } from "../config/logger";
import { botSettingsService } from "./bot-settings.service";

export class StatusDashboardService {
  private static interval: NodeJS.Timeout | null = null;
  private static readonly UPDATE_INTERVAL = 60_000;

  static start() {
    if (this.interval) {
      return;
    }

    Logger.info("Status dashboard started.");

    void this.update();

    this.interval = setInterval(() => {
      void this.update();
    }, this.UPDATE_INTERVAL);
  }

  static stop() {
    if (!this.interval) {
      return;
    }

    clearInterval(this.interval);
    this.interval = null;

    Logger.info("Status dashboard stopped.");
  }

  private static async update() {
    try {
      if (!client.isReady()) {
        return;
      }

      const channelId = await botSettingsService.get(
        "health_channel_id"
      );

      if (!channelId) {
        Logger.warn(
          "Health channel ID not configured."
        );
        return;
      }

      const channel =
        await client.channels.fetch(channelId);

      if (
        !channel ||
        !(channel instanceof TextChannel)
      ) {
        Logger.error(
          "Health channel is invalid."
        );
        return;
      }

      let message: Message | null = null;

      const messageId =
        await botSettingsService.get(
          "health_message_id"
        );

      if (messageId) {
        try {
          message =
            await channel.messages.fetch(messageId);
        } catch {
          message = null;
        }
      }

      const embed =
        this.createEmbed();

      if (message) {
        await message.edit({
          embeds: [embed],
        });
      } else {
        const newMessage =
          await channel.send({
            embeds: [embed],
          });

        await botSettingsService.set(
          "health_message_id",
          newMessage.id
        );
      }
    } catch (error) {
      Logger.error(
        "Status dashboard update failed:",
        error
      );
    }
  }

  private static createEmbed() {
    const memory =
      process.memoryUsage();

    return new EmbedBuilder()
      .setTitle(
        "🟢 XMD Management Portal"
      )
      .setDescription(
        "Live system monitoring dashboard"
      )
      .addFields(
        {
          name: "Website",
          value: "🟢 Online",
          inline: true,
        },
        {
          name: "Discord Bot",
          value: client.isReady()
            ? "🟢 Online"
            : "🔴 Offline",
          inline: true,
        },
        {
          name: "Database",
          value: "🟢 Connected",
          inline: true,
        },
        {
          name: "Gateway Ping",
          value:
            client.ws.ping >= 0
              ? `${client.ws.ping}ms`
              : "N/A",
          inline: true,
        },
        {
          name: "Guilds",
          value:
            `${client.guilds.cache.size}`,
          inline: true,
        },
        {
          name: "Commands",
          value:
            `${client.commands.size}`,
          inline: true,
        },
        {
          name: "Memory",
          value:
            `${Math.round(
              memory.heapUsed / 1024 / 1024
            )} MB`,
          inline: true,
        },
        {
          name: "Uptime",
          value:
            this.formatUptime(
              process.uptime()
            ),
          inline: true,
        },
      )
      .setTimestamp()
      .setFooter({
        text: "XMD Operations Monitoring",
      });
  }

  private static formatUptime(
    seconds: number
  ) {
    const days =
      Math.floor(seconds / 86400);

    const hours =
      Math.floor(
        (seconds % 86400) / 3600
      );

    const minutes =
      Math.floor(
        (seconds % 3600) / 60
      );

    return `${days}d ${hours}h ${minutes}m`;
  }
}

export const statusDashboardService =
  StatusDashboardService;