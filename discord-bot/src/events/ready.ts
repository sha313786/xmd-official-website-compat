import { Client, Events } from "discord.js";

import { Logger } from "../config/logger";
import { dutyPanelService } from "../services/duty-panel.service";

export default {
  name: Events.ClientReady,
  once: true,

  async execute(client: Client<true>) {
    Logger.success(
      `Ready event initialized as ${client.user.tag}`
    );

    try {
      Logger.info("Restoring duty panel...");

      await dutyPanelService.initialize(client);

      Logger.success(
        "Duty panel initialization completed."
      );
    } catch (error) {
      Logger.error(
        "Failed to initialize duty panel.",
        error
      );
    }
  },
};