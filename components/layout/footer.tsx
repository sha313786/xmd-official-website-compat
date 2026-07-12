import Image from "next/image";
import Link from "next/link";
import { Globe, Mail, Phone, ExternalLink } from "lucide-react";

import {
  departments,
  navItems,
  siteConfig,
} from "@/lib/constants";

export function Footer() {
  const icons = [Globe, Mail, Phone, ExternalLink];

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src={siteConfig.logo}
            alt="XMD logo"
            width={210}
            height={140}
            className="h-auto w-44"
          />

          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
            {siteConfig.description}
          </p>

          <div className="mt-6 flex gap-3">
            {icons.map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="XMD link"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-heading font-semibold">
            Quick Links
          </h2>

          <div className="mt-4 grid gap-2">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-heading font-semibold">
            Departments
          </h2>

          <div className="mt-4 grid gap-2">
            {departments.map((item) => (
              <span
                key={item.title}
                className="text-sm text-slate-300"
              >
                {item.title}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-heading font-semibold">
            Contact
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            Xlantis Medical Center
            <br />
            Emergency dispatch available in-server.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} {siteConfig.organization}. All rights
        reserved.
      </div>
    </footer>
  );
}