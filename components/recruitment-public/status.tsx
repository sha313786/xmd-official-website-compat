"use client";

import Reveal from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { recruitmentStatus } from "@/data/recruitment/status";

const statusConfig = {
  open: {
    label: "OPEN",
    badgeClass: "bg-green-500/10 text-green-400 border-green-500/30",
  },
  closed: {
    label: "CLOSED",
    badgeClass: "bg-red-500/10 text-red-400 border-red-500/30",
  },
  "coming-soon": {
    label: "COMING SOON",
    badgeClass: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  },
};

export default function RecruitmentStatus() {
  const current = statusConfig[recruitmentStatus.status];

  return (
    <section className="py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal>
          <Card className="border-red-500/20 bg-card/60 backdrop-blur">
            <CardContent className="space-y-6 p-8 text-center">
              <Badge className={current.badgeClass}>
                {current.label}
              </Badge>

              <h2 className="text-3xl font-bold">
                {recruitmentStatus.title}
              </h2>

              <p className="mx-auto max-w-2xl text-muted-foreground">
                {recruitmentStatus.description}
              </p>

              <div className="grid gap-6 pt-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Application Period
                  </p>

                  <p className="font-semibold">
                    {recruitmentStatus.applicationPeriod}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Last Updated
                  </p>

                  <p className="font-semibold">
                    {recruitmentStatus.lastUpdated}
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