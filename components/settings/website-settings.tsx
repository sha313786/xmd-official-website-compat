"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  websiteSettingsSchema,
  type WebsiteSettingsForm,
} from "@/lib/validation/settings";

import { saveSettings } from "@/lib/utils/save-settings";

import { useSettings } from "@/hooks/settings/use-settings";
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes";

import SettingsCard from "./settings-card";
import SettingsSkeleton from "./settings-skeleton";
import SettingsFooter from "./settings-footer";

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

export default function WebsiteSettings() {
  const {
    website,
    websiteMetadata,
    saveWebsite,
  } = useSettings();

  const [loading, setLoading] = useState(false);

  const form = useForm<WebsiteSettingsForm>({
    resolver: zodResolver(websiteSettingsSchema),
    defaultValues: {
      heroTitle: "",
      heroSubtitle: "",
      footerText: "",
      contactEmail: "",
      discordInvite: "",
      youtubeUrl: "",
    },
  });

  useUnsavedChanges({
    enabled: form.formState.isDirty,
  });

  useEffect(() => {
    if (!website) return;

    form.reset(website);
  }, [website, form]);

  if (!website) {
    return <SettingsSkeleton />;
  }

  async function onSubmit(values: WebsiteSettingsForm) {
    await saveSettings({
      action: () => saveWebsite(values),
      setLoading,
      successMessage: "Website settings updated.",
      errorMessage: "Failed to update website settings.",
    });
  }

  return (
    <SettingsCard
      title="Website Settings"
      description="Configure your public website."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="heroTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Title</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="heroSubtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Subtitle</FormLabel>

                <FormControl>
                  <Textarea
                    rows={3}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="footerText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Footer Text</FormLabel>

                <FormControl>
                  <Textarea
                    rows={3}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>

                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discordInvite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discord Invite URL</FormLabel>

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
            name="youtubeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>YouTube URL</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <SettingsFooter
  loading={loading}
  isDirty={form.formState.isDirty}
  onReset={() => form.reset()}
  metadata={websiteMetadata}
/>
        </form>
      </Form>
    </SettingsCard>
  );
}