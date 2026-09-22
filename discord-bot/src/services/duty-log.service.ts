import {
  Client,
  EmbedBuilder,
  TextChannel,
} from "discord.js";

import { env } from "../config/env";
import { Logger } from "../config/logger";
import { MemberService } from "./member.service";

export class DutyLogService {
  private static async getChannel(
    client: Client
  ): Promise<TextChannel | null> {
    try {
      const channel = await client.channels.fetch(
        env.DUTY_LOG_CHANNEL_ID
      );

      if (!channel || !channel.isTextBased()) {
        Logger.warn(
          "DUTY LOG: Configured channel is not a text channel."
        );

        return null;
      }

      return channel as TextChannel;
    } catch (error) {
      Logger.error(
        "DUTY LOG: Failed to fetch duty log channel.",
        error
      );

      return null;
    }
  }

  static async logOnDuty(
    client: Client,
    discordId: string,
    session: {
      id?: string;
      duty_start?: string;
    }
  ): Promise<void> {
    try {
      Logger.info(
        `[DUTY LOG] Sending ON DUTY log for ${discordId}`
      );

      const channel = await this.getChannel(client);

      if (!channel) {
        return;
      }

      const member =
        await MemberService.getByDiscordId(discordId);

      const dutyStart = session.duty_start
        ? new Date(session.duty_start)
        : new Date();

      const embed = new EmbedBuilder()
        .setColor(0x00c853)
        .setTitle("🟢 XMD MEMBER ON DUTY")
        .setDescription(
          `<@${discordId}> has started duty.`
        )
        .addFields(
          {
            name: "Member",
            value: member.full_name ?? "Unknown",
            inline: true,
          },
          {
            name: "Badge",
            value: String(
              member.badge_number ?? "N/A"
            ),
            inline: true,
          },
          {
            name: "Rank",
            value: member.rank ?? "N/A",
            inline: true,
          },
          {
            name: "Started",
            value: `<t:${Math.floor(
              dutyStart.getTime() / 1000
            )}:F>`,
            inline: false,
          },
          {
            name: "Session ID",
            value: `\`${session.id ?? "N/A"}\``,
            inline: false,
          }
        )
        .setFooter({
          text: "XMD Management Portal • Duty System",
        })
        .setTimestamp();

      await channel.send({
        embeds: [embed],
      });

      Logger.success(
        `[DUTY LOG] ON DUTY log sent for ${member.full_name}`
      );
    } catch (error) {
      Logger.error(
        `[DUTY LOG] Failed to send ON DUTY log for ${discordId}`,
        error
      );
    }
  }

  static async logOffDuty(
    client: Client,
    discordId: string,
    session: {
      id?: string;
      duty_start?: string;
      duty_end?: string;
      duty_hours?: number;
    }
  ): Promise<void> {
    try {
      Logger.info(
        `[DUTY LOG] Sending OFF DUTY log for ${discordId}`
      );

      const channel = await this.getChannel(client);

      if (!channel) {
        return;
      }

      const member =
        await MemberService.getByDiscordId(discordId);

      const dutyStart = session.duty_start
        ? new Date(session.duty_start)
        : null;

      const dutyEnd = session.duty_end
        ? new Date(session.duty_end)
        : new Date();

      const embed = new EmbedBuilder()
        .setColor(0xff1744)
        .setTitle("🔴 XMD MEMBER OFF DUTY")
        .setDescription(
          `<@${discordId}> has ended duty.`
        )
        .addFields(
          {
            name: "Member",
            value: member.full_name ?? "Unknown",
            inline: true,
          },
          {
            name: "Badge",
            value: String(
              member.badge_number ?? "N/A"
            ),
            inline: true,
          },
          {
            name: "Rank",
            value: member.rank ?? "N/A",
            inline: true,
          },
          {
            name: "Started",
            value: dutyStart
              ? `<t:${Math.floor(
                  dutyStart.getTime() / 1000
                )}:F>`
              : "N/A",
            inline: false,
          },
          {
            name: "Ended",
            value: `<t:${Math.floor(
              dutyEnd.getTime() / 1000
            )}:F>`,
            inline: false,
          },
          {
            name: "Total Duty Hours",
            value: `${session.duty_hours ?? 0} hours`,
            inline: true,
          },
          {
            name: "Session ID",
            value: `\`${session.id ?? "N/A"}\``,
            inline: false,
          }
        )
        .setFooter({
          text: "XMD Management Portal • Duty System",
        })
        .setTimestamp();

      await channel.send({
        embeds: [embed],
      });

      Logger.success(
        `[DUTY LOG] OFF DUTY log sent for ${member.full_name}`
      );
    } catch (error) {
      Logger.error(
        `[DUTY LOG] Failed to send OFF DUTY log for ${discordId}`,
        error
      );
    }
  }
}

export const dutyLogService = DutyLogService;