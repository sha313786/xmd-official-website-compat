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

**Keep moving forward — there’s a lot ahead, and we’re excited to see what you bring to XMD.**

— **XLANTIS Medical Department (XMD)**`;

export class RecruitmentDMService {
  static async processApprovedApplications(): Promise<void> {
    if (!client.isReady()) {
      return;
    }

    const { data: applications, error } = await supabase
      .from("recruitment_applications")
      .select("id, discord_id, acceptance_dm_sent")
      .eq("status", "approved")
      .eq("acceptance_dm_sent", false)
      .not("discord_id", "is", null);

    if (error) {
      Logger.error(
        "Failed to load approved recruitment applications:",
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
            `DM sent but failed to update application ${application.id}:`,
            updateError
          );
          continue;
        }

        Logger.success(
          `Recruitment acceptance DM sent to Discord ID ${application.discord_id}`
        );
      } catch (error) {
        Logger.error(
          `Failed to send recruitment acceptance DM to ${application.discord_id}:`,
          error
        );
      }
    }
  }
}

export const recruitmentDMService =
  RecruitmentDMService;