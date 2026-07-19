export interface ScheduleItem {
  title: string;
  date: string;
  description: string;
}

export const recruitmentSchedule: ScheduleItem[] = [
  {
    title: "Applications Open",
    date: "01 August 2026",
    description: "Online applications become available.",
  },
  {
    title: "Applications Close",
    date: "15 August 2026",
    description: "Last date for submitting applications.",
  },
  {
    title: "Interview Phase",
    date: "16–18 August 2026",
    description: "Eligible applicants will be interviewed.",
  },
  {
    title: "Final Results",
    date: "20 August 2026",
    description: "Selected candidates will be announced.",
  },
];