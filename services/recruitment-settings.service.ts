import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface RecruitmentSettings {
  id: string;
  is_open: boolean;
  application_start: string | null;
  application_end: string | null;
  interview_start: string | null;
  interview_end: string | null;
  result_date: string | null;
  discord_invite: string | null;
  recruitment_notice: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

class RecruitmentSettingsService {
  async getSettings(): Promise<RecruitmentSettings | null> {
    const { data, error } = await supabase
      .from("recruitment_settings")
      .select("*")
      .single();

    if (error) throw error;
    return data;
  }

  async updateSettings(
    updates: Partial<RecruitmentSettings>
  ): Promise<RecruitmentSettings> {
    const settings = await this.getSettings();

    if (!settings) {
      throw new Error("Recruitment settings not found.");
    }

    const { data, error } = await supabase
      .from("recruitment_settings")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", settings.id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async toggleRecruitment(): Promise<RecruitmentSettings> {
    const settings = await this.getSettings();

    if (!settings) {
      throw new Error("Recruitment settings not found.");
    }

    return this.updateSettings({
      is_open: !settings.is_open,
    });
  }

  async updateNotice(
    notice: string
  ): Promise<RecruitmentSettings> {
    return this.updateSettings({
      recruitment_notice: notice,
    });
  }

  async updateDiscordInvite(
    invite: string
  ): Promise<RecruitmentSettings> {
    return this.updateSettings({
      discord_invite: invite,
    });
  }

  async updateSchedule(schedule: {
    application_start: string | null;
    application_end: string | null;
    interview_start: string | null;
    interview_end: string | null;
    result_date: string | null;
  }): Promise<RecruitmentSettings> {
    return this.updateSettings(schedule);
  }
}

export const recruitmentSettingsService =
  new RecruitmentSettingsService();
