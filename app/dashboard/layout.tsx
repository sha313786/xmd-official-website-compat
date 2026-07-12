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
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}