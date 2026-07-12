import { ReactNode } from "react";

interface PermissionGuardProps {
  allowed: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuard({
  allowed,
  children,
  fallback = null,
}: PermissionGuardProps) {
  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}