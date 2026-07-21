"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  generalSettingsSchema,
  type GeneralSettingsForm,
} from "@/lib/validation/settings";

import { useSettings } from "@/hooks/settings/use-settings";

import SettingsCard from "./settings-card";
import SaveButton from "./save-button";

import { Button } from "@/components/ui/button";
import SettingsFooter from "./settings-footer";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function GeneralSettings() {
  const {
    general,
    saveGeneral,
  } = useSettings();

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

    form.reset({
      organizationName: general.organizationName,
      websiteName: general.websiteName,
      timezone: general.timezone,
      dateFormat: general.dateFormat,
      maintenanceMode: general.maintenanceMode,
    });
  }, [general, form]);

  async function onSubmit(values: GeneralSettingsForm) {
    try {
      setLoading(true);

      await saveGeneral(values);

      // TODO:
      // Replace with shadcn toast
      alert("Settings saved");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!general) {
    return (
      <SettingsCard
        title="General Settings"
        description="Loading..."
      >
        <div />
      </SettingsCard>
    );
  }

  return (
    <SettingsCard
      title="General Settings"
      description="Configure the portal's basic information."
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
                <FormLabel>
                  Organization Name
                </FormLabel>

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
                <FormLabel>
                  Website Name
                </FormLabel>

                <FormControl>
                  <Input {...field} />
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
                <FormLabel>
                  Date Format
                </FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maintenanceMode"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel>
                    Maintenance Mode
                  </FormLabel>

                  <p className="text-sm text-muted-foreground">
                    Enable maintenance mode for the portal.
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
/>
        </form>
      </Form>
    </SettingsCard>
  );
}