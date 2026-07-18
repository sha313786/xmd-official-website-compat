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

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href={recruitmentContent.primaryButton.href}
                className="
                  rounded-xl
                  bg-red-600
                  px-8
                  py-4
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-red-700
                  hover:shadow-xl
                  hover:shadow-red-600/30
                "
              >
                {recruitmentContent.primaryButton.label}
              </Link>

              <Link
                href={recruitmentContent.secondaryButton.href}
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-8
                  py-4
                  font-semibold
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-red-500/40
                  hover:bg-red-500/10
                "
              >
                {recruitmentContent.secondaryButton.label}
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Features + Timeline */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Features */}
          <Stagger
            className="grid gap-6 sm:grid-cols-2"
          >
            {recruitmentFeatures.map((feature) => (
              <RecruitmentFeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </Stagger>

          {/* Timeline */}
          <Reveal delay={250}>
            <RecruitmentProcess
              steps={recruitmentProcess}
            />
          </Reveal>
        </div>

        {/* Bottom CTA */}
        <Reveal delay={350}>
          <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
            <h3 className="text-3xl font-bold text-white">
              Ready to Begin Your Medical Career?
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Join XMD and become part of a professional team dedicated
              to protecting and serving the citizens of XLANTIS City.
            </p>

            <Link
              href={recruitmentContent.primaryButton.href}
              className="
                mt-8
                inline-flex
                items-center
                rounded-xl
                bg-red-600
                px-8
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-red-700
                hover:shadow-xl
                hover:shadow-red-600/30
              "
            >
              Apply Today
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}