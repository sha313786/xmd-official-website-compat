"use client";

import { Ambulance, ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/reveal";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-6 pt-20 text-white"
      style={{
        backgroundImage: "url('/images/hero/hospital-bg.jpg')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-slate-950/60 to-black/85" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Emergency Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-medium text-red-400 backdrop-blur-md">
          <Ambulance className="h-4 w-4" />
          Emergency Services Available 24/7
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight lg:text-7xl">
          XLANTIS
          <span className="mt-2 block text-red-500">
            Medical Department
          </span>
        </h1>

        {/* Divider */}
        <div className="mx-auto mt-8 h-1 w-28 rounded-full bg-red-600" />

        {/* Tagline */}
        <p className="mt-6 text-2xl font-medium text-slate-300">
          Advancing Through X-pertise
        </p>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300 lg:text-xl">
          Providing professional emergency medical
          services, rapid response, and compassionate
          healthcare throughout XLANTIS City.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <button className="rounded-xl bg-red-600 px-10 py-5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30">
            Join XMD
          </button>

          <button className="rounded-xl border border-white/20 bg-white/5 px-10 py-5 font-semibold text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:border-red-500 hover:bg-red-500/10">
            Explore Departments
          </button>
        </div>

        {/* Highlights */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-red-500">✓</span>
            Emergency Response
          </div>

          <div className="flex items-center gap-2">
            <span className="text-red-500">✓</span>
            Professional Medical Staff
          </div>

          <div className="flex items-center gap-2">
            <span className="text-red-500">✓</span>
            Community First
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/70" />
      </div>
    </section>
  );
}