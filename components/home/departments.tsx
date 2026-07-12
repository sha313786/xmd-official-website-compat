export default function Departments() {
  const departments = [
    {
      title: "Emergency",
      description: "24/7 emergency response and trauma care.",
    },
    {
      title: "Surgery",
      description: "Advanced surgical procedures by experienced specialists.",
    },
    {
      title: "Cardiology",
      description: "Heart care and cardiovascular treatment services.",
    },
    {
      title: "Pediatrics",
      description: "Specialized healthcare for infants and children.",
    },
    {
      title: "Radiology",
      description: "Modern diagnostic imaging and scanning facilities.",
    },
    {
      title: "Laboratory",
      description: "Fast and accurate diagnostic laboratory services.",
    },
  ];

  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white">
            Medical Departments
          </h2>

          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-red-600"></div>

          <p className="mt-6 text-slate-400">
            Dedicated departments delivering specialized healthcare.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <div
              key={dept.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:bg-white/10"
            >
              <h3 className="mb-3 text-2xl font-bold text-white">
                {dept.title}
              </h3>

              <p className="leading-7 text-slate-400">
                {dept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}