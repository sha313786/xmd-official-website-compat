import { Events, Message } from "discord.js";
import { NicknameConfig } from "../config/nickname";

export default {
  name: Events.MessageCreate,

  async execute(message: Message) {
    // Ignore bots
    if (message.author.bot) return;

    // Only nickname channel
    if (message.channel.id !== NicknameConfig.CHANNEL_ID) return;

    // Normalize
    const rpName = message.content
      .trim()
      .replace(/\s+/g, " ")
      .toUpperCase();

    // Empty message
    if (!rpName) return;

    // Validate
    if (!NicknameConfig.NAME_REGEX.test(rpName)) {
      await message.reply(
        "❌ Invalid RP Name.\nOnly letters and spaces are allowed."
      );

      return;
    }

    // Add reactions
    await message.react("✅");
    await message.react("❌");
  },
};