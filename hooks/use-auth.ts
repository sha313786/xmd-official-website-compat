"use client";

import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { AuthService } from "@/services/auth-service";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const {
        data: { session },
      } = await AuthService.getSession();

      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithDiscord = async () => {
    await AuthService.signInWithDiscord();
  };

  const signOut = async () => {
    await AuthService.signOut();
  };

  return {
    user,
    session,
    loading,
    signInWithDiscord,
    signOut,
    isAuthenticated: !!user,
  };
}