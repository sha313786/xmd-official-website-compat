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

      <main className="relative overflow-hidden bg-slate-950 pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-background to-background" />
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

        <div className="container relative mx-auto max-w-4xl px-4 sm:px-6">
          <Card className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-6 sm:p-12">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-green-500/10 ring-8 ring-green-500/5">
                  <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-green-500" />
                </div>

                <Badge className="mt-6 sm:mt-8 bg-green-500/15 text-green-400 border border-green-500/30 px-4 py-1 text-xs sm:text-sm">
                  Dossier Successfully Transmitted
                </Badge>

                <h1 className="mt-4 sm:mt-6 text-3xl sm:text-5xl font-black text-white">
                  Application Received!
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
                  Your XMD cadet recruitment application has been officially logged in our management database. XMD Recruitment Command will carefully review your credentials.
                </p>
              </div>

              {/* Timeline Steps */}
              <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 md:grid-cols-3">
                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-5 sm:p-6 text-center">
                    <FileCheck2 className="mx-auto mb-3 h-8 w-8 text-red-400" />
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      1. Queue Intake
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Application filed in active batch and awaiting review.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-5 sm:p-6 text-center">
                    <Clock3 className="mx-auto mb-3 h-8 w-8 text-red-400" />
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      2. Command Review
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Staff evaluates roleplay quality, scenario logic, and background.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-5 sm:p-6 text-center">
                    <ShieldCheck className="mx-auto mb-3 h-8 w-8 text-red-400" />
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      3. Voice Interview
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Qualified candidates receive a Discord DM invitation for oral interview.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Warning Notice */}
              <Card className="mt-8 sm:mt-10 border-yellow-500/30 bg-yellow-500/5">
                <CardContent className="p-5 sm:p-6">
                  <h3 className="text-sm sm:text-base font-bold text-yellow-400">
                    Important Next Steps
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Please ensure your Discord Direct Messages (DMs) are open to members of the official XMD Discord server. Automated interview invites and status notices are sent directly to your Discord account.
                  </p>

                  <p className="mt-3 text-xs font-medium text-red-400">
                    ⚠️ Failure to attend your scheduled interview without prior notice may result in an application rejection and a temporary recruitment cooldown.
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link href="/" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-white/10 bg-white/5 text-white hover:bg-white/10 h-12 px-6"
                  >
                    <Home className="mr-2 h-4 w-4" />
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
                    className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#4752c4] text-white h-12 px-6 font-semibold"
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