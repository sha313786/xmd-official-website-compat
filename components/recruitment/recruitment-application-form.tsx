"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  recruitmentApplicationSchema,
  RecruitmentApplicationFormValues,
} from "@/lib/validations/recruitment";

import { useApplications } from "@/hooks/use-applications";
import { RecruitmentApplicationInsert } from "@/types/recruitment";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function RecruitmentApplicationForm() {
  const { createApplication } = useApplications();

  const [submitting, setSubmitting] = useState(false);

  const form = useForm<RecruitmentApplicationFormValues>({
    resolver: zodResolver(recruitmentApplicationSchema),
    defaultValues: {
      full_name: "",
      discord_username: "",
      discord_id: "",
      age: 18,
      country: "",
      timezone: "",
      experience: "",
      reason: "",
    },
  });

  async function onSubmit(
    values: RecruitmentApplicationFormValues
  ) {
    try {
      setSubmitting(true);

      const application: RecruitmentApplicationInsert = {
        full_name: values.full_name,
        discord_username: values.discord_username,
        discord_id: values.discord_id,
        age: values.age,
        country: values.country,
        timezone: values.timezone,
        experience: values.experience,
        reason: values.reason,
        status: "pending",
        reviewed_by: null,
        review_notes: null,
      };

      await createApplication(application);

      form.reset();

      alert("Application submitted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>
          XMD Recruitment Application
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discord_username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Discord Username
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discord_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Discord ID
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="123456789012345678"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Age
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(
                            Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Country
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="India"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Timezone
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="IST (UTC +05:30)"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Medical RP Experience
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Tell us about your EMS / Medical RP experience..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Why do you want to join XMD?
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Why do you want to join XMD?"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={submitting}
              className="w-full"
            >
              {submitting
                ? "Submitting..."
                : "Submit Application"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}