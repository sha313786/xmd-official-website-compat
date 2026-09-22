"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Clock3,
  HeartPulse,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import { useRecruitmentSettings } from "@/hooks/use-recruitment-settings";

export default function RecruitmentHero() {
  const { settings, loading } = useRecruitmentSettings();

  const isOpen = settings?.is_open ?? false;

  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-background">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-5xl text-center">
          {/* Icon */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4 sm:p-5 ring-8 ring-primary/5">
              <HeartPulse className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
          </div>

          {/* Status */}
          <div className="mb-5 sm:mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {loading ? (
              <Badge
                variant="outline"
                className="rounded-full px-3.5 py-1 text-xs sm:text-sm"
              >
                Loading...
              </Badge>
            ) : (
              <Badge
                className={`rounded-full px-3.5 py-1 text-xs sm:text-sm ${
                  isOpen
                    ? "bg-green-600 hover:bg-green-600 text-white"
                    : "bg-red-600 hover:bg-red-600 text-white"
                }`}
              >
                {isOpen
                  ? "🟢 Recruitment Open"
                  : "🔴 Recruitment Closed"}
              </Badge>
            )}

            <Badge
              variant="outline"
              className="rounded-full px-3.5 py-1 text-xs sm:text-sm"
            >
              <Clock3 className="mr-1.5 h-3.5 w-3.5" />
              5–10 Minutes
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">
            Join XMD Medical Department
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-sm sm:text-lg leading-relaxed sm:leading-8 text-muted-foreground px-2">
            Become part of a professional emergency medical team dedicated to
            saving lives, serving the community, and delivering exceptional
            medical roleplay with professionalism and teamwork.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
            {isOpen ? (
              <Link href="/recruitment/apply" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button size="lg" disabled className="w-full sm:w-auto">
                Recruitment Closed
              </Button>
            )}

            {settings?.discord_invite && (
              <Link
                href={settings.discord_invite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Join Discord
                </Button>
              </Link>
            )}
          </div>

          {/* Features */}
          <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl border bg-background/80 p-5 sm:p-6 shadow-sm backdrop-blur md:grid-cols-3">
            <div className="flex flex-col items-center">
              <Activity className="mb-2.5 h-7 w-7 text-primary" />
              <h3 className="font-semibold text-sm sm:text-base">24/7 Response</h3>
              <p className="mt-1 text-center text-xs sm:text-sm text-muted-foreground">
                Always ready to respond to medical emergencies.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <HeartPulse className="mb-2.5 h-7 w-7 text-primary" />
              <h3 className="font-semibold text-sm sm:text-base">Professional RP</h3>
              <p className="mt-1 text-center text-xs sm:text-sm text-muted-foreground">
                Deliver realistic and immersive medical roleplay.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <ShieldCheck className="mb-2.5 h-7 w-7 text-primary" />
              <h3 className="font-semibold text-sm sm:text-base">Easy Recruitment</h3>
              <p className="mt-1 text-center text-xs sm:text-sm text-muted-foreground">
                A simple application process reviewed by XMD Management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}