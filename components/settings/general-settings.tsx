"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  generalSettingsSchema,
  type GeneralSettingsForm,
} from "@/lib/validation/settings";

import { saveSettings } from "@/lib/utils/save-settings";

import { useSettings } from "@/hooks/settings/use-settings";

import SettingsCard from "./settings-card";
import SettingsSkeleton from "./settings-skeleton";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import SettingsFooter from "./settings-footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function GeneralSettings() {
  const {
    general,
    generalMetadata,
    saveGeneral,
  } = useSettings();

  console.log("General Metadata:", generalMetadata);

  const [loading, setLoading] = useState(false);

  const form = useForm<GeneralSettingsForm>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      organizationName: "",
      websiteName: "",
      timezone: "",
      dateFormat: "",
      maintenanceMode: false,
    },
  });

  useEffect(() => {
    if (!general) return;

    form.reset(general);
  }, [general, form]);

  if (!general) {
    return <SettingsSkeleton />;
  }

  async function onSubmit(values: GeneralSettingsForm) {
    await saveSettings({
      action: () => saveGeneral(values),
      setLoading,
      successMessage: "General settings updated.",
      errorMessage: "Failed to update general settings.",
    });
  }

  return (
    <SettingsCard
      title="General Settings"
      description="Configure the basic portal information."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="websiteName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website Name</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timezone</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateFormat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Format</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="maintenanceMode"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel>Maintenance Mode</FormLabel>

                  <p className="text-sm text-muted-foreground">
                    Disable public access to the website.
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

          <SettingsFooter
  loading={loading}
  isDirty={form.formState.isDirty}
  onReset={() => form.reset()}
  metadata={generalMetadata}
/>
        </form>
      </Form>
    </SettingsCard>
  );
}