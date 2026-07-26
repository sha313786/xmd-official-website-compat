
"use client";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/ui/reveal";
import { managementTeam } from "@/data/about/management";

export default function Management() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
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
              Meet the dedicated leaders who guide XLANTIS Medical Department with professionalism, integrity, and a commitment to excellence.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {managementTeam.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.1}>
              <Card className="group h-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-500/10">
                <CardContent className="flex h-full flex-col items-center p-8 text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-red-600/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-800 p-[3px]">
                      <div className="relative h-36 w-36 overflow-hidden rounded-full bg-black">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="144px"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {member.name}
                  </h3>

                  <span className="mt-4 inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-sm font-semibold text-red-400">
                    {member.rank}
                  </span>
                </CardContent>
              </Card>
            </Reveal>
            
          ))}
        </div>
      </div>
      <section className="border-t border-white/10 bg-slate-950 py-8">
  <div className="mx-auto max-w-7xl px-6 text-center">
    <p className="text-sm text-slate-400">
      {" • "}
      The design of this About page is based on the creative vision of{" "}
      <span className="font-semibold text-red-300">
        Sunny Kuruvila
      </span>.
    </p>
  </div>
</section>
    </section>
  );
}
