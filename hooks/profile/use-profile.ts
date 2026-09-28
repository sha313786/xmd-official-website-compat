"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { memberService } from "@/services/members/member.service";
import type { Member } from "@/types/member";

export function useProfile() {
  const [profile, setProfile] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

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
    let active = true;

    void loadProfile();

    // Refresh every 30 seconds while profile page is open
    // Fallback polling every 2 minutes (Realtime handles instant changes)
    const interval = setInterval(() => {
      if (active) {
        void loadProfile();
      }
    }, 120000);

    // Use a unique channel name for each hook instance.
    // This prevents Supabase Realtime from reusing an already-subscribed
    // channel and throwing "cannot add postgres_changes callbacks after subscribe()".
    const channelName = `profile-duty-live-${crypto.randomUUID()}`;

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "duty_logs",
        },
        () => {
          if (active) {
            void loadProfile();
          }
        }
      );

    // Register all postgres_changes handlers before subscribing.
    void channel.subscribe();

    return () => {
      active = false;
      clearInterval(interval);
      void supabase.removeChannel(channel);
    };
  }, []);

  return {
    profile,
    loading,
    refresh: loadProfile,
  };
}
