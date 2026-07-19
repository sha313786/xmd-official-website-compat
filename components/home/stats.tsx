"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Ambulance,
  HeartPulse,
  Stethoscope,
  Timer,
} from "lucide-react";

import AnimatedCounter from "./animated-counter";

type Stat = {
  icon: ComponentType<{ className?: string }>;
  value: number;
  title: string;
  description: string;
  suffix: string;
  decimals?: number;
};

const stats: Stat[] = [
  {
    icon: Stethoscope,
    value: 156,
    title: "Active Doctors",
    description: "Certified XMD Medical Staff",
    suffix: "",
  },
  {
    icon: Ambulance,
    value: 14,
    title: "Ambulances",
    description: "Emergency Response Fleet",
    suffix: "",
  },
  {
    icon: HeartPulse,
    value: 18493,
    title: "Patients Treated",
    description: "Lives Cared For Across Xlantis",
    suffix: "+",
  },
  {
    icon: Timer,
    value: 2.31,
    title: "Avg Response",
    description: "Minutes To Reach Emergencies",
    suffix: " min",
    decimals: 2,
  },
];

const particles = [
  { id: 1, size: 8, left: "8%", top: "18%", duration: 18, delay: 0 },
  { id: 2, size: 6, left: "22%", top: "72%", duration: 16, delay: 1 },
  { id: 3, size: 10, left: "38%", top: "28%", duration: 20, delay: 2 },
  { id: 4, size: 5, left: "50%", top: "82%", duration: 15, delay: 1 },
  { id: 5, size: 7, left: "63%", top: "18%", duration: 19, delay: 3 },
  { id: 6, size: 9, left: "78%", top: "68%", duration: 21, delay: 2 },
  { id: 7, size: 6, left: "90%", top: "32%", duration: 17, delay: 4 },
  { id: 8, size: 5, left: "30%", top: "48%", duration: 22, delay: 1 },
  { id: 9, size: 8, left: "55%", top: "58%", duration: 18, delay: 2 },
  { id: 10, size: 6, left: "72%", top: "42%", duration: 20, delay: 0 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
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

export default function Stats() {
  
  return (
  <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24">
    {/* ================= Background ================= */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated Top Glow */}
      <motion.div
        className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-red-600/15 blur-[140px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Bottom Glow */}
      <motion.div
        className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-red-500/10 blur-[170px]"
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.45, 0.9, 0.45],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Center Glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/5 blur-[140px]"
        animate={{
          scale: [0.95, 1.1, 0.95],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Premium Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-red-500/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -35, 0],
            opacity: [0.15, 0.8, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Extra Blur Accent */}
      <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-red-500/5 blur-[120px]" />

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>

    {/* ================= Content ================= */}
    <div className="relative mx-auto max-w-7xl px-6">
  {/* ================= Section Heading ================= */}
  <motion.div
    className="mb-20 text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{
      duration: 0.8,
      ease: "easeOut",
    }}
  >
    <span className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-sm font-medium tracking-wide text-red-400 backdrop-blur-md">
      XMD Statistics
    </span>

    <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
      Our
      <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
        {" "}
        Impact
      </span>
    </h2>

    <motion.div
      className="mx-auto mt-6 h-1 rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-600"
      initial={{ width: 0 }}
      whileInView={{ width: 110 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.9,
        ease: "easeOut",
      }}
    />

    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
      Delivering trusted emergency medical services across{" "}
      <span className="font-semibold text-white">
        Xlantis City
      </span>
      . Every response, every patient, and every duty hour reflects the
      dedication of the XMD team.
    </p>
  </motion.div>

  {/* ================= Statistics Grid ================= */}
  <motion.div
    className="grid gap-8 md:grid-cols-2 xl:grid-cols-4"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.25 }}
  >
    {stats.map((stat) => {
  const Icon = stat.icon;

  return (
    <motion.div
      key={stat.title}
      variants={cardVariants}
      whileHover={{
        scale: 1.03,
        rotateX: -4,
        rotateY: 4,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-red-500/50 hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(239,68,68,0.18)]"
    >
      {/* Card Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top Border */}
      <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-red-500 via-red-400 to-red-600 transition-transform duration-500 group-hover:scale-x-100" />

      {/* Background Blur */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/10 blur-3xl transition-all duration-500 group-hover:scale-150" />

      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Icon */}
        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          className="mb-6 rounded-2xl bg-red-500/10 p-4"
        >
          <Icon className="h-10 w-10 text-red-500" />
        </motion.div>

        {/* Counter */}
        <AnimatedCounter
          value={stat.value}
          decimals={stat.decimals}
          suffix={stat.suffix}
          className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl"
        />

        {/* Title */}
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
          {stat.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-slate-400">
          {stat.description}
        </p>

      </div>
    </motion.div>
  );
})}
      </motion.div>
    </div>

    {/* Bottom Fade */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
  </section>
);
}