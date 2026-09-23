"use client";

import { UseFormReturn } from "react-hook-form";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

import type { RecruitmentApplicationFormValues } from "@/lib/validation/recruitment";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DeclarationSectionProps {
  form: UseFormReturn<RecruitmentApplicationFormValues>;
  submitting: boolean;
}

export function DeclarationSection({
  form,
  submitting,
}: DeclarationSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-red-950/80 bg-black/85 p-6 sm:p-8 shadow-[0_0_35px_rgba(220,38,38,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-red-600/40">
      {/* Section Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-[#8B0000] text-sm font-black text-white shadow-lg shadow-red-600/40 ring-1 ring-red-400">
            05
          </span>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Code of Honor & Final Declaration
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Confirm your understanding of XMD standards before sending your dossier.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Important Notice */}
        <div className="rounded-2xl border border-red-950/80 bg-red-950/20 p-4 sm:p-5 flex items-start gap-3.5 shadow-[0_0_25px_rgba(220,38,38,0.08)]">
          <CheckCircle2 className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-zinc-300 space-y-1">
            <p className="font-bold text-white uppercase tracking-wider text-xs">
              Verification & Interview Protocol
            </p>
            <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
              Once submitted, XMD Recruitment Command will process your dossier. If accepted, you will receive an automated Discord DM invitation for an oral voice interview. Please verify that your Discord DMs are open to server members.
            </p>
          </div>
        </div>

        {/* Declaration Checkbox */}
        <FormField
          control={form.control}
          name="declaration"
          render={({ field }) => (
            <FormItem className="rounded-2xl border border-red-950/80 bg-black/90 p-5 transition hover:border-red-600/50 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <div className="flex items-start gap-3.5">
                <FormControl className="mt-1">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-5 w-5 rounded-md border-white/30 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                </FormControl>

                <div className="space-y-1">
                  <FormLabel className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal cursor-pointer">
                    I solemnly declare that all information submitted in this application is accurate, true, and written entirely by me. I understand that falsification, failure to maintain medical neutrality, plagiarism, or server rule breaches will result in immediate disqualification and a permanent blacklist from the XLANTIS Medical Department.
                  </FormLabel>
                  <FormMessage className="text-xs text-red-400 font-medium pt-1" />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={submitting}
          className="h-14 w-full rounded-2xl bg-gradient-to-r from-[#7f0000] via-[#dc2626] to-[#b91c1c] text-base font-bold text-white shadow-[0_0_35px_rgba(220,38,38,0.4)] transition-all duration-300 hover:scale-[1.01] hover:brightness-110 hover:shadow-[0_0_45px_rgba(220,38,38,0.6)] active:scale-[0.99] disabled:opacity-50"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Transmitting Application to XMD Command...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>Submit Official Application</span>
              <ArrowRight className="h-5 w-5" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}