"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  securitySettingsSchema,
  type SecuritySettingsForm,
} from "@/lib/validation/settings";

import { saveSettings } from "@/lib/utils/save-settings";

import { useSettings } from "@/hooks/settings/use-settings";

import SettingsCard from "./settings-card";
import SettingsSkeleton from "./settings-skeleton";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function SecuritySettings() {
  const {
    security,
    securityMetadata,
    saveSecurity,
  } = useSettings();

  const [loading, setLoading] = useState(false);

  const form = useForm<SecuritySettingsForm>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      discordLoginOnly: true,
      sessionTimeoutMinutes: 60,
      auditLogging: true,
    },
  });

  useEffect(() => {
    if (!security) return;

    form.reset(security);
  }, [security, form]);

  if (!security) {
    return <SettingsSkeleton />;
  }

  async function onSubmit(values: SecuritySettingsForm) {
    await saveSettings({
      action: () => saveSecurity(values),
      setLoading,
      successMessage: "Security settings updated.",
      errorMessage: "Failed to update security settings.",
    });
  }

  return (
    <SettingsCard
      title="Security Settings"
      description="Configure authentication and security options."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="discordLoginOnly"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel>Discord Login Only</FormLabel>

                  <p className="text-sm text-muted-foreground">
                    Require Discord authentication for all users.
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
            name="sessionTimeoutMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Session Timeout (Minutes)
                </FormLabel>

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
            name="auditLogging"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel>Audit Logging</FormLabel>

                  <p className="text-sm text-muted-foreground">
                    Record all administrative actions.
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
  metadata={securityMetadata}
/>
        </form>
      </Form>
    </SettingsCard>
  );
}