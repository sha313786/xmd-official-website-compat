"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  recruitmentSettingsSchema,
  type RecruitmentSettingsForm,
} from "@/lib/validation/settings";

import { saveSettings } from "@/lib/utils/save-settings";

import { useSettings } from "@/hooks/settings/use-settings";

import SettingsCard from "@/components/settings/settings-card";
import SettingsSkeleton from "./settings-skeleton";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import SettingsFooter from "@/components/settings/settings-footer";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function RecruitmentSettings() {
  const {
    recruitment,
    recruitmentMetadata,
    saveRecruitment,
  } = useSettings();

  const [loading, setLoading] = useState(false);

  const form = useForm<RecruitmentSettingsForm>({
    resolver: zodResolver(recruitmentSettingsSchema),
    defaultValues: {
      recruitmentOpen: false,
      publicRecruitmentEnabled: false,
      autoAcceptApplications: false,
      autoRejectAfterDays: 30,
      maxApplicationsPerUser: 100,
      recruitmentMessage: "",
    },
  });

  useEffect(() => {
    if (!recruitment) return;

    form.reset(recruitment);
  }, [recruitment, form]);

  if (!recruitment) {
    return <SettingsSkeleton />;
  }

  async function onSubmit(values: RecruitmentSettingsForm) {
    await saveSettings({
      action: () => saveRecruitment(values),
      setLoading,
      successMessage: "Recruitment settings updated.",
      errorMessage: "Failed to update recruitment settings.",
    });
  }

  return (
    <SettingsCard
      title="Recruitment Settings"
      description="Configure recruitment behaviour."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="recruitmentOpen"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel>Recruitment Open</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Allow members to submit applications.
                  </p>
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

          <FormField
            control={form.control}
            name="publicRecruitmentEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel>Public Recruitment</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Show recruitment on the public website.
                  </p>
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

          <FormField
            control={form.control}
            name="autoAcceptApplications"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel>Auto Accept</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Automatically approve eligible applicants.
                  </p>
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

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="autoRejectAfterDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Auto Reject Days</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value))
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxApplicationsPerUser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Applications</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value))
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="recruitmentMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recruitment Message</FormLabel>

                <FormControl>
                  <Textarea
                    rows={5}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <SettingsFooter
  loading={loading}
  isDirty={form.formState.isDirty}
  onReset={() => form.reset()}
  metadata={recruitmentMetadata}
/>
        </form>
      </Form>
    </SettingsCard>
  );
}