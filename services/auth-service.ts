import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export class AuthService {
  static async signInWithDiscord() {
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
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  static async getSession() {
    return supabase.auth.getSession();
  }

  static async getUser() {
    return supabase.auth.getUser();
  }
}