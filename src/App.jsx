import { lazy, Suspense, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeModeProvider } from './context/ThemeModeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import CustomCursor from './components/CustomCursor';
import './styles/global.css';

const Home = lazy(() => import('./pages/Home'));
const AboutMe = lazy(() => import('./pages/AboutMe'));
const Projects = lazy(() => import('./pages/Projects'));

function RouteFallback() {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingSpinner size={44} />
    </Box>
  );
}

function AppRoutes() {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  // 페이지(경로)가 실제로 바뀔 때만 맨 위로 스크롤한다.
  // Navbar의 Contact 이동처럼 location.state.scrollTo가 있으면 Home이 직접 스크롤을 처리하므로 건너뛴다.
  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      if (!location.state?.scrollTo) {
        window.scrollTo(0, 0);
      }
      prevPathname.current = location.pathname;
    }
  }, [location.pathname, location.state]);

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeModeProvider>
        <PortfolioProvider>
          <HashRouter>
            <CustomCursor />
            <Navbar />
            <AppRoutes />
          </HashRouter>
        </PortfolioProvider>
      </ThemeModeProvider>
    </ThemeProvider>
  );
}
