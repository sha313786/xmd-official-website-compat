"use client";

import Link from "next/link";

import Reveal from "@/components/shared/reveal";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

const checklist = [
  "Citizen for at least 2 weeks",
  "Active Discord Account",
  "Working Microphone",
  "Gang & Club Members are not eligible",
];

export default function RecruitmentApply() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-900 to-zinc-950" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201, 23, 23, 0.64) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-black/20 p-12 text-center backdrop-blur-md shadow-2xl">

            <Badge className="mb-6 bg-green-600 hover:bg-green-600 text-white px-4 py-1">
              🟢 Recruitment Open
            </Badge>

            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Begin Your Medical Career Today
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Join the XMD Medical Department and become part of a professional
              emergency medical team dedicated to serving the community through
              realistic medical roleplay.
            </p>

            {/* Checklist */}

            <div className="mx-auto mt-12 grid max-w-2xl gap-4 md:grid-cols-2">
              Before You Apply
              {checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left"
                >
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-green-400" />

                  <span className="text-sm text-zinc-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}

            <div className="mt-12 flex flex-wrap justify-center gap-5">

  <Link href="/recruitment/apply">
  <Button
    className="h-14 rounded-xl px-10 text-base font-bold shadow-lg"
  >
    Apply Now
    
  </Button>
</Link>

  <Link
  href="https://discord.gg/WD6Tqqg6pc"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    variant="secondary"
    className="h-14 rounded-xl px-10 text-base font-semibold shadow-lg"
  >
    Join Discord
  </Button>
</Link>
</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}