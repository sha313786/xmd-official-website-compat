import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const started = Date.now();

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("bot_settings")
      .select("key")
      .limit(1);

    const responseTimeMs = Date.now() - started;

    if (error) {
      return NextResponse.json(
        {
          status: "unhealthy",
          website: "online",
          database: "offline",
          uptime: Math.floor(process.uptime()),
          responseTimeMs,
          timestamp: new Date().toISOString(),
          error: error.message,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        status: "healthy",
        website: "online",
        database: "online",
        uptime: Math.floor(process.uptime()),
        responseTimeMs,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err) {
    const responseTimeMs = Date.now() - started;

    return NextResponse.json(
      {
        status: "unhealthy",
        website: "online",
        database: "offline",
        uptime: Math.floor(process.uptime()),
        responseTimeMs,
        timestamp: new Date().toISOString(),
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}