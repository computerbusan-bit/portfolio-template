import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeroSection from '../sections/HeroSection';
import AboutMeSection from '../sections/AboutMeSection';
import StatsSection from '../sections/StatsSection';
import SkillTreeSection from '../sections/SkillTreeSection';
import ProjectsSection from '../sections/ProjectsSection';
import ContactSection from '../sections/ContactSection';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // 다른 페이지의 Navbar에서 "Contact"를 눌러 홈으로 이동해온 경우,
  // 홈이 렌더된 뒤 해당 섹션으로 스크롤하고 state는 지운다(뒤로가기 시 재실행 방지).
  useEffect(() => {
    if (location.state?.scrollTo) {
      document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <main>
      <HeroSection />
      <AboutMeSection />
      <StatsSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
