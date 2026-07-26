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
      className="relative overflow-hidden bg-black py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-black" />

      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[180px]" />

      <div className="container relative mx-auto px-4">
  <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
    <div className="grid gap-12 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-16">

      {/* Left */}
      <Reveal>
        <div>
          <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-400">
            {ctaContent.badge}
          </span>

          <div className="mt-8 flex items-center gap-5">
            <div className="relative">
              <span className="absolute inset-0 animate-ping rounded-full bg-red-600/30" />

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
                <HeartPulse className="h-8 w-8 text-white" />
              </div>
            </div>

            <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
              {ctaContent.title}
            </h2>
          </div>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            {ctaContent.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={ctaContent.primaryButton.href}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-red-600
                px-8
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-red-700
                hover:shadow-xl
                hover:shadow-red-600/30
              "
            >
              {ctaContent.primaryButton.label}

              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href={ctaContent.secondaryButton.href}
              className="
                inline-flex
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-8
                py-4
                font-semibold
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-red-500/40
                hover:bg-red-500/10
              "
            >
              {ctaContent.secondaryButton.label}
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Right */}
      <Stagger
        className="grid grid-cols-2 gap-5"
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