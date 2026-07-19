"use client";

import { UseFormReturn } from "react-hook-form";

import { RecruitmentApplicationFormValues } from "@/lib/validations/recruitment";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

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

interface RoleplayInformationSectionProps {
  form: UseFormReturn<RecruitmentApplicationFormValues>;
}

export function RoleplayInformationSection({
  form,
}: RoleplayInformationSectionProps) {
  const gangMember = form.watch("gang_member");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roleplay Information</CardTitle>
        <CardDescription>
          Tell us about your roleplay background.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="medical_experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Previous Medical Roleplay Experience
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Describe your previous EMS / Medical RP experience..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="current_occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Current Occupation (Optional)
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Police, Civilian, Business Owner..."
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gang_member"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <FormLabel>
                  Are you currently a member of any X-Gang or X-Club?
                </FormLabel>
              </div>

              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {gangMember && (
          <FormField
            control={form.control}
            name="gang_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Gang / Club Name
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter the gang or club name"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}