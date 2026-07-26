"use client";

import MemberDashboard from "@/components/dashboard/member/member-dashboard";
import ManagementDashboard from "@/components/dashboard/management-dashboard";

import { useDashboardRole } from "@/hooks/dashboard/use-dashboard-role";

export default function DashboardPage() {
  const {
    dashboardUser,
    loading,
    isManagement,
  } = useDashboardRole();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (!dashboardUser) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-red-500">
        Unable to load your member profile.
      </div>
    );
  }

  if (isManagement) {
    return <ManagementDashboard />;
  }

  return (
    <MemberDashboard
      memberId={dashboardUser.id}
    />
  );
}