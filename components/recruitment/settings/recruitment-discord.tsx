"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Save } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

export function RecruitmentDiscord() {
  const {
    settings,
    loading,
    updateDiscordInvite,
  } = useRecruitmentSettings();

  const [invite, setInvite] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
  if (!settings) return;

  const id = requestAnimationFrame(() => {
    setInvite(settings.discord_invite ?? "");
  });

  return () => cancelAnimationFrame(id);
}, [settings]);
  async function handleSave() {
    try {
      setSaving(true);

      await updateDiscordInvite(invite);
    } catch (error) {
      console.error("Failed to update Discord invite:", error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Discord Invite</CardTitle>
          <CardDescription>
            Loading Discord settings...
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-10 animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discord Invite</CardTitle>

        <CardDescription>
          Configure the Discord invite used throughout the recruitment system.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          value={invite}
          onChange={(e) => setInvite(e.target.value)}
          placeholder="https://discord.gg/..."
        />

        <div className="flex flex-wrap gap-3 justify-end">
          {invite ? (
  <a
    href={invite}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button variant="outline">
      <ExternalLink className="mr-2 h-4 w-4" />
      Open Invite
    </Button>
  </a>
) : (
  <Button
    variant="outline"
    disabled
  >
    <ExternalLink className="mr-2 h-4 w-4" />
    Open Invite
  </Button>
)}
          <Button
            onClick={handleSave}
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" />

            {saving ? "Saving..." : "Update Invite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}