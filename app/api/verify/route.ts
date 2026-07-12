import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const badgeNumber = String(body.badgeNumber ?? "").trim();
    const verificationCode = String(body.verificationCode ?? "").trim();

    console.log("========== VERIFY REQUEST ==========");
    console.log("Badge Number:", badgeNumber);
    console.log("Verification Code:", verificationCode);
    console.log("Verification Code Type:", typeof verificationCode);

    if (!badgeNumber || !verificationCode) {
      return NextResponse.json(
        {
          error: "Badge number and verification code are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Find verification
    const {
      data: verification,
      error: verificationError,
    } = await supabaseAdmin
      .from("discord_verifications")
      .select("*")
      .eq("verification_code", verificationCode)
      .maybeSingle();

    console.log("Verification Record:", verification);
    console.log("Verification Error:", verificationError);

    if (verificationError) {
      return NextResponse.json(
        {
          error: verificationError.message,
          details: verificationError,
        },
        {
          status: 400,
        }
      );
    }

    if (!verification) {
      return NextResponse.json(
        {
          error: "Verification code not found.",
        },
        {
          status: 400,
        }
      );
    }

    if (verification.verified) {
      return NextResponse.json(
        {
          error: "This verification code has already been used.",
        },
        {
          status: 400,
        }
      );
    }

    // Find member
    const {
      data: member,
      error: memberError,
    } = await supabaseAdmin
      .from("members")
      .select("*")
      .eq("badge_number", badgeNumber)
      .maybeSingle();

    console.log("Member:", member);
    console.log("Member Error:", memberError);

    if (memberError) {
      return NextResponse.json(
        {
          error: memberError.message,
          details: memberError,
        },
        {
          status: 400,
        }
      );
    }

    if (!member) {
      return NextResponse.json(
        {
          error: "Badge number not found.",
        },
        {
          status: 400,
        }
      );
    }

    if (member.discord_id) {
      return NextResponse.json(
        {
          error: "This member is already linked to a Discord account.",
        },
        {
          status: 400,
        }
      );
    }

    // Check duplicate Discord account
    const {
      data: existingDiscord,
      error: existingDiscordError,
    } = await supabaseAdmin
      .from("members")
      .select("id")
      .eq("discord_id", verification.discord_id)
      .maybeSingle();

    console.log("Existing Discord:", existingDiscord);
    console.log("Existing Discord Error:", existingDiscordError);

    if (existingDiscord) {
      return NextResponse.json(
        {
          error: "This Discord account is already linked to another member.",
        },
        {
          status: 400,
        }
      );
    }

    // Update verification
    const { error: verificationUpdateError } =
      await supabaseAdmin
        .from("discord_verifications")
        .update({
          verified: true,
          member_id: member.id,
        })
        .eq("id", verification.id);

    if (verificationUpdateError) {
      console.error("Verification Update Error:", verificationUpdateError);

      return NextResponse.json(
        {
          error: verificationUpdateError.message,
        },
        {
          status: 400,
        }
      );
    }

    // Link Discord account
    const { error: memberUpdateError } =
      await supabaseAdmin
        .from("members")
        .update({
          discord_id: verification.discord_id,
        })
        .eq("id", member.id);

    if (memberUpdateError) {
      console.error("Member Update Error:", memberUpdateError);

      return NextResponse.json(
        {
          error: memberUpdateError.message,
        },
        {
          status: 400,
        }
      );
    }

    console.log("========== VERIFY SUCCESS ==========");

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error("VERIFY API ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Verification failed.",
      },
      {
        status: 500,
      }
    );
  }
}