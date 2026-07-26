import Link from "next/link";
import { Wrench, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Maintenance",
};

export default function MaintenancePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-background to-background" />

      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-border bg-card/80 p-10 shadow-2xl backdrop-blur">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-600/10 p-6">
            <Wrench className="h-16 w-16 text-red-500" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">
            We'll Be Back Soon
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            The <strong>XMD Official Website</strong> is currently undergoing
            scheduled maintenance to improve performance, reliability, and user
            experience.
          </p>

          <p className="mt-2 text-muted-foreground">
            Our management dashboard remains available for authorized staff.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-5 text-center">
            <Clock className="mx-auto mb-3 h-8 w-8 text-red-500" />
            <h3 className="font-semibold">Scheduled Upgrade</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Performing system updates and maintenance.
            </p>
          </div>

          <div className="rounded-xl border p-5 text-center">
            <ShieldCheck className="mx-auto mb-3 h-8 w-8 text-red-500" />
            <h3 className="font-semibold">Security</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Applying the latest security improvements.
            </p>
          </div>

          <div className="rounded-xl border p-5 text-center">
            <Wrench className="mx-auto mb-3 h-8 w-8 text-red-500" />
            <h3 className="font-semibold">Optimization</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Enhancing performance and stability.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Staff Login
          </Link>

          <Link
            href="https://discord.gg/YOUR_INVITE"
            target="_blank"
            className="rounded-lg border px-6 py-3 font-semibold transition hover:bg-muted"
          >
            Join Our Discord
          </Link>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} XMD Official • Advancing Through
          X-pertise
        </div>
      </div>
    </main>
  );
}