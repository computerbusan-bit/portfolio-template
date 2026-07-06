import { useState } from 'react';
import { Box, Typography, Button, Container, Collapse } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { aboutMeData } from '../data/aboutMeData';
import AboutMeBasicInfoCard from '../components/AboutMeBasicInfoCard';
import AboutMeAccordion from '../components/AboutMeAccordion';

export default function AboutMeSection() {
  const [open, setOpen] = useState(false);
  const { basicInfo, sections } = aboutMeData;
  const homeSections = sections.filter((section) => section.showInHome);

  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Box sx={{
            display: 'inline-block',
            px: 2, py: 0.5, mb: 2,
            backgroundColor: 'var(--color-secondary)',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'var(--color-text-on-color)',
          }}>
            ABOUT ME
          </Box>

          <Typography variant="h2" sx={{
            color: 'var(--color-text-primary)',
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.25rem' },
            borderBottom: '3px solid var(--color-primary)',
            display: 'inline-block',
            pb: 0.5,
          }}>
            저를 소개할게요
          </Typography>
        </Box>

        {/* 기본 정보 카드 */}
        <AboutMeBasicInfoCard basicInfo={basicInfo} />

        {/* 더 알아보기 토글 버튼 */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            onClick={() => setOpen((prev) => !prev)}
            variant="contained"
            endIcon={
              <ExpandMoreRoundedIcon
                sx={{
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              />
            }
            sx={{
              backgroundColor: 'var(--color-button-primary)',
              color: 'var(--color-button-primary-text)',
              '&:hover': { backgroundColor: 'var(--color-button-hover)' },
            }}
          >
            {open ? '접기' : '더 알아보기'}
          </Button>
        </Box>

        {/* 아코디언 콘텐츠 */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 4 }}>
            <AboutMeAccordion sections={homeSections} />
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
}
