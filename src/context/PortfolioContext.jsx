import { useMemo } from 'react';
import { PortfolioContext } from './portfolioContextInstance';
import { aboutMeData as initialAboutMeData } from '../data/aboutMeData';
import { skillsData as initialSkillsData, sortByLevelDesc } from '../data/skillsData';

const HOME_SUMMARY_LENGTH = 100;
const HOME_TOP_SKILLS_COUNT = 4;

export function PortfolioProvider({ children }) {
  const aboutMeData = useMemo(() => ({
    basicInfo: initialAboutMeData.basicInfo,
    sections: initialAboutMeData.sections,
    skills: initialSkillsData,
  }), []);

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

  const value = useMemo(() => ({ aboutMeData, homeData }), [aboutMeData, homeData]);

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}
