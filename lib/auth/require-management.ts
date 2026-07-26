import { redirect } from "next/navigation";
import { DashboardRoleServerService } from "@/services/dashboard/dashboard-role.server.service";

/**
 * Ensures the current user is authenticated and has
 * management-level access.
 *
 * Redirects:
 * - /login      -> not authenticated
 * - /dashboard  -> authenticated but not management
 */
export async function requireManagement() {
  const dashboardUser =
  await DashboardRoleServerService.getDashboardUser();

  if (!dashboardUser) {
    redirect("/login");
  }

  if (dashboardUser.dashboard !== "management") {
    redirect("/dashboard");
  }

  return dashboardUser;
}