import { Box } from '@mui/material';

// MUI CircularProgress 대신 브랜드 컬러 2색을 쓰는 커스텀 스피너
export default function LoadingSpinner({ size = 40, thickness = 4, color = 'var(--color-primary)', trackColor = 'var(--color-border-light)' }) {
  return (
    <Box
      role="status"
      aria-label="로딩 중"
      sx={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${thickness}px solid ${trackColor}`,
        borderTopColor: color,
        borderRightColor: color,
        animation: 'lspin 0.85s linear infinite',
        '@keyframes lspin': {
          to: { transform: 'rotate(360deg)' },
        },
      }}
    />
  );
}
