"use client";

import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";

import CTAStat from "@/components/home/cta-stat";
import Reveal from "@/components/ui/reveal";
import Stagger from "@/components/ui/stagger";

import {
  ctaContent,
  ctaStats,
} from "@/data/home/cta";

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-black py-12 sm:py-16 md:py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-black" />

      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[180px]" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="grid gap-8 sm:gap-12 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-16">

            {/* Left */}
            <Reveal>
              <div>
                <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-xs sm:text-sm font-medium text-red-400">
                  {ctaContent.badge}
                </span>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                  <div className="relative shrink-0">
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-600/30" />

                    <div className="relative flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-600">
                      <HeartPulse className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
                    {ctaContent.title}
                  </h2>
                </div>

                <p className="mt-4 sm:mt-8 max-w-2xl text-sm sm:text-lg leading-relaxed sm:leading-8 text-slate-400">
                  {ctaContent.description}
                </p>

                <div className="mt-6 sm:mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={ctaContent.primaryButton.href}
                    className="
                      w-full sm:w-auto
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-red-600
                      px-6 sm:px-8
                      py-3.5 sm:py-4
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:bg-red-700
                      hover:shadow-xl
                      hover:shadow-red-600/30
                      active:scale-98
                    "
                  >
                    {ctaContent.primaryButton.label}
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  <Link
                    href={ctaContent.secondaryButton.href}
                    className="
                      w-full sm:w-auto
                      inline-flex
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-6 sm:px-8
                      py-3.5 sm:py-4
                      font-semibold
                      text-white
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:border-red-500/40
                      hover:bg-red-500/10
                      active:scale-98
                    "
                  >
                    {ctaContent.secondaryButton.label}
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Right */}
            <Stagger
              className="grid grid-cols-2 gap-3 sm:gap-5"
              staggerDelay={100}
            >
              {ctaStats.map((stat) => (
                <CTAStat
                  key={stat.id}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </Stagger>

          </div>
        </div>
      </div>
    </section>
  );
}