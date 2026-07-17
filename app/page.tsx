import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import Stats from "@/components/home/stats";
import Services from "@/components/home/services";
import Departments from "@/components/home/departments";
import Recruitment from "@/components/home/recruitment";
import News from "@/components/home/news";
import { DutyHoursChart } from "@/components/dashboard/duty-hours-chart";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Departments />
      <Recruitment />
      <News />
      <DutyHoursChart />
    </>
  );
}