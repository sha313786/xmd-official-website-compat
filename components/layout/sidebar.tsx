"use client";

import Link from "next/link";

import { useDashboardRole } from "@/hooks/dashboard/use-dashboard-role";
import { useProfile } from "@/hooks/profile/use-profile";

export default function Sidebar() {
  const {
    loading: roleLoading,
    isManagement,
  } = useDashboardRole();

  const {
    profile,
    loading: profileLoading,
  } = useProfile();

  const loading = roleLoading || profileLoading;

  if (loading) {
    return (
      <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950">
        <div className="border-b border-white/10 p-6">
          <h2 className="text-2xl font-black text-white">
            XMD Portal
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Management System
          </p>
        </div>
      </aside>
    );
  }

  const menu = isManagement
    ? [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Members", href: "/dashboard/members" },
        { name: "Promotion", href: "/dashboard/promotion" },
        { name: "Recruitment", href: "/dashboard/recruitment" },
        { name: "Reports", href: "/dashboard/reports" },

        ...(profile?.isSuperAdmin
          ? [
              {
                name: "Settings",
                href: "/dashboard/settings",
              },
            ]
          : []),
      ]
    : [
        { name: "Dashboard", href: "/dashboard" },
        {
          name: "My Promotion",
          href: "/dashboard/my-promotion",
        },
      ];

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950">
      <div className="border-b border-white/10 p-6">
        <h2 className="text-2xl font-black text-white">
          XMD Portal
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Management System
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menu.map((item) => (
          <Link
            key={`${item.name}-${item.href}`}
            href={item.href}
            className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-600 hover:text-white"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}