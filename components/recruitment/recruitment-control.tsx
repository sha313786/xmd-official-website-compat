"use client";

import Link from "next/link";

import {
  CalendarDays,
  FileText,
  Globe,
  Power,
  Settings,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";
import { useRecruitmentCycles } from "@/hooks/use-recruitment-cycles";

export function RecruitmentControl() {
  const {
    settings,
    loading,
    toggleRecruitment,
  } = useRecruitmentSettings();
  const { cycles } = useRecruitmentCycles();

const currentCycle = cycles.find(
  (cycle) => cycle.id === settings?.current_cycle_id
);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Control</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading recruitment settings...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!settings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Control</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-destructive">
              Failed to load recruitment settings.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`h-full transition-all duration-300 ${
        settings.is_open
          ? "border-l-4 border-l-green-500"
          : "border-l-4 border-l-red-500"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recruitment Control</CardTitle>

        <Badge
          className={
            settings.is_open
              ? "bg-green-600 hover:bg-green-600"
              : "bg-red-600 hover:bg-red-600"
          }
        >
          {settings.is_open
            ? "Recruitment Open"
            : "Recruitment Closed"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          {settings.is_open
            ? "Applications are currently being accepted."
            : "Recruitment is currently closed."}
        </p>

        <Separator />

        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Current Cycle
            </p>

            <p className="font-semibold">
  {currentCycle
    ? currentCycle.title
    : "No Active Recruitment Cycle"}
</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Last Updated
            </p>

            <p className="font-semibold">
              {settings.updated_at
                ? new Date(settings.updated_at).toLocaleString()
                : "Never"}
            </p>
          </div>
        </div>

        <Button
          className="w-full"
          variant={
            settings.is_open
              ? "destructive"
              : "default"
          }
          onClick={toggleRecruitment}
        >
          <Power className="mr-2 h-4 w-4" />

          {settings.is_open
            ? "Close Recruitment"
            : "Open Recruitment"}
        </Button>

        <Separator />

        <div className="grid gap-3">
          <Link href="/recruitment">
  <Button
    variant="outline"
    className="justify-start w-full"
  >
    <Globe className="mr-2 h-4 w-4" />
    View Public Recruitment
  </Button>
</Link>

          <Link href="/dashboard/recruitment">
  <Button
    variant="outline"
    className="justify-start w-full"
  >
    <FileText className="mr-2 h-4 w-4" />
    View Applications
  </Button>
</Link>

<Link href="/dashboard/recruitment/interviews">
  <Button
    variant="outline"
    className="justify-start w-full"
  >
    <CalendarDays className="mr-2 h-4 w-4" />
    Manage Interviews
  </Button>
</Link>

<Link href="/dashboard/recruitment/settings">
  <Button
    variant="outline"
    className="justify-start w-full"
  >
    <Settings className="mr-2 h-4 w-4" />
    Recruitment Settings
  </Button>
</Link>
        </div>
      </CardContent>
    </Card>
  );
}