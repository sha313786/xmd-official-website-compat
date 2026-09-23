"use client";

import {
  CheckCircle2,
  Mic,
  ShieldCheck,
  Users,
  UserCheck,
  MessageSquare,
} from "lucide-react";

import Reveal from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";

import { eligibilityCriteria } from "@/data/recruitment/eligibility";

const icons = [
  UserCheck,
  MessageSquare,
  Mic,
  ShieldCheck,
  CheckCircle2,
  Users,
];

export default function RecruitmentEligibility() {
  return (
    <section
      id="eligibility"
      className="py-20 bg-[#030508]"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-14 text-center">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-red-500">
              Prerequisites
            </span>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl md:text-5xl tracking-tight">
              Eligibility Criteria
            </h2>

            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-red-600 to-red-800 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed">
              Applicants must satisfy the following minimum requirements before
              submitting their cadet recruitment application.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {eligibilityCriteria.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Reveal
                key={item.title}
                delay={index * 0.08}
              >
                <Card className="group h-full rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/20 text-red-400 ring-1 ring-red-500/40 transition-colors group-hover:bg-red-600 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-white tracking-wide">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-zinc-300">
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