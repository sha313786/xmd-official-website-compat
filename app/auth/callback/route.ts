import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login", requestUrl.origin)
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("OAuth Error:", error.message);

    return NextResponse.redirect(
      new URL("/login", requestUrl.origin)
    );
  }

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      new URL("/login", requestUrl.origin)
    );
  }

  // Get Discord ID from OAuth identity
  const discordIdentity = user.identities?.find(
    (identity) => identity.provider === "discord"
  );

  const discordId = discordIdentity?.id;

  if (!discordId) {
    return NextResponse.redirect(
      new URL("/login", requestUrl.origin)
    );
  }

  // Check if this Discord account is already linked
  const { data: member } = await supabase
    .from("members")
    .select("id")
    .eq("discord_id", discordId)
    .maybeSingle();

  // Already linked → Dashboard
  if (member) {
    return NextResponse.redirect(
      new URL("/dashboard", requestUrl.origin)
    );
  }

  // First login → Verification page
  return NextResponse.redirect(
    new URL("/verify", requestUrl.origin)
  );
}