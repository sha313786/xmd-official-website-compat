"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const discord_js_1 = require("discord.js");
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
const commands = [];
const commandsPath = path_1.default.join(__dirname, "commands");
function loadCommands(folder) {
    if (!fs_1.default.existsSync(folder))
        return;
    const entries = fs_1.default.readdirSync(folder, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path_1.default.join(folder, entry.name);
        if (entry.isDirectory()) {
            loadCommands(fullPath);
            continue;
        }
        if (!entry.name.endsWith(".ts") && !entry.name.endsWith(".js")) {
            continue;
        }
        const command = require(fullPath).default;
        if (command?.data) {
            commands.push(command.data.toJSON());
            logger_1.Logger.info(`Found command: ${command.data.name}`);
        }
    }
}
loadCommands(commandsPath);
const rest = new discord_js_1.REST({ version: "10" }).setToken(env_1.env.DISCORD_TOKEN);
(async () => {
    try {
        logger_1.Logger.info(`Registering ${commands.length} slash command(s)...`);
        await rest.put(discord_js_1.Routes.applicationGuildCommands(env_1.env.CLIENT_ID, env_1.env.GUILD_ID), {
            body: commands,
        });
        logger_1.Logger.success("Slash commands registered.");
    }
    catch (error) {
        console.error(error);
    }
})();
