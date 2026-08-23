import {
  Client,
  Message,
  TextChannel,
} from "discord.js";

import { PrefixCommand } from "../../types/prefix-command";

const command: PrefixCommand = {
  name: "say",

  aliases: ["s"],

  async execute(
    client: Client,
    message: Message,
    args: string[]
  ) {
    if (args.length === 0) {
      await message.reply(
        "❌ Please provide a message."
      );

      return;
    }

    const content = args.join(" ");

    if (!message.channel.isTextBased()) {
      return;
    }

    await (message.channel as TextChannel).send({
      content,
      allowedMentions: {
        parse: [],
      },
    });
  },
};

export default command;