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
    <section className="py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal>
          <Card className="border-l-4 border-l-red-600 border-red-500/20 bg-card/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Recruitment Notice
              </CardTitle>

              <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:gap-8">
                <span>
                  <strong>Status:</strong>{" "}
                  {loading
                    ? "Loading..."
                    : settings?.is_open
                    ? "Recruitment Open"
                    : "Recruitment Closed"}
                </span>

                <span>
                  <strong>Last Updated:</strong> {publishedDate}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {loading ? (
                <p className="text-muted-foreground">
                  Loading recruitment notice...
                </p>
              ) : (
                <div className="whitespace-pre-line text-muted-foreground leading-7">
                  {settings?.recruitment_notice ||
                    "No recruitment notice has been published yet."}
                </div>
              )}

              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  Issued By
                </p>

                <p className="mt-1 font-semibold">
                  XMD Management
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}