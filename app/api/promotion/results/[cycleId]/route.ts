import { NextRequest, NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cycleId: string }> }
) {
  try {
    const { cycleId } = await params;

    const supabase = getSupabaseAdmin();

    const { data: results, error } = await supabase
      .from("promotion_results")
      .select("*")
      .eq("cycle_id", cycleId)
      .order("position", { ascending: true });

    if (error) {
      throw error;
    }

    if (!results || results.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const memberIds = results.map((result) => result.member_id);

    const { data: members, error: memberError } = await supabase
      .from("members")
      .select("id, full_name")
      .in("id", memberIds);

    if (memberError) {
      throw memberError;
    }

    const memberMap = new Map(
      (members ?? []).map((member) => [
        member.id,
        member.full_name,
      ])
    );

    const data = results.map((result) => ({
      ...result,
      full_name:
        memberMap.get(result.member_id) ?? "Unknown Member",
    }));

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load promotion results.",
      },
      {
        status: 500,
      }
    );
  }
}