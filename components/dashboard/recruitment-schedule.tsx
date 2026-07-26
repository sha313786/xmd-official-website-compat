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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

type ScheduleState = {
  application_start: string | null;
  application_end: string | null;
  interview_start: string | null;
  interview_end: string | null;
  result_date: string | null;
};

export function RecruitmentSchedule() {
  const { settings, loading, updateSchedule } = useRecruitmentSettings();

  const [schedule, setSchedule] = useState<ScheduleState>({
    application_start: "",
    application_end: "",
    interview_start: "",
    interview_end: "",
    result_date: "",
  });

  const [saving, setSaving] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
useEffect(() => {
  if (!settings) return;

  setSchedule({
    application_start: settings.application_start ?? "",
    application_end: settings.application_end ?? "",
    interview_start: settings.interview_start ?? "",
    interview_end: settings.interview_end ?? "",
    result_date: settings.result_date ?? "",
  });
}, [settings]);

  function updateField(
    field: keyof ScheduleState,
    value: string
  ) {
    setSchedule((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function validate() {
    if (
      schedule.application_start &&
      schedule.application_end &&
      schedule.application_end < schedule.application_start
    ) {
      throw new Error("Application end date cannot be before the application start date.");
    }

    if (
      schedule.interview_start &&
      schedule.interview_end &&
      schedule.interview_end < schedule.interview_start
    ) {
      throw new Error("Interview end date cannot be before the interview start date.");
    }
  }

  async function handleSave() {
    try {
      validate();
      setSaving(true);

      await updateSchedule(schedule);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to save schedule.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Schedule</CardTitle>
          <CardDescription>Loading schedule...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Schedule</CardTitle>
        <CardDescription>
          Configure the public recruitment timeline.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="application_start">Application Start</Label>
            <Input
              id="application_start"
              type="date"
              value={schedule.application_start ?? ""}
              onChange={(e) => updateField("application_start", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="application_end">Application End</Label>
            <Input
              id="application_end"
              type="date"
              value={schedule.application_end ?? ""}
              onChange={(e) => updateField("application_end", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interview_start">Interview Start</Label>
            <Input
              id="interview_start"
              type="date"
              value={schedule.interview_start ?? ""}
              onChange={(e) => updateField("interview_start", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interview_end">Interview End</Label>
            <Input
              id="interview_end"
              type="date"
              value={schedule.interview_end ?? ""}
              onChange={(e) => updateField("interview_end", e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="result_date">Result Date</Label>
            <Input
              id="result_date"
              type="date"
              value={schedule.result_date ?? ""}
              onChange={(e) => updateField("result_date", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Schedule"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
