"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonController = void 0;
const button_response_1 = require("./button.response");
const button_error_1 = require("./button.error");
class ButtonController {
    /**
     * Entry point for all button controllers.
     */
    async execute(interaction) {
        await button_response_1.ButtonResponse.defer(interaction);
        try {
            await this.run(interaction);
        }
        catch (error) {
            await this.failure(interaction, error);
        }
    }
    /**
     * Success response.
     */
    async success(interaction, message) {
        await button_response_1.ButtonResponse.edit(interaction, message);
    }
    /**
     * Failure response.
     */
    async failure(interaction, error) {
        // Enhanced logging to print the exact crash details in PM2 logs
        console.error("================ BUTTON EXECUTION ERROR ================");
        console.error(error);
        console.error("========================================================");
        const errorMessage = button_error_1.ButtonError.getMessage(error);
        await button_response_1.ButtonResponse.edit(interaction, `❌ ${errorMessage}`);
    }
}
exports.ButtonController = ButtonController;
