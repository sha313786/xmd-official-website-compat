"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Reveal from "@/components/ui/reveal";
import { aboutHeroContent } from "@/data/about/hero";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-red-950/80 bg-[#030508]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.22),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_15%,rgba(139,0,0,0.28),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-b from-transparent to-[#030508]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 pt-28 pb-16 md:pt-36 md:pb-24 text-center">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-400" />
            <span className="text-red-500 font-semibold">About</span>
          </nav>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute inset-0 rounded-full bg-red-600/25 blur-3xl animate-pulse" />
            <Image
              src="/images/logo.png"
              alt="XMD Logo"
              width={100}
              height={100}
              priority
              className="relative animate-float sm:w-[120px] sm:h-[120px] drop-shadow-[0_0_25px_rgba(220,38,38,0.35)]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white">
            {aboutHeroContent.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-3 sm:mt-5 text-base sm:text-xl font-semibold text-red-500">
            {aboutHeroContent.subtitle}
          </p>
          <div className="mx-auto mt-4 sm:mt-5 h-1 w-20 sm:w-24 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-700 shadow-[0_0_12px_rgba(220,38,38,0.5)]" />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 sm:mt-8 max-w-3xl text-sm sm:text-lg leading-relaxed sm:leading-8 text-zinc-300 px-2">
            {aboutHeroContent.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
