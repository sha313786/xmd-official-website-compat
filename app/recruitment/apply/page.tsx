import { RecruitmentApplicationForm } from "@/components/recruitment/recruitment-application-form";

export default function RecruitmentApplyPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto max-w-5xl px-6">
        <RecruitmentApplicationForm />
      </div>
    </main>
  );
}