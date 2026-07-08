import { useEffect, useState } from 'react';
import {
  Box, Typography, Button, IconButton, Container, Grid, Fade, Tooltip, useMediaQuery,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { usePortfolio } from '../hooks/usePortfolio';
import { SKILL_ICONS, DEFAULT_SKILL_ICON } from '../utils/skillIcons';
import { socialLinks } from '../data/socialLinks';
import { SOCIAL_ICONS } from '../utils/socialIcons';
import { MOBILE_QUERY, DESKTOP_QUERY } from '../utils/breakpoints';
import { HOVER_CAPABLE, gradientSweepBg, iconGlowSx } from '../utils/hoverEffects';
import { useScrollLinked } from '../hooks/useScrollLinked';
import RoleTypewriter from '../components/RoleTypewriter';

const HEADLINE = '안 되는 이유를 찾아내고,\n되는 방법을 만들어내는 개발자';
const TYPE_SPEED = 55;
const ROLE_WORDS = ['개발자', '디자이너', '크리에이터'];

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

  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  const typedHeadline = useTypewriter(HEADLINE, TYPE_SPEED);
  const isTyping = typedHeadline.length < HEADLINE.length;

  // 패럴렉스(배경 블롭)와 스크롤 기반 변형(기하학적 도형 회전/스케일)용 레이어 —
  // 서로 다른 speed를 줘서 스크롤할 때 층마다 다르게 움직이는 다층 효과를 만든다.
  const blobRefA = useScrollLinked({ speed: 0.15 });
  const blobRefB = useScrollLinked({ speed: -0.2 });
  const shapeRefSquare = useScrollLinked({ speed: 0.1 });
  const shapeRefCircle = useScrollLinked({ speed: -0.12 });

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
        py: { xs: 10, sm: 8, md: 6, lg: 0 },
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

      {/* 장식 블롭 — 패럴렉스: 스크롤 속도가 서로 달라 배경이 전경과 분리되어 보인다 */}
      <Box ref={blobRefA} className="decorative-blob" sx={{
        position: 'absolute', top: -80, right: -80,
        width: 320, height: 320, borderRadius: '50%',
        backgroundColor: 'var(--color-accent-purple)', opacity: 0.45,
        transform: 'translate3d(0, calc(var(--parallax-offset, 0) * 1px), 0)',
        willChange: 'transform',
      }} />
      <Box ref={blobRefB} className="decorative-blob" sx={{
        position: 'absolute', bottom: -60, left: -60,
        width: 240, height: 240, borderRadius: '50%',
        backgroundColor: 'var(--color-accent-olive)', opacity: 0.45,
        transform: 'translate3d(0, calc(var(--parallax-offset, 0) * 1px), 0)',
        willChange: 'transform',
      }} />

      {/* 기하학적 도형 (데스크톱 1200px+ 전용) — 스크롤 위치에 따라 회전/스케일이 계속 바뀐다 */}
      {isDesktop && (
        <>
          <Box ref={shapeRefSquare} sx={{
            position: 'absolute', top: '16%', left: '6%',
            width: 130, height: 130,
            border: '2px dashed rgba(255,255,255,0.3)',
            borderRadius: '28px',
            transform: 'translate3d(0, calc(var(--parallax-offset, 0) * 1px), 0) rotate(calc(18deg + var(--reveal-progress, 0) * 50deg))',
            willChange: 'transform',
            pointerEvents: 'none',
          }} />
          <Box ref={shapeRefCircle} sx={{
            position: 'absolute', bottom: '18%', right: '8%',
            width: 90, height: 90,
            border: '2px solid rgba(255,255,255,0.25)',
            borderRadius: '50%',
            transform: 'translate3d(0, calc(var(--parallax-offset, 0) * 1px), 0) scale3d(calc(0.7 + var(--reveal-progress, 0) * 0.5), calc(0.7 + var(--reveal-progress, 0) * 0.5), 1)',
            willChange: 'transform',
            pointerEvents: 'none',
          }} />
        </>
      )}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, sm: 5, md: 4 }} sx={{ alignItems: 'center' }}>
          {/* 텍스트 영역 */}
          <Grid
            size={{ xs: 12, md: 7 }}
            sx={{
              textAlign: isMobile ? 'center' : 'left',
              '@media (min-width:768px)': { flexBasis: '58.333%', maxWidth: '58.333%' },
            }}
          >
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

            {/* 역할 타이핑/모핑 */}
            <Box sx={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'flex-start',
              alignItems: 'baseline',
              gap: 1,
              mb: 1,
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
              fontWeight: 700,
            }}>
              <Box component="span" sx={{ color: 'rgba(255,255,255,0.85)' }}>저는</Box>
              <RoleTypewriter words={ROLE_WORDS} sx={{ fontWeight: 800 }} />
              <Box component="span" sx={{ color: 'rgba(255,255,255,0.85)' }}>입니다</Box>
            </Box>

            <Typography
              variant={isMobile ? 'h2' : 'h1'}
              sx={{
                position: 'relative',
                color: '#FFFFFF',
                mb: 3,
                fontFamily: "'Black Han Sans', 'Noto Sans KR', sans-serif",
                fontSize: { xs: '1.7rem', sm: '2.6rem', md: '3.1rem', lg: '3.6rem' },
                fontWeight: 400,
                lineHeight: { xs: 1.4, md: 1.3 },
                whiteSpace: 'pre-line',
                textShadow: '0 4px 20px rgba(0,0,0,0.25)',
              }}
            >
              {/* 레이아웃 높이만 예약하는 투명 텍스트 — 최종 문구와 동일해서
                  타이핑 도중 줄바꿈이 생겨도 아래 요소가 밀리지 않는다 */}
              <Box component="span" aria-hidden="true" sx={{ visibility: 'hidden' }}>
                {HEADLINE}
              </Box>
              <Box component="span" sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
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
              </Box>
            </Typography>

            <Fade in timeout={600} style={{ transitionDelay: '1500ms' }}>
              <Typography
                variant="body1"
                sx={{
                  color: '#FFFFFF',
                  opacity: 0.95,
                  mb: 5,
                  fontSize: { xs: '0.92rem', sm: '1.05rem', md: '1.15rem' },
                  maxWidth: 560,
                  mx: isMobile ? 'auto' : 0,
                  lineHeight: { xs: 1.7, md: 1.8 },
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
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: { xs: 1.5, sm: 2 },
                  mb: 3,
                  alignItems: isMobile ? 'stretch' : 'center',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                }}>
                  {/* 주요 CTA */}
                  <Button
                    onClick={scrollToProjects}
                    variant="contained"
                    size="large"
                    fullWidth={isMobile}
                    sx={{
                      ...gradientSweepBg('var(--color-secondary)', 'var(--color-secondary-light)'),
                      color: 'var(--color-text-on-color)',
                      fontWeight: 700,
                      minHeight: 44,
                      boxShadow: '0 0 0 rgba(242,192,56,0.6)',
                      animation: 'ctaPulse 2.5s ease-in-out infinite',
                      willChange: 'transform, box-shadow, background-position',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-position 0.5s ease',
                      '@keyframes ctaPulse': {
                        '0%, 100%': { boxShadow: '0 0 0 0 rgba(242,192,56,0.5)' },
                        '50%': { boxShadow: '0 0 0 10px rgba(242,192,56,0)' },
                      },
                      [HOVER_CAPABLE]: {
                        '&:hover': {
                          backgroundPosition: '100% 0%',
                          transform: 'perspective(1600px) rotateX(2deg) translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                          animation: 'none',
                        },
                      },
                      '&:focus-visible': {
                        backgroundPosition: '100% 0%',
                        transform: 'perspective(1600px) rotateX(2deg) translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                        animation: 'none',
                      },
                      '&:active': {
                        transform: 'translateY(0) scale(0.98)',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
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
                    fullWidth={isMobile}
                    sx={{
                      borderColor: 'rgba(255,255,255,0.7)',
                      color: '#FFFFFF',
                      borderWidth: '2px',
                      minHeight: 44,
                      willChange: 'transform',
                      transition: 'transform 0.25s ease, border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease',
                      [HOVER_CAPABLE]: {
                        '&:hover': {
                          borderColor: 'var(--color-secondary)',
                          color: 'var(--color-secondary)',
                          borderWidth: '2px',
                          backgroundColor: 'rgba(255,255,255,0.08)',
                          transform: 'perspective(1600px) rotateX(2deg) translateY(-2px)',
                        },
                      },
                      '&:focus-visible': {
                        borderColor: 'var(--color-secondary)',
                        color: 'var(--color-secondary)',
                        borderWidth: '2px',
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        transform: 'perspective(1600px) rotateX(2deg) translateY(-2px)',
                      },
                      '&:active': {
                        transform: 'translateY(0) scale(0.98)',
                        backgroundColor: 'rgba(255,255,255,0.14)',
                      },
                    }}
                  >
                    연락하기
                  </Button>
                </Box>

                {/* 소셜 링크 */}
                <Box sx={{
                  display: 'flex', gap: { xs: 2, sm: 1.5 },
                  justifyContent: isMobile ? 'center' : 'flex-start',
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
                            width: 44,
                            height: 44,
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
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              '@media (min-width:768px)': { flexBasis: '41.667%', maxWidth: '41.667%' },
            }}
          >
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
                    <Tooltip key={skill.id} title={skill.name} placement="top">
                      <Box
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
                        <Icon
                          sx={{
                            fontSize: { xs: 20, md: 26 },
                            color: 'var(--color-primary)',
                            ...iconGlowSx('var(--color-primary)'),
                          }}
                        />
                      </Box>
                    </Tooltip>
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
          position: 'absolute', bottom: { xs: 16, md: 32 }, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center',
          minWidth: 44, minHeight: 44,
          p: 1,
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
