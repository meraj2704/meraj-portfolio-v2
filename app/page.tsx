import HeroSection from "./components/HeroSection";
import PhotoReveal from "./components/PhotoReveal";
import FeaturedSection from "./components/FeaturedSection";
import AboutMeSection from "./components/AboutMeSection";
import ClientsArch from "./components/ClientsArch";
import ExpertiseSection from "./components/ExpertiseSection";
import ExperienceSection from "./components/ExperienceSection";
import StackSection from "./components/StackSection";
import AwardsSection from "./components/AwardsSection";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PhotoReveal />
      <FeaturedSection />
      <AboutMeSection />
      <ClientsArch />
      <ExpertiseSection />
      <ExperienceSection />
      <StackSection />
      <AwardsSection />
      <CtaSection />
      <Footer />
    </>
  );
}
