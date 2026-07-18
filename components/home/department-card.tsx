"use client";

import Link from "next/link";
import { ArrowRight, LucideIcon, Users } from "lucide-react";
import { DepartmentStatus } from "@/data/home/departments";

interface DepartmentCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  chief: string;
  members: number;
  status: DepartmentStatus;
  href: string;
}

const statusStyles: Record<DepartmentStatus, string> = {
  Active:
    "border-green-500/20 bg-green-500/10 text-green-400",
  Recruiting:
    "border-blue-500/20 bg-blue-500/10 text-blue-400",
  Maintenance:
    "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  Closed:
    "border-red-500/20 bg-red-500/10 text-red-400",
};

export default function DepartmentCard({
  icon: Icon,
  name,
  description,
  chief,
  members,
  status,
  href,
}: DepartmentCardProps) {
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
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 transition-colors duration-300 group-hover:bg-red-600/20">
          <Icon className="h-8 w-8 text-red-500 transition-transform duration-300 group-hover:scale-110" />
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Department Name */}
      <h3 className="text-2xl font-bold text-white">
        {name}
      </h3>

      {/* Description */}
      <p className="mt-4 flex-grow leading-7 text-slate-400">
        {description}
      </p>

      {/* Department Info */}
      <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Department Head
          </p>

          <p className="mt-1 font-medium text-white">
            {chief}
          </p>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <Users className="h-4 w-4 text-red-400" />
          <span>{members} Members</span>
        </div>
      </div>

      {/* Footer */}
      <Link
        href={href}
        className="mt-8 inline-flex items-center gap-2 font-semibold text-red-400 transition-colors duration-300 hover:text-red-300"
      >
        View Department

        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}