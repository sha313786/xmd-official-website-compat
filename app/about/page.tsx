import Navbar from "@/components/layout/navbar";
import Footer from "@/components/home/footer";
import AboutHero from "@/components/about/hero";
import WhoWeAre from "@/components/about/who-we-are";
import MissionVision from "@/components/about/mission-vision";
import Management from "@/components/about/management";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <WhoWeAre />
      <MissionVision />
      <Management />
      <Footer />
    </>
  );
}