"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandController = void 0;
const command_response_1 = require("./command.response");
const command_error_1 = require("./command.error");
class CommandController {
    /**
     * Entry point for all slash commands.
     */
    async execute(interaction) {
        await command_response_1.CommandResponse.defer(interaction);
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
        await command_response_1.CommandResponse.edit(interaction, message);
    }
    /**
     * Failure response.
     */
    async failure(interaction, error) {
        await command_response_1.CommandResponse.edit(interaction, command_error_1.CommandError.getMessage(error));
    }
}
exports.CommandController = CommandController;
