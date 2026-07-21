"use client";

import { useEffect, useState } from "react";

import { CalendarDays, Save } from "lucide-react";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RecruitmentSchedule() {
  const {
    settings,
    loading,
    updateSchedule,
  } = useRecruitmentSettings();

  const [applicationStart, setApplicationStart] = useState("");
  const [applicationEnd, setApplicationEnd] = useState("");
  const [interviewStart, setInterviewStart] = useState("");
  const [interviewEnd, setInterviewEnd] = useState("");
  const [resultDate, setResultDate] = useState("");

  const [saving, setSaving] = useState(false);

 // eslint-disable-next-line react-hooks/set-state-in-effect
useEffect(() => {
  if (!settings) return;

  setApplicationStart(settings.application_start ?? "");
  setApplicationEnd(settings.application_end ?? "");
  setInterviewStart(settings.interview_start ?? "");
  setInterviewEnd(settings.interview_end ?? "");
  setResultDate(settings.result_date ?? "");
}, [settings]);

  async function handleSave() {
    try {
      setSaving(true);

      await updateSchedule({
        application_start: applicationStart || null,
        application_end: applicationEnd || null,
        interview_start: interviewStart || null,
        interview_end: interviewEnd || null,
        result_date: resultDate || null,
      });

      alert("Recruitment schedule updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to update recruitment schedule.");
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
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Recruitment Schedule
        </CardTitle>

        <CardDescription>
          Configure the recruitment timeline displayed on the public website.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        <div className="grid gap-6 md:grid-cols-2">

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Applications Open
            </label>

            <Input
              type="date"
              value={applicationStart}
              onChange={(e) =>
                setApplicationStart(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Applications Close
            </label>

            <Input
              type="date"
              value={applicationEnd}
              onChange={(e) =>
                setApplicationEnd(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Interview Starts
            </label>

            <Input
              type="date"
              value={interviewStart}
              onChange={(e) =>
                setInterviewStart(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Interview Ends
            </label>

            <Input
              type="date"
              value={interviewEnd}
              onChange={(e) =>
                setInterviewEnd(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Result Date
            </label>

            <Input
              type="date"
              value={resultDate}
              onChange={(e) =>
                setResultDate(e.target.value)
              }
            />
          </div>

        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full"
        >
          <Save className="mr-2 h-4 w-4" />

          {saving
            ? "Saving..."
            : "Save Recruitment Schedule"}
        </Button>

      </CardContent>
    </Card>
  );
}