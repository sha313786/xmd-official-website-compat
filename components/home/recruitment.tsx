"use client";

import Link from "next/link";

import Reveal from "@/components/ui/reveal";
import Stagger from "@/components/ui/stagger";

import RecruitmentFeatureCard from "@/components/home/recruitment-feature-card";
import RecruitmentProcess from "@/components/home/recruitment-process";

import {
  recruitmentContent,
  recruitmentFeatures,
  recruitmentProcess,
} from "@/data/home/recruitment";

export default function Recruitment() {
  return (
    <section
      id="recruitment"
      className="bg-black py-24"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <Reveal>
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-sm font-medium text-red-400">
              {recruitmentContent.badge}
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-white md:text-5xl">
              {recruitmentContent.title}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              {recruitmentContent.description}
            </p>
          </div>
        </Reveal>

        {/* Features + Timeline */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left Side */}
          <div>
            <Stagger className="grid auto-rows-fr gap-6 sm:grid-cols-2">
              {recruitmentFeatures.map((feature) => (
                <RecruitmentFeatureCard
                  key={feature.id}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </Stagger>

            {/* CTA */}
            <Reveal delay={300}>
              <div className="mt-8 rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-950/60 via-red-950/30 to-transparent p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">
                    Ready to Make a Difference?
                  </h3>

                  <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
                    Start your journey with XMD today and become part of an
                    elite emergency medical team serving XLANTIS City.
                    Explore the recruitment process and begin your
                    medical career with one of the city's most respected
                    healthcare departments.
                  </p>

                  <Link
                    href="/recruitment"
                    className="
                      mt-8
                      inline-flex
                      items-center
                      justify-center
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
                    View Recruitment

                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Timeline */}
          <Reveal delay={250}>
            <RecruitmentProcess
              steps={recruitmentProcess}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}