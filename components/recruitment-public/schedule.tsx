"use client";

import { CalendarDays, CheckCircle2 } from "lucide-react";

import Reveal from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

export default function RecruitmentSchedule() {
  const { settings, loading } = useRecruitmentSettings();

  if (loading) {
    return (
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-6">
          Loading recruitment schedule...
        </div>
      </section>
    );
  }

  if (!settings) {
    return null;
  }

  const schedule = [
    {
      title: "Applications Open",
      date: settings.application_start
        ? new Date(settings.application_start).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "To Be Announced",
      description: "Online applications become available.",
    },
    {
      title: "Applications Close",
      date: settings.application_end
        ? new Date(settings.application_end).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "To Be Announced",
      description: "Last date for submitting applications.",
    },
    {
      title: "Interview Phase",
      date:
        settings.interview_start && settings.interview_end
          ? `${new Date(settings.interview_start).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )} → ${new Date(settings.interview_end).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}`
          : "To Be Announced",
      description: "Eligible applicants will be interviewed.",
    },
    {
      title: "Final Results",
      date: settings.result_date
        ? new Date(settings.result_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "To Be Announced",
      description: "Selected candidates will be announced.",
    },
  ];

  return (
    <section className="py-20 bg-[#030508]">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-14 text-center">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-red-500">
              Timeline
            </span>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl md:text-5xl tracking-tight">
              Recruitment Schedule
            </h2>

            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-red-600 to-red-800 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed">
              Stay informed about key dates, evaluation milestones, and oral interview schedules.
            </p>
          </div>
        </Reveal>

        <div className="relative ml-4 sm:ml-6 border-l-2 border-red-900/50">
          {schedule.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.1}
            >
              <div className="relative mb-8 sm:mb-10 pl-7 sm:pl-10">
                <div className="absolute -left-[14px] top-4 flex h-7 w-7 items-center justify-center rounded-full border-2 border-red-500 bg-[#0c0d14] shadow-[0_0_12px_rgba(220,38,38,0.6)]">
                  <CheckCircle2 className="h-4 w-4 text-red-400" />
                </div>

                <Card className="rounded-2xl border border-red-950/90 bg-[#0c0d14]/95 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                  <CardContent className="p-6">
                    <div className="mb-2.5 flex items-center gap-2 text-red-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
                      <CalendarDays className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="mb-2 text-lg sm:text-xl font-black text-white tracking-wide">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-zinc-300">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}