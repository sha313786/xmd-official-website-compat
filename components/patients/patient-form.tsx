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

const patientSchema = z.object({
  patientId: z
    .string()
    .trim()
    .min(1, "Patient ID is required"),

  fullName: z
    .string()
    .trim()
    .min(3, "Full name is required"),

  dateOfBirth: z
    .string()
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  bloodGroup: z
    .string()
    .optional()
    .or(z.literal("")),

  status: z.enum([
    "active",
    "inactive",
  ]),
});

export type PatientFormValues =
  z.infer<typeof patientSchema>;

interface PatientFormProps {
  onSubmit: (
    values: PatientFormValues
  ) => Promise<void>;

  loading?: boolean;

  defaultValues?: Partial<PatientFormValues>;
}

export function PatientForm({
  onSubmit,
  loading,
  defaultValues,
}: PatientFormProps) {
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),

    defaultValues: {
      patientId: "",
      fullName: "",
      dateOfBirth: "",
      phone: "",
      address: "",
      bloodGroup: "",
      status: "active",
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
      patientId: "",
      fullName: "",
      dateOfBirth: "",
      phone: "",
      address: "",
      bloodGroup: "",
      status: "active",
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Patient ID */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Patient ID
        </label>

        <Input
          {...register("patientId")}
          placeholder="XMD-P0002"
        />

        {errors.patientId && (
          <p className="text-sm text-red-600">
            {errors.patientId.message}
          </p>
        )}
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Full Name
        </label>

        <Input
          {...register("fullName")}
          placeholder="Patient name"
        />

        {errors.fullName && (
          <p className="text-sm text-red-600">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Date of Birth
        </label>

        <Input
          type="date"
          {...register("dateOfBirth")}
        />

        {errors.dateOfBirth && (
          <p className="text-sm text-red-600">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Phone
        </label>

        <Input
          {...register("phone")}
          placeholder="Phone number"
        />

        {errors.phone && (
          <p className="text-sm text-red-600">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Address
        </label>

        <Input
          {...register("address")}
          placeholder="Patient address"
        />

        {errors.address && (
          <p className="text-sm text-red-600">
            {errors.address.message}
          </p>
        )}
      </div>

      {/* Blood Group */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Blood Group
        </label>

        <Select
          value={watch("bloodGroup") || ""}
          onValueChange={(value) =>
            setValue("bloodGroup", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Blood Group" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectContent>
        </Select>

        {errors.bloodGroup && (
          <p className="text-sm text-red-600">
            {errors.bloodGroup.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Status
        </label>

        <Select
          value={watch("status")}
          onValueChange={(value) =>
            setValue(
              "status",
              value as PatientFormValues["status"],
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
            <SelectItem value="active">
              Active
            </SelectItem>

            <SelectItem value="inactive">
              Inactive
            </SelectItem>
          </SelectContent>
        </Select>

        {errors.status && (
          <p className="text-sm text-red-600">
            {errors.status.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Patient"}
      </Button>
    </form>
  );
}