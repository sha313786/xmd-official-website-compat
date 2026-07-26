export interface RecruitmentDocument {
  title: string;
  description: string;
}

export const recruitmentDocuments: RecruitmentDocument[] = [
  {
    title: "Government ID",
    description:
      "A valid government-issued identification for verification.",
  },
  {
    title: "Discord Account",
    description:
      "Your Discord username and account must be available for communication.",
  },
  {
    title: "Character Information",
    description:
      "Provide accurate details about your roleplay character during the application.",
  },
  {
    title: "Additional Information",
    description:
      "Any supporting information requested by the recruitment team.",
  },
];