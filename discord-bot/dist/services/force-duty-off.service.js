"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.forceDutyOffService =
    exports.ForceDutyOffService =
    void 0;

const supabase_1 =
    require("../config/supabase");

const duty_service_1 =
    require("./duty.service");

const duty_log_service_1 =
    require("./duty-log.service");

const member_service_1 =
    require("./member.service");

class ForceDutyOffService {

    static interval = null;

    static lastRunDate = null;

    /**
     * Start automatic force-off scheduler.
     */
    static start(client) {

        if (this.interval) {

            console.log(
                "[FORCE DUTY OFF] Scheduler already running."
            );

            return;
        }

        console.log(
            "[FORCE DUTY OFF] Scheduler started."
        );

        /*
         * Check every 30 seconds.
         *
         * The actual force-off happens only at
         * 02:15 AM IST.
         */
        this.interval =
            setInterval(
                async () => {

                    await this.check(client);

                },
                30 * 1000
            );

        /*
         * Check immediately after startup as well.
         */
        void this.check(client);
    }

    /**
     * Stop scheduler.
     */
    static stop() {

        if (this.interval) {

            clearInterval(
                this.interval
            );

            this.interval = null;

            console.log(
                "[FORCE DUTY OFF] Scheduler stopped."
            );
        }
    }

    /**
     * Check current time.
     */
    static async check(client) {

        try {

            const now =
                new Date();

            const parts =
                duty_service_1.dutyService.getISTParts(
                    now
                );

            /*
             * Only run at:
             *
             * 02:15 AM IST
             */
            if (
                parts.hour !== 2 ||
                parts.minute !== 15
            ) {
                return;
            }

            /*
             * Prevent multiple executions during
             * the same 02:15 minute.
             */
            const runDate =
                `${parts.year}-${String(
                    parts.month + 1
                ).padStart(2, "0")}-${String(
                    parts.day
                ).padStart(2, "0")}`;

            if (
                this.lastRunDate === runDate
            ) {
                return;
            }

            this.lastRunDate =
                runDate;

            console.log(
                "================================"
            );

            console.log(
                "[FORCE DUTY OFF] 02:15 AM IST reached."
            );

            await this.forceAllOffDuty(
                client
            );

            console.log(
                "================================"
            );

        }
        catch (error) {

            console.error(
                "[FORCE DUTY OFF] Scheduler error:",
                error
            );

        }
    }

    /**
     * Force every currently active session Off Duty.
     */
    static async forceAllOffDuty(client) {

        const sessions =
            await duty_service_1.dutyService
                .getActiveDutySessions();

        if (!sessions.length) {

            console.log(
                "[FORCE DUTY OFF] No active duty sessions."
            );

            return;
        }

        console.log(
            `[FORCE DUTY OFF] Found ${sessions.length} active session(s).`
        );

        const forcedEnd =
            new Date();

        /*
         * Process each open duty session.
         */
        for (
            const session
            of sessions
        ) {

            try {

                const dutyStart =
                    new Date(
                        session.duty_start
                    );

                /*
                 * 02:00–07:00 is excluded.
                 *
                 * Since force-off is at 02:15,
                 * the 02:00–02:15 portion is also
                 * excluded.
                 */
                const dutyHours =
                    duty_service_1.dutyService
                        .calculateDutyHours(
                            dutyStart,
                            forcedEnd
                        );

                const normalizedDutyDate =
                    duty_service_1.dutyService
                        .normalizeDutyDate(
                            dutyStart
                        );

                const { data, error } =
                    await supabase_1.supabase
                        .from("duty_logs")
                        .update({

                            duty_end:
                                forcedEnd.toISOString(),

                            duty_hours:
                                dutyHours,

                            normalized_duty_date:
                                normalizedDutyDate,

                            updated_at:
                                forcedEnd.toISOString()

                        })
                        .eq("id", session.id)
                        .is("duty_end", null)
                        .select()
                        .single();

                if (error) {
                    throw error;
                }

                /*
                 * Get member information so the existing
                 * OFF DUTY Discord log can be used.
                 */
                const { data: member, error: memberError } =
                    await supabase_1.supabase
                        .from("members")
                        .select("*")
                        .eq("id", session.member_id)
                        .maybeSingle();

                if (memberError) {
                    throw memberError;
                }

                if (
                    member &&
                    member.discord_id
                ) {

                    /*
                     * Send the existing OFF DUTY embed.
                     */
                    await duty_log_service_1.dutyLogService
                        .logOffDuty(
                            client,
                            member.discord_id,
                            data
                        );

                    console.log(
                        `[FORCE DUTY OFF] ${member.full_name || member.discord_id} forced Off Duty.`
                    );

                }
                else {

                    console.warn(
                        `[FORCE DUTY OFF] Could not find Discord ID for session ${session.id}.`
                    );

                }

            }
            catch (error) {

                console.error(
                    `[FORCE DUTY OFF] Failed to close session ${session.id}:`,
                    error
                );

            }
        }

        /*
         * Check again after all sessions have been closed.
         */
        const remaining =
            await duty_service_1.dutyService
                .getActiveDutyCount();

        console.log(
            "[FORCE DUTY OFF] Remaining active members:",
            remaining
        );

        /*
         * Everyone is now Off Duty.
         */
        if (remaining === 0) {

            await this.sendOffDutyAnnouncement(
                client
            );

        }
    }

