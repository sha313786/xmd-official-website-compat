"use client";

import { UseFormReturn } from "react-hook-form";
import { ShieldAlert } from "lucide-react";

import type { RecruitmentApplicationFormValues } from "@/lib/validation/recruitment";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface RoleplayInformationSectionProps {
  form: UseFormReturn<RecruitmentApplicationFormValues>;
}

export function RoleplayInformationSection({
  form,
}: RoleplayInformationSectionProps) {
  const gangMember = form.watch("gang_member");

  return (
    <div className="relative overflow-hidden rounded-3xl border border-red-950/80 bg-black/85 p-6 sm:p-8 shadow-[0_0_35px_rgba(220,38,38,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-red-600/40">
      {/* Section Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-[#8B0000] text-sm font-black text-white shadow-lg shadow-red-600/40 ring-1 ring-red-400">
            02
          </span>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Roleplay Background & In-City Record
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Your previous medical RP background, current employment, and affiliations.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Medical Roleplay Experience */}
        <FormField
          control={form.control}
          name="medical_experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                Medical & EMS Roleplay Experience <span className="text-red-500 font-bold">*</span>
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Detail your prior EMS/medical experience (servers played, ranks held, medical scenarios handled). If you are a newcomer to EMS, explain your commitment and enthusiasm to learn XMD medical SOPs..."
                  className="rounded-xl border-white/10 bg-black/90 p-4 text-sm text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[11px] text-zinc-500">
                Be as detailed as possible. Previous experience is beneficial but not strictly mandatory.
              </FormDescription>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Current In-City Occupation */}
        <FormField
          control={form.control}
          name="current_occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                Current In-City Occupation <span className="text-zinc-500 font-normal">(Optional)</span>
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. Taxi Driver, Delivery Courier, Mechanic, Police Officer, Unemployed..."
                  className="h-12 rounded-xl border-white/10 bg-black/90 px-4 text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/40 focus-visible:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription className="text-[11px] text-zinc-500">
                What does your character currently do for a living in XLANTIS City?
              </FormDescription>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Gang / Organization Membership Switch */}
        <FormField
          control={form.control}
          name="gang_member"
          render={({ field }) => (
            <FormItem className="rounded-2xl border border-red-950/80 bg-black/90 p-5 transition hover:border-red-600/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <FormLabel className="text-sm font-semibold text-white flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-red-500 shrink-0" />
                    Are you currently affiliated with any Gang, Cartel, or Criminal Syndicate?
                  </FormLabel>

                  <p className="text-xs text-zinc-400 max-w-xl">
                    XMD strictly enforces <span className="text-red-400 font-medium">medical neutrality</span>. Medical staff must render aid impartially without faction rivalry or gang bias.
                  </p>
                </div>

                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-red-600 shrink-0"
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        {/* Conditional Gang Name Input */}
        {gangMember && (
          <div className="rounded-2xl border border-red-600/30 bg-red-950/30 p-5 shadow-[0_0_25px_rgba(220,38,38,0.1)] animate-in fade-in slide-in-from-top-2 duration-300">
            <FormField
              control={form.control}
              name="gang_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm font-semibold text-red-300">
                    Organization / Gang Name & Character Rank <span className="text-red-500 font-bold">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="e.g. Cartel De La Muerte / Position: Recruit"
                      className="h-12 rounded-xl border-red-500/40 bg-black/90 px-4 text-white placeholder:text-zinc-600 transition-all focus-visible:border-red-500 focus-visible:ring-red-600/50"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription className="text-[11px] text-red-400/80">
                    Honesty is mandatory. Concealing an active gang membership may result in a permanent blacklist.
                  </FormDescription>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}