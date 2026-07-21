"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import GeneralSettings from "./general-settings";
import RecruitmentSettings from "./recruitment-settings";
import DiscordSettings from "./discord-settings";
import WebsiteSettings from "./website-settings";
import SecuritySettings from "./security-settings";
import AboutSettings from "./about-settings";

export default function SettingsTabs() {
  return (
    <Tabs
      defaultValue="general"
      className="space-y-6"
    >
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="general">
          General
        </TabsTrigger>

        <TabsTrigger value="recruitment">
          Recruitment
        </TabsTrigger>

        <TabsTrigger value="discord">
          Discord
        </TabsTrigger>

        <TabsTrigger value="website">
          Website
        </TabsTrigger>

        <TabsTrigger value="security">
          Security
        </TabsTrigger>

        <TabsTrigger value="about">
          About
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <GeneralSettings />
      </TabsContent>

      <TabsContent value="recruitment">
        <RecruitmentSettings />
      </TabsContent>

      <TabsContent value="discord">
        <DiscordSettings />
      </TabsContent>

      <TabsContent value="website">
        <WebsiteSettings />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>

      <TabsContent value="about">
        <AboutSettings />
      </TabsContent>
    </Tabs>
  );
}