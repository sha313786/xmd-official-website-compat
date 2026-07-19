"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

export function RecruitmentNotice() {
  const {
    settings,
    loading,
    updateNotice,
  } = useRecruitmentSettings();

  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setNotice(settings.recruitment_notice ?? "");
    }
  }, [settings]);

  async function handleSave() {
    try {
      setSaving(true);

      await updateNotice(notice);
    } catch (error) {
      console.error("Failed to save recruitment notice:", error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Notice</CardTitle>
          <CardDescription>
            Loading recruitment notice...
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-32 animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Notice</CardTitle>

        <CardDescription>
          This notice is displayed on the public recruitment page.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea
          rows={6}
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          placeholder="Enter a recruitment notice..."
        />

        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" />

            {saving ? "Saving..." : "Save Notice"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}