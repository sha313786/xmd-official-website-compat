"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static info(message, data) {
        console.log(`[INFO] ${message}`, data ?? "");
    }
    static warn(message, data) {
        console.warn(`[WARN] ${message}`, data ?? "");
    }
    static error(message, data) {
        console.error(`[ERROR] ${message}`, data ?? "");
    }
    static success(message, data) {
        console.log(`[SUCCESS] ${message}`, data ?? "");
    }
}
exports.Logger = Logger;
