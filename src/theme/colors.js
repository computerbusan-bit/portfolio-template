// 라이트 모드 기준 색상 리터럴의 단일 출처 — MUI 테마(theme.js)가 내부 색상 연산
// (리플, 호버 오버레이 등)에 쓰려면 CSS 변수가 아닌 실제 hex 값이 필요해서 여기 따로 둔다.
//
// 이 값을 바꾸면 src/styles/variables.css의 :root(라이트 모드) 블록도 같은 값으로 맞춰야 한다.
// 반대로 다크모드/모바일/고대비 같은 런타임 전환은 variables.css의 CSS 커스텀 프로퍼티가
// 전담하고, 대부분의 컴포넌트는 theme.palette가 아니라 var(--color-*)를 직접 참조한다.
export const colors = {
  primary: { main: '#E05C2A', light: '#EA8255', dark: '#B84620', contrastText: '#1A1A1A' },
  secondary: { main: '#F2C038', light: '#F7D46A', dark: '#C99A1E', contrastText: '#1A1A1A' },
  error: { main: '#C04538' },
  success: { main: '#5A9A88' },
  // CssBaseline이 body 배경/기본 배경으로 그대로 꽂아 쓰는 값이라 리터럴 hex가 아니어도
  // 안전하다(리플/오버레이처럼 alpha() 등으로 색을 연산하는 곳이 아님) — CSS 변수로 두면
  // 다크모드 토글 시 body 배경이 항상 흰색으로 고정되는 문제를 막을 수 있다.
  background: { default: 'var(--color-bg-primary)', paper: 'var(--color-bg-secondary)' },
  text: { primary: '#1A1A1A', secondary: '#2D2D2D', disabled: '#5A5A5A' },
  custom: {
    accentPink: '#E8899A',
    accentBlue: '#A8CCE0',
    accentTeal: '#5A9A88',
    accentPurple: '#C4A8CE',
    accentOlive: '#CDCF78',
    terracotta: '#C04538',
    offWhite: '#F9F5EE',
    borderLight: '#D4D4D4',
    borderWarm: '#E0C090',
  },
};
