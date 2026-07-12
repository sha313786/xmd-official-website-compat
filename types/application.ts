export interface Application {
  id: string;

  fullName: string;
  discordUsername: string;
  discordId?: string;

  age: number;

  country: string;
  timezone?: string;

  experience?: string;
  reason: string;

  status: "Pending" | "Accepted" | "Rejected";

  reviewedBy?: string;
  reviewNotes?: string;

  createdAt: string;
  updatedAt: string;
}