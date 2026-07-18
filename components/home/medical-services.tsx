"use client";

import Reveal from "@/components/ui/reveal";
import Stagger from "@/components/ui/stagger";

import ServiceCard from "@/components/home/service-card";
import { servicesData } from "@/data/home/services";

export default function MedicalServices() {
  return (
    <section
      id="services"
      className="bg-black py-24"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-400">
              Medical Services
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-white md:text-5xl">
              Professional Healthcare Services
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              XMD provides comprehensive emergency medical care, advanced
              treatment, and professional healthcare services to ensure the
              safety and well-being of every citizen across XLANTIS City.
            </p>
          </div>
        </Reveal>

        {/* Service Cards */}
        <Stagger className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              href={service.href}
            />
          ))}
        </Stagger>

        {/* Bottom CTA */}
        <Reveal delay={300}>
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold text-white">
              Need Immediate Medical Assistance?
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Our emergency medical team is available 24 hours a day,
              providing rapid response and professional treatment whenever
              help is needed.
            </p>

            <a
              href="#recruitment"
              className="
                mt-8
                inline-flex
                items-center
                rounded-xl
                bg-red-600
                px-8
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-red-700
                hover:shadow-lg
                hover:shadow-red-600/30
              "
            >
              Contact XMD
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}