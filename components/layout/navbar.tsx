"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-slate-950/80 shadow-xl backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="#home"
          className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.03]"
        >
          <Image
            src="/logo/xmd-logo.png"
            alt="XMD Logo"
            width={120}
            height={120}
            priority
          />

          <div>
            <h1 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-red-400">
              XMD
            </h1>

            <p className="text-xs text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
              XLANTIS MEDICAL DEPARTMENT
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 text-sm font-medium text-slate-300 lg:flex">
          <Link
            href="#home"
            className="relative transition-colors duration-300 hover:text-red-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="relative transition-colors duration-300 hover:text-red-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </Link>

          <Link
            href="#services"
            className="relative transition-colors duration-300 hover:text-red-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Services
          </Link>

          <Link
            href="#departments"
            className="relative transition-colors duration-300 hover:text-red-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Departments
          </Link>

          <Link
            href="/recruitment"
            className="relative transition-colors duration-300 hover:text-red-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Recruitment
          </Link>

          <Link
            href="#contact"
            className="relative transition-colors duration-300 hover:text-red-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </Link>
        </nav>

        {/* Login Button */}
        <Link
          href="/login"
          className="rounded-2xl bg-gradient-to-r from-[#8B0000] via-red-600 to-red-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-red-500/50"
        >
          Login
        </Link>
      </div>
    </header>
  );
}