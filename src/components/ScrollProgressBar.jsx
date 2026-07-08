import { Box } from '@mui/material';
import { useScrollProgress } from '../hooks/useScrollProgress';

// width가 아니라 transform: scaleX로 그려서 매 스크롤마다 레이아웃 재계산 없이 GPU에서 처리한다.
export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 3,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          transformOrigin: 'left',
          transform: `scaleX(${progress})`,
          backgroundColor: 'var(--color-primary)',
          transition: 'transform 0.1s linear',
        }}
      />
    </Box>
  );
}
