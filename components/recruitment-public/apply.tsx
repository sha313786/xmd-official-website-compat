"use client";

import Link from "next/link";

import Reveal from "@/components/shared/reveal";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  CheckCircle2,
  ExternalLink,
  Lock,
} from "lucide-react";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

const checklist = [
  "Citizen for at least 2 weeks",
  "Active Discord Account",
  "Working Microphone",
  "Gang & Club Members are not eligible",
];

export default function RecruitmentApply() {
  const { settings, loading } = useRecruitmentSettings();

  const isOpen = settings?.is_open ?? false;

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
          <div className="rounded-3xl border border-white/10 bg-black/20 p-12 text-center shadow-2xl backdrop-blur-md">

            {/* Status Badge */}
            {loading ? (
              <Badge className="mb-6 bg-gray-600 text-white px-4 py-1">
                Loading...
              </Badge>
            ) : (
              <Badge
                className={`mb-6 px-4 py-1 text-white ${
                  isOpen
                    ? "bg-green-600 hover:bg-green-600"
                    : "bg-red-600 hover:bg-red-600"
                }`}
              >
                {isOpen
                  ? "🟢 Recruitment Open"
                  : "🔴 Recruitment Closed"}
              </Badge>
            )}

            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Begin Your Medical Career Today
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Join the XMD Medical Department and become part of a professional
              emergency medical team dedicated to serving the community through
              realistic medical roleplay.
            </p>

            {/* Checklist */}
            <div className="mx-auto mt-12 max-w-2xl">
              <h3 className="mb-6 text-xl font-semibold text-white">
                Before You Apply
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
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
            </div>

            {/* Buttons */}
            <div className="mt-12 flex flex-wrap justify-center gap-5">

              {isOpen ? (
                <Link href="/recruitment/apply">
                  <Button className="h-14 rounded-xl px-10 text-base font-bold shadow-lg">
                    Apply Now
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled
                  className="h-14 rounded-xl px-10 text-base font-bold"
                >
                  <Lock className="mr-2 h-5 w-5" />
                  Recruitment Closed
                </Button>
              )}

              {settings?.discord_invite && (
                <Link
                  href={settings.discord_invite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="secondary"
                    className="h-14 rounded-xl px-10 text-base font-semibold shadow-lg"
                  >
                    Join Discord
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>

            {!isOpen && !loading && (
              <p className="mt-6 text-sm text-red-300">
                Applications are currently closed. Please join our Discord server
                to stay updated on the next recruitment cycle.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}