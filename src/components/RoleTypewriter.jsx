import { useState } from 'react';
import { Box } from '@mui/material';
import { useRoleTypewriter } from '../hooks/useRoleTypewriter';

// 타이핑 중인 글자 하나하나가 각자 팝인(페이드+스케일) 애니메이션으로 등장하고,
// 텍스트 전체는 움직이는 그라데이션으로 채워진다(background-clip: text).
// 마우스를 올리면 일시정지, 벗어나면 재생을 이어간다.
export default function RoleTypewriter({ words, sx = {} }) {
  const [paused, setPaused] = useState(false);
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const { text, isDeleting } = useRoleTypewriter(words, { paused, reduced });

  return (
    <Box
      component="span"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{ display: 'inline-flex', alignItems: 'center', cursor: 'default', ...sx }}
    >
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          backgroundImage: 'linear-gradient(90deg, var(--color-secondary), var(--color-secondary-light), var(--color-accent-pink), var(--color-secondary))',
          backgroundSize: '300% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          animation: reduced ? 'none' : 'roleGradientShift 4s linear infinite',
          '@keyframes roleGradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '100%': { backgroundPosition: '300% 50%' },
          },
        }}
      >
        {text.split('').map((char, index) => (
          <Box
            key={index}
            component="span"
            sx={{
              display: 'inline-block',
              animation: reduced || isDeleting ? 'none' : 'roleLetterPop 0.28s ease',
              '@keyframes roleLetterPop': {
                '0%': { opacity: 0, transform: 'translateY(10px) scale(0.7)' },
                '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
              },
            }}
          >
            {char}
          </Box>
        ))}
      </Box>
      <Box
        component="span"
        aria-hidden="true"
        sx={{
          display: 'inline-block',
          width: '3px',
          ml: '2px',
          height: '0.85em',
          backgroundColor: 'var(--color-secondary)',
          opacity: reduced ? 0 : 1,
          animation: reduced ? 'none' : 'roleCursorBlink 0.8s step-end infinite',
          '@keyframes roleCursorBlink': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0 },
          },
        }}
      />
    </Box>
  );
}
