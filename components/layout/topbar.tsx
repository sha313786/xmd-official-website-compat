"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import { AuthService } from "@/services/auth-service";
import { NotificationButton } from "@/components/notifications/notification-button";
import { useDashboardRole } from "@/hooks/dashboard/use-dashboard-role";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { getDiscordAvatarUrl } from "@/utils/discord-avatar";
import { getInitials } from "@/utils/get-initials";

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  const router = useRouter();

  const { dashboardUser } = useDashboardRole();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

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
    <header className="flex h-16 sm:h-20 items-center justify-between border-b border-white/10 bg-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center min-w-0">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white active:scale-95 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="min-w-0">
          <h1 className="truncate text-lg sm:text-2xl font-bold text-white">
            Dashboard
          </h1>

          <p className="hidden text-xs sm:text-sm text-slate-300 sm:block">
            Welcome back
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {dashboardUser && (
          <NotificationButton memberId={dashboardUser.id} />
        )}

        <div
          ref={dropdownRef}
          className="relative"
        >
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full transition hover:scale-105"
            aria-label="User profile menu"
          >
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-red-500">
              <AvatarImage
                src={
                  getDiscordAvatarUrl(
                    dashboardUser?.discordId,
                    dashboardUser?.discordAvatar
                  ) ?? undefined
                }
                alt={dashboardUser?.fullName}
              />

              <AvatarFallback className="bg-red-600 font-bold text-white text-xs sm:text-sm">
                {getInitials(dashboardUser?.fullName)}
              </AvatarFallback>
            </Avatar>
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-64 sm:w-72 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl z-50">
              <div className="border-b border-white/10 p-4 sm:p-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Avatar className="h-12 w-12 sm:h-14 sm:w-14 shrink-0">
                    <AvatarImage
                      src={
                        getDiscordAvatarUrl(
                          dashboardUser?.discordId,
                          dashboardUser?.discordAvatar
                        ) ?? undefined
                      }
                    />

                    <AvatarFallback className="bg-red-600 font-bold text-white">
                      {getInitials(dashboardUser?.fullName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-white text-sm sm:text-base">
                      {dashboardUser?.fullName}
                    </h3>

                    <p className="truncate text-xs sm:text-sm text-slate-400">
                      {dashboardUser?.rank}
                    </p>

                    {dashboardUser?.discordUsername && (
                      <p className="truncate text-[11px] sm:text-xs text-slate-500">
                        @{dashboardUser.discordUsername}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/dashboard/profile");
                }}
                className="w-full px-5 py-3 text-left text-sm text-white transition hover:bg-slate-800"
              >
                👤 My Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-5 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}