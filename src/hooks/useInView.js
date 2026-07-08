import { useEffect, useRef, useState } from 'react';

// 요소가 뷰포트에 들어오면 true로 바뀌는 스크롤 트리거. 한 번 보이고 나면
// 다시 관찰하지 않는다 — 스킬 바/카운터가 스크롤을 오갈 때마다 반복 재생되면
// 오히려 산만해지므로 최초 1회만 애니메이션한다.
export function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return [ref, inView];
}
