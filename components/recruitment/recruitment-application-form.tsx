"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  recruitmentApplicationSchema,
  RecruitmentApplicationFormValues,
} from "@/lib/validations/recruitment";

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

  const form = useForm<RecruitmentApplicationFormValues>({
  resolver: zodResolver(recruitmentApplicationSchema),

  defaultValues: {
    full_name: "",
    character_name: "",
    real_age: 0,

    medical_experience: "",
    current_occupation: "",

    gang_member: false,
    gang_name: "",

    preferred_shift: "",
    hours_per_day: 2,

    why_join: "",
    why_choose_you: "",
    strengths: "",
    weaknesses: "",
    patient_scenario: "",

    declaration: false,
  },
});

  async function onSubmit(
  values: RecruitmentApplicationFormValues
)  {
    try {
      setSubmitting(true);

      const application: RecruitmentApplicationInsert = {
        full_name: values.full_name,
        character_name: values.character_name,
        real_age: values.real_age,

        medical_experience: values.medical_experience,
        current_occupation:
          values.current_occupation || null,

        gang_member: values.gang_member,
        gang_name: values.gang_member
          ? values.gang_name || null
          : null,

        preferred_shift: values.preferred_shift,
        hours_per_day: values.hours_per_day,

        why_join: values.why_join,
        why_choose_you: values.why_choose_you,
        strengths: values.strengths,
        weaknesses: values.weaknesses,
        patient_scenario: values.patient_scenario,

        declaration: values.declaration,

        
      };

      await createApplication(application);

      form.reset();

      router.push("/recruitment/success");
    } catch (error) {
      console.error(error);
      alert("Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-5xl space-y-8"
      >
        <PersonalInformationSection form={form} />

        <RoleplayInformationSection form={form} />

        <AvailabilitySection form={form} />

        <ApplicationQuestionsSection form={form} />

        <DeclarationSection
          form={form}
          submitting={submitting}
        />
      </form>
    </Form>
  );
}