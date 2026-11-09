"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandError = void 0;
class CommandError {
    static getMessage(error) {
        if (error instanceof Error) {
            return error.message;
        }
        return "An unexpected error occurred.";
    }
}
exports.CommandError = CommandError;
