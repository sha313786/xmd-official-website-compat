import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { notificationServerManager } from "@/services/notification/notification-manager.server";

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

    // Find verification record
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

    // Already used
    if (verification.verified) {
      return NextResponse.json(
        {
          error: "Verification code has already been used.",
        },
        { status: 400 }
      );
    }

    // Expired
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

    // Remove Discord link from any other member
    const { error: unlinkError } = await supabase
      .from("members")
      .update({
        discord_id: null,
        discord_username: null,
        discord_avatar: null,
      })
      .eq("discord_id", verification.discord_id);

    if (unlinkError) {
      console.error(unlinkError);
    }

    // Debug
console.log("Verification Record:", {
  discord_id: verification.discord_id,
  discord_username: verification.discord_username,
  discord_avatar: verification.discord_avatar,
});

// Update member
const {
  data: updatedMember,
  error: memberUpdateError,
} = await supabase
  .from("members")
  .update({
    discord_id: verification.discord_id,
    discord_username: verification.discord_username,
    discord_avatar: verification.discord_avatar,
  })
  .eq("id", member.id)
  .select();

console.log("Updated Member:", updatedMember);

if (memberUpdateError) {
  console.error(memberUpdateError);

  return NextResponse.json(
    {
      error: memberUpdateError.message,
    },
    { status: 400 }
  );
}

    if (memberUpdateError) {
      console.error(memberUpdateError);

      return NextResponse.json(
        {
          error: memberUpdateError.message,
        },
        { status: 400 }
      );
    }

    // Mark verification complete
    const { error: verifyError } = await supabase
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

    // Notification
    await notificationServerManager.notifyVerification(member.id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}