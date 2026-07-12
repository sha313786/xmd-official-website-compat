export interface Report {
  id: string;

  title: string;
  description: string;

  memberName: string;
  memberId?: string;

  reportType:
    | "General"
    | "Duty"
    | "Disciplinary"
    | "Complaint"
    | "Suggestion"
    | "Other";

  priority:
    | "Low"
    | "Medium"
    | "High"
    | "Critical";

  status:
    | "Open"
    | "In Progress"
    | "Resolved"
    | "Closed";

  assignedTo?: string;

  createdBy: string;

  createdAt: string;
  updatedAt: string;
}