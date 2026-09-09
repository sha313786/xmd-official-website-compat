import { createClient } from "@supabase/supabase-js";

import { client } from "../client";
import { env } from "../config/env";
import { Logger } from "../config/logger";

const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const ACCEPTANCE_MESSAGE = `**XMD Recruitment Application**

Congratulations! Your recruitment application has been **accepted** by the **XLANTIS Medical Department (XMD)**.

**Application Status:** ACCEPTED

Your journey with XMD is about to begin. Stay connected and follow the instructions from the **XMD Management Team** for the next steps.

**Join the XMD Discord Server:**
https://discord.gg/wD6Tqqg6pc

**Keep moving forward — there’s a lot ahead, and we’re excited to see what you bring to XMD.**

— **XLANTIS Medical Department (XMD)**`;

const REJECTION_MESSAGE = `**XMD Recruitment Application**

Thank you for taking the time to apply to the **XLANTIS Medical Department (XMD)**.

After careful consideration, your recruitment application has **not been accepted at this time**.

**Application Status:** REJECTED

Please don't be discouraged. We appreciate your interest in XMD, and you may have another opportunity to apply in the future.

**Keep improving, keep moving forward, and don't give up on your goals.**

— **XLANTIS Medical Department (XMD)**`;

export class RecruitmentDMService {
  static async processApplications(): Promise<void> {
    if (!client.isReady()) {
      return;
    }

    const { data: applications, error } = await supabase
      .from("recruitment_applications")
      .select(
        "id, discord_id, status, acceptance_dm_sent, rejection_dm_sent"
      )
      .in("status", ["approved", "rejected"])
      .not("discord_id", "is", null);

    if (error) {
      Logger.error(
        "Failed to load recruitment applications:",
        error
      );
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
        if (
          application.status === "approved" &&
          !application.acceptance_dm_sent
        ) {
          const user = await client.users.fetch(
            application.discord_id
          );

          await user.send(ACCEPTANCE_MESSAGE);

          const { error: updateError } = await supabase
            .from("recruitment_applications")
            .update({
              acceptance_dm_sent: true,
            })
            .eq("id", application.id);

          if (updateError) {
            Logger.error(
              `Acceptance DM sent but database update failed for ${application.id}:`,
              updateError
            );

            continue;
          }

          Logger.success(
            `Recruitment acceptance DM sent to Discord ID ${application.discord_id}`
          );
        }

        // REJECTED
        if (
          application.status === "rejected" &&
          !application.rejection_dm_sent
        ) {
          const user = await client.users.fetch(
            application.discord_id
          );

          await user.send(REJECTION_MESSAGE);

          const { error: updateError } = await supabase
            .from("recruitment_applications")
            .update({
              rejection_dm_sent: true,
            })
            .eq("id", application.id);

          if (updateError) {
            Logger.error(
              `Rejection DM sent but database update failed for ${application.id}:`,
              updateError
            );

            continue;
          }

          Logger.success(
            `Recruitment rejection DM sent to Discord ID ${application.discord_id}`
          );
        }
      } catch (error) {
        Logger.error(
          `Failed to send recruitment DM to Discord ID ${application.discord_id}:`,
          error
        );
      }
    }
  }
}

export const recruitmentDMService =
  RecruitmentDMService;