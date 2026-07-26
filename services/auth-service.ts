import { createClient } from "@/lib/supabase/client";

export class AuthService {
  static async signInWithDiscord() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  }

  static async signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  static async getSession() {
    const supabase = createClient();
    return supabase.auth.getSession();
  }

  static async getUser() {
    const supabase = createClient();
    return supabase.auth.getUser();
  }
}