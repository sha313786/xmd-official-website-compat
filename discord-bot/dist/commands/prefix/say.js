"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command = {
    name: "say",
    aliases: ["s"],
    async execute(client, message, args) {
        // Check message
        if (args.length === 0) {
            await message.reply("❌ Please provide a message.");
            return;
        }
        // Get the complete message
        const content = args.join(" ");
        // Make sure the channel can receive messages
        if (!message.channel.isTextBased()) {
            return;
        }
        // Delete the user's !say command
        await message.delete().catch(() => { });
        // Send the requested message as the bot
        await message.channel.send({
            content,
            // Prevent @everyone, @here and user/role mentions
            allowedMentions: {
                parse: [],
            },
        });
    },
};
exports.default = command;
