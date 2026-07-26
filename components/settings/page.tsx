"use client";

import { ShieldAlert } from "lucide-react";

import { useProfile } from "@/hooks/profile/use-profile";

import { Card, CardContent } from "@/components/ui/card";

// import SettingsTabs from "@/components/dashboard/settings/settings-tabs";

export default function SettingsPage() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        Loading...
      </div>
    );
  }

  if (!profile?.isSuperAdmin) {
    return (
      <div className="flex justify-center py-16">
        <Card className="max-w-lg w-full">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <ShieldAlert className="h-14 w-14 text-destructive mb-4" />

            <h2 className="text-2xl font-bold">
              403 - Access Denied
            </h2>

            <p className="mt-2 text-muted-foreground">
              You do not have permission to access the
              Settings module.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Settings
        </h1>

        <p className="text-muted-foreground">
          Configure and manage the XMD Management
          Portal.
        </p>
      </div>

      <Card>
  <CardContent className="py-10 text-center text-muted-foreground">
    Settings module coming soon.
  </CardContent>
</Card>
    </div>
  );
}