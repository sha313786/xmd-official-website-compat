"use client";

import { UseFormReturn } from "react-hook-form";
import { Stethoscope } from "lucide-react";

import type { RecruitmentApplicationFormValues } from "@/lib/validation/recruitment";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface ApplicationQuestionsSectionProps {
  form: UseFormReturn<RecruitmentApplicationFormValues>;
}

export function ApplicationQuestionsSection({
  form,
}: ApplicationQuestionsSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-red-950/80 bg-black/85 p-6 sm:p-8 shadow-[0_0_35px_rgba(220,38,38,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-red-600/40">
      {/* Section Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-[#8B0000] text-sm font-black text-white shadow-lg shadow-red-600/40 ring-1 ring-red-400">
            04
          </span>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Medical & Scenario Evaluation
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Thoughtful, detailed responses demonstrate your roleplay maturity and critical decision-making.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Why Join */}
        <FormField
          control={form.control}
          name="why_join"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                1. Motivation: Why do you wish to join the XLANTIS Medical Department? <span className="text-red-500 font-bold">*</span>
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Explain what motivates you to serve in XMD rather than other civilian or public safety organizations in XLANTIS..."
                  className="rounded-xl border-white/10 bg-black/90 p-4 text-sm text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[11px] text-zinc-500">
                Minimum 20 characters. Express your genuine roleplay interest.
              </FormDescription>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Why Choose You */}
        <FormField
          control={form.control}
          name="why_choose_you"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                2. Candidacy: Why should XMD Command select you over other candidates? <span className="text-red-500 font-bold">*</span>
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Detail your discipline, communication reliability, maturity, and what unique value you will bring to the medical team..."
                  className="rounded-xl border-white/10 bg-black/90 p-4 text-sm text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[11px] text-zinc-500">
                Minimum 20 characters. Highlight your teamwork and communication skills.
              </FormDescription>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Strengths */}
          <FormField
            control={form.control}
            name="strengths"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                  3. Key Strengths <span className="text-red-500 font-bold">*</span>
                </FormLabel>

                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="e.g. Composure under stress, clear radio protocols, patient demeanor, respect for hierarchy..."
                    className="rounded-xl border-white/10 bg-black/90 p-4 text-sm text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />

          {/* Weaknesses */}
          <FormField
            control={form.control}
            name="weaknesses"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                  4. Areas for Growth <span className="text-red-500 font-bold">*</span>
                </FormLabel>

                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="e.g. Tendency to over-focus on one patient, still memorizing ten-codes, learning surgical RP terms..."
                    className="rounded-xl border-white/10 bg-black/90 p-4 text-sm text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />
        </div>

        {/* Patient Scenario */}
        <div className="rounded-2xl border border-red-600/40 bg-gradient-to-br from-[#180404] via-black to-black p-5 sm:p-6 shadow-[0_0_35px_rgba(220,38,38,0.12)]">
          <div className="mb-4 flex items-start gap-3">
            <div className="rounded-xl bg-red-600/20 p-2.5 text-red-400 ring-1 ring-red-500/40 shrink-0">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                5. Field Scenario Assessment: Multiple Casualty & Hostile Scene
              </h3>
              <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                You arrive as the sole on-scene EMT at a multi-vehicle rollover. 
                <strong className="text-white"> Patient A</strong> is pinned in the driver seat, unresponsive, with shallow agonal respirations. 
                <strong className="text-white"> Patient B</strong> is ambulatory with minor lacerations but is panicking violently and attempting to grab medical shears from your bag. 
                Meanwhile, two agitated bystanders are crowding the scene and filming.
              </p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="patient_scenario"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm font-semibold text-red-300">
                  How do you assess scene safety, handle radio communications, manage bystanders, and prioritize medical triage? <span className="text-red-500 font-bold">*</span>
                </FormLabel>

                <FormControl>
                  <Textarea
                    rows={7}
                    placeholder="Detail your exact steps: 
1) Scene safety & radio backup request (Police/Additional EMS)
2) Managing panicking patient & bystanders
3) Immediate clinical triage (ABC - Airway, Breathing, Circulation)
4) Patient stabilization and emergency transport..."
                    className="rounded-xl border-red-950/80 bg-black/95 p-4 text-sm text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/50 focus-visible:shadow-[0_0_20px_rgba(220,38,38,0.25)]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-[11px] text-zinc-400">
                  Showcase your realistic medical roleplay knowledge, calm crisis management, and chain of priority.
                </FormDescription>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}