"use client";

import { UseFormReturn } from "react-hook-form";

import { RecruitmentApplicationFormValues } from "@/lib/validations/recruitment";

import { Textarea } from "@/components/ui/textarea";

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

interface ApplicationQuestionsSectionProps {
  form: UseFormReturn<RecruitmentApplicationFormValues>;
}

export function ApplicationQuestionsSection({
  form,
}: ApplicationQuestionsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Questions</CardTitle>

        <CardDescription>
          Please answer each question honestly and in detail.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="why_join"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Why do you want to join XMD?
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Tell us why you want to become a member of XMD..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="why_choose_you"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Why should we choose you over other applicants?
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Explain what makes you a strong candidate..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="strengths"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What are your strengths?
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Describe your strengths..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weaknesses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What are your weaknesses?
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Describe your weaknesses..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="patient_scenario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Scenario: You arrive at the scene of a serious accident. The patient is conscious but panicking, while several bystanders are shouting and trying to interfere. How would you handle the situation?
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={8}
                  placeholder="Explain how you would manage the patient, the scene, and the bystanders..."
                  {...field}
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