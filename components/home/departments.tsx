"use client";

import Reveal from "@/components/ui/reveal";
import Stagger from "@/components/ui/stagger";

import DepartmentCard from "@/components/home/department-card";
import { departmentsData } from "@/data/home/departments";

export default function Departments() {
  return (
    <section
      id="departments"
      className="bg-slate-950 py-24"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <Reveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-400">
              Our Departments
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-white md:text-5xl">
              Specialized Medical Divisions
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              Every department within XMD is dedicated to delivering
              professional healthcare, emergency response, and operational
              excellence across XLANTIS City.
            </p>
          </div>
        </Reveal>

        {/* Department Cards */}
        <Stagger
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
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