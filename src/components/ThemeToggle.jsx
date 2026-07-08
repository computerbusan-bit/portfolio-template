import { Box } from '@mui/material';
import { useThemeMode } from '../hooks/useThemeMode';

const RAY_ANGLES = [0, 45, 90, 135];

// 트랙(알약 모양) + 그 안에서 좌우로 슬라이드하는 원(썬/문 바디).
// 다크모드로 갈수록: 광선이 사라지고, 오른쪽 위에서 트랙과 같은 색의 원이
// 겹쳐 들어와 초승달 모양으로 깎아낸다 — 아이콘을 교체하는 대신 하나의
// 모양이 다른 모양으로 "모핑"되도록 만든 것.
export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <Box
      component="button"
      type="button"
      onClick={toggleMode}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={isDark}
      sx={{
        position: 'relative',
        width: 46,
        height: 26,
        p: 0,
        border: 'none',
        borderRadius: '13px',
        cursor: 'pointer',
        backgroundColor: isDark ? '#2A1E14' : '#F2C038',
        transition: 'background-color 0.4s ease',
        flexShrink: 0,
      }}
    >
      {/* 슬라이딩 바디 */}
      <Box
        sx={{
          position: 'absolute',
          top: 3,
          left: isDark ? 'calc(100% - 3px - 20px)' : 3,
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: isDark ? '#E8E2D6' : '#FFF7E0',
          transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.4s ease',
          overflow: 'visible',
        }}
      >
        {/* 광선 (라이트 모드에서만 보임) */}
        {RAY_ANGLES.map((angle) => (
          <Box
            key={angle}
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 26,
              height: 2,
              borderRadius: 1,
              backgroundColor: '#F2C038',
              transformOrigin: 'center',
              transform: `translate(-50%, -50%) rotate(${angle}deg) scale(${isDark ? 0 : 1})`,
              opacity: isDark ? 0 : 1,
              transition: 'transform 0.35s ease, opacity 0.3s ease',
            }}
          />
        ))}
        {/* 초승달을 만드는 마스크 원 — 다크모드일 때 트랙과 같은 색으로 겹쳐 들어온다 */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            width: 15,
            height: 15,
            borderRadius: '50%',
            backgroundColor: '#2A1E14',
            top: isDark ? -3 : 6,
            right: isDark ? -3 : -18,
            opacity: isDark ? 1 : 0,
            transition: 'top 0.4s ease, right 0.4s ease, opacity 0.3s ease, background-color 0.4s ease',
          }}
        />
      </Box>
    </Box>
  );
}
