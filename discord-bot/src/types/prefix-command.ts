import { Client, Message } from "discord.js";

export interface PrefixCommand {
  name: string;

  aliases?: string[];

  execute(
    client: Client,
    message: Message,
    args: string[]
  ): Promise<void>;
}