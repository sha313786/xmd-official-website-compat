"use client";

import { RecruitmentStatus } from "./recruitment-status";
import { RecruitmentNotice } from "./recruitment-notice";
import { RecruitmentDiscord } from "./recruitment-discord";
import { RecruitmentSchedule } from "./recruitment-schedule";

export function RecruitmentSettings() {
  return (
    <div className="space-y-6">
      <RecruitmentStatus />
      <RecruitmentNotice />
      <RecruitmentDiscord />
      <RecruitmentSchedule />
    </div>
  );
}