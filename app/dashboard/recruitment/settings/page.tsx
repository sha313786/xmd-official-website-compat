import { RecruitmentSettings } from "@/components/recruitment/settings/recruitment-settings";

export default function RecruitmentSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Recruitment Settings
        </h1>

        <p className="text-muted-foreground">
          Configure recruitment status, notices, Discord invite and recruitment cycle.
        </p>
      </div>

      <RecruitmentSettings />
    </div>
  );
}