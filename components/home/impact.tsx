"use client";

import ImpactCard from "@/components/home/impact-card";
import Reveal from "@/components/ui/reveal";
import Stagger from "@/components/ui/stagger";

import { impactData } from "@/data/home/impact";

export default function Impact() {
  return (
    <section
      id="impact"
      className="bg-slate-950 py-24"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-400">
              Our Impact
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-white md:text-5xl">
              Trusted Medical Excellence
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              Delivering professional emergency medical services with
              dedication, compassion, and excellence across XLANTIS City.
            </p>
          </div>
        </Reveal>

        {/* Impact Cards */}
        <Stagger
          className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4"
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