import { members } from "@/data";
import { config } from "@/lib/config";
import { supabase } from "@/lib/supabase";
import { Member } from "@/types/member";

export const memberService = {
  async getAll(): Promise<Member[]> {
    if (config.useMockData) {
      return members;
    }

    try {
      const { data, error } = await supabase
        .from("members")
        .select("*");

      if (error) {
        throw error;
      }

      return (data ?? []).map((member: any) => ({
        id: member.id,
        badgeNumber: member.badge_number,
        fullName: member.full_name,
        discordId: member.discord_id ?? null,
        rank: member.rank,
        department: member.department,
        status: member.status ?? "Active",
        avatar: member.avatar ?? "",
        joinedAt: member.joined_at,
        dutyHours: member.duty_hours ?? 0,
        dutyDays: member.duty_days ?? 0,
        promotionProgress:
          member.promotion_progress ?? 0,
      }));
    } catch (err) {
      console.error("FULL ERROR:", err);
      return [];
    }
  },

  async getById(
    id: string
  ): Promise<Member | undefined> {
    if (config.useMockData) {
      return members.find(
        (member) => member.id === id
      );
    }

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error(error);
      return undefined;
    }

    return {
      id: data.id,
      badgeNumber: data.badge_number,
      fullName: data.full_name,
      discordId: data.discord_id ?? null,
      rank: data.rank,
      department: data.department,
      status: data.status ?? "Active",
      avatar: data.avatar ?? "",
      joinedAt: data.joined_at,
      dutyHours: data.duty_hours ?? 0,
      dutyDays: data.duty_days ?? 0,
      promotionProgress:
        data.promotion_progress ?? 0,
    };
  },

  async getByBadgeNumber(
    badgeNumber: string
  ): Promise<Member | undefined> {
    if (config.useMockData) {
      return members.find(
        (member) =>
          member.badgeNumber === badgeNumber
      );
    }

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("badge_number", badgeNumber)
      .single();

    if (error || !data) {
      console.error(error);
      return undefined;
    }

    return {
      id: data.id,
      badgeNumber: data.badge_number,
      fullName: data.full_name,
      discordId: data.discord_id ?? null,
      rank: data.rank,
      department: data.department,
      status: data.status ?? "Active",
      avatar: data.avatar ?? "",
      joinedAt: data.joined_at,
      dutyHours: data.duty_hours ?? 0,
      dutyDays: data.duty_days ?? 0,
      promotionProgress:
        data.promotion_progress ?? 0,
    };
  },

  async create(member: {
  fullName: string;
  badgeNumber: string;
  discordId?: string | null;
  rank: string;
  department: string;
  status?: string;
}) {
  const { data, error } = await supabase
    .from("members")
    .insert({
      full_name: member.fullName,
      badge_number: member.badgeNumber,
      discord_id: member.discordId || null,
      rank: member.rank,
      department: member.department,
      status: member.status ?? "Active",
    })
    .select()
    .single();

  if (error) {
    console.error("CREATE MEMBER ERROR:", error);
    throw new Error(error.message);
  }

  return data;
},

  async update(
  id: string,
  member: {
    fullName: string;
    badgeNumber: string;
    discordId?: string | null;
    rank: string;
    department: string;
    status?: string;
  }
) {
  const { error } = await supabase
    .from("members")
    .update({
      full_name: member.fullName,
      badge_number: member.badgeNumber,
      discord_id: member.discordId || null,
      rank: member.rank,
      department: member.department,
      status: member.status ?? "Active",
    })
    .eq("id", id);

  if (error) {
    console.error("UPDATE MEMBER ERROR:", error);
    throw new Error(error.message);
  }
}

  async delete(id: string) {
    const { error } = await supabase
      .from("members")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }
  },
};