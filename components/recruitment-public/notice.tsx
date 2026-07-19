"use client";

import Reveal from "@/components/shared/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { recruitmentNotice } from "@/data/recruitment/notice";

export default function RecruitmentNotice() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal>
          <Card className="border-l-4 border-l-red-600 border-red-500/20 bg-card/60 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                {recruitmentNotice.title}
              </CardTitle>

              <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:gap-8">
                <span>
                  <strong>Notice No:</strong>{" "}
                  {recruitmentNotice.noticeNumber}
                </span>

                <span>
                  <strong>Published:</strong>{" "}
                  {recruitmentNotice.publishedDate}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {recruitmentNotice.content.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-red-500" />

                    <p className="text-muted-foreground">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  Issued By
                </p>

                <p className="mt-1 font-semibold">
                  {recruitmentNotice.authority}
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}