import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/constants";

export function CTA() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-3xl bg-slate-950 p-8 text-white shadow-soft md:grid-cols-[1fr_auto] md:p-12">
        <div>
          <Image src={siteConfig.logo} alt="XMD logo" width={180} height={120} className="mb-6 h-auto w-36" />
          <h2 className="font-heading text-3xl font-bold md:text-5xl">Ready to serve with XMD?</h2>
          <p className="mt-4 max-w-2xl text-slate-300">Join a disciplined medical department built around training, teamwork, and high-quality roleplay.</p>
        </div>
        <Link href="/recruitment" className="inline-flex justify-center rounded-full bg-primary px-7 py-3 font-bold text-white">
          Apply Now
        </Link>
      </div>
    </section>
  );
}
