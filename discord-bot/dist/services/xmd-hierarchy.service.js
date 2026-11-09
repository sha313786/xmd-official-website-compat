"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xmdHierarchyService = void 0;
const discord_js_1 = require("discord.js");
const xmd_hierarchy_1 = require("../config/xmd-hierarchy");
class XMDHierarchyService {
    updating = false;
    updateTimer = null;
    hierarchyMessageId = null;
    async initialize(client) {
        const channel = await client.channels.fetch(xmd_hierarchy_1.XMDHierarchyConfig.CHANNEL_ID);
        if (!channel || !channel.isTextBased()) {
            throw new Error(`XMD hierarchy channel ${xmd_hierarchy_1.XMDHierarchyConfig.CHANNEL_ID} was not found.`);
        }
        await this.createHierarchyMessage(channel);
        console.log(`[XMD HIERARCHY] Initialization completed. Message: ${this.hierarchyMessageId}`);
    }
    scheduleUpdate(guild) {
        if (this.updateTimer) {
            clearTimeout(this.updateTimer);
        }
        this.updateTimer = setTimeout(async () => {
            this.updateTimer = null;
            try {
                const channel = await guild.channels.fetch(xmd_hierarchy_1.XMDHierarchyConfig.CHANNEL_ID);
                if (!channel || !channel.isTextBased()) {
                    console.error("[XMD HIERARCHY] Channel not found.");
                    return;
                }
                await this.update(channel);
            }
            catch (error) {
                console.error("[XMD HIERARCHY] Failed to update:", error);
            }
        }, 1000);
    }
    async createHierarchyMessage(channel) {
        const guild = channel.guild;
        await guild.members.fetch();
        const embed = this.buildEmbed(guild);
        const message = await channel.send({
            embeds: [embed],
        });
        this.hierarchyMessageId = message.id;
        console.log(`[XMD HIERARCHY] Created new message: ${message.id}`);
    }
    async update(channel) {
        if (this.updating) {
            return;
        }
        this.updating = true;
        try {
            const guild = channel.guild;
            await guild.members.fetch();
            const embed = this.buildEmbed(guild);
            if (!this.hierarchyMessageId) {
                await this.createHierarchyMessage(channel);
                return;
            }
            try {
                const message = await channel.messages.fetch(this.hierarchyMessageId);
                await message.edit({
                    embeds: [embed],
                });
                console.log(`[XMD HIERARCHY] Updated message: ${message.id}`);
            }
            catch {
                console.log("[XMD HIERARCHY] Message no longer exists. Creating a new one...");
                await this.createHierarchyMessage(channel);
            }
        }
        finally {
            this.updating = false;
        }
    }
    buildEmbed(guild) {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("📋 XMD Organizational Hierarchy")
            .setDescription("Current XMD organizational structure\n\n" +
            "Automatically synchronized with Discord roles.")
            .setTimestamp()
            .setFooter({
            text: xmd_hierarchy_1.XMDHierarchyConfig.FOOTER_IDENTIFIER,
        });
        for (const role of xmd_hierarchy_1.XMDHierarchyConfig.roles) {
            const members = guild.members.cache.filter((member) => !member.user.bot &&
                member.roles.cache.has(role.id));
            const memberList = members.size
                ? members
                    .map((member) => `> ${member}`)
                    .join("\n")
                : "> *No members*";
            embed.addFields({
                name: role.name,
                value: memberList,
                inline: false,
            });
        }
        return embed;
    }
}
exports.xmdHierarchyService = new XMDHierarchyService();
