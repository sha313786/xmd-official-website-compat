"use client";

import { UseFormReturn } from "react-hook-form";

import { RecruitmentApplicationFormValues } from "@/lib/validations/recruitment";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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

interface DeclarationSectionProps {
  form: UseFormReturn<RecruitmentApplicationFormValues>;
  submitting: boolean;
}

export function DeclarationSection({
  form,
  submitting,
}: DeclarationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Declaration</CardTitle>

        <CardDescription>
          Please confirm that the information provided is accurate.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="declaration"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 rounded-lg border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <div className="space-y-1 leading-none">
                <FormLabel>
                  I declare that all information provided in this
                  application is true and accurate to the best of my
                  knowledge. I understand that providing false,
                  misleading, or incomplete information may result in
                  the rejection of my application or the termination
                  of my membership if appointed.
                </FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={submitting}
        >
          {submitting
            ? "Submitting Application..."
            : "Submit Application"}
        </Button>
      </CardContent>
    </Card>
  );
}