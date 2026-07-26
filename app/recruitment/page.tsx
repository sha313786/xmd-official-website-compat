import RecruitmentHero from "@/components/recruitment-public/hero";
import RecruitmentStatus from "@/components/recruitment-public/status";
import RecruitmentNotice from "@/components/recruitment-public/notice";
import RecruitmentEligibility from "@/components/recruitment-public/eligibility";
import RecruitmentSchedule from "@/components/recruitment-public/schedule";
import RecruitmentDocuments from "@/components/recruitment-public/documents";
import RecruitmentGuidelines from "@/components/recruitment-public/guidelines";
import RecruitmentFaq from "@/components/recruitment-public/faq";
import RecruitmentApply from "@/components/recruitment-public/apply";

export default function RecruitmentPage() {
  return (
    <>
      <RecruitmentHero />
      <RecruitmentStatus />
      <RecruitmentNotice />
      <RecruitmentEligibility />
      <RecruitmentSchedule />
      <RecruitmentDocuments />
      <RecruitmentGuidelines />
      <RecruitmentFaq />
      <RecruitmentApply />
    </>
  );
}