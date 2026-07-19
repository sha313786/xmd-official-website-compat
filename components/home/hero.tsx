"use client";

import {
  Ambulance,
  ChevronDown,
  HeartPulse,
  Building2,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";
import Reveal from "@/components/ui/reveal";

export default function Hero() {
  return (
  <section
    id="home"
    className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-6 pt-20 text-white"
    style={{
      backgroundImage: "url('/images/hero/hospital-bg.jpg')",
    }}
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-slate-950/60 to-black/85" />

    {/* Hero Content */}
    <div className="relative z-10 mx-auto max-w-6xl text-center">

      {/* Emergency Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-medium text-red-300 shadow-lg shadow-red-600/20 backdrop-blur-md animate-[pulse_3s_ease-in-out_infinite]">
        <Ambulance className="h-4 w-4" />
        Emergency Services Available 24/7
      </div>

      {/* Heading */}
      <h1 className="mt-8 text-5xl font-black leading-tight tracking-normal lg:text-7xl">
        XLANTIS
        <span className="mt-2 block text-red-500">
          Medical Department
        </span>
      </h1>

      {/* Divider */}
      <div className="mx-auto mt-8 h-1 w-36 rounded-full bg-red-600" />

      {/* Tagline */}
      <p className="mt-6 text-2xl font-medium text-slate-300">
        Advancing Through X-pertise
      </p>

      {/* Description */}
      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300 lg:text-xl">
        Providing professional emergency medical services,
        rapid response, and compassionate healthcare
        throughout XLANTIS City.
      </p>

      {/* CTA Buttons */}
      <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">

        <Link
          href="/recruitment"
          className="group flex h-16 min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8B0000] via-red-600 to-red-500 px-8 font-semibold text-white shadow-lg shadow-red-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(239,68,68,.45)] active:scale-[0.97]"
        >
          <HeartPulse className="h-5 w-5" />
          <span>Join XMD</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <Link
          href="#departments"
          className="group flex h-16 min-w-[220px] items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-red-500 hover:bg-white/10 active:scale-[0.97]"
        >
          <Building2 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-3" />
          <span>Explore Departments</span>
        </Link>

      </div>

      {/* Highlights */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
        {[
          "Emergency Response",
          "Professional Medical Staff",
          "Community First",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10"
          >
            <span className="text-red-500">✓</span>
            {item}
          </div>
        ))}
      </div>

    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown className="h-8 w-8 text-red-400 opacity-80" />
    </div>
  </section>
);
}