"use client";

import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth-service";
import { NotificationButton } from "@/components/notifications/notification-button";
import { useDashboardRole } from "@/hooks/dashboard/use-dashboard-role";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDiscordAvatarUrl } from "@/utils/discord-avatar";
import { getInitials } from "@/utils/get-initials";

export default function Topbar() {
  const router = useRouter();

  const { dashboardUser } = useDashboardRole();

  async function handleLogout() {
    try {
      await AuthService.signOut();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-900 px-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-200">
          Welcome
        </p>
      </div>

      <div className="flex items-center gap-4">
        {dashboardUser && (
          <NotificationButton memberId={dashboardUser.id} />
        )}

        <Avatar className="h-12 w-12">
  <AvatarImage
    src={
      getDiscordAvatarUrl(
        dashboardUser?.discordId,
        dashboardUser?.discordAvatar
      ) ?? undefined
    }
    alt={dashboardUser?.fullName}
  />

  <AvatarFallback className="bg-red-600 font-bold">
    {getInitials(dashboardUser?.fullName)}
  </AvatarFallback>
</Avatar>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-slate-700 px-5 py-2 font-semibold text-white transition hover:bg-slate-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}