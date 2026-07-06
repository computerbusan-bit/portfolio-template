import { useCallback, useMemo, useState } from 'react';
import { PortfolioContext } from './portfolioContextInstance';
import { aboutMeData as initialAboutMeData } from '../data/aboutMeData';
import { skillsData as initialSkillsData, sortByLevelDesc } from '../data/skillsData';

const HOME_SUMMARY_LENGTH = 100;
const HOME_TOP_SKILLS_COUNT = 4;

export function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState({
    basicInfo: initialAboutMeData.basicInfo,
    sections: initialAboutMeData.sections,
    skills: initialSkillsData,
  });

  const updateBasicInfo = (updates) => {
    setAboutMeData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, ...updates },
    }));
  };

  const updateSectionContent = (id, content) => {
    setAboutMeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (
        section.id === id ? { ...section, content } : section
      )),
    }));
  };

  const updateSkillLevel = (id, level) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (
        skill.id === id ? { ...skill, level } : skill
      )),
    }));
  };

  const addSkill = (skill) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const homeData = useMemo(() => {
    const content = aboutMeData.sections
      .filter((section) => section.showInHome)
      .map((section) => ({
        id: section.id,
        title: section.title,
        summary: section.content.length > HOME_SUMMARY_LENGTH
          ? `${section.content.slice(0, HOME_SUMMARY_LENGTH)}...`
          : section.content,
      }));

    const skills = sortByLevelDesc(aboutMeData.skills).slice(0, HOME_TOP_SKILLS_COUNT);

    return { content, skills, basicInfo: aboutMeData.basicInfo };
  }, [aboutMeData]);

  const getHomeData = useCallback(() => homeData, [homeData]);

  const value = useMemo(() => ({
    aboutMeData,
    setAboutMeData,
    updateBasicInfo,
    updateSectionContent,
    updateSkillLevel,
    addSkill,
    homeData,
    getHomeData,
  }), [aboutMeData, homeData, getHomeData]);

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}
