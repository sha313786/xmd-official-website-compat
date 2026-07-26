import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Keep Supabase authentication/session handling
  const response = await updateSession(request);

  const { pathname, origin } = request.nextUrl;

  // Always allow these routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/maintenance") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf)$/)
  ) {
    return response;
  }

  try {
    // Read maintenance status from your API
    const apiResponse = await fetch(
      `${origin}/api/settings/maintenance`,
      {
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
        cache: "no-store",
      }
    );

    if (apiResponse.ok) {
      const { maintenanceMode } = await apiResponse.json();

      if (maintenanceMode) {
        return NextResponse.redirect(
          new URL("/maintenance", request.url)
        );
      }
    }
  } catch (error) {
    console.error("Maintenance middleware:", error);
    // Don't block the website if the API fails.
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};