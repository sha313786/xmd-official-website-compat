import { members } from "@/data";
import { config } from "@/lib/config";
import { createClient } from "@/lib/supabase/client";

import { Member } from "@/types/member";
import { dutyService } from "@/services/duty-service";

export const memberService = {
  async getAll(): Promise<Member[]> {
    if (config.useMockData) {
      return members;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("members")
        .select("*");

      if (error) {
        throw error;
      }

      return await Promise.all(
        (data ?? []).map(async (member: any) => {
          const stats =
            await dutyService.getMemberDutyStats(
              member.id
            );

          return {
            id: member.id,
            discordId: member.discord_id ?? "",
            badgeNumber: member.badge_number,
            fullName: member.full_name,
            rank: member.rank,
            department: member.department,
            avatar: member.avatar ?? "",
            joinedAt: member.joined_at,
            status: member.status ?? "Active",

            dutyHours: stats.duty_Hours,
            dutyDays: stats.duty_Days,
            promotionProgress: stats.progress,
          };
        })
      );
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

    const supabase = createClient();
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error(error);
      return undefined;
    }

    const stats =
      await dutyService.getMemberDutyStats(
        data.id
      );

    return {
      id: data.id,
      discordId: data.discord_id ?? "",
      badgeNumber: data.badge_number,
      fullName: data.full_name,
      rank: data.rank,
      department: data.department,
      avatar: data.avatar ?? "",
      joinedAt: data.joined_at,
      status: data.status ?? "Active",

      dutyHours: stats.duty_Hours,
      dutyDays: stats.duty_Days,
      promotionProgress: stats.progress,
    };
  },

  async getByBadgeNumber(
    badgeNumber: string
  ): Promise<Member | undefined> {
    if (config.useMockData) {
      return members.find(
        (member) =>
          member.badge_Number === badgeNumber
      );
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("badge_number", badgeNumber)
      .single();

    if (error || !data) {
      console.error(error);
      return undefined;
    }

    const stats =
      await dutyService.getMemberDutyStats(
        data.id
      );

    return {
      id: data.id,
      discordId: data.discord_id ?? "",
      badgeNumber: data.badge_number,
      fullName: data.full_name,
      rank: data.rank,
      department: data.department,
      avatar: data.avatar ?? "",
      joinedAt: data.joined_at,
      status: data.status ?? "Active",

      dutyHours: stats.duty_Hours,
      dutyDays: stats.duty_Days,
      promotionProgress: stats.progress,
    };
  },
    async getByDiscordId(
    discordId: string
  ): Promise<Member | undefined> {
    if (config.useMockData) {
      return members.find(
        (member) =>
          member.discord_id === discordId
      );
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("discord_id", discordId)
      .single();

    if (error || !data) {
      console.error(error);
      return undefined;
    }

    const stats =
      await dutyService.getMemberDutyStats(
        data.id
      );

    return {
      id: data.id,
      discordId: data.discord_id ?? "",
      badgeNumber: data.badge_number,
      fullName: data.full_name,
      rank: data.rank,
      department: data.department,
      avatar: data.avatar ?? "",
      joinedAt: data.joined_at,
      status: data.status ?? "Active",

      dutyHours: stats.duty_Hours,
      dutyDays: stats.duty_Days,
      promotionProgress: stats.progress,
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
    const supabase = createClient();
    const { data, error } = await supabase
      .from("members")
      .insert({
        full_name: member.full_name,
        badge_number: member.badge_number,
        discord_id: member.discord_id ?? null,
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
    const supabase = createClient();
    const { error } = await supabase
      .from("members")
      .update({
        full_name: member.full_name,
        badge_number: member.badge_number,
        discord_id: member.discord_id ?? null,
        rank: member.rank,
        department: member.department,
        status: member.status ?? "Active",
      })
      .eq("id", id);

    if (error) {
      console.error("UPDATE MEMBER ERROR:", error);
      throw new Error(error.message);
    }
  },

  async delete(id: string) {
    const supabase = await createClient();
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