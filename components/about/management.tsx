"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/ui/reveal";
import { managementTeam } from "@/data/about/management";

export default function Management() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
              Leadership
            </span>

            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Management Team
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-red-500 to-red-700" />

            <p className="mt-8 text-lg leading-8 text-gray-300">
              Meet the dedicated leaders who guide XLANTIS Medical Department
              with professionalism, integrity, and a commitment to excellence.
            </p>
          </div>
        </Reveal>

        {/* Management Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {managementTeam.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.1}>
              <Card className="group relative overflow-hidden border border-white/10 bg-[#08090b] transition-all duration-500 hover:-translate-y-3 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-600/20">
                
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/20 to-transparent" />

                  {/* Dark side gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

                  {/* Red left accent */}
                  <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-80" />


                  {/* Member information */}
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="mb-3 h-[2px] w-12 bg-red-500 transition-all duration-500 group-hover:w-20" />

                    <h3 className="text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
                      {member.name}
                    </h3>

                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
                      {member.rank}
                    </p>
                  </div>
                </div>

                {/* Card footer */}
                <CardContent className="relative px-7 py-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                    </div>
                  </div>

                  {/* Bottom divider */}
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-red-500/50 via-white/10 to-transparent" />
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Credit */}
      <section className="mt-24 border-t border-white/10 bg-slate-950 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-400">
            {" • "}
            The design of this About page is based on the creative vision of{" "}
            <span className="font-semibold text-red-300">
              Sunny Kuruvila
            </span>
            .
          </p>
        </div>
      </section>
    </section>
  );
}