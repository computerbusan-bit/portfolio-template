import { Box, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';

const PLACEHOLDER_PROJECTS = [
  { title: 'Project 01', desc: '프로젝트 설명이 들어갈 예정입니다.', bg: 'var(--color-accent-pink)' },
  { title: 'Project 02', desc: '프로젝트 설명이 들어갈 예정입니다.', bg: 'var(--color-accent-blue)' },
  { title: 'Project 03', desc: '프로젝트 설명이 들어갈 예정입니다.', bg: 'var(--color-accent-teal)' },
];

export default function ProjectsSection() {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'var(--color-bg-primary)' }}
    >
      <Container maxWidth="md">
        {/* 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Box sx={{
            display: 'inline-block',
            px: 2, py: 0.5, mb: 2,
            backgroundColor: 'var(--color-accent-teal)',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#FFFFFF',
          }}>
            PROJECTS SECTION
          </Box>

          <Typography variant="h2" sx={{
            color: 'var(--color-text-primary)',
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.25rem' },
            borderBottom: '3px solid var(--color-secondary)',
            display: 'inline-block',
            pb: 0.5,
          }}>
            여기는 Projects 섹션입니다.
          </Typography>

          <Typography variant="body1" sx={{
            color: 'var(--color-text-muted)', mt: 2,
          }}>
            대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
          </Typography>
        </Box>

        {/* 카드 그리드 */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {PLACEHOLDER_PROJECTS.map(({ title, desc, bg }) => (
            <Grid item xs={12} sm={4} key={title}>
              <Card sx={{
                height: '100%',
                border: '1px solid var(--color-border-light)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                },
              }}>
                {/* 썸네일 플레이스홀더 */}
                <Box sx={{
                  height: 160,
                  backgroundColor: bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <FolderIcon sx={{ fontSize: 56, color: '#FFFFFF', opacity: 0.8 }} />
                </Box>
                <CardContent>
                  <Typography variant="h4" sx={{
                    fontWeight: 700, mb: 1,
                    color: 'var(--color-text-primary)',
                    fontSize: '1rem',
                  }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
                    {desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            component={Link}
            to="/projects"
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              borderWidth: '2px',
              '&:hover': {
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                borderWidth: '2px',
              },
            }}
          >
            전체 프로젝트 더 보기 →
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
