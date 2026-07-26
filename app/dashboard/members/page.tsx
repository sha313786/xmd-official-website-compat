import { requireManagement } from "@/lib/auth/require-management";
import MembersPageClient from "./members-page-client";

export default async function MembersPage() {
  await requireManagement();

  return <MembersPageClient />;
}