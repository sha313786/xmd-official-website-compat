
"use client";

import Image from "next/image";
import { Ambulance, HeartPulse, ShieldCheck, Users } from "lucide-react";
import  Reveal  from "@/components/ui/reveal";
import { whoWeAreContent } from "@/data/about/who-we-are";

const icons=[HeartPulse,Ambulance,ShieldCheck,Users];

export default function WhoWeAre() {
  return (
    <section className="relative overflow-hidden py-24 bg-[#030508]">
      {/* Subtle ambient glows */}
      <div className="pointer-events-none absolute -left-48 top-1/2 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-red-500">
                About Us
              </span>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl md:text-5xl tracking-tight">
                {whoWeAreContent.title}
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-red-600 to-red-800 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-300">
                {whoWeAreContent.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {whoWeAreContent.highlights.map((item, index) => {
                  const Icon = icons[index];
                  return (
                    <Reveal key={item} delay={0.1 * (index + 1)}>
                      <div className="group flex items-center gap-4 rounded-2xl border border-red-950/80 bg-[#0c0d14]/95 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.15)]">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600/20 ring-1 ring-red-500/40">
                          <Icon className="h-6 w-6 text-red-400 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <span className="font-semibold text-sm sm:text-base text-zinc-100">
                          {item}
                        </span>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="group relative">
              <div className="absolute inset-0 rounded-3xl bg-red-600/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative overflow-hidden rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <Image
                  src={whoWeAreContent.image}
                  alt="XLANTIS Medical Department Team"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
