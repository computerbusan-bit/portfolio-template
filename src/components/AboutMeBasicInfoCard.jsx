import { memo } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';

function AboutMeBasicInfoCard({ basicInfo }) {
  return (
    <Card sx={{
      border: '1px solid var(--color-border-light)',
      borderRadius: '16px',
    }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Grid container spacing={3} alignItems="center">
          {/* 캐릭터 프로필 */}
          <Grid item xs={12} sm="auto" sx={{ textAlign: 'center' }}>
            <Box
              role="img"
              aria-label={`${basicInfo.name} 프로필 캐릭터`}
              sx={{
                width: 120, height: 120,
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent-purple)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                mx: 'auto',
                fontSize: '3.5rem',
                boxShadow: '0 8px 32px rgba(196,168,206,0.4)',
                flexShrink: 0,
              }}
            >
              {basicInfo.photo}
            </Box>
          </Grid>

          {/* 기본 정보 텍스트 */}
          <Grid item xs={12} sm>
            <Typography variant="h3" sx={{
              color: 'var(--color-text-primary)',
              fontWeight: 800,
              fontSize: { xs: '1.4rem', md: '1.6rem' },
              mb: 1.5,
              textAlign: { xs: 'center', sm: 'left' },
            }}>
              {basicInfo.name}
            </Typography>

            <Box sx={{
              display: 'flex', flexDirection: 'column', gap: 1,
              alignItems: { xs: 'center', sm: 'flex-start' },
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SchoolRoundedIcon sx={{ fontSize: 18, color: 'var(--color-primary)' }} />
                <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                  {basicInfo.education} · {basicInfo.major}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WorkRoundedIcon sx={{ fontSize: 18, color: 'var(--color-primary)' }} />
                <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                  {basicInfo.experience}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default memo(AboutMeBasicInfoCard);
