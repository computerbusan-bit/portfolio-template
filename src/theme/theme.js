import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main:  '#E05C2A',
      light: '#EA8255',
      dark:  '#B84620',
      contrastText: '#1A1A1A',
    },
    secondary: {
      main:  '#F2C038',
      light: '#F7D46A',
      dark:  '#C99A1E',
      contrastText: '#1A1A1A',
    },
    error:   { main: '#C04538' },
    success: { main: '#5A9A88' },
    background: {
      default: '#FFFFFF',
      paper:   '#F9F5EE',
    },
    text: {
      primary:   '#1A1A1A',
      secondary: '#2D2D2D',
      disabled:  '#5A5A5A',
    },
    // 커스텀 토큰
    custom: {
      accentPink:   '#E8899A',
      accentBlue:   '#A8CCE0',
      accentTeal:   '#5A9A88',
      accentPurple: '#C4A8CE',
      accentOlive:  '#CDCF78',
      terracotta:   '#C04538',
      offWhite:     '#F9F5EE',
      borderLight:  '#D4D4D4',
      borderWarm:   '#E0C090',
    },
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
        root: {
          textTransform: 'none',
          borderRadius: '6px',
          padding: '10px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          backgroundColor: '#1A1A1A',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#E05C2A',
            boxShadow: '0 4px 12px rgba(224,92,42,0.35)',
          },
        },
        outlinedPrimary: {
          borderColor: '#1A1A1A',
          color: '#1A1A1A',
          borderWidth: '2px',
          '&:hover': {
            backgroundColor: '#E05C2A',
            borderColor: '#E05C2A',
            color: '#1A1A1A',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1A1A1A',
          boxShadow: '0 1px 0 #D4D4D4',
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
