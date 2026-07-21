"use client";

import { format } from "date-fns";

import Reveal from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

export default function RecruitmentStatus() {
  const {
    settings,
    loading,
  } = useRecruitmentSettings();

  if (loading) {
    return (
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <Card className="border-red-500/20 bg-card/60 backdrop-blur">
            <CardContent className="flex justify-center p-10">
              Loading recruitment status...
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (!settings) {
    return null;
  }

  const isOpen = settings.is_open;

  const badgeClass = isOpen
    ? "bg-green-500/10 text-green-400 border-green-500/30"
    : "bg-red-500/10 text-red-400 border-red-500/30";

  const applicationPeriod =
    settings.application_start && settings.application_end
      ? `${format(
          new Date(settings.application_start),
          "dd MMM yyyy"
        )} - ${format(
          new Date(settings.application_end),
          "dd MMM yyyy"
        )}`
      : "To Be Announced";

  const lastUpdated = settings.updated_at
    ? format(
        new Date(settings.updated_at),
        "dd MMM yyyy HH:mm"
      )
    : "N/A";

  return (
    <section className="py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal>
          <Card className="border-red-500/20 bg-card/60 backdrop-blur">
            <CardContent className="space-y-6 p-8 text-center">
              <Badge className={badgeClass}>
                {isOpen ? "OPEN" : "CLOSED"}
              </Badge>

              <h2 className="text-3xl font-bold">
                Recruitment
              </h2>

              <p className="mx-auto max-w-2xl text-muted-foreground">
                {settings.recruitment_notice ??
                  (isOpen
                    ? "Applications are currently open."
                    : "Recruitment is currently closed.")}
              </p>

              <div className="grid gap-6 pt-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Application Period
                  </p>

                  <p className="font-semibold">
                    {applicationPeriod}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Last Updated
                  </p>

                  <p className="font-semibold">
                    {lastUpdated}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}