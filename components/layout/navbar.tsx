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
  <Link href="/" className="transition hover:text-red-500">
    Home
  </Link>

  <Link href="/about" className="transition hover:text-red-500">
    About
  </Link>

  <Link href="/services" className="transition hover:text-red-500">
    Services
  </Link>

  <Link href="/departments" className="transition hover:text-red-500">
    Departments
  </Link>

  <Link href="/recruitment" className="transition hover:text-red-500">
    Recruitment
  </Link>

  <Link href="/contact" className="transition hover:text-red-500">
    Contact
  </Link>
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