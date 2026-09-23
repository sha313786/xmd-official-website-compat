"use client";

import { UseFormReturn } from "react-hook-form";
import { User, Shield } from "lucide-react";

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

interface PersonalInformationSectionProps {
  form: UseFormReturn<RecruitmentApplicationFormValues>;
}

export function PersonalInformationSection({
  form,
}: PersonalInformationSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-red-950/80 bg-black/85 p-6 sm:p-8 shadow-[0_0_35px_rgba(220,38,38,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-red-600/40">
      {/* Red ambient highlight */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-red-600/15 blur-3xl" />

      {/* Section Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-[#8B0000] text-sm font-black text-white shadow-lg shadow-red-600/40 ring-1 ring-red-400">
            01
          </span>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Identity & Verification
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Provide your real-life age, Discord credentials, and RP persona name.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Full Name (OOC) */}
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                Full Name <span className="text-zinc-500 font-normal">(OOC / Real Name)</span>
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. John Miller"
                  className="h-12 rounded-xl border-white/10 bg-black/90 px-4 text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[11px] text-zinc-500">
                Your real name for internal administrative records.
              </FormDescription>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Character Name (IC) */}
        <FormField
          control={form.control}
          name="character_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                Character Name <span className="text-zinc-500 font-normal">(In-City / IC)</span>
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. Dr. Robert 'Doc' Vance"
                  className="h-12 rounded-xl border-white/10 bg-black/90 px-4 text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[11px] text-zinc-500">
                The full roleplay name you use inside XLANTIS City.
              </FormDescription>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Real Age (OOC) */}
        <FormField
          control={form.control}
          name="real_age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                Real Age <span className="text-red-500 font-bold">*</span>
              </FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={18}
                  max={100}
                  placeholder="e.g. 21"
                  className="h-12 rounded-xl border-white/10 bg-black/90 px-4 text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                  value={field.value ? field.value : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? "" : Number(val));
                  }}
                />
              </FormControl>
              <FormDescription className="text-[11px] text-zinc-500">
                Applicants must be at least 18 years old to join XMD.
              </FormDescription>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Discord User ID */}
        <FormField
          control={form.control}
          name="discord_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                Discord User ID <span className="text-red-500 font-bold">*</span>
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. 849204829104928172"
                  inputMode="numeric"
                  className="h-12 rounded-xl border-white/10 bg-black/90 px-4 font-mono text-sm text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[11px] text-zinc-500 leading-normal">
                17-20 digit numeric ID. Used by our automated bot for interview notifications.
              </FormDescription>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}