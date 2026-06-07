import HeroSection from "../components/HeroSection";
import PhotoReveal from "../components/PhotoReveal";
import FeaturedSection from "../components/FeaturedSection";
import AboutMeSection from "../components/AboutMeSection";
import ClientsArch from "../components/ClientsArch";
import ExpertiseSection from "../components/ExpertiseSection";
import ServicesSection from "../components/ServicesSection";
import ExperienceSection from "../components/ExperienceSection";
import StackSection from "../components/StackSection";
import AwardsSection from "../components/AwardsSection";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import { getSiteProfile } from "../lib/about";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await getSiteProfile();

  return (
    <>
      <HeroSection profile={profile} />
      <PhotoReveal />
      <FeaturedSection />
      <AboutMeSection profile={profile} />
      <ClientsArch />
      <ExpertiseSection />
      <ServicesSection />
      <ExperienceSection />
      <StackSection />
      <AwardsSection />
      <CtaSection profile={profile} />
      <Footer profile={profile} />
    </>
  );
}
