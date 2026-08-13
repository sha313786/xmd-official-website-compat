import {
  createClient as createSupabaseClient,
} from "@supabase/supabase-js";

import {
  createClient as createBrowserSupabaseClient,
} from "@/lib/supabase/client";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Creates a Supabase client.
 *
 * Browser:
 * Uses the browser-authenticated client.
 *
 * Server:
 * Creates a standard Supabase client.
 */
export function createClient() {
  if (typeof window !== "undefined") {
    return createBrowserSupabaseClient();
  }

  if (
    !supabaseUrl ||
    !supabaseAnonKey
  ) {
    throw new Error(
      "Missing Supabase environment variables",
    );
  }

  return createSupabaseClient(
    supabaseUrl,
    supabaseAnonKey,
  );
}

/**
 * Shared Supabase client.
 *
 * Existing services can import:
 *
 * import { supabase } from "@/lib/supabase";
 */
export const supabase =
  createClient();

export default supabase;