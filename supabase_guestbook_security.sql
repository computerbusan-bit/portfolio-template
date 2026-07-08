-- =============================================
-- 방명록 삭제 보안 강화
-- Supabase SQL Editor에서 실행하세요
--
-- 문제: 기존에는 삭제 비밀번호를 프론트엔드(JS 번들)에서 비교했기 때문에
--       개발자도구로 번들을 열어보면 비밀번호가 그대로 노출되고,
--       anon key로 테이블에 직접 DELETE 요청을 보내면 비밀번호 확인 자체를 우회할 수 있었습니다.
--
-- 해결: 비밀번호 검증을 이 함수(서버, Postgres) 안에서만 수행하고,
--       anon 역할은 테이블에 직접 DELETE 할 권한을 아예 갖지 않도록 합니다.
--       클라이언트는 이 함수(RPC)만 호출할 수 있고, 비밀번호 원문은 함수 밖으로 나가지 않습니다.
--
-- 주의: id 컬럼 타입이 uuid라면 아래 BIGINT를 UUID로 바꿔주세요.
--       (Table Editor에서 guestbook 테이블의 id 컬럼 타입을 확인해보세요)
-- =============================================

-- 1. anon 역할이 테이블에 직접 DELETE 하지 못하도록 차단
REVOKE DELETE ON guestbook FROM anon;

-- 2. 혹시 남아있을 수 있는 공개 DELETE 정책 제거 (정책 이름은 실제와 다를 수 있음 — 없으면 무시됨)
DROP POLICY IF EXISTS "Public delete guestbook" ON guestbook;
DROP POLICY IF EXISTS "Enable delete for all users" ON guestbook;
DROP POLICY IF EXISTS "Enable delete for anon" ON guestbook;

-- 3. 비밀번호를 서버에서만 비교하는 삭제 함수
--    SECURITY DEFINER: 함수를 만든 소유자 권한으로 실행되므로,
--    anon에게 테이블 DELETE 권한이 없어도 이 함수 내부에서는 삭제가 가능합니다.
--    비밀번호가 일치할 때만 실제 삭제를 수행합니다.
CREATE OR REPLACE FUNCTION delete_guestbook_entry(entry_id BIGINT, input_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF input_password IS DISTINCT FROM 'hami2026' THEN
    RETURN FALSE;
  END IF;

  DELETE FROM guestbook WHERE id = entry_id;
  RETURN FOUND;
END;
$$;

-- 4. anon 역할에는 "이 함수를 호출할 권한"만 부여 (테이블 직접 접근은 여전히 불가)
GRANT EXECUTE ON FUNCTION delete_guestbook_entry(BIGINT, TEXT) TO anon;
