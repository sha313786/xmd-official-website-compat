import { NextResponse } from "next/server";
import { promotionService } from "@/services/promotion.service";

export async function POST() {
  try {
    const results = await promotionService.refreshActiveCycle();

    return NextResponse.json({
      success: true,
      count: results.length,
      results,
    });
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
      {
        status: 500,
      }
    );
  }
}