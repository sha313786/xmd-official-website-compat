"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function Topbar() {
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
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-900 px-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-300">
          Welcome back
        </p>
      </div>

      <div className="flex items-center gap-4">
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
          >
            <Avatar className="h-12 w-12 border-2 border-red-500">
              <AvatarImage
                src={
                  getDiscordAvatarUrl(
                    dashboardUser?.discordId,
                    dashboardUser?.discordAvatar
                  ) ?? undefined
                }
                alt={dashboardUser?.fullName}
              />

              <AvatarFallback className="bg-red-600 font-bold text-white">
                {getInitials(dashboardUser?.fullName)}
              </AvatarFallback>
            </Avatar>
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl z-50">
              <div className="border-b border-white/10 p-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage
                      src={
                        getDiscordAvatarUrl(
                          dashboardUser?.discordId,
                          dashboardUser?.discordAvatar
                        ) ?? undefined
                      }
                    />

                    <AvatarFallback className="bg-red-600 font-bold">
                      {getInitials(dashboardUser?.fullName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-white">
                      {dashboardUser?.fullName}
                    </h3>

                    <p className="truncate text-sm text-slate-400">
                      {dashboardUser?.rank}
                    </p>

                    {dashboardUser?.discordUsername && (
                      <p className="truncate text-xs text-slate-500">
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
                className="w-full px-5 py-3 text-left text-white transition hover:bg-slate-800"
              >
                👤 My Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-5 py-3 text-left text-red-400 transition hover:bg-red-500/10"
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