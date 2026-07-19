export type RecruitmentStatusType = "open" | "closed" | "coming-soon";

export interface RecruitmentStatusData {
  status: RecruitmentStatusType;
  title: string;
  description: string;
  applicationPeriod: string;
  lastUpdated: string;
}

export const recruitmentStatus: RecruitmentStatusData = {
  status: "open",
  title: "Recruitment is Open",
  description:
    "Applications are currently being accepted for the XMD Medical Department. Eligible candidates are encouraged to submit their applications before the closing date.",
  applicationPeriod: "01 Aug 2026 - 15 Aug 2026",
  lastUpdated: "18 Jul 2026",
};