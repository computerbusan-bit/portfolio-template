import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Box,
  IconButton, Drawer, List, ListItem, ListItemText,
  useMediaQuery, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'About Me',   path: '/about' },
  { label: 'Projects',   path: '/projects' },
];

export default function Navbar() {
  const location = useLocation();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
        {/* 로고 */}
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            fontWeight: 800,
            color: 'var(--color-primary)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            flexGrow: 1,
          }}
        >
          MY PORTFOLIO
        </Typography>

        {/* 데스크탑 메뉴 */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {NAV_LINKS.map(({ label, path }) => (
              <Box
                key={path}
                component={Link}
                to={path}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: '6px',
                  fontWeight: isActive(path) ? 700 : 500,
                  fontSize: '0.95rem',
                  color: isActive(path)
                    ? 'var(--color-primary)'
                    : 'var(--color-text-primary)',
                  textDecoration: 'none',
                  borderBottom: isActive(path)
                    ? '2px solid var(--color-primary)'
                    : '2px solid transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'var(--color-primary)',
                    backgroundColor: 'rgba(224,92,42,0.06)',
                  },
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        )}

        {/* 모바일 햄버거 */}
        {isMobile && (
          <>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'var(--color-text-primary)' }}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <List sx={{ width: 220, pt: 3 }}>
                {NAV_LINKS.map(({ label, path }) => (
                  <ListItem
                    key={path}
                    component={Link}
                    to={path}
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      color: isActive(path) ? 'var(--color-primary)' : 'var(--color-text-primary)',
                      fontWeight: isActive(path) ? 700 : 400,
                      textDecoration: 'none',
                      borderLeft: isActive(path)
                        ? '3px solid var(--color-primary)'
                        : '3px solid transparent',
                    }}
                  >
                    <ListItemText primary={label} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
