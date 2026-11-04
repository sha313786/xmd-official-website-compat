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

  // 1. Check if OAuth provider returned an error in the query parameters
  const queryError = requestUrl.searchParams.get("error");
  const queryErrorDesc = requestUrl.searchParams.get("error_description");

  if (queryError || queryErrorDesc) {
    console.error("Auth callback received error from OAuth provider:", queryError, queryErrorDesc);
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(queryError || "oauth_error")}&error_description=${encodeURIComponent(queryErrorDesc || "")}`,
        baseUrl
      )
    );
  }

  // 2. If code is missing, serve a client-side resolver to handle URL hash fragments (#access_token or #error)
  if (!code) {
    console.warn("Auth callback: No ?code= query param found. Checking client-side URL hash fallback...");
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Authenticating...</title>
  <style>
    body { background: #030508; color: #fff; font-family: ui-sans-serif, system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { max-width: 420px; width: 90%; background: #0c0d14; border: 1px solid rgba(220, 38, 38, 0.4); border-radius: 1.5rem; padding: 2rem; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.8); }
    .spinner { border: 3px solid rgba(255,255,255,0.1); border-top: 3px solid #dc2626; border-radius: 50%; width: 32px; height: 32px; animation: spin 1s linear infinite; margin: 0 auto 1.5rem; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body>
  <div class="card">
    <div class="spinner"></div>
    <h2 style="font-size: 1.25rem; font-weight: 700; margin: 0 0 0.5rem;">Authenticating with Discord...</h2>
    <p id="status-text" style="color: #a1a1aa; font-size: 0.875rem; margin: 0;">Checking authorization status, please wait.</p>
  </div>
  <script>
    (async function() {
      const statusText = document.getElementById('status-text');
      const hash = window.location.hash ? window.location.hash.substring(1) : '';
      const search = window.location.search ? window.location.search.substring(1) : '';
      const hashParams = new URLSearchParams(hash);
      const searchParams = new URLSearchParams(search);

      // Check for error in hash fragment
      const hashError = hashParams.get('error') || hashParams.get('error_code');
      const hashDesc = hashParams.get('error_description');
      if (hashError) {
        window.location.replace('/login?error=' + encodeURIComponent(hashError) + '&error_description=' + encodeURIComponent(hashDesc || ''));
        return;
      }

      // Check for access_token in hash fragment (Implicit Flow fallback)
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      if (accessToken) {
        statusText.innerText = "Restoring session...";
        try {
          const client = window.supabase.createClient("${supabaseUrl}", "${supabaseAnonKey}");
          const { error } = await client.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ''
          });
          if (error) throw error;
          window.location.replace('/dashboard');
          return;
        } catch (err) {
          window.location.replace('/login?error=session_restore_failed&error_description=' + encodeURIComponent(err.message || ''));
          return;
        }
      }

      // If truly neither code nor token was provided
      const queryCode = searchParams.get('code');
      if (!queryCode) {
        const details = hash ? ('Hash: ' + hash) : (search ? ('Query: ' + search) : 'No authorization code or tokens in URL.');
        window.location.replace('/login?error=missing_code&error_description=' + encodeURIComponent(details));
      }
    })();
  </script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  }

  // 3. PKCE Flow: Exchange authorization code for a session
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

  const createRedirectWithCookies = (targetUrl: string | URL) => {
    const response = NextResponse.redirect(targetUrl);
    cookiesToSetList.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });
    return response;
  };

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
