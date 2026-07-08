import { useContext } from 'react';
import { ThemeModeContext } from '../context/themeModeContextInstance';

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode은 ThemeModeProvider 내부에서만 사용할 수 있어요.');
  }
  return context;
}
