"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrefixCommand = handlePrefixCommand;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../config/logger");
const prefix_1 = require("../config/prefix");
const prefixCommands = new Map();
let loaded = false;
function loadPrefixCommands() {
    if (loaded)
        return;
    const commandsPath = path_1.default.join(__dirname, "../commands/prefix");
    if (!fs_1.default.existsSync(commandsPath)) {
        logger_1.Logger.warn("Prefix commands folder not found.");
        return;
    }
    const files = fs_1.default
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".ts") ||
        file.endsWith(".js"));
    for (const file of files) {
        const fullPath = path_1.default.join(commandsPath, file);
        try {
            const imported = require(fullPath);
            const command = imported.default?.default ??
                imported.default ??
                imported;
            if (!command?.name) {
                logger_1.Logger.error(`Invalid prefix command: ${file}`);
                continue;
            }
            prefixCommands.set(command.name.toLowerCase(), command);
            for (const alias of command.aliases ?? []) {
                prefixCommands.set(alias.toLowerCase(), command);
            }
            logger_1.Logger.info(`Loaded prefix command: ${command.name}`);
        }
        catch (error) {
            logger_1.Logger.error(`Failed to load prefix command: ${file}`);
            console.error(error);
        }
    }
    loaded = true;
}
async function handlePrefixCommand(client, message) {
    if (message.author.bot)
        return;
    if (!message.guild)
        return;
    const prefix = prefix_1.PrefixConfig.PREFIX;
    if (!message.content.startsWith(prefix)) {
        return;
    }
    const content = message.content
        .slice(prefix.length)
        .trim();
    if (!content)
        return;
    const parts = content.split(/\s+/);
    const commandName = parts
        .shift()
        ?.toLowerCase();
    if (!commandName)
        return;
    loadPrefixCommands();
    const command = prefixCommands.get(commandName);
    if (!command)
        return;
    const args = parts;
    try {
        await command.execute(client, message, args);
    }
    catch (error) {
        logger_1.Logger.error(`Prefix command failed: ${commandName}`);
        console.error(error);
        await message.reply("❌ An error occurred while executing this command.");
    }
}
