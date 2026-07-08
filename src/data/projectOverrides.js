// Supabase projects 테이블의 값을 프론트엔드에서 보정하기 위한 예외 테이블 (project.id 기준).
// 근거: 커밋 d30050c — image.thum.io 스크린샷 서비스가 느리고 불안정해서
// 실제 스크린샷 대신 public/thumbnails의 정적 이미지를 우선 사용하도록 했다.

// id → public/thumbnails의 정적 스크린샷. DB의 thumbnail_url(썸네일 생성 서비스)보다 우선한다.
export const STATIC_THUMBNAILS = {
  1: `${import.meta.env.BASE_URL}thumbnails/crossfit.png`,
  2: `${import.meta.env.BASE_URL}thumbnails/busan.png`,
};

// id → 올바른 Live Demo URL. DB의 detail_url 값이 잘못됐을 경우를 대비한 보정값.
export const LIVE_DEMO_URLS = {
  2: 'https://computerbusan-bit.github.io/hami-first-website/',
};
