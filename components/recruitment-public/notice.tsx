"use client";

import Reveal from "@/components/shared/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

export default function RecruitmentNotice() {
  const { settings, loading } = useRecruitmentSettings();

  const publishedDate = settings?.updated_at
    ? new Date(settings.updated_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  return (
    <section className="py-12 bg-[#030508]">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <Card className="border-l-4 border-l-red-600 border-red-950/90 bg-[#0c0d14]/95 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur">
            <CardHeader className="p-6 sm:p-8 border-b border-white/10">
              <CardTitle className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                Official Department Notice
              </CardTitle>

              <div className="mt-3 flex flex-col gap-2 text-xs sm:text-sm text-zinc-400 sm:flex-row sm:gap-8">
                <span>
                  <strong className="text-zinc-200">Status:</strong>{" "}
                  <span className={settings?.is_open ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                    {loading
                      ? "Loading..."
                      : settings?.is_open
                      ? "Recruitment Open"
                      : "Recruitment Closed"}
                  </span>
                </span>

                <span>
                  <strong className="text-zinc-200">Last Updated:</strong> {publishedDate}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6 sm:p-8">
              {loading ? (
                <p className="text-zinc-400 text-sm">
                  Loading recruitment notice...
                </p>
              ) : (
                <div className="whitespace-pre-line text-zinc-300 leading-relaxed text-sm sm:text-base">
                  {settings?.recruitment_notice ||
                    "No recruitment notice has been published yet."}
                </div>
              )}

              <div className="border-t border-white/10 pt-5">
                <p className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                  Issued By
                </p>

                <p className="mt-1 font-bold text-white text-sm sm:text-base">
                  XLANTIS Medical Department Recruitment Command
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}