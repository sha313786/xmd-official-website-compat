import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const { badgeNumber, verificationCode } = await req.json();

    if (!badgeNumber || !verificationCode) {
      return NextResponse.json(
        { error: "Badge number and verification code are required." },
        { status: 400 }
      );
    }

    // Find verification
    const { data: verification, error: verificationError } =
      await supabaseAdmin
        .from("discord_verifications")
        .select("*")
        .eq("verification_code", verificationCode)
        .single();

    if (verificationError || !verification) {
      return NextResponse.json(
        { error: "Invalid verification code." },
        { status: 400 }
      );
    }

    if (verification.verified) {
      return NextResponse.json(
        { error: "Verification code already used." },
        { status: 400 }
      );
    }

    // Find member
    const { data: member, error: memberError } =
      await supabaseAdmin
        .from("members")
        .select("*")
        .eq("badge_number", badgeNumber)
        .single();

    if (memberError || !member) {
      return NextResponse.json(
        { error: "Invalid badge number." },
        { status: 400 }
      );
    }

    if (member.discord_id) {
      return NextResponse.json(
        { error: "Member already linked." },
        { status: 400 }
      );
    }

    // Check duplicate Discord account
    const { data: existing } = await supabaseAdmin
      .from("members")
      .select("id")
      .eq("discord_id", verification.discord_id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "Discord account already linked." },
        { status: 400 }
      );
    }

    // Update verification
    const { error: verifyUpdateError } =
      await supabaseAdmin
        .from("discord_verifications")
        .update({
          verified: true,
          member_id: member.id,
        })
        .eq("id", verification.id);

    if (verifyUpdateError) {
      throw verifyUpdateError;
    }

    // Link member
    const { error: memberUpdateError } =
      await supabaseAdmin
        .from("members")
        .update({
          discord_id: verification.discord_id,
        })
        .eq("id", member.id);

    if (memberUpdateError) {
      throw memberUpdateError;
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Verification failed.",
      },
      {
        status: 500,
      }
    );
  }
}