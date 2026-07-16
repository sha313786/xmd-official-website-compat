export interface Member {
  id: string;
  discord_id: string | null;

  badge_number: string;
  full_name: string;

  rank: string;
  department: string;

  status: "Active" | "Inactive" | "Suspended" | "Retired";

  avatar: string | null;

  joined_at: string | null;

  duty_hours: number;
  duty_days: number;

  created_at?: string;
  updated_at?: string;
}