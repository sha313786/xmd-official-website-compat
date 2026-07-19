import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Clock3,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

export default function RecruitmentHero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-background">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 p-5 ring-8 ring-primary/5">
              <HeartPulse className="h-12 w-12 text-primary" />
            </div>
          </div>

          {/* Status Badges */}
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <Badge className="rounded-full px-4 py-1 text-sm">
              🟢 Recruitment Open
            </Badge>

            <Badge variant="outline" className="rounded-full px-4 py-1 text-sm">
              <Clock3 className="mr-2 h-4 w-4" />
              5–10 Minutes
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Join XMD Medical Department
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Become part of a professional emergency medical team dedicated to
            saving lives, serving the community, and delivering exceptional
            medical roleplay with professionalism and teamwork.
          </p>

          {/* Stats */}
          <div className="mt-14 grid gap-5 rounded-3xl border bg-background/80 p-6 shadow-sm backdrop-blur md:grid-cols-3">
            <div className="flex flex-col items-center">
              <Activity className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-semibold">24/7 Response</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Always ready to respond to medical emergencies.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <HeartPulse className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-semibold">Professional RP</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Deliver realistic and immersive medical roleplay.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <ShieldCheck className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-semibold">Easy Recruitment</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                A simple application process reviewed by XMD Management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}