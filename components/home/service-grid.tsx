import { services } from "@/lib/constants";

export function ServiceGrid() {
  return (
    <div className="mx-auto grid max-w-6xl gap-5 px-4 md:grid-cols-3">
      {services.map((service) => (
        <article key={service.title} className="glass rounded-2xl p-7 transition hover:-translate-y-1 hover:shadow-soft">
          <service.icon className="mb-5 size-9 text-primary" />
          <h3 className="font-heading text-xl font-semibold">{service.title}</h3>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
        </article>
      ))}
    </div>
  );
}
