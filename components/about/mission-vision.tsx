
"use client";

import { Eye, HeartPulse } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import  Reveal  from "@/components/ui/reveal";
import { missionVisionContent } from "@/data/about/mission-vision";

export default function MissionVision() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
              Our Purpose
            </span>

            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Mission & Vision
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-red-500 to-red-700" />

            <p className="mt-8 text-lg leading-8 text-gray-300">
              Guided by compassion, professionalism, and innovation, we strive
              to deliver exceptional emergency medical services while shaping
              the future of healthcare within XLANTIS City.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Card className="group h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-500/10">
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/15">
                  <HeartPulse className="h-8 w-8 text-red-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  {missionVisionContent.mission.title}
                </h3>

                <p className="leading-8 text-gray-300">
                  {missionVisionContent.mission.description}
                </p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.15}>
            <Card className="group h-full border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-500/10">
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/15">
                  <Eye className="h-8 w-8 text-red-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  {missionVisionContent.vision.title}
                </h3>

                <p className="leading-8 text-gray-300">
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
