import { useEffect, useRef } from 'react';

// 스크롤 위치에 요소를 직접 연동시키는 훅.
// React state를 거치지 않고 ref.style.setProperty()로 CSS 커스텀 프로퍼티를 직접 갱신한다 —
// 매 스크롤 프레임마다 리렌더링이 일어나지 않고, 실제 화면 반영은 CSS(transform)가 담당한다.
//
// 엘리먼트에 다음 두 값을 심는다:
//  --reveal-progress : 0(뷰포트 아래에서 막 들어옴) ~ 1(뷰포트 위로 막 빠져나감)
//  --parallax-offset : 뷰포트 중앙 기준 요소 위치 × speed (패럴렉스용 오프셋, px 단위 숫자)
export function useScrollLinked({ speed = 0 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let ticking = false;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportH = window.innerHeight;

      const progress = Math.min(1, Math.max(0, (viewportH - rect.top) / (viewportH + rect.height)));
      node.style.setProperty('--reveal-progress', progress.toFixed(3));

      if (speed !== 0) {
        const centerOffset = rect.top + rect.height / 2 - viewportH / 2;
        node.style.setProperty('--parallax-offset', (centerOffset * speed).toFixed(2));
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return ref;
}
