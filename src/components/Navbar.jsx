import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Box,
  IconButton, Drawer, List, ListItem, ListItemText,
  useMediaQuery,
} from '@mui/material';
import { MOBILE_QUERY } from '../utils/breakpoints';
import { useScrollHeader } from '../hooks/useScrollHeader';
import ScrollProgressBar from './ScrollProgressBar';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'About Me',   path: '/about' },
  { label: 'Projects',   path: '/projects' },
];

// 3줄 아이콘 ↔ X 아이콘으로 전환되는 햄버거 버튼
function HamburgerIcon({ open }) {
  const bar = {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 2,
    borderRadius: 1,
    backgroundColor: 'var(--color-text-primary)',
    transition: 'transform 0.25s ease, opacity 0.25s ease',
  };

  return (
    <Box sx={{ position: 'relative', width: 22, height: 16 }}>
      <Box sx={{ ...bar, top: 0, transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
      <Box sx={{ ...bar, top: 7, opacity: open ? 0 : 1 }} />
      <Box sx={{ ...bar, top: 14, transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
    </Box>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { hidden, scrolled, sentinelRef } = useScrollHeader();

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // Contact는 별도 라우트가 아니라 홈 화면의 섹션이라, 홈이면 바로 스크롤하고
  // 다른 페이지면 홈으로 이동한 뒤 Home 컴포넌트가 location.state를 보고 스크롤한다.
  const goToContact = () => {
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: 'contact' } });
    }
  };

  // 이미 홈에 있는데 Home을 다시 누르면 라우팅은 아무것도 안 하니, 맨 위로 스무스 스크롤한다.
  const handleNavClick = (path) => (event) => {
    if (path === '/' && location.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 스크롤 위치 감지용 sentinel — 문서 맨 위에서만 보이고, 스크롤하면 뷰포트 밖으로 빠진다 */}
      <Box ref={sentinelRef} sx={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1 }} />
      <ScrollProgressBar />
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: scrolled
            ? '0 4px 16px rgba(0,0,0,0.1)'
            : '0 1px 0 var(--color-border-light)',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          {/* 로고 */}
          <Typography
            component={Link}
            to="/"
            onClick={handleNavClick('/')}
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

          <Box sx={{ mr: isMobile ? 1.5 : 2 }}>
            <ThemeToggle />
          </Box>

          {/* 데스크탑 메뉴 */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {NAV_LINKS.map(({ label, path }) => (
                <Box
                  key={path}
                  component={Link}
                  to={path}
                  onClick={handleNavClick(path)}
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
              <Box
                component="button"
                type="button"
                onClick={goToContact}
                sx={{
                  px: 2,
                  py: 1,
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  color: 'var(--color-text-primary)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  borderBottom: '2px solid transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'var(--color-primary)',
                    backgroundColor: 'rgba(224,92,42,0.06)',
                  },
                }}
              >
                Contact
              </Box>
            </Box>
          )}

          {/* 모바일 햄버거 */}
          {isMobile && (
            <>
              <IconButton
                onClick={() => setDrawerOpen((prev) => !prev)}
                aria-label={drawerOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={drawerOpen}
              >
                <HamburgerIcon open={drawerOpen} />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List sx={{ width: 220, pt: 3 }}>
                  {NAV_LINKS.map(({ label, path }) => (
                    <ListItem
                      key={path}
                      component={Link}
                      to={path}
                      onClick={(event) => { handleNavClick(path)(event); setDrawerOpen(false); }}
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
                  <ListItem
                    component="button"
                    type="button"
                    onClick={() => { setDrawerOpen(false); goToContact(); }}
                    sx={{
                      width: '100%',
                      border: 'none',
                      borderLeft: '3px solid transparent',
                      backgroundColor: 'transparent',
                      color: 'var(--color-text-primary)',
                      fontWeight: 400,
                      fontFamily: 'inherit',
                      fontSize: '1rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <ListItemText primary="Contact" />
                  </ListItem>
                </List>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
