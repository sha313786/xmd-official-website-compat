"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useRecruitmentCycles } from "@/hooks/use-recruitment-cycles";

export function RecruitmentCycle() {
  const {
    activeCycle,
    loading,
  } = useRecruitmentCycles();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Cycle</CardTitle>

          <CardDescription>
            Loading recruitment cycle...
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-24 animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Cycle</CardTitle>

        <CardDescription>
          Manage the active recruitment cycle.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-start justify-between rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-1 h-5 w-5 text-primary" />

            <div className="space-y-1">
              <h3 className="font-semibold">
                Current Active Cycle
              </h3>

              {activeCycle ? (
                <>
                  <p className="font-medium">
                    {activeCycle.title}
                  </p>

                  {activeCycle.description && (
                    <p className="text-sm text-muted-foreground">
                      {activeCycle.description}
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground">
                    {format(
                      new Date(activeCycle.start_date),
                      "dd MMM yyyy"
                    )}{" "}
                    →{" "}
                    {format(
                      new Date(activeCycle.end_date),
                      "dd MMM yyyy"
                    )}
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No active recruitment cycle selected.
                </p>
              )}
            </div>
          </div>

          <Badge
            variant={
              activeCycle
                ? "default"
                : "secondary"
            }
          >
            {activeCycle
              ? "ACTIVE"
              : "NONE"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}