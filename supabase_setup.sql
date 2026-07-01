-- =============================================
-- Projects 테이블 생성 및 초기 데이터 설정
-- Supabase SQL Editor에서 실행하세요
-- =============================================

-- 1. projects 테이블 생성
CREATE TABLE IF NOT EXISTS projects (
  id           SERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT,
  tech_stack   TEXT[] DEFAULT '{}',
  detail_url   TEXT,
  thumbnail_url TEXT,
  github_url   TEXT,
  is_published BOOLEAN DEFAULT true,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Row Level Security 활성화
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3. 공개 읽기 정책 (누구나 is_published=true 프로젝트 조회 가능)
CREATE POLICY "Public read published projects"
  ON projects
  FOR SELECT
  USING (is_published = true);

-- 4. updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 5. 초기 프로젝트 데이터 삽입
INSERT INTO projects (title, description, tech_stack, detail_url, thumbnail_url, github_url, is_published, sort_order)
VALUES
(
  '크로스핏 커뮤니티',
  'Supabase와 React로 구현한 크로스핏 커뮤니티 플랫폼',
  ARRAY['React', 'Supabase', 'PostgreSQL', 'CSS3'],
  'https://computerbusan-bit.github.io/crossfit-ground',
  'https://image.thum.io/get/https://computerbusan-bit.github.io/crossfit-ground',
  'https://github.com/computerbusan-bit/crossfit-ground',
  true,
  1
),
(
  '부산 역사 여행 웹앱',
  '모바일 퍼스트로 설계한 소셜 미디어 웹앱',
  ARRAY['React', 'Supabase', 'Unsplash API', 'MUI'],
  'https://computerbusan-bit.github.io/mini-sns',
  'https://image.thum.io/get/https://computerbusan-bit.github.io/mini-sns',
  'https://github.com/computerbusan-bit/mini-sns',
  true,
  2
);
