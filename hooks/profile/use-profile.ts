"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { memberService } from "@/services/member.service";
import type { Member } from "@/types/member";

const supabase = createClient();

export function useProfile() {
  const [profile, setProfile] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProfile(null);
        return;
      }

      // Find member by Discord ID
      const member = await memberService.getByDiscordId(
        user.user_metadata.provider_id ??
          user.user_metadata.sub ??
          user.id
      );

      if (member) {
        setProfile(member);
      } else {
        setProfile(null);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();

    // Refresh every 30 seconds while profile page is open
    const interval = setInterval(() => {
      loadProfile();
    }, 30000);

    // Live update whenever duty_logs changes
    const channel = supabase
      .channel("profile-duty-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "duty_logs",
        },
        () => {
          loadProfile();
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    profile,
    loading,
    refresh: loadProfile,
  };
}