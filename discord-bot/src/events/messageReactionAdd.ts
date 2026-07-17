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

    if (user.bot) return;

    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial)
      await reaction.message.fetch();

    const message = reaction.message;

    // Only nickname channel
    if (message.channel.id !== NicknameConfig.CHANNEL_ID)
      return;

    // Already processed
    if (processed.has(message.id))
      return;

    const guild = message.guild;
    if (!guild) return;

    // Staff member
    const staff = await guild.members.fetch(user.id);

    // Only Management
    if (
      !staff.roles.cache.has(
        NicknameConfig.MANAGEMENT_ROLE_ID
      )
    )
      return;

    // Message author can be null
const authorId = message.author?.id;

if (!authorId) {
  return;
}

// Target member
const target = await guild.members.fetch(authorId);
  message.author.id
);
    const rpName = NicknameService.normalize(

    switch (reaction.emoji.name) {

      case "✅": {

        processed.add(message.id);

        try {

          await NicknameService.changeNickname(
            target,
            rpName
          );

          await message.reply(
            `✅ ${target}, your nickname has been changed to **${NicknameService.format(rpName)}**.`
          );

          await message.reactions.removeAll();

        } catch (error) {
              console.error(error);

              await message.reply(
                  `❌ ${error instanceof Error ? error.message : "Unknown error"}`
          );
        }

        break;
      }

      case "❌": {

        processed.add(message.id);

        await message.reply(
          `❌ ${target}, your nickname request has been rejected.`
        );

        await message.reactions.removeAll();

        break;
      }
    }
  },
};