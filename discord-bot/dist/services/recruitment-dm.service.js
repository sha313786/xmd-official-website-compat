"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruitmentDMService = exports.RecruitmentDMService = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const client_1 = require("../client");
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
const supabase = (0, supabase_js_1.createClient)(env_1.env.SUPABASE_URL, env_1.env.SUPABASE_SERVICE_ROLE_KEY);
const ACCEPTANCE_MESSAGE = `**XMD Recruitment Application**

Congratulations! Your recruitment application has been **accepted** by the **XLANTIS Medical Department (XMD)**.

**Application Status:** ACCEPTED

Your journey with XMD is about to begin. Stay connected and follow the instructions from the **XMD Management Team** for the next steps.

**Keep moving forward — there’s a lot ahead, and we’re excited to see what you bring to XMD.**

— **XLANTIS Medical Department (XMD)**`;
function buildRejectionMessage(reason) {
    const cleanReason = reason?.trim();
    const reasonSection = cleanReason
        ? `\n**Decision / Reason:**\n> ${cleanReason.replace(/\n/g, "\n> ")}\n`
        : "";
    return `**XMD Recruitment Application**

Thank you for taking the time to apply to the **XLANTIS Medical Department (XMD)**.

After careful consideration, your recruitment application has **not been accepted at this time**.

**Application Status:** REJECTED
${reasonSection}
Please don't be discouraged. We appreciate your interest in XMD, and you may have another opportunity to apply in the future.

**Keep improving, keep moving forward, and don't give up on your goals.**

— **XLANTIS Medical Department (XMD)**`;
}
class RecruitmentDMService {
    static async processApplications() {
        if (!client_1.client.isReady()) {
            return;
        }
        const { data: applications, error } = await supabase
            .from("recruitment_applications")
            .select("id, discord_id, status, review_notes, acceptance_dm_sent, rejection_dm_sent")
            .in("status", ["approved", "rejected"])
            .not("discord_id", "is", null);
        if (error) {
            logger_1.Logger.error("Failed to load recruitment applications:", error);
            return;
        }
        if (!applications || applications.length === 0) {
            return;
        }
        for (const application of applications) {
            if (!application.discord_id) {
                continue;
            }
            try {
                // ACCEPTED
                if (application.status === "approved" &&
                    !application.acceptance_dm_sent) {
                    const user = await client_1.client.users.fetch(application.discord_id);
                    await user.send(ACCEPTANCE_MESSAGE);
                    const { error: updateError } = await supabase
                        .from("recruitment_applications")
                        .update({
                        acceptance_dm_sent: true,
                    })
                        .eq("id", application.id);
                    if (updateError) {
                        logger_1.Logger.error(`Acceptance DM sent but database update failed for ${application.id}:`, updateError);
                        continue;
                    }
                    logger_1.Logger.success(`Recruitment acceptance DM sent to Discord ID ${application.discord_id}`);
                }
                // REJECTED
                if (application.status === "rejected" &&
                    !application.rejection_dm_sent) {
                    const user = await client_1.client.users.fetch(application.discord_id);
                    await user.send(buildRejectionMessage(application.review_notes));
                    const { error: updateError } = await supabase
                        .from("recruitment_applications")
                        .update({
                        rejection_dm_sent: true,
                    })
                        .eq("id", application.id);
                    if (updateError) {
                        logger_1.Logger.error(`Rejection DM sent but database update failed for ${application.id}:`, updateError);
                        continue;
                    }
                    logger_1.Logger.success(`Recruitment rejection DM sent to Discord ID ${application.discord_id}`);
                }
            }
            catch (error) {
                logger_1.Logger.error(`Failed to send recruitment DM to Discord ID ${application.discord_id}:`, error);
            }
        }
    }
}
exports.RecruitmentDMService = RecruitmentDMService;
exports.recruitmentDMService = RecruitmentDMService;
