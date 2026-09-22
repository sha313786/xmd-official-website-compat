"use client";

import Link from "next/link";
import Reveal from "@/components/ui/reveal";
import Stagger from "@/components/ui/stagger";

import ServiceCard from "@/components/home/service-card";
import { servicesData } from "@/data/home/services";

export default function MedicalServices() {
  return (
    <section
      id="services"
      className="bg-black py-12 sm:py-16 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="mx-auto mb-10 sm:mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-xs sm:text-sm font-medium text-red-400">
              Medical Services
            </span>

            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Professional Healthcare Services
            </h2>

            <p className="mt-3 sm:mt-6 text-sm sm:text-lg leading-relaxed sm:leading-8 text-slate-400">
              XMD provides comprehensive emergency medical care, advanced
              treatment, and professional healthcare services to ensure the
              safety and well-being of every citizen across XLANTIS City.
            </p>
          </div>
        </Reveal>

        {/* Service Cards */}
        <Stagger className="grid gap-4 sm:gap-6 xl:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
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

        {/* Recruitment CTA */}
        <Reveal delay={300}>
          <div className="mt-12 sm:mt-20 text-center px-2">
            <h3 className="text-xl sm:text-3xl font-bold text-white">
              Ready to Join XMD?
            </h3>

            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed">
              Take the next step toward becoming a member of XLANTIS Medical Department.
              Explore the recruitment process, eligibility requirements, and begin your
              medical career with XMD.
            </p>

            <Link
              href="/recruitment"
              className="
                mt-6 sm:mt-8
                w-full sm:w-auto
                inline-flex
                items-center
                justify-center
                rounded-xl
                bg-red-600
                px-8
                py-3.5 sm:py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-red-700
                hover:shadow-lg
                hover:shadow-red-600/30
                active:scale-98
              "
            >
              View Recruitment
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}