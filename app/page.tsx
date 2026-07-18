import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import Recruitment from "@/components/home/recruitment";
import News from "@/components/home/news";
import Footer from "@/components/home/footer";
import Impact from "@/components/home/impact";
import MedicalServices from "@/components/home/medical-services";
import Departments from "@/components/home/departments";
import CTA from "@/components/home/cta";

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
      <Impact />
      <MedicalServices />
      <Departments />
      <Recruitment />
      <News />
      <CTA />
      <Footer />
    </>
  );
}