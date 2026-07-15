import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    const badgeNumber = String(body.badgeNumber ?? "").trim();
    const verificationCode = String(body.verificationCode ?? "").trim();

    if (!badgeNumber || !verificationCode) {
      return NextResponse.json(
        {
          error: "Badge number and verification code are required.",
        },
        { status: 400 }
      );
    }

    // Find verification code
    const {
      data: verification,
      error: verificationError,
    } = await supabase
      .from("discord_verifications")
      .select("*")
      .eq("verification_code", verificationCode)
      .maybeSingle();

    if (verificationError) {
      console.error(verificationError);

      return NextResponse.json(
        {
          error: verificationError.message,
        },
        { status: 400 }
      );
    }

    if (!verification) {
      return NextResponse.json(
        {
          error: "Invalid verification code.",
        },
        { status: 400 }
      );
    }

    // Check expiry
    if (new Date(verification.expires_at) < new Date()) {
      return NextResponse.json(
        {
          error: "Verification code has expired.",
        },
        { status: 400 }
      );
    }

    // Find member
    const {
      data: member,
      error: memberError,
    } = await supabase
      .from("members")
      .select("*")
      .eq("badge_number", badgeNumber)
      .maybeSingle();

    if (memberError) {
      console.error(memberError);

      return NextResponse.json(
        {
          error: memberError.message,
        },
        { status: 400 }
      );
    }

    if (!member) {
      return NextResponse.json(
        {
          error: "Invalid badge number.",
        },
        { status: 400 }
      );
    }

    // Remove any previous verification for this Discord account
    const { error: resetVerificationError } =
      await supabase
        .from("discord_verifications")
        .update({
          verified: false,
          member_id: null,
        })
        .eq("discord_id", verification.discord_id);

    if (resetVerificationError) {
      console.error(resetVerificationError);
    }

    // Remove Discord from any previously linked member
    await supabase
      .from("members")
      .update({
        discord_id: null,
      })
      .eq("discord_id", verification.discord_id);

    // Verify current record
    const { error: verifyError } =
      await supabase
        .from("discord_verifications")
        .update({
          verified: true,
          member_id: member.id,
        })
        .eq("id", verification.id);

    if (verifyError) {
      console.error(verifyError);

      return NextResponse.json(
        {
          error: verifyError.message,
        },
        { status: 400 }
      );
    }

    // Link member
    const { error: memberUpdateError } =
      await supabase
        .from("members")
        .update({
          discord_id: verification.discord_id,
        })
        .eq("id", member.id);

    if (memberUpdateError) {
      console.error(memberUpdateError);

      return NextResponse.json(
        {
          error: memberUpdateError.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Verification failed.",
      },
      {
        status: 500,
      }
    );
  }
}