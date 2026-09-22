"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  HeartPulse,
  Youtube,
  Instagram,
} from "lucide-react";

const DISCORD_URL = "https://discord.gg/wD6Tqqg6pc";

function DiscordIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.54 5.32A16.92 16.92 0 0 0 15.4 4l-.51 1.04a15.6 15.6 0 0 0-5.78 0L8.6 4a16.98 16.98 0 0 0-4.14 1.33C1.83 9.56 1.12 13.7 1.47 17.79a16.96 16.96 0 0 0 5.1 2.6l1.24-1.7c-.68-.25-1.33-.56-1.94-.92l.48-.37c3.74 1.74 7.79 1.74 11.49 0 .16.13.32.25.48.37-.62.36-1.27.67-1.95.92l1.24 1.7a16.93 16.93 0 0 0 5.1-2.6c.42-4.74-.72-8.84-3.17-12.47ZM8.67 15.08c-1.12 0-2.04-1.03-2.04-2.29s.9-2.29 2.04-2.29c1.14 0 2.06 1.03 2.04 2.29 0 1.26-.9 2.29-2.04 2.29Zm6.66 0c-1.12 0-2.04-1.03-2.04-2.29s.9-2.29 2.04-2.29c1.14 0 2.06 1.03 2.04 2.29 0 1.26-.9 2.29-2.04 2.29Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="XMD Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  XMD
                </h3>

                <p className="text-[11px] uppercase tracking-wider text-gray-400">
                  XLANTIS MEDICAL DEPARTMENT
                </p>
              </div>
            </div>

            <p className="text-sm leading-6 text-gray-400">
              Advancing Through X-pertise
            </p>

            <p className="text-xs text-gray-500 leading-relaxed">
              Emergency Response • Professional Healthcare • Community First
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">
              Quick Links
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#home"
                  className="text-gray-400 transition-colors hover:text-red-500"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-gray-400 transition-colors hover:text-red-500"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/#services"
                  className="text-gray-400 transition-colors hover:text-red-500"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/#departments"
                  className="text-gray-400 transition-colors hover:text-red-500"
                >
                  Departments
                </Link>
              </li>

              <li>
                <Link
                  href="/recruitment"
                  className="text-gray-400 transition-colors hover:text-red-500"
                >
                  Recruitment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">
              Contact
            </h4>

            <div className="space-y-3 text-sm text-gray-400">

              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-red-500" />
                <span>XLANTIS City</span>
              </div>

              <div className="flex items-center gap-2.5">
                <HeartPulse className="h-4 w-4 shrink-0 text-red-500" />
                <span>Emergency Services 24/7</span>
              </div>

              {/* Discord Contact */}
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-400 transition-colors hover:text-red-400"
              >
                <DiscordIcon className="h-4 w-4 shrink-0 text-red-500" />
                <span>Join our Discord</span>
              </a>

            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white">
              Follow Us
            </h4>

            <div className="flex gap-3">

              {/* Discord */}
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join XMD Discord"
                title="Join XMD Discord"
                className="rounded-xl border border-white/10 p-2.5 transition-all hover:border-red-500 hover:bg-red-500/10 active:scale-95"
              >
                <DiscordIcon className="h-5 w-5 text-white" />
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="XMD YouTube"
                className="rounded-xl border border-white/10 p-2.5 transition-all hover:border-red-500 hover:bg-red-500/10 active:scale-95"
              >
                <Youtube className="h-5 w-5 text-white" />
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="XMD Instagram"
                className="rounded-xl border border-white/10 p-2.5 transition-all hover:border-red-500 hover:bg-red-500/10 active:scale-95"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs sm:text-sm text-gray-500 md:flex-row text-center md:text-left">

            <p>
              © 2026 XLANTIS Medical Department. All rights reserved.
            </p>

            <div className="text-center md:text-right">
              <p>
                Powered by{" "}
                <span className="font-medium text-red-500">
                  XMD Official
                </span>
              </p>

              <p className="text-[11px] text-gray-500">
                Designed &amp; Developed by{" "}
                <span className="font-semibold text-white">
                  SRB STUDIOS
                </span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}