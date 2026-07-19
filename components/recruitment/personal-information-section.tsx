"use client";

import { UseFormReturn } from "react-hook-form";

import { RecruitmentApplicationFormValues } from "@/lib/validations/recruitment";

import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PersonalInformationSectionProps {
  form: UseFormReturn<RecruitmentApplicationFormValues>;
}

export function PersonalInformationSection({
  form,
}: PersonalInformationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Provide your basic personal details.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="character_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Character Name</FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter your RP character name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="real_age"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Real Age</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={16}
                  max={100}
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