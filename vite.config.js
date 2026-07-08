import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel은 루트 도메인(/)에서 서빙하지만 GitHub Pages는 저장소 이름 하위 경로
// (/portfolio-template/)에서 서빙한다. Vercel 빌드 환경엔 VERCEL 환경변수가
// 자동으로 설정되므로 이걸로 두 배포 대상을 구분한다.
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/portfolio-template/',
})
