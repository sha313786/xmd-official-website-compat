import Image from "next/image";
import { siteConfig } from "@/lib/constants";

type PageBannerProps = {
  title: string;
  subtitle: string;
};

export function PageBanner({ title, subtitle }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 pb-20 pt-32 text-white">
      <div className="absolute right-4 top-24 opacity-20 md:right-16">
        <Image src={siteConfig.logo} alt="XMD logo" width={340} height={227} className="h-auto w-64" priority />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-medical-blue">{siteConfig.shortName}</p>
        <h1 className="mt-3 font-heading text-5xl font-bold md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{subtitle}</p>
      </div>
    </section>
  );
}
