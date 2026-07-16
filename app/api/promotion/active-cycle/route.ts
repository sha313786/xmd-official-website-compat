import { NextResponse } from "next/server";

import { promotionService } from "@/services/promotion.service";

export async function GET() {
  try {
    const cycle = await promotionService.getActiveCycle();

    return NextResponse.json({
      success: true,
      data: cycle,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load active promotion cycle.",
      },
      {
        status: 500,
      }
    );
  }
}