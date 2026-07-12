import { supabase } from "@/lib/supabase";
import { Member } from "@/types/member";

export class ProfileService {
  static async getProfile(
    memberId: string
  ): Promise<Member | null> {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", memberId)
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    if (!data) return null;

    return {
        id: data.id,

        discordId: data.discord_id,
        badgeNumber: data.badge_number,

        fullName: data.full_name,
        rank: data.rank,
        department: data.department,

        avatar: data.avatar,

        joinedAt: data.joined_at,
        status: data.status,

        dutyHours: data.duty_hours,
        dutyDays: data.duty_days,

        promotionProgress: data.promotion_progress,
    };
  }
}