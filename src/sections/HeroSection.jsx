import { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, Container, Grid, Fade, Tooltip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { usePortfolio } from '../hooks/usePortfolio';
import { SKILL_ICONS, DEFAULT_SKILL_ICON } from '../utils/skillIcons';
import { socialLinks } from '../data/socialLinks';
import { SOCIAL_ICONS } from '../utils/socialIcons';

const HEADLINE = '안 되는 이유를 찾아내고,\n되는 방법을 만들어내는 개발자';
const TYPE_SPEED = 55;

function useTypewriter(text, speed) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return typed;
}

// 프로필 원 주위에 떠다니는 스킬 아이콘 위치
const ORBIT_POSITIONS = [
  { top: '-6%', left: '8%' },
  { top: '10%', right: '-8%' },
  { bottom: '6%', left: '-8%' },
  { bottom: '-6%', right: '10%' },
];

export default function HeroSection() {
  const { aboutMeData, homeData } = usePortfolio();
  const { name, education, major, experience, photo } = aboutMeData.basicInfo;
  const orbitSkills = homeData.skills.slice(0, 4);

  const typedHeadline = useTypewriter(HEADLINE, TYPE_SPEED);
  const isTyping = typedHeadline.length < HEADLINE.length;

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--color-bg-hero) 0%, var(--color-primary-dark) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 도트 패턴 배경 */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      {/* 장식 블롭 */}
      <Box className="decorative-blob" sx={{
        position: 'absolute', top: -80, right: -80,
        width: 320, height: 320, borderRadius: '50%',
        backgroundColor: 'var(--color-accent-purple)', opacity: 0.45,
      }} />
      <Box className="decorative-blob" sx={{
        position: 'absolute', bottom: -60, left: -60,
        width: 240, height: 240, borderRadius: '50%',
        backgroundColor: 'var(--color-accent-olive)', opacity: 0.45,
      }} />

      {/* 기하학적 도형 (데스크탑 전용) */}
      <Box sx={{
        position: 'absolute', top: '16%', left: '6%',
        width: 130, height: 130,
        border: '2px dashed rgba(255,255,255,0.3)',
        borderRadius: '28px',
        transform: 'rotate(18deg)',
        display: { xs: 'none', md: 'block' },
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', bottom: '18%', right: '8%',
        width: 90, height: 90,
        border: '2px solid rgba(255,255,255,0.25)',
        borderRadius: '50%',
        display: { xs: 'none', md: 'block' },
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 4 }} alignItems="center">
          {/* 텍스트 영역 */}
          <Grid item xs={12} md={7} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            {/* 섹션 라벨 */}
            <Box sx={{
              display: 'inline-block',
              px: 2, py: 0.5,
              mb: 3,
              backgroundColor: 'var(--color-secondary)',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--color-text-on-color)',
            }}>
              {name} · {experience}
            </Box>

            <Typography
              variant="h1"
              sx={{
                color: '#FFFFFF',
                mb: 3,
                fontFamily: "'Black Han Sans', 'Noto Sans KR', sans-serif",
                fontSize: { xs: '2rem', sm: '2.8rem', md: '3.6rem' },
                fontWeight: 400,
                lineHeight: 1.3,
                whiteSpace: 'pre-line',
                textShadow: '0 4px 20px rgba(0,0,0,0.25)',
                minHeight: { xs: '5.5rem', sm: '6.5rem', md: '5rem' },
              }}
            >
              {typedHeadline}
              <Box
                component="span"
                aria-hidden="true"
                sx={{
                  display: 'inline-block',
                  width: '3px',
                  ml: '2px',
                  height: '0.9em',
                  verticalAlign: '-0.1em',
                  backgroundColor: '#FFFFFF',
                  opacity: isTyping ? 1 : 0,
                  animation: isTyping ? 'blink 0.8s step-end infinite' : 'none',
                  '@keyframes blink': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 },
                  },
                }}
              />
            </Typography>

            <Fade in timeout={600} style={{ transitionDelay: '1500ms' }}>
              <Typography
                variant="body1"
                sx={{
                  color: '#FFFFFF',
                  opacity: 0.95,
                  mb: 5,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  maxWidth: 560,
                  mx: { xs: 'auto', md: 0 },
                  lineHeight: 1.8,
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}
              >
                {education}에서 {major}을 공부했고, 지금은 {experience}로 학생들과 함께 성장하고 있어요.
                효율적이고 재사용 가능한 코드를 만드는 것을 목표로 합니다.
              </Typography>
            </Fade>

            <Fade in timeout={600} style={{ transitionDelay: '1900ms' }}>
              <Box>
                <Box sx={{
                  display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}>
                  {/* 주요 CTA */}
                  <Button
                    onClick={scrollToProjects}
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-text-on-color)',
                      fontWeight: 700,
                      boxShadow: '0 0 0 rgba(242,192,56,0.6)',
                      animation: 'ctaPulse 2.5s ease-in-out infinite',
                      transition: 'all 0.25s ease',
                      '@keyframes ctaPulse': {
                        '0%, 100%': { boxShadow: '0 0 0 0 rgba(242,192,56,0.5)' },
                        '50%': { boxShadow: '0 0 0 10px rgba(242,192,56,0)' },
                      },
                      '&:hover': {
                        backgroundColor: 'var(--color-secondary-light)',
                        transform: 'translateY(-2px) scale(1.04)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                        animation: 'none',
                      },
                    }}
                  >
                    프로젝트 보기
                  </Button>

                  {/* 보조 CTA */}
                  <Button
                    onClick={scrollToContact}
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'rgba(255,255,255,0.7)',
                      color: '#FFFFFF',
                      borderWidth: '2px',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: 'var(--color-secondary)',
                        color: 'var(--color-secondary)',
                        borderWidth: '2px',
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    연락하기
                  </Button>
                </Box>

                {/* 소셜 링크 */}
                <Box sx={{
                  display: 'flex', gap: 1.5,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}>
                  {socialLinks.map(({ id, icon, label, href }) => {
                    const Icon = SOCIAL_ICONS[icon];
                    return (
                      <Tooltip key={id} title={label} placement="top">
                        <IconButton
                          component="a"
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          aria-label={label}
                          sx={{
                            color: '#FFFFFF',
                            backgroundColor: 'rgba(255,255,255,0.12)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: 'var(--color-secondary)',
                              color: 'var(--color-text-on-color)',
                              borderColor: 'var(--color-secondary)',
                              transform: 'translateY(-3px)',
                            },
                          }}
                        >
                          <Icon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    );
                  })}
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* 비주얼 영역: 프로필 + 떠다니는 스킬 아이콘 */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Fade in timeout={700} style={{ transitionDelay: '300ms' }}>
              <Box sx={{
                position: 'relative',
                width: { xs: 220, sm: 260, md: 300 },
                height: { xs: 220, sm: 260, md: 300 },
              }}>
                {/* 회전하는 점선 링 */}
                <Box sx={{
                  position: 'absolute', inset: 0,
                  border: '2px dashed rgba(255,255,255,0.4)',
                  borderRadius: '50%',
                  animation: 'spin 18s linear infinite',
                  '@keyframes spin': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                  },
                }} />

                {/* 프로필 캐릭터 */}
                <Box
                  role="img"
                  aria-label={`${name} 프로필 캐릭터`}
                  sx={{
                    position: 'absolute',
                    top: '10%', left: '10%',
                    width: '80%', height: '80%',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-bg-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: { xs: '4.5rem', md: '5.5rem' },
                    boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
                  }}
                >
                  {photo}
                </Box>

                {/* 떠다니는 스킬 아이콘 */}
                {orbitSkills.map((skill, index) => {
                  const Icon = SKILL_ICONS[skill.icon] ?? DEFAULT_SKILL_ICON;
                  const position = ORBIT_POSITIONS[index] ?? ORBIT_POSITIONS[0];
                  return (
                    <Box
                      key={skill.id}
                      title={skill.name}
                      sx={{
                        position: 'absolute',
                        ...position,
                        width: { xs: 44, md: 54 },
                        height: { xs: 44, md: 54 },
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-bg-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
                        animation: `float 3.5s ease-in-out ${index * 0.4}s infinite`,
                        '@keyframes float': {
                          '0%, 100%': { transform: 'translateY(0)' },
                          '50%': { transform: 'translateY(-10px)' },
                        },
                      }}
                    >
                      <Icon sx={{ fontSize: { xs: 20, md: 26 }, color: 'var(--color-primary)' }} />
                    </Box>
                  );
                })}
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* 스크롤 힌트 */}
      <Box
        role="button"
        tabIndex={0}
        aria-label="다음 섹션으로 스크롤"
        onClick={scrollToNext}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') scrollToNext();
        }}
        sx={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          color: '#FFFFFF', opacity: 0.8,
          cursor: 'pointer',
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(8px)' },
          },
        }}
      >
        <Typography variant="caption" sx={{ mb: 0.5, letterSpacing: '0.1em', fontSize: '0.7rem' }}>
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon fontSize="small" />
      </Box>
    </Box>
  );
}
