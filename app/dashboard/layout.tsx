import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardLayout from "@/components/layout/dashboard-layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createClient();

  const {
  data: { user },
  error,
} = await supabase.auth.getUser();

if (error || !user) {
  redirect("/login");
}

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}