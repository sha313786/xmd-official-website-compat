"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const memberSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name is required"),

  badgeNumber: z
    .string()
    .min(1, "Badge number is required"),

  discordId: z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) =>
      !value ||
      (/^\d+$/.test(value) &&
        value.length >= 17 &&
        value.length <= 20),
    {
      message: "Invalid Discord ID",
    }
  ),

  rank: z
    .string()
    .min(1, "Rank is required"),

  department: z
    .string()
    .min(1, "Department is required"),

  status: z.enum([
    "Active",
    "Inactive",
    "Suspended",
    "Retired",
  ]),
});

export type MemberFormValues = z.infer<
  typeof memberSchema
>;

interface MemberFormProps {
  onSubmit: (
    values: MemberFormValues
  ) => Promise<void>;

  loading?: boolean;

  defaultValues?: Partial<MemberFormValues>;
}

export function MemberForm({
  onSubmit,
  loading,
  defaultValues,
}: MemberFormProps) {
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),

    defaultValues: {
      fullName: "",
      badgeNumber: "",
      discordId: "",
      rank: "",
      department: "",
      status: "Active",
      ...defaultValues,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!defaultValues) return;

    reset({
      fullName: "",
      badgeNumber: "",
      discordId: "",
      rank: "",
      department: "",
      status: "Active",
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Full Name
        </label>

        <Input
          {...register("fullName")}
          placeholder="Member name"
        />

        {errors.full_Name && (
          <p className="text-sm text-red-600">
            {errors.full_Name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Badge Number
        </label>

        <Input
          {...register("badgeNumber")}
          placeholder="XMD-001"
        />

        {errors.badge_number && (
          <p className="text-sm text-red-600">
            {errors.badge_number.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Discord ID
        </label>

        <Input
          {...register("discordId")}
          placeholder="Optional (Linked after Discord verification)"
        />

        {errors.discordId && (
          <p className="text-sm text-red-600">
            {errors.discordId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Rank
        </label>

        <Select
          value={watch("rank")}
          onValueChange={(value) =>
            setValue("rank", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Rank" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Director">Director</SelectItem>
            <SelectItem value="Chief">Chief</SelectItem>
            <SelectItem value="Assistant Chief">
              Assistant Chief
            </SelectItem>
            <SelectItem value="Medical Supervisor">
              Medical Supervisor
            </SelectItem>
            <SelectItem value="Medical Officer">
              Medical Officer
            </SelectItem>
            <SelectItem value="Senior Specialist">
              Senior Specialist
            </SelectItem>
            <SelectItem value="Senior Surgeon">
              Senior Surgeon
            </SelectItem>
            <SelectItem value="Surgeon">Surgeon</SelectItem>
            <SelectItem value="Assistant Surgeon">
              Assistant Surgeon
            </SelectItem>
            <SelectItem value="Senior Doctor">
              Senior Doctor
            </SelectItem>
            <SelectItem value="Doctor">Doctor</SelectItem>
            <SelectItem value="Junior Doctor">
              Junior Doctor
            </SelectItem>
            <SelectItem value="Senior Consultant">
              Senior Consultant
            </SelectItem>
            <SelectItem value="Consultant">
              Consultant
            </SelectItem>
            <SelectItem value="Head Nurse">
              Head Nurse
            </SelectItem>
            <SelectItem value="Nurse">Nurse</SelectItem>
            <SelectItem value="Paramedic">
              Paramedic
            </SelectItem>
            <SelectItem value="Trainee">
              Trainee
            </SelectItem>
            <SelectItem value="Community Care">
              Community Care
            </SelectItem>
          </SelectContent>
        </Select>

        {errors.rank && (
          <p className="text-sm text-red-600">
            {errors.rank.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Department
        </label>

        <Select
          value={watch("department")}
          onValueChange={(value) =>
            setValue("department", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Management">
              Management
            </SelectItem>
            <SelectItem value="Emergency">
              Emergency
            </SelectItem>
            <SelectItem value="EMS">
              EMS
            </SelectItem>
            <SelectItem value="Administration">
              Administration
            </SelectItem>
            <SelectItem value="Operations">
              Operations
            </SelectItem>
          </SelectContent>
        </Select>

        {errors.department && (
          <p className="text-sm text-red-600">
            {errors.department.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Status
        </label>

        <Select
          value={watch("status")}
          onValueChange={(value) =>
            setValue(
              "status",
              value as MemberFormValues["status"],
              {
                shouldDirty: true,
                shouldValidate: true,
              }
            )
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Active">
              Active
            </SelectItem>

            <SelectItem value="Inactive">
              Inactive
            </SelectItem>

            <SelectItem value="Suspended">
              Suspended
            </SelectItem>

            <SelectItem value="Retired">
              Retired
            </SelectItem>
          </SelectContent>
        </Select>

        {errors.status && (
          <p className="text-sm text-red-600">
            {errors.status.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Member"}
      </Button>
    </form>
  );
}