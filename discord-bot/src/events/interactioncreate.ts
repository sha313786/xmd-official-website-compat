import {
  Events,
  Interaction,
  MessageFlags,
  ButtonInteraction,
  ChatInputCommandInteraction,
} from "discord.js";

interface CommandHandler {
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

interface ButtonHandler {
  execute(interaction: ButtonInteraction): Promise<void>;
}

export default {
  name: Events.InteractionCreate,

  once: false,

  async execute(interaction: Interaction): Promise<void> {
    if (interaction.isChatInputCommand()) {
      await this.handleCommand(interaction);
      return;
    }

    if (interaction.isButton()) {
      await this.handleButton(interaction);
    }
  },

  async handleCommand(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const command = interaction.client.commands.get(
      interaction.commandName
    ) as CommandHandler | undefined;

    if (!command) {
      await this.replyError(interaction, "Unknown command.");
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error("========== COMMAND ERROR ==========");
      console.error(error);
      console.error("===================================");

      await this.replyError(
        interaction,
        "An error occurred while executing this command."
      );
    }
  },

  async handleButton(
    interaction: ButtonInteraction
  ): Promise<void> {
    console.log("========== BUTTON ==========");
    console.log("Custom ID:", interaction.customId);

    let button: ButtonHandler;

    try {
      const module = await import(
  `../buttons/${interaction.customId}.js`
);

      console.log("Module Loaded:", module);

      button = (
  (module as any).default?.default ??
  (module as any).default ??
  module
) as ButtonHandler;

      console.log("Button:", button);
    } catch (error) {
      console.error("========== BUTTON IMPORT ERROR ==========");
      console.error(error);
      console.error("=========================================");

      await this.replyError(interaction, "Unknown button.");
      return;
    }

    try {
      await button.execute(interaction);
    } catch (error) {
      console.error("========== BUTTON EXECUTION ERROR ==========");
      console.error(error);
      console.error("============================================");

      await this.replyError(
        interaction,
        "An error occurred while processing this button."
      );
    }
  },

  async replyError(
    interaction: ChatInputCommandInteraction | ButtonInteraction,
    message: string
  ): Promise<void> {
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: message,
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    await interaction.reply({
      content: message,
      flags: MessageFlags.Ephemeral,
    });
  },
};