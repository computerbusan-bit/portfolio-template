import { useEffect, useRef, useState } from 'react';

// active가 true가 되는 순간부터 0에서 target까지 requestAnimationFrame으로 부드럽게 센다.
// target이 나중에 바뀌면(예: 비동기로 받아온 값) 그 값까지 다시 애니메이션한다.
export function useCountUp(target, active, duration = 1200) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;

    const startValue = 0;
    const startTime = performance.now();

    const tick = (now) => {
      // rAF 콜백에 오는 now가 첫 프레임에 한해 performance.now()보다 미세하게 앞설 수 있어
      // clamp 없이는 progress가 아주 살짝 음수가 될 수 있다(음수 LinearProgress value로 이어짐).
      const progress = Math.min(1, Math.max(0, (now - startTime) / duration));
      const eased = 1 - (1 - progress) ** 3; // ease-out cubic
      setValue(Math.round(startValue + (target - startValue) * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [active, target, duration]);

  return value;
}
