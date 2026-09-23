import { z } from "zod";

export const recruitmentApplicationSchema = z.object({
  // Personal Information
  full_name: z
    .string()
    .min(3, "Full Name is required (minimum 3 characters).")
    .max(100, "Full Name must not exceed 100 characters."),

  character_name: z
    .string()
    .min(3, "Character Name is required (minimum 3 characters).")
    .max(100, "Character Name must not exceed 100 characters."),

  real_age: z
    .number()
    .min(18, "You must be at least 18 years old to apply for XMD.")
    .max(100, "Please enter a valid age."),

  discord_id: z
    .string()
    .regex(/^\d{17,20}$/, "Discord ID must be a valid 17-20 digit numeric ID."),

  // Roleplay Information
  medical_experience: z
    .string()
    .min(10, "Please provide at least a brief summary of your roleplay / medical background.")
    .max(3000, "Exceeded maximum character limit (3000)."),

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
    .min(1, "Minimum 1 hour per day required.")
    .max(24, "Maximum 24 hours per day."),

  // Application Questions
  why_join: z
    .string()
    .min(20, "Please explain why you want to join XMD (minimum 20 characters).")
    .max(3000),

  why_choose_you: z
    .string()
    .min(20, "Please explain why we should choose you (minimum 20 characters).")
    .max(3000),

  strengths: z
    .string()
    .min(10, "Please describe your primary strengths (minimum 10 characters).")
    .max(1500),

  weaknesses: z
    .string()
    .min(10, "Please describe your weaknesses or areas for improvement (minimum 10 characters).")
    .max(1500),

  patient_scenario: z
    .string()
    .min(30, "Please provide a detailed response for the emergency scenario (minimum 30 characters).")
    .max(5000),

  // Declaration
  declaration: z
    .boolean()
    .refine(
      (value) => value === true,
      "You must solemnly confirm the declaration before submitting."
    ),
});

export type RecruitmentApplicationFormValues =
  z.infer<typeof recruitmentApplicationSchema>;