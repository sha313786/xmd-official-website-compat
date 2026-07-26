"use client";
import {
  Power,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
      </CardContent>
    </Card>
  );
}