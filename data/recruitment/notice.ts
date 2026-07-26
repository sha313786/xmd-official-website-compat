export interface RecruitmentNoticeData {
  title: string;
  noticeNumber: string;
  publishedDate: string;
  content: string[];
  authority: string;
}

export const recruitmentNotice: RecruitmentNoticeData = {
  title: "Official Recruitment Notice",
  noticeNumber: "XMD/REC/2026/001",
  publishedDate: "18 Jul 2026",
  content: [
    "Applications are invited from eligible candidates for recruitment to the XMD Medical Department.",
    "Applicants must satisfy all eligibility requirements before submitting an application.",
    "Incomplete or false information may result in rejection of the application.",
    "The Management reserves the right to modify or cancel the recruitment process without prior notice."
  ],
  authority: "XMD Management",
};