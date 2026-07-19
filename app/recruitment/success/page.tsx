import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  CheckCircle2,
  Clock3,
  MessageCircle,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";;

export default function RecruitmentSuccessPage() {
  return (
    <main className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-background to-background" />
      <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative mx-auto max-w-4xl px-6">
        <Card className="overflow-hidden rounded-3xl border bg-background/80 shadow-xl backdrop-blur">
          <CardContent className="p-12">
            <div className="text-center">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>

              <Badge className="mt-8 bg-green-500/10 text-green-500">
                Application Submitted
              </Badge>

              <h1 className="mt-6 text-5xl font-bold">
                Thank You!
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Your XMD recruitment application has been successfully
                submitted. The Recruitment Team will carefully review your
                application.
              </p>
            </div>

            {/* Timeline */}

            <div className="mt-14 grid gap-6 md:grid-cols-3">

              <Card className="border-primary/10">
                <CardContent className="p-6 text-center">
                  <FileCheck2 className="mx-auto mb-4 h-10 w-10 text-primary" />

                  <h3 className="font-semibold">
                    Application Received
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Your application has been added to our review queue.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/10">
                <CardContent className="p-6 text-center">
                  <Clock3 className="mx-auto mb-4 h-10 w-10 text-primary" />

                  <h3 className="font-semibold">
                    Under Review
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    XMD Management will evaluate your application.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/10">
                <CardContent className="p-6 text-center">
                  <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-primary" />

                  <h3 className="font-semibold">
                    Interview
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Shortlisted applicants will receive interview details.
                  </p>
                </CardContent>
              </Card>

            </div>

            {/* Notice */}

            <Card className="mt-10 border-yellow-500/30 bg-yellow-500/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">
                  Important Reminder
                </h3>

                <p className="mt-3 text-muted-foreground">
                  Please keep an eye on your Discord messages. If selected,
                  you will receive interview instructions from the XMD
                  Recruitment Team.
                </p>

                <p className="mt-4 text-sm font-medium text-red-500">
                  Missing your scheduled interview may result in the removal
                  of your pending recruitment role and a 20-day cooldown
                  from applying to any Government Job.
                </p>
              </CardContent>
            </Card>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link href="/dashboard">
  <Button>
    Go to Dashboard
  </Button>
</Link>

              <Link href="/some-page">
  <Button>
    Text
  </Button>
</Link>

            </div>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}