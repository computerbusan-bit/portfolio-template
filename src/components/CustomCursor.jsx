import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { POINTER_FINE_QUERY } from '../utils/hoverEffects';

const TRAIL_COUNT = 5;
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])';

// 실제 마우스 포인터(터치 아님)가 있고, 모션 감소를 선호하지 않는 사용자에게만
// 렌더링한다 — 조건은 항상 렌더링하되 내부에서 아무 것도 안 하는 대신, 애초에
// 렌더링하지 않아야 네이티브 커서를 절대 못 숨기는 상태가 되지 않는다(안전장치).
function checkCursorSupported() {
  return typeof window !== 'undefined'
    && window.matchMedia(POINTER_FINE_QUERY).matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function CustomCursor() {
  const [supported] = useState(checkCursorSupported);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    if (!supported) return undefined;

    document.body.classList.add('custom-cursor-active');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { ...mouse };
    const ring = { ...mouse };
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ ...mouse }));
    let hovering = false;
    let hoveredEl = null;
    let rafId = null;
    let visible = false;

    const showCursor = () => {
      if (visible) return;
      visible = true;
      [dotRef.current, ringRef.current, ...trailRefs.current].forEach((el) => {
        if (el) el.style.opacity = el === ringRef.current ? '0.7' : '1';
      });
    };

    const handleMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      showCursor();
    };

    const handleOver = (event) => {
      const target = event.target.closest(INTERACTIVE_SELECTOR);
      if (target) {
        hovering = true;
        hoveredEl = target;
      }
    };

    const handleOut = (event) => {
      const related = event.relatedTarget;
      if (hoveredEl && (!related || !hoveredEl.contains(related))) {
        hovering = false;
        hoveredEl = null;
      }
    };

    const handleLeaveWindow = () => {
      hovering = false;
      hoveredEl = null;
      visible = false;
      [dotRef.current, ringRef.current, ...trailRefs.current].forEach((el) => {
        if (el) el.style.opacity = '0';
      });
    };

    const tick = () => {
      // 자기장 효과: 인터랙티브 요소 위에서는 링의 목표 지점이 마우스가 아니라
      // 요소 중심 쪽으로 강하게 당겨진다
      let targetX = mouse.x;
      let targetY = mouse.y;
      if (hovering && hoveredEl) {
        const rect = hoveredEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        targetX = mouse.x + (cx - mouse.x) * 0.65;
        targetY = mouse.y + (cy - mouse.y) * 0.65;
      }

      dot.x += (mouse.x - dot.x) * 0.35;
      dot.y += (mouse.y - dot.y) * 0.35;
      ring.x += (targetX - ring.x) * 0.18;
      ring.y += (targetY - ring.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const scale = hovering ? 2.4 : 1;
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        if (visible) ringRef.current.style.opacity = hovering ? '1' : '0.7';
        ringRef.current.style.backgroundColor = hovering ? 'var(--color-primary)' : 'transparent';
        ringRef.current.style.mixBlendMode = hovering ? 'normal' : 'difference';
      }

      let prevX = ring.x;
      let prevY = ring.y;
      trail.forEach((point, index) => {
        point.x += (prevX - point.x) * 0.35;
        point.y += (prevY - point.y) * 0.35;
        const node = trailRefs.current[index];
        if (node) {
          const falloff = 1 - (index + 1) / (TRAIL_COUNT + 1);
          node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${falloff})`;
          if (visible) node.style.opacity = hovering ? '0' : String(0.4 * falloff);
        }
        prevX = point.x;
        prevY = point.y;
      });

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    document.addEventListener('mouseleave', handleLeaveWindow);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleLeaveWindow);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [supported]);

  if (!supported) return null;

  const baseSx = {
    position: 'fixed',
    top: 0,
    left: 0,
    borderRadius: '50%',
    pointerEvents: 'none',
    opacity: 0,
  };

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }).map((_, index) => (
        <Box
          key={index}
          ref={(el) => { trailRefs.current[index] = el; }}
          aria-hidden="true"
          sx={{
            ...baseSx,
            width: 8, height: 8,
            backgroundColor: 'var(--color-primary)',
            zIndex: 9998,
            willChange: 'transform, opacity',
            transition: 'opacity 0.2s ease',
          }}
        />
      ))}
      <Box
        ref={ringRef}
        aria-hidden="true"
        sx={{
          ...baseSx,
          width: 32, height: 32,
          border: '1.5px solid var(--color-primary)',
          zIndex: 9999,
          willChange: 'transform, opacity, background-color',
          transition: 'opacity 0.2s ease, background-color 0.25s ease',
        }}
      />
      <Box
        ref={dotRef}
        aria-hidden="true"
        sx={{
          ...baseSx,
          width: 6, height: 6,
          backgroundColor: 'var(--color-primary)',
          mixBlendMode: 'difference',
          zIndex: 9999,
          willChange: 'transform, opacity',
          transition: 'opacity 0.2s ease',
        }}
      />
    </>
  );
}
