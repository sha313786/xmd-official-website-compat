"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvents = registerEvents;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const logger_1 = require("../config/logger");
async function registerEvents(client) {
    const eventsPath = path_1.default.join(__dirname, "../events");
    if (!fs_1.default.existsSync(eventsPath)) {
        logger_1.Logger.warn("Events folder not found.");
        return;
    }
    const files = fs_1.default
        .readdirSync(eventsPath)
        .filter(file => file.endsWith(".ts") ||
        file.endsWith(".js"));
    for (const file of files) {
        const fullPath = path_1.default.join(eventsPath, file);
        logger_1.Logger.info(`Importing event: ${file}`);
        const moduleUrl = (0, url_1.pathToFileURL)(fullPath).href;
        const imported = await import(moduleUrl);
        const event = imported.default?.default ??
            imported.default ??
            imported;
        if (!event)
            continue;
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        logger_1.Logger.info(`Loaded event: ${event.name}`);
    }
}
