"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  discordSettingsSchema,
  type DiscordSettingsForm,
} from "@/lib/validation/settings";

import { saveSettings } from "@/lib/utils/save-settings";

import { useSettings } from "@/hooks/settings/use-settings";

import SettingsCard from "@/components/settings/settings-card";
import SettingsSkeleton from "./settings-skeleton";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import SettingsFooter from "@/components/settings/settings-footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function DiscordSettings() {
  const {
    discord,
    discordMetadata,
    saveDiscord,
  } = useSettings();

  const [loading, setLoading] = useState(false);

  const form = useForm<DiscordSettingsForm>({
    resolver: zodResolver(discordSettingsSchema),
    defaultValues: {
      botEnabled: true,
      guildId: "",
      verificationRoleId: "",
      verificationChannelId: "",
      dutyPanelChannelId: "",
      dutyLogsChannelId: "",
    },
  });

  useEffect(() => {
    if (!discord) return;

    form.reset(discord);
  }, [discord, form]);

  if (!discord) {
    return <SettingsSkeleton />;
  }

  async function onSubmit(values: DiscordSettingsForm) {
    await saveSettings({
      action: () => saveDiscord(values),
      setLoading,
      successMessage: "Discord settings updated.",
      errorMessage: "Failed to update Discord settings.",
    });
  }

  return (
    <SettingsCard
      title="Discord Settings"
      description="Configure the Discord bot integration."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="botEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel>Bot Enabled</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable the Discord bot.
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
            name="guildId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guild ID</FormLabel>

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
              name="verificationRoleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Role ID</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="verificationChannelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Channel ID</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="dutyPanelChannelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duty Panel Channel ID</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dutyLogsChannelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duty Logs Channel ID</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SettingsFooter
  loading={loading}
  isDirty={form.formState.isDirty}
  onReset={() => form.reset()}
  metadata={discordMetadata}
/>
        </form>
      </Form>
    </SettingsCard>
  );
}