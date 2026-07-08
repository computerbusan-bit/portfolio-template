// 호버 인터랙션 공통 유틸
//
// 터치 기기는 :hover가 없거나(탭 후에도 호버 상태가 "끼는" 문제) 부정확하므로,
// 호버 전용 효과는 실제 마우스 등 정밀 포인터가 있을 때만 걸고(HOVER_CAPABLE),
// 터치 탭 피드백은 모든 기기에서 동작하는 :active로 별도 제공한다.
// 키보드 포커스(:focus-visible)는 기기와 무관하게 항상 hover와 동일한 피드백을 준다.
// sx의 중첩 키로 쓰는 형태(@media 접두사 포함)와, window.matchMedia()에 바로 넘기는 형태
// (접두사 없음)를 하나의 원본 조건에서 파생시켜 둘이 어긋나지 않게 한다.
export const POINTER_FINE_QUERY = '(hover: hover) and (pointer: fine)';
export const HOVER_CAPABLE = `@media ${POINTER_FINE_QUERY}`;

// 두 색 사이를 슬라이딩하는 그라데이션의 "기본" 배경 속성만 반환한다.
// hover 트리거(backgroundPosition: '100% 0%')는 컴포넌트가 자신의 다른 hover 효과와
// 한 블록으로 합쳐서 직접 적용한다 — 그래야 같은 &:hover를 두 번 선언해서 서로 덮어쓰는
// 실수를 피할 수 있다.
export function gradientSweepBg(colorA, colorB) {
  return {
    backgroundImage: `linear-gradient(120deg, ${colorA} 0%, ${colorB} 50%, ${colorA} 100%)`,
    backgroundSize: '220% 100%',
    backgroundPosition: '0% 0%',
  };
}

// 카드류에 쓰는 3D 틸트 + 떠오름 + 그림자 확장. 다른 hover 효과를 추가할 필요가 없는
// 카드에 통째로 스프레드해서 쓴다.
export const cardTiltSx = {
  willChange: 'transform, box-shadow',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  [HOVER_CAPABLE]: {
    '&:hover': {
      transform: 'perspective(2000px) rotateX(1.5deg) translateY(-6px)',
      boxShadow: '0 16px 36px rgba(0,0,0,0.14)',
    },
  },
  '&:focus-visible': {
    transform: 'perspective(2000px) rotateX(1.5deg) translateY(-6px)',
    boxShadow: '0 16px 36px rgba(0,0,0,0.14)',
  },
  '&:active': {
    transform: 'perspective(2000px) rotateX(0deg) translateY(-2px) scale(0.99)',
  },
};

// 기술 스택 아이콘류의 회전 + 글로우 효과. 아이콘 자체에 통째로 스프레드해서 쓴다.
export const iconGlowSx = (color) => ({
  willChange: 'transform, filter',
  transition: 'transform 0.35s ease, filter 0.35s ease',
  [HOVER_CAPABLE]: {
    '&:hover': {
      transform: 'rotate(14deg) scale(1.15)',
      filter: `drop-shadow(0 0 8px ${color})`,
    },
  },
  '&:focus-visible': {
    transform: 'rotate(14deg) scale(1.15)',
    filter: `drop-shadow(0 0 8px ${color})`,
  },
  '&:active': {
    transform: 'rotate(14deg) scale(1.08)',
    filter: `drop-shadow(0 0 6px ${color})`,
  },
});
