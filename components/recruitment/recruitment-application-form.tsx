"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

import {
  recruitmentApplicationSchema,
  type RecruitmentApplicationFormValues,
} from "@/lib/validation/recruitment";

import { useApplications } from "@/hooks/use-applications";
import { RecruitmentApplicationInsert } from "@/types/recruitment";
import { Form } from "@/components/ui/form";

import {
  PersonalInformationSection,
  RoleplayInformationSection,
  AvailabilitySection,
  ApplicationQuestionsSection,
  DeclarationSection,
} from "@/components/recruitment";

export function RecruitmentApplicationForm() {
  const router = useRouter();
  const { createApplication } = useApplications();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<RecruitmentApplicationFormValues>({
    resolver: zodResolver(recruitmentApplicationSchema),
    defaultValues: {
      full_name: "",
      character_name: "",
      real_age: "" as unknown as number,
      discord_id: "",

      medical_experience: "",
      current_occupation: "",

      gang_member: false,
      gang_name: "",

      preferred_shift: "",
      hours_per_day: "" as unknown as number,

      why_join: "",
      why_choose_you: "",
      strengths: "",
      weaknesses: "",
      patient_scenario: "",

      declaration: false,
    },
  });

  async function onSubmit(values: RecruitmentApplicationFormValues) {
    try {
      setSubmitting(true);
      setErrorMessage(null);

      const application: RecruitmentApplicationInsert = {
        discord_id: values.discord_id.trim(),

        full_name: values.full_name.trim(),
        character_name: values.character_name.trim(),
        real_age: Number(values.real_age),

        medical_experience: values.medical_experience.trim(),
        current_occupation: values.current_occupation?.trim() || null,

        gang_member: values.gang_member,
        gang_name: values.gang_member ? values.gang_name?.trim() || null : null,

        preferred_shift: values.preferred_shift.trim(),
        hours_per_day: Number(values.hours_per_day),

        why_join: values.why_join.trim(),
        why_choose_you: values.why_choose_you.trim(),
        strengths: values.strengths.trim(),
        weaknesses: values.weaknesses.trim(),
        patient_scenario: values.patient_scenario.trim(),

        declaration: values.declaration,
      };

      await createApplication(application);

      toast.success("Application submitted successfully!");
      form.reset();

      router.push("/recruitment/success");
    } catch (error) {
      console.error("APPLICATION SUBMISSION ERROR:", error);
      const msg = error instanceof Error ? error.message : "Failed to submit application.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  function onInvalid() {
    toast.error("Please review the highlighted fields before submitting.");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="mx-auto max-w-4xl space-y-8"
      >
        {errorMessage && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-500/50 bg-red-950/60 p-4 text-sm text-red-200 shadow-[0_0_25px_rgba(220,38,38,0.25)] backdrop-blur-md">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
            <p>{errorMessage}</p>
          </div>
        )}

        <PersonalInformationSection form={form} />
        <RoleplayInformationSection form={form} />
        <AvailabilitySection form={form} />
        <ApplicationQuestionsSection form={form} />
        <DeclarationSection form={form} submitting={submitting} />
      </form>
    </Form>
  );
}