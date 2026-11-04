import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // Determine correct base URL for redirects (handle reverse proxies / Vercel / Cloudflare)
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const baseUrl = isLocalEnv
    ? requestUrl.origin
    : forwardedHost
    ? `https://${forwardedHost}`
    : requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", baseUrl));
  }

  // Track session cookies set by Supabase SSR
  const cookiesToSetList: {
    name: string;
    value: string;
    options: Parameters<NextResponse["cookies"]["set"]>[2];
  }[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            cookiesToSetList.push({ name, value, options });
          });
        },
      },
    }
  );

  // Helper to create redirect response with all auth session cookies attached
  const createRedirectWithCookies = (targetUrl: string | URL) => {
    const response = NextResponse.redirect(targetUrl);
    cookiesToSetList.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });
    return response;
  };

  // Exchange OAuth code for a session
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("OAuth Error:", error.message, error);
    return createRedirectWithCookies(
      new URL(
        `/login?error=oauth_error&error_description=${encodeURIComponent(error.message)}`,
        baseUrl
      )
    );
  }

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return createRedirectWithCookies(
      new URL("/login?error=no_user", baseUrl)
    );
  }

  // Resolve Discord ID robustly across all Supabase OAuth identity formats
  const discordIdentity = user.identities?.find(
    (identity) => identity.provider === "discord"
  );

  const discordId =
    discordIdentity?.identity_data?.provider_id ??
    discordIdentity?.identity_data?.sub ??
    discordIdentity?.id ??
    user.user_metadata?.provider_id ??
    user.user_metadata?.sub ??
    user.app_metadata?.provider_id;

  if (!discordId) {
    console.error("No Discord ID could be extracted from user payload:", user);
    return createRedirectWithCookies(
      new URL("/login?error=no_discord_id", baseUrl)
    );
  }

  // Check if this Discord account is already linked
  // Use admin client so RLS policies don't suppress the member check during auth callback
  const adminClient = getSupabaseAdmin();
  const { data: member, error: memberError } = await adminClient
    .from("members")
    .select("id")
    .eq("discord_id", String(discordId))
    .maybeSingle();

  if (memberError) {
    console.error("Error looking up member by discord_id:", memberError);
  }

  // Already linked → Dashboard
  if (member) {
    return createRedirectWithCookies(
      new URL("/dashboard", baseUrl)
    );
  }

  // First login / Unlinked → Verification page
  return createRedirectWithCookies(
    new URL("/verify", baseUrl)
  );
}
