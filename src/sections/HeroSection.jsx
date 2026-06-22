import { Box, Typography, Button, Container } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        background: 'var(--color-bg-hero)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 장식 블롭 */}
      <Box className="decorative-blob" sx={{
        position: 'absolute', top: -80, right: -80,
        width: 320, height: 320, borderRadius: '50%',
        backgroundColor: 'var(--color-accent-purple)', opacity: 0.5,
      }} />
      <Box className="decorative-blob" sx={{
        position: 'absolute', bottom: -60, left: -60,
        width: 240, height: 240, borderRadius: '50%',
        backgroundColor: 'var(--color-accent-olive)', opacity: 0.5,
      }} />

      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
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
          HERO SECTION
        </Box>

        <Typography
          variant="h1"
          sx={{
            color: 'var(--color-text-on-color)',
            mb: 3,
            fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          여기는 Hero 섹션입니다.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'var(--color-text-on-color)',
            opacity: 0.85,
            mb: 5,
            fontSize: { xs: '1rem', md: '1.2rem' },
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.8,
          }}
        >
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" sx={{
            backgroundColor: 'var(--color-button-primary)',
            color: 'var(--color-button-primary-text)',
            '&:hover': { backgroundColor: 'var(--color-button-hover)' },
          }}>
            포트폴리오 보기
          </Button>
          <Button variant="outlined" size="large" sx={{
            borderColor: 'var(--color-text-on-color)',
            color: 'var(--color-text-on-color)',
            borderWidth: '2px',
            '&:hover': {
              borderColor: 'var(--color-secondary)',
              color: 'var(--color-secondary)',
              borderWidth: '2px',
              backgroundColor: 'transparent',
            },
          }}>
            연락하기
          </Button>
        </Box>
      </Container>

      {/* 스크롤 힌트 */}
      <Box sx={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        color: 'var(--color-text-on-color)', opacity: 0.7,
        animation: 'bounce 2s infinite',
        '@keyframes bounce': {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(8px)' },
        },
      }}>
        <Typography variant="caption" sx={{ mb: 0.5, letterSpacing: '0.1em', fontSize: '0.7rem' }}>
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon fontSize="small" />
      </Box>
    </Box>
  );
}
