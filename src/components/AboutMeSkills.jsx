import { memo, useMemo } from 'react';
import { Box, Typography, Grid, Tooltip, LinearProgress, Chip } from '@mui/material';
import { usePortfolio } from '../hooks/usePortfolio';
import { SKILL_ICONS, DEFAULT_SKILL_ICON } from '../utils/skillIcons';
import { skillCategories, groupByCategory } from '../data/skillsData';
import { cardTiltSx, iconGlowSx } from '../utils/hoverEffects';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

const SkillCard = memo(function SkillCard({ skill, color }) {
  const Icon = SKILL_ICONS[skill.icon] ?? DEFAULT_SKILL_ICON;
  const [ref, inView] = useInView(0.3);
  const animatedLevel = useCountUp(skill.level, inView, 1100);

  return (
    <Tooltip title={skill.description} arrow placement="top">
      <Box
        ref={ref}
        tabIndex={0}
        sx={{
          p: 2.5,
          backgroundColor: 'var(--color-bg-primary)',
          borderRadius: '12px',
          border: '1px solid var(--color-border-light)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          ...cardTiltSx,
        }}
      >
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon sx={{ color, fontSize: 22, ...iconGlowSx(color) }} />
            <Typography sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {skill.name}
            </Typography>
          </Box>
          <Chip
            label={`${animatedLevel}%`}
            size="small"
            sx={{
              backgroundColor: color,
              color: 'var(--color-text-on-color)',
              fontWeight: 700,
              fontSize: '0.7rem',
              height: 20,
              fontVariantNumeric: 'tabular-nums',
            }}
          />
        </Box>
        <LinearProgress
          variant="determinate"
          value={animatedLevel}
          aria-label={`${skill.name} 숙련도 ${animatedLevel}%`}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'var(--color-border-light)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
              borderRadius: 4,
              transition: 'transform 0.1s linear',
            },
          }}
        />
      </Box>
    </Tooltip>
  );
});

export default function AboutMeSkills() {
  const { aboutMeData } = usePortfolio();
  const { skills } = aboutMeData;

  const groupedSkills = useMemo(() => groupByCategory(skills), [skills]);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--color-text-primary)', mb: 3 }}>
        Skills
      </Typography>

      {groupedSkills.map(({ category, skills: categorySkills }) => {
        const color = skillCategories[category]?.color ?? 'var(--color-primary)';

        return (
          <Box key={category} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {category}
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              {categorySkills.map((skill) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={skill.id}>
                  <SkillCard skill={skill} color={color} />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
}
