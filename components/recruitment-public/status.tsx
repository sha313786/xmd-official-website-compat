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
      <section className="py-16 bg-[#030508]">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <Card className="border border-red-950/80 bg-[#0c0d14]/95 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur">
            <CardContent className="flex justify-center p-10 text-zinc-400">
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
    ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/40"
    : "bg-red-600/20 text-red-400 border-red-500/40";

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
    <section className="py-16 bg-[#030508]">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <Card className="border border-red-950/90 bg-[#0c0d14]/95 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur">
            <CardContent className="space-y-6 p-6 sm:p-10 text-center">
              <Badge className={`${badgeClass} px-4 py-1 text-xs font-bold uppercase tracking-wider`}>
                {isOpen ? "Recruitment Active" : "Recruitment Inactive"}
              </Badge>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                Cadet Enrollment Status
              </h2>

              <p className="mx-auto max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed">
                {settings.recruitment_notice ??
                  (isOpen
                    ? "Applications are currently open for all eligible citizens."
                    : "Cadet recruitment is currently closed while active applications are processed.")}
              </p>

              <div className="grid gap-6 pt-4 sm:grid-cols-2 border-t border-white/10 mt-6">
                <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                    Application Period
                  </p>

                  <p className="mt-1 font-bold text-white text-base">
                    {applicationPeriod}
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                    Last Registry Sync
                  </p>

                  <p className="mt-1 font-bold text-white text-base">
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