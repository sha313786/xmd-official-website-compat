"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  HeartPulse,
  MessageCircle,
  Youtube,
  Instagram,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="XMD Logo"
                width={60}
                height={60}
                priority
              />

              <div>
                <h3 className="text-xl font-bold text-white">
                  XMD
                </h3>

                <p className="text-xs uppercase tracking-wider text-gray-400">
                  XLANTIS MEDICAL DEPARTMENT
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-gray-400">
              Advancing Through X-pertise
            </p>

            <p className="text-sm text-gray-500">
              Emergency Response • Professional Healthcare • Community First
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm">
              {[
                "Home",
                "About",
                "Services",
                "Departments",
                "Recruitment",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 transition-colors hover:text-red-500"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">
              Contact
            </h4>

            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-red-500" />
                XLANTIS City
              </div>

              <div className="flex items-center gap-3">
                <HeartPulse className="h-4 w-4 text-red-500" />
                Emergency Services 24/7
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-red-500" />
                Join our Discord
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">
              Follow Us
            </h4>

            <div className="flex gap-4">
              <Link
                href="#"
                className="rounded-lg border border-white/10 p-3 transition-all hover:border-red-500 hover:bg-red-500/10"
              >
                <MessageCircle className="h-5 w-5 text-white" />
              </Link>

              <Link
                href="#"
                className="rounded-lg border border-white/10 p-3 transition-all hover:border-red-500 hover:bg-red-500/10"
              >
                <Youtube className="h-5 w-5 text-white" />
              </Link>

              <Link
                href="#"
                className="rounded-lg border border-white/10 p-3 transition-all hover:border-red-500 hover:bg-red-500/10"
              >
                <Instagram className="h-5 w-5 text-white" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
         <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
           <p>
             © 2026 XLANTIS Medical Department. All rights reserved.
           </p>

            <div className="text-center md:text-right">
                <p>
                  Powered by{" "}
                 <span className="font-medium text-red-500">
                  XMD Official Team
                </span>
                </p>

                <p className="text-xs text-gray-500">
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