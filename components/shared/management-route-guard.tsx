"use client";

import { ReactNode } from "react";

import { useDashboardRole } from "@/hooks/dashboard/use-dashboard-role";

interface ManagementRouteGuardProps {
  children: ReactNode;
}

export function ManagementRouteGuard({
  children,
}: ManagementRouteGuardProps) {
  const {
    loading,
    isManagement,
  } = useDashboardRole();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isManagement) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Access Denied
          </h2>

          <p className="text-muted-foreground">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}