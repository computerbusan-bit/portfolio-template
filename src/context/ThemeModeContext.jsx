import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeModeContext } from './themeModeContextInstance';

const STORAGE_KEY = 'theme';

// index.html의 인라인 스크립트가 첫 페인트 전에 이미 html[data-theme]를 붙여뒀으니,
// React는 그 값을 그대로 읽어서 시작한다(중복 로직 없이 하나의 소스로 유지).
function readInitialMode() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(readInitialMode);

  // 사용자가 수동으로 고른 적이 없으면(localStorage에 저장된 값이 없으면)
  // OS 다크모드 설정이 바뀔 때 실시간으로 따라간다. 수동으로 고른 뒤에는
  // 그 선택이 시스템 설정보다 우선한다.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = (event) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      const next = event.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      setMode(next);
    };

    media.addEventListener('change', handleSystemChange);
    return () => media.removeEventListener('change', handleSystemChange);
  }, []);

  // 다른 탭/창에서 테마를 바꾸면 storage 이벤트로 전달된다(같은 탭에서는 안 옴).
  // 이걸 안 들으면 두 탭을 열어놨을 때 한쪽만 바뀌고 다른 쪽은 이전 상태로 남는다.
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      document.documentElement.setAttribute('data-theme', event.newValue);
      setMode(event.newValue);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}
