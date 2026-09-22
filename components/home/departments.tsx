"use client";

import Reveal from "@/components/ui/reveal";
import Stagger from "@/components/ui/stagger";

import DepartmentCard from "@/components/home/department-card";
import { departmentsData } from "@/data/home/departments";

export default function Departments() {
  return (
    <section
      id="departments"
      className="bg-slate-950 py-12 sm:py-16 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="mx-auto mb-10 sm:mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-xs sm:text-sm font-medium text-red-400">
              Our Departments
            </span>

            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Specialized Medical Divisions
            </h2>

            <p className="mt-3 sm:mt-6 text-sm sm:text-lg leading-relaxed sm:leading-8 text-slate-400">
              Every department within XMD is dedicated to delivering
              professional healthcare, emergency response, and operational
              excellence across XLANTIS City.
            </p>
          </div>
        </Reveal>

        {/* Department Cards */}
        <Stagger
          className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
          staggerDelay={120}
        >
          {departmentsData.map((department) => (
            <DepartmentCard
              key={department.id}
              icon={department.icon}
              name={department.name}
              description={department.description}
              chief={department.chief}
              members={department.members}
              status={department.status}
              href={department.href}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}