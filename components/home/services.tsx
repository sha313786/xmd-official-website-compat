"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Ambulance,
  HeartPulse,
  Hospital,
  Pill,
  Stethoscope,
  Syringe,
} from "lucide-react";

type Service = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: Ambulance,
    title: "Emergency Response",
    description: "24/7 emergency medical response across Xlantis City with rapid dispatch.",
  },
  {
    icon: HeartPulse,
    title: "Critical Care",
    description: "Advanced life-saving treatment and stabilization for critical patients.",
  },
  {
    icon: Hospital,
    title: "Hospital Services",
    description: "Professional healthcare delivered by experienced doctors and nurses.",
  },
  {
    icon: Pill,
    title: "Pharmacy",
    description: "Medication distribution and treatment support for every patient.",
  },
  {
    icon: Syringe,
    title: "Vaccination",
    description: "Preventive healthcare and immunization programs for the community.",
  },
  {
    icon: Stethoscope,
    title: "Medical Consultation",
    description: "Comprehensive diagnosis and consultation from qualified specialists.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-48 top-0 h-[30rem] w-[30rem] rounded-full bg-red-600/15 blur-[160px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-red-500/10 blur-[180px]"
          animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto mb-20 max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-sm font-medium tracking-wide text-red-400">
            Medical Services
          </span>

          <h2 className="mt-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Healthcare
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            From emergency response to advanced medical care, XMD provides
            professional healthcare services across Xlantis City.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-red-500/40 hover:bg-white/10"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-20 rounded-3xl border border-red-500/20 bg-red-500/5 p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <h3 className="text-3xl font-bold text-white">
                Need Immediate Medical Assistance?
              </h3>
              <p className="mt-3 text-slate-400">
                Our emergency medical teams are available around the clock.
              </p>
            </div>

            <button className="rounded-xl bg-red-600 px-8 py-4 font-semibold text-white">
              Contact XMD
            </button>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
