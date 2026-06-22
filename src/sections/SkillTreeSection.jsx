import { Box, Typography, Container, Grid, LinearProgress, Chip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const SKILLS = [
  { name: 'React',       level: 85, color: 'var(--color-accent-blue)' },
  { name: 'JavaScript', level: 80, color: 'var(--color-secondary)' },
  { name: 'HTML / CSS', level: 90, color: 'var(--color-accent-teal)' },
  { name: 'MUI',        level: 75, color: 'var(--color-accent-pink)' },
  { name: 'Git',        level: 70, color: 'var(--color-accent-olive)' },
  { name: 'Node.js',    level: 60, color: 'var(--color-accent-purple)' },
];

export default function SkillTreeSection() {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'var(--color-secondary)' }}
    >
      <Container maxWidth="md">
        {/* 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            SKILL TREE SECTION
          </Box>

          <Typography variant="h2" sx={{
            color: 'var(--color-text-on-color)',
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.25rem' },
          }}>
            여기는 Skill Tree 섹션입니다.
          </Typography>

          <Typography variant="body1" sx={{
            color: 'var(--color-text-secondary)',
            mt: 1.5,
          }}>
            기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
          </Typography>
        </Box>

        {/* 스킬 바 */}
        <Grid container spacing={3}>
          {SKILLS.map(({ name, level, color }) => (
            <Grid item xs={12} sm={6} key={name}>
              <Box sx={{
                p: 3,
                backgroundColor: 'var(--color-bg-primary)',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: '1px solid var(--color-border-warm)',
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                      width: 10, height: 10, borderRadius: '50%',
                      backgroundColor: color,
                    }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {name}
                    </Typography>
                  </Box>
                  <Chip
                    label={`${level}%`}
                    size="small"
                    sx={{
                      backgroundColor: color,
                      color: 'var(--color-text-on-color)',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      height: 20,
                    }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={level}
                  sx={{
                    height: 8, borderRadius: 4,
                    backgroundColor: 'var(--color-border-light)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: color,
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
