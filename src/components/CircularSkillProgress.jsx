import { Box } from '@mui/material';
import { useCountUp } from '../hooks/useCountUp';

// SVG 원형 프로그레스 — stroke-dasharray/dashoffset으로 링을 채우고,
// 같은 rAF 카운터 값을 중앙 아이콘 아래 숫자와 링 양쪽에 동시에 반영한다.
export default function CircularSkillProgress({
  level, color, active, size = 64, strokeWidth = 4, icon: Icon,
}) {
  const animatedLevel = useCountUp(level, active, 1200);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - animatedLevel / 100);

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="var(--color-border-light)" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.15s linear' }}
        />
      </svg>
      <Box sx={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon sx={{ fontSize: size * 0.4, color }} />
      </Box>
    </Box>
  );
}
