import { useEffect, useRef, useState } from 'react';

// 최상단 근처에서는 살짝만 스크롤해도 헤더가 숨었다 나타났다 떨리는 걸 방지하기 위한 여유값
const HIDE_THRESHOLD = 80;

// 스크롤 방향에 따라 헤더를 숨기고(hidden), 맨 위를 벗어났는지(scrolled)를 감지한다.
// 방향 감지는 IntersectionObserver만으로 판단할 수 없어 scrollY 비교가 필요하고,
// "맨 위를 벗어났는가"는 sentinelRef에 붙인 엘리먼트를 IntersectionObserver로 관찰해 판단한다.
export function useScrollHeader() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const goingDown = currentY > lastScrollY.current;
        setHidden(currentY < HIDE_THRESHOLD ? false : goingDown);
        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { hidden, scrolled, sentinelRef };
}
