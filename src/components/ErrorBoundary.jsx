import { Component } from 'react';
import { Box, Typography, Button } from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          role="alert"
          sx={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            textAlign: 'center',
            px: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--color-text-primary)' }}>
            문제가 발생했어요
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)' }}>
            페이지를 새로고침하면 다시 정상적으로 볼 수 있어요.
          </Typography>
          <Button
            variant="contained"
            startIcon={<RefreshRoundedIcon />}
            onClick={() => window.location.reload()}
            sx={{
              backgroundColor: 'var(--color-button-primary)',
              color: 'var(--color-button-primary-text)',
              '&:hover': { backgroundColor: 'var(--color-button-hover)' },
            }}
          >
            새로고침
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
