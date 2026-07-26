import { supabase } from "../config/supabase";

export interface Member {
  id: string;
  discord_id: string;
  full_name: string;
  badge_number: string;
  rank: string;
}

export class MemberService {
  static async getByDiscordId(
    discordId: string
  ): Promise<Member> {
    const { data, error } = await supabase
      .from("members")
      .select(
        "id, discord_id, full_name, badge_number, rank"
      )
      .eq("discord_id", discordId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error(
        "Your Discord account is not linked to an XMD member."
      );
    }

    return data as Member;
  }
}

export const memberService = MemberService;