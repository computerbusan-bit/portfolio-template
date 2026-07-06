import { Link } from 'react-router-dom';
import { Box, Typography, Container, Grid, Button, Fade } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { usePortfolio } from '../hooks/usePortfolio';
import { SKILL_ICONS, DEFAULT_SKILL_ICON } from '../utils/skillIcons';
import AboutMeBasicInfoCard from '../components/AboutMeBasicInfoCard';

export default function AboutMeSection() {
  const { homeData } = usePortfolio();
  const { basicInfo, content, skills } = homeData;
  const devStory = content.find((section) => section.id === 'dev-story') ?? content[0];

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

        <Grid container spacing={4} alignItems="stretch">
          {/* 사이드: 프로필 + 기본 정보 */}
          <Grid item xs={12} md={5}>
            <AboutMeBasicInfoCard basicInfo={basicInfo} />
          </Grid>

          {/* 메인 콘텐츠: 개발 스토리 요약 */}
          <Grid item xs={12} md={7}>
            <Box sx={{
              height: '100%',
              p: { xs: 3, md: 4 },
              backgroundColor: 'var(--color-bg-primary)',
              borderRadius: '16px',
              border: '1px solid var(--color-border-light)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              {devStory && (
                <Fade in key={devStory.summary} timeout={400}>
                  <Box aria-live="polite">
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--color-text-primary)', mb: 1.5 }}>
                      {devStory.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.9 }}>
                      {devStory.summary}
                    </Typography>
                  </Box>
                </Fade>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* 하단: 주요 스킬 4개 */}
        <Box
          aria-label="주요 스킬"
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mt: 4 }}
        >
          {skills.map((skill) => {
            const Icon = SKILL_ICONS[skill.icon] ?? DEFAULT_SKILL_ICON;
            return (
              <Box key={skill.id} sx={{
                display: 'flex', alignItems: 'center', gap: 1,
                px: 2, py: 1,
                borderRadius: '20px',
                border: '1px solid var(--color-border-light)',
                backgroundColor: 'var(--color-bg-primary)',
              }}>
                <Icon sx={{ fontSize: 18, color: 'var(--color-primary)' }} />
                <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {skill.name}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component={Link}
            to="/about"
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              backgroundColor: 'var(--color-button-primary)',
              color: 'var(--color-button-primary-text)',
              '&:hover': { backgroundColor: 'var(--color-button-hover)' },
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
