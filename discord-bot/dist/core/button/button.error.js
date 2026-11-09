"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonError = void 0;
class ButtonError {
    /**
     * Converts unknown errors into a user-friendly message.
     */
    static getMessage(error) {
        if (error instanceof Error) {
            return error.message;
        }
        return "An unexpected error occurred.";
    }
}
exports.ButtonError = ButtonError;
