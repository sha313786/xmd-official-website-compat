import { ButtonInteraction } from "discord.js";

export interface Button {
  execute(interaction: ButtonInteraction): Promise<void>;
}