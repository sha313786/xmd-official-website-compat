"use client";

import {
  Ambulance,
  ChevronDown,
  HeartPulse,
  Building2,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 sm:px-6 pt-24 sm:pt-28 pb-16 text-white"
      style={{
        backgroundImage: "url('/images/hero/hospital-bg.jpg')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-slate-950/70 to-black/90" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-6xl text-center">

        {/* Emergency Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium text-red-300 shadow-lg shadow-red-600/20 backdrop-blur-md animate-[pulse_3s_ease-in-out_infinite]">
          <Ambulance className="h-4 w-4 shrink-0 text-red-400" />
          <span>Emergency Services Available 24/7</span>
        </div>

        {/* Heading */}
        <h1 className="mt-6 sm:mt-8 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
          XLANTIS
          <span className="mt-1 sm:mt-2 block text-red-500">
            Medical Department
          </span>
        </h1>

        {/* Divider */}
        <div className="mx-auto mt-5 sm:mt-8 h-1 w-24 sm:w-36 rounded-full bg-red-600" />

        {/* Tagline */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl lg:text-2xl font-medium text-slate-300">
          Advancing Through X-pertise
        </p>

        {/* Description */}
        <p className="mx-auto mt-4 sm:mt-8 max-w-2xl text-sm sm:text-lg leading-relaxed sm:leading-8 text-slate-300 lg:text-xl px-2">
          Providing professional emergency medical services,
          rapid response, and compassionate healthcare
          throughout XLANTIS City.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-3 sm:gap-6 w-full max-w-sm sm:max-w-none mx-auto sm:flex-row">
          <Link
            href="/recruitment"
            className="group flex h-13 sm:h-16 w-full sm:w-auto min-w-[200px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8B0000] via-red-600 to-red-500 px-6 sm:px-8 font-semibold text-white shadow-lg shadow-red-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-red-500/60 active:scale-[0.98]"
          >
            <HeartPulse className="h-5 w-5" />
            <span>Join XMD</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/#departments"
            className="group flex h-13 sm:h-16 w-full sm:w-auto min-w-[200px] items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 sm:px-8 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-white/10 active:scale-[0.98]"
          >
            <Building2 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-3" />
            <span>Explore Departments</span>
          </Link>
        </div>

        {/* Highlights */}
        <div className="mt-8 sm:mt-14 flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-2">
          {[
            "Emergency Response",
            "Professional Medical Staff",
            "Community First",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10"
            >
              <span className="text-red-500 font-bold">✓</span>
              {item}
            </div>
          ))}
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-7 w-7 text-red-400 opacity-70" />
      </div>
    </section>
  );
}