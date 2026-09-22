"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight, Stethoscope, Users, Briefcase, MessageSquare, Shield, UserCircle } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/#home", icon: HomeIcon },
    { name: "About", href: "/about", icon: Users },
    { name: "Services", href: "/#services", icon: Stethoscope },
    { name: "Departments", href: "/#departments", icon: Briefcase },
    { name: "Recruitment", href: "/recruitment", icon: Shield },
    {
      name: "Contact",
      href: "https://discord.gg/wD6Tqqg6pc",
      isExternal: true,
      icon: MessageSquare,
    },
  ];

  function HomeIcon({ className }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "border-b border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0">
            <Image
              src="/logo/xmd-logo.png"
              alt="XMD Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="leading-tight">
            <h1 className="text-base sm:text-lg font-bold text-white transition-colors duration-300 group-hover:text-red-400">
              XMD
            </h1>
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
              XLANTIS MEDICAL DEPARTMENT
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 lg:flex">
          {navLinks.map((link) =>
            link.isExternal ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative transition-colors duration-300 hover:text-red-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="relative transition-colors duration-300 hover:text-red-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Desktop Login Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/patient/login"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-red-500 hover:bg-white/10 hover:shadow-lg hover:shadow-red-500/20"
          >
            Patient Login
          </Link>

          <Link
            href="/login"
            className="rounded-2xl bg-gradient-to-r from-[#8B0000] via-red-600 to-red-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-red-500/50"
          >
            Staff Login
          </Link>
        </div>

        {/* Mobile Header Right (Staff Login + Hamburger) */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/login"
            className="rounded-xl bg-gradient-to-r from-[#8B0000] to-red-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-red-500/25 transition active:scale-95"
          >
            Staff Login
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white active:scale-95"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-red-400" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-x-0 top-20 z-40 flex flex-col justify-between overflow-y-auto border-t border-white/10 bg-slate-950/95 px-6 py-6 backdrop-blur-2xl transition-all duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen
            ? "max-h-[calc(100vh-5rem)] opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none overflow-hidden py-0"
        }`}
        style={{ height: mobileMenuOpen ? "calc(100vh - 5rem)" : 0 }}
      >
        <div className="space-y-1">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </p>

          {navLinks.map((link) => {
            const Icon = link.icon;
            return link.isExternal ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-red-500/10 hover:text-red-400 active:bg-red-500/20"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-red-500" />
                  {link.name}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-red-500/10 hover:text-red-400 active:bg-red-500/20"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-red-500" />
                  {link.name}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            );
          })}
        </div>

        {/* Mobile Portals & Action Buttons */}
        <div className="space-y-3 pt-6 border-t border-white/10 mt-6 pb-6">
          <p className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Portals & Access
          </p>

          <Link
            href="/patient/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 font-semibold text-white transition hover:bg-white/10 active:scale-98"
          >
            <UserCircle className="h-5 w-5 text-slate-300" />
            <span>Patient Portal Login</span>
          </Link>

          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B0000] via-red-600 to-red-500 font-semibold text-white shadow-lg shadow-red-500/30 transition hover:brightness-110 active:scale-98"
          >
            <Shield className="h-5 w-5" />
            <span>Staff Portal Login</span>
          </Link>

          <a
            href="https://discord.gg/wD6Tqqg6pc"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#5865F2]/40 bg-[#5865F2]/10 text-sm font-semibold text-[#8ea1ff] transition hover:bg-[#5865F2]/20 active:scale-98"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Join XMD Discord</span>
          </a>
        </div>
      </div>
    </header>
  );
}