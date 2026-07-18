"use client";

import { LucideIcon } from "lucide-react";

interface CTAStatProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export default function CTAStat({
  icon: Icon,
  value,
  label,
}: CTAStatProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
        text-center
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-red-500/40
        hover:bg-white/10
        hover:shadow-2xl
        hover:shadow-red-500/20
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-red-600/0
          via-red-600/5
          to-red-600/10
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Icon */}
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600/15 ring-1 ring-red-500/20 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-8 w-8 text-red-500" />
      </div>

      {/* Value */}
      <h3 className="relative mt-5 text-4xl font-black tracking-tight text-white">
        {value}
      </h3>

      {/* Label */}
      <p className="relative mt-2 text-sm font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>

      {/* Bottom Accent */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-1
          w-0
          bg-red-600
          transition-all
          duration-300
          group-hover:w-full
        "
      />
    </div>
  );
}