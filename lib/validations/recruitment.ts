import { z } from "zod";

export const recruitmentApplicationSchema = z.object({
  full_name: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

  discord_username: z
    .string()
    .min(2, "Discord username is required"),

  discord_id: z
    .string()
    .min(17, "Invalid Discord ID")
    .max(20, "Invalid Discord ID"),

  age: z
    .number()
    .min(16, "Minimum age is 16")
    .max(80, "Maximum age is 80"),

  country: z
    .string()
    .min(2, "Country is required"),

  timezone: z
    .string()
    .min(2, "Timezone is required"),

  experience: z
    .string()
    .min(20, "Please provide more details about your experience"),

  reason: z
    .string()
    .min(30, "Please explain why you want to join XMD"),
});

export type RecruitmentApplicationFormValues =
  z.infer<typeof recruitmentApplicationSchema>;