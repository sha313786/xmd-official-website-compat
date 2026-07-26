import { requireManagement } from "@/lib/auth/require-management";
import SettingsTabs from "@/components/settings/settings-tabs";

export default async function Page() {
  await requireManagement();

  return <SettingsTabs />;
}