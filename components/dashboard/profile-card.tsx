"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { useDashboardRole } from "@/hooks/dashboard/use-dashboard-role";
import { getDiscordAvatarUrl } from "@/utils/discord-avatar";
import { getInitials } from "@/utils/get-initials";

export default function ProfileCard() {
  const { dashboardUser } = useDashboardRole();

  if (!dashboardUser) {
    return null;
  }

  return (
    <Card className="border-white/10 bg-slate-900 text-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={
                getDiscordAvatarUrl(
                  dashboardUser.discordId,
                  dashboardUser.discordAvatar
                ) ?? undefined
              }
              alt={dashboardUser.fullName}
            />

            <AvatarFallback className="bg-red-600 text-2xl">
              {getInitials(dashboardUser.fullName)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-2xl font-bold">
              {dashboardUser.fullName}
            </h2>

            <p className="text-slate-400">
              {dashboardUser.rank}
            </p>

            <Badge className="mt-3 bg-green-600">
              Active Member
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}