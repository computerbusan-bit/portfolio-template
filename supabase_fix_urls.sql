-- 크로스핏 커뮤니티: crossfit-ground(없음) → my-community(실제 레포)
UPDATE projects
SET
  detail_url    = 'https://computerbusan-bit.github.io/my-community/',
  thumbnail_url = 'https://image.thum.io/get/width/600/crop/600/https://computerbusan-bit.github.io/my-community/',
  github_url    = 'https://github.com/computerbusan-bit/my-community'
WHERE id = 1;

-- 부산 역사 여행 웹앱: 트레일링 슬래시 추가
UPDATE projects
SET
  detail_url    = 'https://computerbusan-bit.github.io/mini-sns/',
  thumbnail_url = 'https://image.thum.io/get/width/600/crop/600/https://computerbusan-bit.github.io/mini-sns/',
  github_url    = 'https://github.com/computerbusan-bit/mini-sns'
WHERE id = 2;
