"use client";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatDate(date?: string | null) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function RecruitmentSchedule() {
  const { settings, loading } = useRecruitmentSettings();

  const schedule = [
    {
      label: "Applications Open",
      value: formatDate(settings?.application_start),
    },
    {
      label: "Applications Close",
      value: formatDate(settings?.application_end),
    },
    {
      label: "Interview Starts",
      value: formatDate(settings?.interview_start),
    },
    {
      label: "Interview Ends",
      value: formatDate(settings?.interview_end),
    },
    {
      label: "Results",
      value: formatDate(settings?.result_date),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Schedule</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading schedule...</p>
        ) : (
          <div className="space-y-4">
            {schedule.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between border-b pb-2"
              >
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}