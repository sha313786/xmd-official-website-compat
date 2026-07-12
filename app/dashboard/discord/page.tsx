"use client";

import { DiscordVerificationCard } from "@/components/discord/discord-verification-card";

export default function DiscordPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Discord Integration
        </h1>

        <p className="mt-2 text-muted-foreground">
          Link your Discord account with the XMD Management Portal to enable
          Discord authentication and future integrations.
        </p>
      </div>

      <DiscordVerificationCard />
    </div>
  );
}