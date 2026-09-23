"use client";

import { UseFormReturn } from "react-hook-form";
import { Clock } from "lucide-react";

import type { RecruitmentApplicationFormValues } from "@/lib/validation/recruitment";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface AvailabilitySectionProps {
  form: UseFormReturn<RecruitmentApplicationFormValues>;
}

export function AvailabilitySection({
  form,
}: AvailabilitySectionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-red-950/80 bg-black/85 p-6 sm:p-8 shadow-[0_0_35px_rgba(220,38,38,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-red-600/40">
      {/* Section Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-[#8B0000] text-sm font-black text-white shadow-lg shadow-red-600/40 ring-1 ring-red-400">
            03
          </span>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Operational Availability & Shifts
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Provide your schedule so shift commanders can coordinate training and coverage.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Preferred Shift */}
        <FormField
          control={form.control}
          name="preferred_shift"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                Preferred Shift / Active Window <span className="text-red-500 font-bold">*</span>
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. Evening Shift (8:00 PM – 11:30 PM IST / UTC)"
                  className="h-12 rounded-xl border-white/10 bg-black/90 px-4 text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[11px] text-zinc-500">
                The timeframe when you are most available to clock in for duty.
              </FormDescription>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Hours per Day */}
        <FormField
          control={form.control}
          name="hours_per_day"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                Average Daily Duty Hours <span className="text-red-500 font-bold">*</span>
              </FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={24}
                  placeholder="e.g. 3"
                  className="h-12 rounded-xl border-white/10 bg-black/90 px-4 text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                  value={field.value ? field.value : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? "" : Number(val));
                  }}
                />
              </FormControl>
              <FormDescription className="text-[11px] text-zinc-500">
                Estimated daily active hours you can commit on-duty.
              </FormDescription>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}