import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo/xmd-logo.png"
            alt="XMD Logo"
            width={120}
            height={120}
            priority
          />

          <div>
            <h1 className="text-lg font-bold text-white">
              XMD
            </h1>

            <p className="text-xs text-slate-400">
              XLANTIS MEDICAL DEPARTMENT
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden gap-8 text-sm text-slate-300 lg:flex">
          <a href="#" className="hover:text-red-500 transition">
            Home
          </a>

          <a href="#" className="hover:text-red-500 transition">
            About
          </a>

          <a href="#" className="hover:text-red-500 transition">
            Services
          </a>

          <a href="#" className="hover:text-red-500 transition">
            Departments
          </a>

          <a href="#" className="hover:text-red-500 transition">
            Recruitment
          </a>

          <a
            href="#"
            className="text-red-500 border-b-2 border-red-500 pb-1"
          >
            Home
          </a>

          <a href="#" className="hover:text-red-500 transition">
            Contact
          </a>
        </nav>

        {/* Join Button */}
        <Link
          href="/login"
          className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Login
        </Link>
      </div>
    </header>
  );
}