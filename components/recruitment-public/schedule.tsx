"use client";

import { CalendarDays, CheckCircle2 } from "lucide-react";

import Reveal from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";

import { recruitmentSchedule } from "@/data/recruitment/schedule";

export default function RecruitmentSchedule() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold">
              Recruitment Schedule
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Stay informed about every stage of the recruitment process.
            </p>
          </div>
        </Reveal>

        <div className="relative ml-5 border-l border-red-500/30">
          {recruitmentSchedule.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.1}
            >
              <div className="relative mb-10 pl-10">
                <div className="absolute -left-[13px] top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-red-500 bg-background">
                  <CheckCircle2 className="h-3.5 w-3.5 text-red-500" />
                </div>

                <Card className="border-red-500/10 transition-all duration-300 hover:border-red-500/30 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-red-500">
                      <CalendarDays className="h-5 w-5" />

                      <span className="font-medium">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="mb-2 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-muted-foreground leading-7">
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