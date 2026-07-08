import { useEffect, useState } from 'react';

const TYPE_SPEED = 90;
const DELETE_SPEED = 45;
const PAUSE_FULL = 1800; // 단어를 다 쓴 뒤 지우기 전까지 멈춰있는 시간
const PAUSE_EMPTY = 400; // 다 지운 뒤 다음 단어 타이핑 시작 전 여백

// words를 순서대로 타이핑 → 잠시 멈춤 → 지움 → 다음 단어로 무한 반복한다.
// setTimeout을 재귀적으로 걸어서 타이핑/삭제/멈춤마다 다른 리듬(속도)을 줄 수 있게 했다
// (setInterval은 고정 주기라 이 세 가지 리듬을 한 타이머로 표현하기 어렵다).
// paused가 true인 동안은 현재 상태 그대로 멈춘다.
export function useRoleTypewriter(words, { paused = false, reduced = false } = {}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(reduced ? words[0] ?? '' : '');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    if (reduced || paused || words.length === 0) return undefined;

    const currentWord = words[wordIndex % words.length];
    let timeoutId;

    if (phase === 'typing') {
      if (text.length < currentWord.length) {
        timeoutId = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), TYPE_SPEED);
      } else {
        timeoutId = setTimeout(() => setPhase('deleting'), PAUSE_FULL);
      }
    } else {
      if (text.length > 0) {
        timeoutId = setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED);
      } else {
        timeoutId = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase('typing');
        }, PAUSE_EMPTY);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [text, phase, wordIndex, words, paused, reduced]);

  return { text, isDeleting: phase === 'deleting' };
}
