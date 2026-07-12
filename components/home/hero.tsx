export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-6 pt-20 text-white"
      style={{
        backgroundImage: "url('/images/hero/hospital-bg.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/80"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold leading-tight text-white lg:text-7xl">
          XLANTIS MEDICAL
          <br />
          DEPARTMENT
        </h1>

        {/* Red Line */}
        <div className="mx-auto mt-8 h-1 w-32 rounded-full bg-red-600"></div>

        {/* Tagline */}
        <p className="mt-6 text-2xl text-slate-300">
          Advancing Through X-pertise
        </p>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-5xl text-lg leading-8 text-slate-400">
          Delivering rapid emergency response,
          <br />
          advanced medical care, and dedicated healthcare
          <br />
          services across Xlantis City.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <button className="rounded-xl bg-red-600 px-10 py-5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30">
              Join XMD
          </button>

          <button className="rounded-xl border border-white/30 px-10 py-5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10">
            Learn More
        </button>
      </div>
      </div>
    </section>
  );
}