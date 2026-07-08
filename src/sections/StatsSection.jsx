import { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import { supabase } from '../lib/supabase';
import { usePortfolio } from '../hooks/usePortfolio';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

function StatItem({ icon: Icon, value, suffix, label, active }) {
  const animatedValue = useCountUp(value, active, 1400);
  const done = active && animatedValue === value && value > 0;

  return (
    <Box sx={{ textAlign: 'center', px: 2, minWidth: 120 }}>
      <Icon sx={{ fontSize: 30, color: 'var(--color-primary)', mb: 1 }} />
      <Typography
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 800,
          color: 'var(--color-text-primary)',
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1.1,
          animation: done ? 'statPop 0.4s ease' : 'none',
          '@keyframes statPop': {
            '0%': { transform: 'scale(1)' },
            '45%': { transform: 'scale(1.16)' },
            '100%': { transform: 'scale(1)' },
          },
        }}
      >
        {animatedValue}{suffix}
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--color-text-muted)', fontWeight: 600, mt: 0.5 }}>
        {label}
      </Typography>
    </Box>
  );
}

export default function StatsSection() {
  const { aboutMeData } = usePortfolio();
  const [projectCount, setProjectCount] = useState(0);
  const [rowRef, inView] = useInView(0.4);

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true);
      setProjectCount(count || 0);
    };
    fetchCount();
  }, []);

  const years = Number(aboutMeData.basicInfo.experience.match(/\d+/)?.[0] ?? 0);
  const skillCount = aboutMeData.skills.length;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'var(--color-bg-primary)' }}>
      <Container maxWidth="md">
        <Box
          ref={rowRef}
          sx={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', alignItems: 'flex-start',
            gap: { xs: 4, md: 10 },
            opacity: inView ? 1 : 0,
            transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
            willChange: 'opacity, transform',
            transition: 'opacity 600ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <StatItem icon={FolderRoundedIcon} value={projectCount} suffix="개" label="완성한 프로젝트" active={inView} />
          <StatItem icon={WorkHistoryRoundedIcon} value={years} suffix="년차" label="강의 경력" active={inView} />
          <StatItem icon={BuildRoundedIcon} value={skillCount} suffix="개" label="보유 기술" active={inView} />
        </Box>
      </Container>
    </Box>
  );
}
