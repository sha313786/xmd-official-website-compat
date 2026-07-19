"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import  Reveal  from "@/components/ui/reveal";
import { aboutHeroContent } from "@/data/about/hero";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#050816] via-[#0b1224] to-[#070b18]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-b from-transparent to-background" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20 md:py-28 text-center">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-red-500">About</span>
          </nav>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-red-600/20 blur-3xl animate-pulse" />
            <Image
              src="/images/logo.png"
              alt="XMD Logo"
              width={120}
              height={120}
              priority
              className="relative animate-float"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-5xl font-black uppercase tracking-[0.2em] text-white md:text-6xl">
            {aboutHeroContent.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 text-xl font-semibold text-red-500">
            {aboutHeroContent.subtitle}
          </p>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-700" />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            {aboutHeroContent.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
