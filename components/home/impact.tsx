"use client";

import ImpactCard from "@/components/home/impact-card";
import Reveal from "@/components/ui/reveal";
import Stagger from "@/components/ui/stagger";

import { impactData } from "@/data/home/impact";

export default function Impact() {
  return (
    <section
      id="impact"
      className="bg-slate-950 py-12 sm:py-16 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="mx-auto mb-10 sm:mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-xs sm:text-sm font-medium text-red-400">
              Our Impact
            </span>

            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Trusted Medical Excellence
            </h2>

            <p className="mt-3 sm:mt-6 text-sm sm:text-lg leading-relaxed sm:leading-8 text-slate-400">
              Delivering professional emergency medical services with
              dedication, compassion, and excellence across XLANTIS City.
            </p>
          </div>
        </Reveal>

        {/* Impact Cards */}
        <Stagger
          className="grid gap-4 sm:gap-6 xl:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
        >
          {impactData.map((item) => (
            <ImpactCard
              key={item.id}
              icon={item.icon}
              value={item.value}
              suffix={item.suffix}
              title={item.title}
              description={item.description}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}