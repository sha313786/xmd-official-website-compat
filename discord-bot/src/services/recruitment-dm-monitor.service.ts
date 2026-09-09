import { RecruitmentDMService } from "./recruitment-dm.service";
import { Logger } from "../config/logger";

export class RecruitmentDMMonitorService {
  private static interval: NodeJS.Timeout | null = null;

  static start(): void {
    if (this.interval) {
      return;
    }

    Logger.info(
      "Recruitment acceptance DM monitor started."
    );

    void RecruitmentDMService.processApprovedApplications();

    this.interval = setInterval(() => {
      void RecruitmentDMService.processApprovedApplications();
    }, 10_000);
  }

  static stop(): void {
    if (!this.interval) {
      return;
    }

    clearInterval(this.interval);
    this.interval = null;

    Logger.info(
      "Recruitment acceptance DM monitor stopped."
    );
  }
}