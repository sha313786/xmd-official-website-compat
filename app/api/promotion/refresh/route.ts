import { NextResponse } from "next/server";
import { promotionService } from "@/services/promotion.service";
import { DashboardRoleServerService } from "@/services/dashboard/dashboard-role.server.service";

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
    const dashboardUser =
      await DashboardRoleServerService.getDashboardUser();

    if (!dashboardUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (dashboardUser.dashboard !== "management") {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden: Management access required",
        },
        { status: 403 }
      );
    }

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