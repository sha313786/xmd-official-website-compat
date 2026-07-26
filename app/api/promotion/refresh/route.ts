import { NextResponse } from "next/server";
import { promotionService } from "@/services/promotion.service";

async function refresh() {
  const results = await promotionService.refreshActiveCycle();

  return NextResponse.json({
    success: true,
    count: results.length,
    results,
  });
}

export async function GET() {
  try {
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

export async function POST() {
  try {
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