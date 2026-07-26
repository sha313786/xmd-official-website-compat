"use client";

import { UseFormReturn } from "react-hook-form";

import type { RecruitmentApplicationFormValues } from "@/lib/validation/recruitment";

import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AvailabilitySectionProps {
  form: UseFormReturn<RecruitmentApplicationFormValues>;
}

export function AvailabilitySection({
  form,
}: AvailabilitySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>

        <CardDescription>
  Tell us when you&#39;re usually available for duty.
</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="preferred_shift"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Shift</FormLabel>

              <FormControl>
                <Input
                  placeholder="Example 9pm to 11pm "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hours_per_day"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Average Hours Available Per Day
              </FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={24}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(Number(e.target.value))
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}