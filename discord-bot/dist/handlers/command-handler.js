"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = registerCommands;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const discord_js_1 = require("discord.js");
const logger_1 = require("../config/logger");
async function registerCommands(client) {
    client.commands = new discord_js_1.Collection();
    const commandsPath = path_1.default.join(__dirname, "../commands");
    if (!fs_1.default.existsSync(commandsPath)) {
        logger_1.Logger.warn("Commands folder not found.");
        return;
    }
    const categories = fs_1.default
        .readdirSync(commandsPath)
        .filter(category => fs_1.default.statSync(path_1.default.join(commandsPath, category)).isDirectory());
    for (const category of categories) {
        // Prefix commands have their own handler.
        if (category === "prefix") {
            continue;
        }
        const categoryPath = path_1.default.join(commandsPath, category);
        const files = fs_1.default
            .readdirSync(categoryPath)
            .filter(file => file.endsWith(".ts") ||
            file.endsWith(".js"));
        for (const file of files) {
            logger_1.Logger.info(`Importing ${category}/${file}`);
            const fullPath = path_1.default.join(categoryPath, file);
            // Convert Windows absolute path to file:// URL
            const moduleUrl = (0, url_1.pathToFileURL)(fullPath).href;
            const imported = await import(moduleUrl);
            const command = imported.default?.default ??
                imported.default ??
                imported;
            if (!command.data?.name) {
                logger_1.Logger.error(`Invalid command: ${category}/${file}`);
                console.dir(command, { depth: 2 });
                continue;
            }
            client.commands.set(command.data.name, command);
            logger_1.Logger.info(`Loaded command: ${command.data.name}`);
        }
    }
}
