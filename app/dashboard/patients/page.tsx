import { requireManagement } from "@/lib/auth/require-management";
import PatientsPageClient from "./patients-page-client";

export default async function PatientsPage() {
  await requireManagement();

  return <PatientsPageClient />;
}