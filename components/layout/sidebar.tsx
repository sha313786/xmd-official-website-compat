"use client";

import Link from "next/link";
import { X, LayoutDashboard, Users, UserCheck, Award, UserPlus, FileText, Settings, ShieldAlert } from "lucide-react";

import { useDashboardRole } from "@/hooks/dashboard/use-dashboard-role";
import { useProfile } from "@/hooks/profile/use-profile";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
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
      <aside className="hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-slate-950 lg:flex">
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
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Members", href: "/dashboard/members", icon: Users },
        { name: "Patients", href: "/dashboard/patients", icon: UserCheck },
        { name: "Promotion", href: "/dashboard/promotion", icon: Award },
        { name: "Recruitment", href: "/dashboard/recruitment", icon: UserPlus },
        { name: "Reports", href: "/dashboard/reports", icon: FileText },

        ...(profile?.isSuperAdmin
          ? [
              {
                name: "Settings",
                href: "/dashboard/settings",
                icon: Settings,
              },
            ]
          : []),
      ]
    : [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        {
          name: "My Promotion",
          href: "/dashboard/my-promotion",
          icon: Award,
        },
      ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Desktop Sticky + Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 shrink-0 flex-col border-r border-white/10 bg-slate-950 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:h-screen lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-2xl font-black text-white">
              XMD Portal
            </h2>

            <p className="mt-1 text-xs text-slate-400 uppercase tracking-wider">
              Management System
            </p>
          </div>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:bg-white/10 hover:text-white active:scale-95 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={`${item.name}-${item.href}`}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-red-600 hover:text-white active:scale-98"
              >
                <Icon className="h-4 w-4 shrink-0 text-red-500 group-hover:text-white" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}