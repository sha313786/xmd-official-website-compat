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

export function RecruitmentControl() {
  const {
    settings,
    loading,
    toggleRecruitment,
  } = useRecruitmentSettings();

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
  className={`h-full transition-all duration-300 hover:shadow-lg ${
        settings.is_open
          ? "border-l-4 border-l-green-500"
          : "border-l-4 border-l-red-500"
      }`}
    >
      <CardHeader className="space-y-3">
        <div className="space-y-1">

  <CardTitle>
    Recruitment Control
  </CardTitle>

  <p className="text-sm text-muted-foreground">
    Manage recruitment availability and administrative actions.
  </p>

</div>

        <Badge
  className={`w-fit ${ 
            settings.is_open
              ? "bg-green-600 hover:bg-green-600"
              : "bg-red-600 hover:bg-red-600"
          }}`}
        >
          {settings.is_open
            ? "Recruitment Open"
            : "Recruitment Closed"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="rounded-xl border bg-muted/30 p-5">

  <div className="space-y-3">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recruitment Status
        </p>

        <h3 className="mt-1 text-lg font-semibold">
          {settings.is_open
            ? "Applications Open"
            : "Applications Closed"}
        </h3>

      </div>

      <Badge
        variant={
          settings.is_open
            ? "default"
            : "destructive"
        }
      >
        {settings.is_open
          ? "OPEN"
          : "CLOSED"}
      </Badge>

    </div>

    <p className="text-sm leading-6 text-muted-foreground">

      {settings.is_open
        ? "Applications are currently being accepted through the public recruitment portal."
        : "Recruitment is currently closed. Members cannot submit new applications."}

    </p>

  </div>

<div className="space-y-1">

  <p className="text-xs uppercase tracking-wide text-muted-foreground">
    Last Updated
  </p>

  <p className="text-sm text-muted-foreground">
    {settings.updated_at
      ? new Date(settings.updated_at).toLocaleString()
      : "Never"}
  </p>

</div>
            <p className="font-semibold">
              {settings.updated_at
                ? new Date(settings.updated_at).toLocaleString()
                : "Never"}
            </p>
          </div>

        <Button
  className="h-11 w-full rounded-lg"
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

        <Separator className="my-1" />

<div className="space-y-3">

  <div>

    <h3 className="text-sm font-semibold">
      Quick Actions
    </h3>

    <p className="text-xs text-muted-foreground">
      Navigate to frequently used recruitment tools.
    </p>

  </div>

  <div className="grid gap-3">
            
          <Link href="/recruitment">
  <Button
  variant="outline"
  className="h-11 w-full justify-start rounded-lg transition-colors"
>
    <Globe className="mr-2 h-4 w-4" />
    View Public Recruitment
  </Button>
</Link>

          <Link href="/dashboard/recruitment">
  <Button
  variant="outline"
  className="h-11 w-full justify-start rounded-lg transition-colors"
>
    <FileText className="mr-2 h-4 w-4" />
    View Applications
  </Button>
</Link>

<Link href="/dashboard/recruitment/interviews">
  <Button
  variant="outline"
  className="h-11 w-full justify-start rounded-lg transition-colors"
>
    <CalendarDays className="mr-2 h-4 w-4" />
    Manage Interviews
  </Button>
</Link>

<Link href="/dashboard/recruitment/settings">
  <Button
  variant="outline"
  className="h-11 w-full justify-start rounded-lg transition-colors"
>
    <Settings className="mr-2 h-4 w-4" />
    Recruitment Settings
  </Button>
</Link>
 </div>
        </div>
        <Separator className="my-1" />

<div className="text-xs text-muted-foreground">
  Last updated •{" "}
  {settings.updated_at
    ? new Date(settings.updated_at).toLocaleString()
    : "Never"}
</div>
      </CardContent>
    </Card>
  );
}