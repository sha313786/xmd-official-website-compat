export default function Recruitment() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="overflow-hidden rounded-3xl border border-red-600/30 bg-gradient-to-r from-red-700 via-red-600 to-red-500 p-12 shadow-2xl">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white">
                Recruitment Open
              </span>

              <h2 className="mt-6 text-5xl font-black text-white">
                Join XMD Today
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-red-100">
                Become a part of Xlantis Medical Department and serve the
                community through emergency response, medical treatment,
                rescue operations, and professional healthcare.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <button className="rounded-xl bg-white px-8 py-4 font-bold text-red-600 transition hover:scale-105">
                  Apply Now
                </button>

                <button className="rounded-xl border border-white px-8 py-4 font-bold text-white transition hover:bg-white/10">
                  Recruitment Guide
                </button>

              </div>
            </div>

            <div className="rounded-3xl bg-black/20 p-8 backdrop-blur-sm">

              <h3 className="mb-6 text-2xl font-bold text-white">
                Requirements
              </h3>

              <ul className="space-y-4 text-red-100">

                <li>✔ Age 18+</li>

                <li>✔ Good Roleplay Knowledge</li>

                <li>✔ Active on Discord</li>

                <li>✔ Teamwork & Communication</li>

                <li>✔ Professional Behaviour</li>

                <li>✔ Willing to Learn</li>

              </ul>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}