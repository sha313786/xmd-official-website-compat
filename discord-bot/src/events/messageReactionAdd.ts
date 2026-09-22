import {
  Events,
  MessageReaction,
  User,
} from "discord.js";

import { NicknameConfig } from "../config/nickname";
import { NicknameService } from "../services/nickname.service";

const processed = new Set<string>();

export default {
  name: Events.MessageReactionAdd,

  async execute(reaction: MessageReaction, user: User) {
    console.log(
      `[NICKNAME] Reaction received: ${reaction.emoji.name} by ${user.tag}`
    );

    if (user.bot) {
      console.log("[NICKNAME] Ignored: bot user");
      return;
    }

    try {
      if (reaction.partial) {
        console.log("[NICKNAME] Fetching partial reaction...");
        await reaction.fetch();
      }

      if (reaction.message.partial) {
        console.log("[NICKNAME] Fetching partial message...");
        await reaction.message.fetch();
      }

      const message = reaction.message;

      console.log(
        `[NICKNAME] Message channel: ${message.channel.id}`
      );

      console.log(
        `[NICKNAME] Config channel: ${NicknameConfig.CHANNEL_ID}`
      );

      if (message.channel.id !== NicknameConfig.CHANNEL_ID) {
        console.log("[NICKNAME] Ignored: wrong channel");
        return;
      }

      if (processed.has(message.id)) {
        console.log("[NICKNAME] Ignored: already processed");
        return;
      }

      const guild = message.guild;

      if (!guild) {
        console.log("[NICKNAME] Ignored: no guild");
        return;
      }

      const staff = await guild.members.fetch(user.id);

      console.log(
        `[NICKNAME] Staff: ${staff.user.tag}`
      );

      console.log(
        `[NICKNAME] Staff roles: ${staff.roles.cache
          .map(role => role.id)
          .join(", ")}`
      );

      console.log(
        `[NICKNAME] Required management role: ${NicknameConfig.MANAGEMENT_ROLE_ID}`
      );

      if (
        !staff.roles.cache.has(
          NicknameConfig.MANAGEMENT_ROLE_ID
        )
      ) {
        console.log(
          "[NICKNAME] Ignored: user does not have management role"
        );
        return;
      }

      const author = message.author;

      if (!author) {
        console.log("[NICKNAME] Ignored: no message author");
        return;
      }

      const target = await guild.members.fetch(author.id);

      const content = message.content;

      if (!content) {
        console.log("[NICKNAME] Ignored: empty message");
        return;
      }

      const rpName = NicknameService.normalize(content);

      const emoji = reaction.emoji.name;

      console.log(
        `[NICKNAME] Processing emoji: ${emoji}`
      );

      if (!emoji) {
        return;
      }

      switch (emoji) {
        case "✅": {
          processed.add(message.id);

          await NicknameService.changeNickname(
            target,
            rpName
          );

          await message.reply(
            `✅ ${target}, your nickname has been changed to **${NicknameService.format(
              rpName
            )}**.`
          );

          await message.reactions.removeAll();

          console.log(
            `[NICKNAME] Successfully changed nickname for ${target.user.tag}`
          );

          break;
        }

        case "❌": {
          processed.add(message.id);

          await message.reply(
            `❌ ${target}, your nickname request has been rejected.`
          );

          await message.reactions.removeAll();

          console.log(
            `[NICKNAME] Nickname request rejected for ${target.user.tag}`
          );

          break;
        }

        default:
          console.log(
            `[NICKNAME] Ignored emoji: ${emoji}`
          );
          break;
      }
    } catch (error) {
      console.error(
        "[NICKNAME] Reaction handler error:",
        error
      );
    }
  },
};