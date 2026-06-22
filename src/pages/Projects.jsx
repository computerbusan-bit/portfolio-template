import { Box, Typography, Container } from '@mui/material';

export default function Projects() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: 'var(--color-bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center', py: 10 }}>
        {/* 섹션 라벨 */}
        <Box sx={{
          display: 'inline-block',
          px: 2, py: 0.5, mb: 3,
          backgroundColor: 'var(--color-accent-teal)',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#FFFFFF',
        }}>
          PROJECTS PAGE
        </Box>

        {/* 장식 원 */}
        <Box sx={{
          width: 120, height: 120,
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent-teal)',
          mx: 'auto',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
        }}>
          🗂️
        </Box>

        <Typography variant="h2" sx={{
          color: 'var(--color-text-primary)',
          fontWeight: 800,
          mb: 3,
          fontSize: { xs: '1.6rem', md: '2rem' },
          borderBottom: '3px solid var(--color-secondary)',
          display: 'inline-block',
          pb: 0.5,
        }}>
          Projects 페이지
        </Typography>

        <Typography variant="body1" sx={{
          color: 'var(--color-text-secondary)',
          mt: 3,
          lineHeight: 1.9,
          fontSize: '1.05rem',
          backgroundColor: 'var(--color-bg-secondary)',
          p: 3,
          borderRadius: '12px',
          border: '1px solid var(--color-border-warm)',
        }}>
          Projects 페이지가 개발될 공간입니다.
          <br />
          포트폴리오 작품들이 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}
