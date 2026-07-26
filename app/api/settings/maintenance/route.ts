import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("settings")
      .select("data")
      .eq("category", "general")
      .single();

    if (error) {
      console.error("Maintenance Settings Error:", error);

      return NextResponse.json(
        {
          maintenanceMode: false,
        },
        {
          status: 200,
        }
      );
    }

    const settings = (data?.data as {
      maintenanceMode?: boolean;
    }) ?? {};

    return NextResponse.json(
      {
        maintenanceMode: settings.maintenanceMode ?? false,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Maintenance API Error:", error);

    return NextResponse.json(
      {
        maintenanceMode: false,
      },
      {
        status: 200,
      }
    );
  }
}