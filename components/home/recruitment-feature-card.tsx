"use client";

import { LucideIcon } from "lucide-react";

interface RecruitmentFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function RecruitmentFeatureCard({
  icon: Icon,
  title,
  description,
}: RecruitmentFeatureCardProps) {
  return (
    <div
      className="
        group
        flex
        h-full
        flex-col
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-red-500/40
        hover:shadow-xl
        hover:shadow-red-500/20
      "
    >
      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 transition-colors duration-300 group-hover:bg-red-600/20">
        <Icon className="h-8 w-8 text-red-500 transition-transform duration-300 group-hover:scale-110" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 flex-grow leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}