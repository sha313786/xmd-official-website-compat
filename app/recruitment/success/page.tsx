import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  MessageCircle,
  FileCheck2,
  ShieldCheck,
  Home,
} from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/home/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RecruitmentSuccessPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#030508] pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Background Gradients */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.2),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_15%,rgba(16,185,129,0.15),transparent_75%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="container relative mx-auto max-w-4xl px-4 sm:px-6">
          <Card className="overflow-hidden rounded-3xl border border-red-950/90 bg-[#0c0d14]/95 shadow-[0_10px_45px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <CardContent className="p-6 sm:p-12">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-emerald-600/20 ring-1 ring-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-400" />
                </div>

                <Badge className="mt-6 sm:mt-8 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Dossier Successfully Transmitted
                </Badge>

                <h1 className="mt-4 sm:mt-6 text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Application Received!
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Your XMD cadet recruitment application has been officially logged in our management database. XMD Recruitment Command will carefully review your credentials.
                </p>
              </div>

              {/* Timeline Steps */}
              <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 md:grid-cols-3">
                <Card className="rounded-2xl border border-red-950/80 bg-black/50 shadow-sm">
                  <CardContent className="p-5 sm:p-6 text-center">
                    <FileCheck2 className="mx-auto mb-3 h-8 w-8 text-red-400" />
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      1. Queue Intake
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      Application filed in active batch and awaiting review.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-red-950/80 bg-black/50 shadow-sm">
                  <CardContent className="p-5 sm:p-6 text-center">
                    <Clock3 className="mx-auto mb-3 h-8 w-8 text-red-400" />
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      2. Command Review
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      Staff evaluates roleplay quality, scenario logic, and background.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-red-950/80 bg-black/50 shadow-sm">
                  <CardContent className="p-5 sm:p-6 text-center">
                    <ShieldCheck className="mx-auto mb-3 h-8 w-8 text-red-400" />
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      3. Voice Interview
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      Qualified candidates receive a Discord DM invitation for oral interview.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Warning Notice */}
              <Card className="mt-8 sm:mt-10 rounded-2xl border border-amber-900/60 bg-[#160d05]/90 shadow-sm">
                <CardContent className="p-5 sm:p-6">
                  <h3 className="text-sm sm:text-base font-bold text-amber-400 uppercase tracking-wider">
                    Important Next Steps
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Please ensure your Discord Direct Messages (DMs) are open to members of the official XMD Discord server. Automated interview invites and status notices are sent directly to your Discord account.
                  </p>

                  <p className="mt-3 text-xs font-semibold text-red-400">
                    ⚠️ Failure to attend your scheduled interview without prior notice may result in an application rejection and a temporary recruitment cooldown.
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link href="/" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-13 px-6 rounded-xl border border-white/15 bg-white/5 text-white font-semibold backdrop-blur-md hover:border-red-500/50 hover:bg-white/10"
                  >
                    <Home className="mr-2 h-4 w-4 text-red-400" />
                    Return to Home
                  </Button>
                </Link>

                <Link
                  href="https://discord.gg/wD6Tqqg6pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    className="w-full sm:w-auto h-13 px-6 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold shadow-[0_0_20px_rgba(88,101,242,0.4)]"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Join Official Discord
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}