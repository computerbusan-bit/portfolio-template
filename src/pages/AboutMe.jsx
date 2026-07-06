import { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { aboutMeData as initialAboutMeData } from '../data/aboutMeData';
import AboutMeBasicInfoCard from '../components/AboutMeBasicInfoCard';
import AboutMeAccordion from '../components/AboutMeAccordion';

export default function AboutMe() {
  const [aboutMeData] = useState(initialAboutMeData);
  const { basicInfo, sections } = aboutMeData;

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: 'var(--color-bg-secondary)',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="md">
        {/* 섹션 라벨 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Box sx={{
            display: 'inline-block',
            px: 2, py: 0.5, mb: 3,
            backgroundColor: 'var(--color-accent-purple)',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#FFFFFF',
          }}>
            ABOUT ME
          </Box>
          <Typography variant="h2" sx={{
            color: 'var(--color-text-primary)',
            fontWeight: 800,
            fontSize: { xs: '1.6rem', md: '2rem' },
            borderBottom: '3px solid var(--color-primary)',
            display: 'inline-block',
            pb: 0.5,
          }}>
            About Me
          </Typography>
        </Box>

        {/* 기본 정보 카드 */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <AboutMeBasicInfoCard basicInfo={basicInfo} />
        </Box>

        {/* 콘텐츠 섹션 (아코디언) */}
        <AboutMeAccordion sections={sections} showHomeBadge />
      </Container>
    </Box>
  );
}
