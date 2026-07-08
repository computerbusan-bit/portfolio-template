import { Box } from '@mui/material';
import { useInView } from '../hooks/useInView';

const OFFSETS = {
  up: 'translate3d(0, 28px, 0)',
  down: 'translate3d(0, -28px, 0)',
  left: 'translate3d(28px, 0, 0)',
  right: 'translate3d(-28px, 0, 0)',
};

// 요소가 뷰포트에 들어오면 페이드인 + 슬라이드로 등장한다. 리스트를 순차 등장시키려면
// index * 간격만큼 delay를 줘서 쓰면 된다.
export default function ScrollReveal({
  children, direction = 'up', delay = 0, duration = 600, threshold = 0.15, sx = {},
}) {
  const [ref, inView] = useInView(threshold);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : OFFSETS[direction],
        willChange: 'opacity, transform',
        transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
