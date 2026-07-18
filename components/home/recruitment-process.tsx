"use client";

import { CheckCircle2 } from "lucide-react";
import { RecruitmentStep } from "@/data/home/recruitment";

interface RecruitmentProcessProps {
  steps: RecruitmentStep[];
}

export default function RecruitmentProcess({
  steps,
}: RecruitmentProcessProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <div className="mb-8">
        <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-400">
          Recruitment Process
        </span>

        <h3 className="mt-4 text-3xl font-bold text-white">
          Your Journey Begins Here
        </h3>

        <p className="mt-3 text-slate-400">
          Follow these simple steps to become a member of the
          XLANTIS Medical Department.
        </p>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative flex gap-5"
          >
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white shadow-lg shadow-red-600/20">
                {step.id}
              </div>

              {index !== steps.length - 1 && (
                <div className="mt-2 h-16 w-px bg-gradient-to-b from-red-500 to-transparent" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-red-500/30 hover:bg-black/30">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />

                <h4 className="text-lg font-semibold text-white">
                  {step.title}
                </h4>
              </div>

              <p className="mt-2 leading-7 text-slate-400">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}