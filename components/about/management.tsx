"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/ui/reveal";
import { managementTeam } from "@/data/about/management";

export default function Management() {
  return (
    <section className="relative overflow-hidden pt-24 bg-[#030508]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-red-500">
              Leadership
            </span>

            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl md:text-5xl tracking-tight">
              Management Team
            </h2>

            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-red-600 to-red-800 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-300">
              Meet the dedicated leaders who guide XLANTIS Medical Department
              with professionalism, integrity, and a commitment to excellence.
            </p>
          </div>
        </Reveal>

        {/* Management Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {managementTeam.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.1}>
              <Card className="group relative overflow-hidden rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-2 hover:border-red-600/50 hover:shadow-[0_0_35px_rgba(220,38,38,0.25)]">
                
                {/* Top red accent */}
                <div className="absolute left-0 right-0 top-0 z-20 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

                {/* Portrait */}
                <div className="relative h-[360px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Cinematic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-[#0c0d14]/30 to-transparent" />

                  {/* Dark side gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

                  {/* Red left accent */}
                  <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-80" />

                  {/* Member information */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                    <div className="mb-3 h-[2px] w-12 bg-red-500 transition-all duration-500 group-hover:w-20" />

                    <h3 className="text-2xl font-black uppercase tracking-wide text-white md:text-3xl">
                      {member.name}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-red-400">
                      {member.rank}
                    </p>
                  </div>
                </div>

                {/* Card footer */}
                <CardContent className="relative px-6 py-4">
                  {/* Bottom divider */}
                  <div className="h-px w-full bg-gradient-to-r from-red-500/50 via-white/10 to-transparent" />
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Credit */}
      <section className="mt-24 border-t border-red-950/80 bg-[#05060a] py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs sm:text-sm text-zinc-400">
            The design of this About page is based on the creative vision of{" "}
            <span className="font-semibold text-red-400">
              Sunny Kuruvila
            </span>
            .
          </p>
        </div>
      </section>
    </section>
  );
}