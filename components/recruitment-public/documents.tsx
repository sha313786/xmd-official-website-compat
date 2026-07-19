"use client";

import {
  FileText,
  BadgeCheck,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

import Reveal from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";

import { recruitmentDocuments } from "@/data/recruitment/documents";

const icons = [
  FileText,
  BadgeCheck,
  ClipboardList,
  ShieldCheck,
];

export default function RecruitmentDocuments() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold">
              Required Documents
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Ensure the following information and documents are ready before
              submitting your application.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {recruitmentDocuments.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Reveal
                key={item.title}
                delay={index * 0.08}
              >
                <Card className="group h-full border-red-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30">
                  <CardContent className="p-8">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition-colors group-hover:bg-red-500 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="mb-3 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}