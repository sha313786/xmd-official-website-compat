export default function Stats() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-white">
            Our Impact
          </h2>

          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-red-600"></div>

          <p className="mt-5 text-slate-400">
            Trusted emergency medical services across Xlantis City.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition hover:-translate-y-2 hover:border-red-500">
            <div className="mb-4 text-5xl">👨‍⚕️</div>
            <h3 className="text-4xl font-bold text-red-500">156</h3>
            <p className="mt-3 text-slate-300">
              Active Doctors
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition hover:-translate-y-2 hover:border-red-500">
            <div className="mb-4 text-5xl">🚑</div>
            <h3 className="text-4xl font-bold text-red-500">14</h3>
            <p className="mt-3 text-slate-300">
              Ambulances
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition hover:-translate-y-2 hover:border-red-500">
            <div className="mb-4 text-5xl">❤️</div>
            <h3 className="text-4xl font-bold text-red-500">18,493</h3>
            <p className="mt-3 text-slate-300">
              Patients Treated
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition hover:-translate-y-2 hover:border-red-500">
            <div className="mb-4 text-5xl">⚡</div>
            <h3 className="text-4xl font-bold text-red-500">02:31</h3>
            <p className="mt-3 text-slate-300">
              Average Response
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}