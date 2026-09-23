
"use client";

import { Eye, HeartPulse } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import  Reveal  from "@/components/ui/reveal";
import { missionVisionContent } from "@/data/about/mission-vision";

export default function MissionVision() {
  return (
    <section className="relative overflow-hidden py-24 bg-[#030508]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-red-500">
              Our Purpose
            </span>

            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl md:text-5xl tracking-tight">
              Mission & Vision
            </h2>

            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-red-600 to-red-800 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-300">
              Guided by compassion, professionalism, and innovation, we strive
              to deliver exceptional emergency medical services while shaping
              the future of healthcare within XLANTIS City.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Card className="group h-full border border-red-950/90 bg-[#0c0d14]/95 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-red-600/50 hover:shadow-[0_0_35px_rgba(220,38,38,0.2)]">
              <CardContent className="p-6 sm:p-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/20 ring-1 ring-red-500/40">
                  <HeartPulse className="h-8 w-8 text-red-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                </div>

                <h3 className="mb-4 text-2xl font-black text-white tracking-wide">
                  {missionVisionContent.mission.title}
                </h3>

                <p className="leading-relaxed text-zinc-300 text-sm sm:text-base">
                  {missionVisionContent.mission.description}
                </p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.15}>
            <Card className="group h-full border border-red-950/90 bg-[#0c0d14]/95 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-red-600/50 hover:shadow-[0_0_35px_rgba(220,38,38,0.2)]">
              <CardContent className="p-6 sm:p-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/20 ring-1 ring-red-500/40">
                  <Eye className="h-8 w-8 text-red-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                </div>

                <h3 className="mb-4 text-2xl font-black text-white tracking-wide">
                  {missionVisionContent.vision.title}
                </h3>

                <p className="leading-relaxed text-zinc-300 text-sm sm:text-base">
                  {missionVisionContent.vision.description}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
