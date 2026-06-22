import { Box, Typography, Button, Container, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

export default function AboutMeSection() {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <Container maxWidth="md">
        <Grid container spacing={6} alignItems="center" justifyContent="center">
          {/* 아이콘 영역 */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Box sx={{
              width: 160, height: 160, borderRadius: '50%',
              backgroundColor: 'var(--color-accent-purple)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mx: 'auto',
              boxShadow: '0 8px 32px rgba(196,168,206,0.4)',
            }}>
              <PersonIcon sx={{ fontSize: 72, color: 'var(--color-text-on-color)' }} />
            </Box>
          </Grid>

          {/* 텍스트 영역 */}
          <Grid item xs={12} md={8}>
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
              ABOUT ME SECTION
            </Box>

            <Typography variant="h2" sx={{
              mb: 2,
              color: 'var(--color-text-primary)',
              fontWeight: 800,
              fontSize: { xs: '1.8rem', md: '2.25rem' },
              borderBottom: '3px solid var(--color-primary)',
              display: 'inline-block',
              pb: 0.5,
            }}>
              여기는 About Me 섹션입니다.
            </Typography>

            <Typography variant="body1" sx={{
              color: 'var(--color-text-secondary)',
              mt: 2, mb: 4,
              lineHeight: 1.8,
            }}>
              간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
            </Typography>

            <Button
              component={Link}
              to="/about"
              variant="contained"
              sx={{
                backgroundColor: 'var(--color-button-primary)',
                color: 'var(--color-button-primary-text)',
                '&:hover': { backgroundColor: 'var(--color-button-hover)' },
              }}
            >
              더 알아보기 →
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
