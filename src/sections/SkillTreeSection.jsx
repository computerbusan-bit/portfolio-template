import { Link } from 'react-router-dom';
import { Box, Typography, Container, Button, Tooltip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { usePortfolio } from '../hooks/usePortfolio';
import { SKILL_ICONS, DEFAULT_SKILL_ICON } from '../utils/skillIcons';
import { cardTiltSx } from '../utils/hoverEffects';
import { useInView } from '../hooks/useInView';
import CircularSkillProgress from '../components/CircularSkillProgress';
import ScrollReveal from '../components/ScrollReveal';

export default function SkillTreeSection() {
  const { homeData } = usePortfolio();
  const { skills } = homeData;
  const [rowRef, inView] = useInView(0.3);

  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'var(--color-secondary)' }}
    >
      <Container maxWidth="md">
        {/* 헤더 */}
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              px: 2, py: 0.5, mb: 2,
              backgroundColor: 'var(--color-primary)',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#FFFFFF',
            }}>
              <CodeIcon fontSize="small" />
              SKILLS
            </Box>

            <Typography variant="h2" sx={{
              color: 'var(--color-text-on-color)',
              fontWeight: 800,
              fontSize: { xs: '1.8rem', md: '2.25rem' },
            }}>
              저의 핵심 기술이에요
            </Typography>

            <Typography variant="body1" sx={{
              color: 'var(--color-text-secondary)',
              mt: 1.5,
            }}>
              자신 있는 순서대로 정리한 상위 스킬이에요.
            </Typography>
          </Box>
        </ScrollReveal>

        {/* 상위 4개 스킬 */}
        <Box
          ref={rowRef}
          aria-label="상위 4개 스킬"
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, mb: 5 }}
        >
          {skills.map((skill, index) => {
            const Icon = SKILL_ICONS[skill.icon] ?? DEFAULT_SKILL_ICON;
            return (
              <ScrollReveal key={skill.id} delay={index * 100} threshold={0.1}>
                <Tooltip title={skill.description} arrow placement="top">
                  <Box
                    tabIndex={0}
                    sx={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                      p: 3, minWidth: 120,
                      backgroundColor: 'var(--color-bg-primary)',
                      borderRadius: '16px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      border: '1px solid var(--color-border-warm)',
                      ...cardTiltSx,
                    }}
                  >
                    <CircularSkillProgress
                      level={skill.level}
                      color="var(--color-primary)"
                      active={inView}
                      icon={Icon}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {skill.name}
                    </Typography>
                  </Box>
                </Tooltip>
              </ScrollReveal>
            );
          })}
        </Box>

        <Box sx={{ textAlign: 'center' }}>
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
            전체 스킬 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
