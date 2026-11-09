"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const logger_1 = require("../config/logger");
const duty_panel_service_1 = require("../services/duty-panel.service");
exports.default = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    async execute(client) {
        logger_1.Logger.success(`Ready event initialized as ${client.user.tag}`);
        try {
            logger_1.Logger.info("Restoring duty panel...");
            await duty_panel_service_1.dutyPanelService.initialize(client);
            logger_1.Logger.success("Duty panel initialization completed.");
        }
        catch (error) {
            logger_1.Logger.error("Failed to initialize duty panel.", error);
        }
    },
};