    /**
     * Send the XMD Off Duty announcement.
     *
     * Uses DUTY_LOG_CHANNEL_ID.
     */
    static async sendOffDutyAnnouncement(client) {

        try {

            const channelId =
                process.env.DUTY_LOG_CHANNEL_ID;

            if (!channelId) {

                console.error(
                    "[FORCE DUTY OFF] DUTY_LOG_CHANNEL_ID is not configured."
                );

                return;
            }

            const channel =
                await client.channels.fetch(
                    channelId
                );

            if (
                !channel ||
                !channel.isTextBased()
            ) {

                console.error(
                    "[FORCE DUTY OFF] Duty log channel is not a text channel."
                );

                return;
            }

            /*
             * Find @XMD role automatically.
             */
            let xmdRole = null;

            if (channel.guild) {

                xmdRole =
                    channel.guild.roles.cache.find(
                        role =>
                            role.name.toLowerCase() ===
                            "xmd"
                    );
            }

            /*
             * Delete previous Off Duty notices.
             */
            try {

                const messages =
                    await channel.messages.fetch({
                        limit: 50
                    });

                const previousNotices =
                    messages.filter(
                        message => {

                            if (
                                message.author.id !==
                                client.user.id
                            ) {
                                return false;
                            }

                            return message.content.includes(
                                "XMD — OFF DUTY NOTICE"
                            );
                        }
                    );

                for (
                    const message
                    of previousNotices.values()
                ) {

                    try {

                        await message.delete();

                        console.log(
                            "[FORCE DUTY OFF] Previous Off Duty notice deleted:",
                            message.id
                        );

                    }
                    catch (deleteError) {

                        console.error(
                            "[FORCE DUTY OFF] Failed to delete previous notice:",
                            deleteError
                        );

                    }
                }

            }
            catch (fetchError) {

                console.error(
                    "[FORCE DUTY OFF] Failed to fetch previous notices:",
                    fetchError
                );

            }

            /*
             * Build announcement.
             */
            let content;

            if (xmdRole) {

                content =
                    `<@&${xmdRole.id}>\n\n` +
                    "🏥 **XMD — OFF DUTY NOTICE**\n\n" +
                    "All XMD personnel are currently **OFF DUTY**.\n\n" +
                    "There are currently no active XMD personnel on duty.\n" +
                    "Please return to duty when required and continue following XMD procedures.\n\n" +
                    "**XMD Management Department**";

            }
            else {

                content =
                    "🏥 **XMD — OFF DUTY NOTICE**\n\n" +
                    "All XMD personnel are currently **OFF DUTY**.\n\n" +
                    "There are currently no active XMD personnel on duty.\n" +
                    "Please return to duty when required and continue following XMD procedures.\n\n" +
                    "**XMD Management Department**";
            }

            await channel.send({

                content,

                allowedMentions:
                    xmdRole
                        ? {
                            roles: [
                                xmdRole.id
                            ]
                        }
                        : {
                            parse: []
                        }
            });

            console.log(
                "[FORCE DUTY OFF] XMD Off Duty announcement sent."
            );

        }
        catch (error) {

            console.error(
                "[FORCE DUTY OFF] Failed to send Off Duty announcement:",
                error
            );

        }
    }
}

exports.ForceDutyOffService =
    ForceDutyOffService;

exports.forceDutyOffService =
    ForceDutyOffService;