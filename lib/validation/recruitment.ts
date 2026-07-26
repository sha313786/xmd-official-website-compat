import { z } from "zod";

export const recruitmentApplicationSchema = z.object({
  // Personal Information
  full_name: z
    .string()
    .min(3, "Full Name is required.")
    .max(100),

  character_name: z
    .string()
    .min(3, "Character Name is required.")
    .max(100),

  real_age: z
  .number()
  .min(16, "Minimum age is 16.")
  .max(100, "Invalid age."),

  // Roleplay Information
  medical_experience: z
    .string()
    .min(10, "Please describe your medical roleplay experience.")
    .max(3000),

  current_occupation: z
    .string()
    .max(100)
    .optional()
    .or(z.literal("")),

  gang_member: z.boolean(),

  gang_name: z
    .string()
    .max(100)
    .optional()
    .or(z.literal("")),

  // Availability
  preferred_shift: z
    .string()
    .min(2, "Preferred shift is required.")
    .max(100),

  hours_per_day: z
  .number()
  .min(1, "Minimum 1 hour.")
  .max(24, "Maximum 24 hours."),

  // Application Questions
  why_join: z
    .string()
    .min(20, "Please explain why you want to join XMD.")
    .max(3000),

  why_choose_you: z
    .string()
    .min(20, "Please explain why we should choose you.")
    .max(3000),

  strengths: z
    .string()
    .min(10, "Please describe your strengths.")
    .max(1500),

  weaknesses: z
    .string()
    .min(10, "Please describe your weaknesses.")
    .max(1500),

  patient_scenario: z
    .string()
    .min(30, "Please answer the scenario question.")
    .max(5000),

  // Declaration
  declaration: z
  .boolean()
  .refine(
    (value) => value,
    "You must confirm the declaration before submitting."
  ),

});

export type RecruitmentApplicationFormValues =
  z.infer<typeof recruitmentApplicationSchema>;