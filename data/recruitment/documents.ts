export interface RecruitmentDocument {
  title: string;
  description: string;
}

export const recruitmentDocuments: RecruitmentDocument[] = [
  {
    title: "Government ID",
    description: "A valid government-issued identification for verification.",
  },
  {
    title: "Discord Account",
    description: "A valid Discord account is required for communication.",
  },
  {
    title: "Character Information",
    description: "Provide complete and accurate character details.",
  },
  {
    title: "Additional Information",
    description: "Any other documents requested by the recruitment team.",
  },
];