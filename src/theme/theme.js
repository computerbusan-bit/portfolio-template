import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { HOVER_CAPABLE } from '../utils/hoverEffects';

const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    success: colors.success,
    background: colors.background,
    text: colors.text,
    custom: colors.custom,
  },
  typography: {
    fontFamily: "'Roboto', 'Noto Sans KR', sans-serif",
    h1: { fontSize: '3rem',   fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.3 },
    h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '1.375rem', fontWeight: 600 },
    body1: { fontSize: '1rem',    lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    button: { fontWeight: 600, letterSpacing: '0.04em' },
  },
  shape: { borderRadius: 8 },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        // transform/그림자처럼 색과 무관한 효과는 여기서 공통 처리한다.
        // 그라데이션처럼 버튼마다 색이 다른 효과는 각 컴포넌트가 직접 backgroundImage로 얹는다
        // (여기서 일괄 적용하면 버튼별 고유 배경색을 덮어써버린다).
        root: {
          textTransform: 'none',
          borderRadius: '6px',
          padding: '10px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          willChange: 'transform, box-shadow',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
          [HOVER_CAPABLE]: {
            '&:hover': {
              transform: 'perspective(1400px) rotateX(2deg) translateY(-2px)',
            },
          },
          // 키보드 포커스는 마우스 유무와 무관하게 항상 같은 피드백을 준다
          '&:focus-visible': {
            transform: 'perspective(1400px) rotateX(2deg) translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0) scale(0.98)',
          },
        },
        containedPrimary: {
          backgroundColor: 'var(--color-button-primary)',
          color: 'var(--color-button-primary-text)',
          [HOVER_CAPABLE]: {
            '&:hover': {
              backgroundColor: 'var(--color-button-hover)',
              boxShadow: '0 4px 12px rgba(224,92,42,0.35)',
            },
          },
          '&:focus-visible': {
            backgroundColor: 'var(--color-button-hover)',
            boxShadow: '0 4px 12px rgba(224,92,42,0.35)',
          },
          '&:active': {
            backgroundColor: 'var(--color-button-hover)',
          },
        },
        outlinedPrimary: {
          borderColor: 'var(--color-button-primary)',
          color: 'var(--color-button-primary)',
          borderWidth: '2px',
          [HOVER_CAPABLE]: {
            '&:hover': {
              backgroundColor: 'var(--color-button-hover)',
              borderColor: 'var(--color-button-hover)',
              color: 'var(--color-text-on-color)',
              borderWidth: '2px',
            },
          },
          '&:focus-visible': {
            backgroundColor: 'var(--color-button-hover)',
            borderColor: 'var(--color-button-hover)',
            color: 'var(--color-text-on-color)',
          },
          '&:active': {
            backgroundColor: 'var(--color-button-hover)',
            borderColor: 'var(--color-button-hover)',
            color: 'var(--color-text-on-color)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--color-bg-primary)',
          color: 'var(--color-text-primary)',
          boxShadow: '0 1px 0 var(--color-border-light)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          borderRadius: '12px',
        },
      },
    },
  },
});

export default theme;
