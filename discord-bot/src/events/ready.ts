import { Client, Events } from "discord.js";

import { Logger } from "../config/logger";
import { dutyPanelService } from "../services/duty-panel.service";
import { xmdHierarchyService } from "../services/xmd-hierarchy.service";

export default {
  name: Events.ClientReady,
  once: true,

  async execute(client: Client<true>) {
    Logger.success(
      `Ready event initialized as ${client.user.tag}`
    );

    try {
      // =========================
      // DUTY PANEL
      // =========================

      Logger.info("Restoring duty panel...");

      await dutyPanelService.initialize(client);

      Logger.success(
        "Duty panel initialization completed."
      );

      // =========================
      // XMD HIERARCHY
      // =========================

      Logger.info("Initializing XMD hierarchy...");

      await xmdHierarchyService.initialize(client);

      Logger.success(
        "XMD hierarchy initialization completed."
      );
    } catch (error) {
      Logger.error(
        "Failed to initialize bot services.",
        error
      );
    }
  },
};