import HeroSection from '../sections/HeroSection';
import AboutMeSection from '../sections/AboutMeSection';
import SkillTreeSection from '../sections/SkillTreeSection';
import ProjectsSection from '../sections/ProjectsSection';
import ContactSection from '../sections/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutMeSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
