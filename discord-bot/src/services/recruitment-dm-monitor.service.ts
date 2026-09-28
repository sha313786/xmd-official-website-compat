import { RecruitmentDMService } from "./recruitment-dm.service";
import { Logger } from "../config/logger";

export class RecruitmentDMMonitorService {
  private static interval: NodeJS.Timeout | null = null;

  static start(): void {
    if (this.interval) {
      return;
    }

    Logger.info(
      "Recruitment DM monitor started."
    );

    // Run immediately when the bot starts
    void RecruitmentDMService.processApplications();

    // Check every 60 seconds (optimized for Supabase log and query quotas)
    this.interval = setInterval(() => {
      void RecruitmentDMService.processApplications();
    }, 60_000);
  }

  static stop(): void {
    if (!this.interval) {
      return;
    }

    clearInterval(this.interval);
    this.interval = null;

    Logger.info(
      "Recruitment DM monitor stopped."
    );
  }
}

export const recruitmentDMMonitorService =
  RecruitmentDMMonitorService;