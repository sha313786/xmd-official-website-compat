import { NextResponse } from "next/server";
import { promotionService } from "@/services/promotion.service";
import { requireManagement } from "@/lib/auth/require-management";

async function refresh() {
  const results = await promotionService.refreshActiveCycle();

  return NextResponse.json({
    success: true,
    count: results.length,
    results,
  });
}

async function handleRefresh() {
  try {
    await requireManagement();

    return await refresh();
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return handleRefresh();
}

export async function POST() {
  return handleRefresh();
}