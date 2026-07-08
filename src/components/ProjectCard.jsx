import { useState } from 'react';
import {
  Box, Card, CardContent, CardMedia,
  Typography, Button, Chip, Skeleton,
} from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import { STATIC_THUMBNAILS, LIVE_DEMO_URLS } from '../data/projectOverrides';
import { HOVER_CAPABLE, gradientSweepBg } from '../utils/hoverEffects';

export function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);
  const thumbnailUrl = STATIC_THUMBNAILS[project.id] || project.thumbnail_url || null;
  const demoUrl = LIVE_DEMO_URLS[project.id] || project.detail_url;

  return (
    <Card sx={{
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid var(--color-border-light)',
      borderRadius: '14px',
      overflow: 'hidden',
      willChange: 'transform, box-shadow',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      [HOVER_CAPABLE]: {
        '&:hover': {
          transform: 'perspective(2200px) rotateX(1.5deg) translateY(-6px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.14)',
        },
      },
      '&:focus-within': {
        transform: 'perspective(2200px) rotateX(1.5deg) translateY(-6px)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.14)',
      },
      '&:active': {
        transform: 'perspective(1000px) translateY(-2px) scale(0.995)',
      },
    }}>
      {/* 썸네일 — 실제 스크린샷 비율(1280x800 = 8:5)에 맞춤. 호버/탭 시 확대 + 필터 + 정보 오버레이 */}
      <Box sx={{
        width: '100%',
        position: 'relative',
        paddingTop: '62.5%',
        overflow: 'hidden',
        bgcolor: 'var(--color-bg-secondary)',
        flexShrink: 0,
        [HOVER_CAPABLE]: {
          '&:hover .pc-thumb-img': { transform: 'scale(1.08)', filter: 'brightness(0.92) saturate(1.15)' },
          '&:hover .pc-thumb-overlay': { opacity: 1, transform: 'translateY(0)' },
        },
        '&:active .pc-thumb-img': { transform: 'scale(1.08)', filter: 'brightness(0.92) saturate(1.15)' },
        '&:active .pc-thumb-overlay': { opacity: 1, transform: 'translateY(0)' },
      }}>
        {!imgError ? (
          <>
            <CardMedia
              component="img"
              className="pc-thumb-img"
              image={thumbnailUrl}
              alt={project.title}
              loading="lazy"
              onError={() => setImgError(true)}
              sx={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                willChange: 'transform, filter',
                transition: 'transform 0.4s ease, filter 0.4s ease',
              }}
            />
            {/* 정보 오버레이 — 평소엔 숨어있다가 호버/탭 시 아래에서 올라오며 나타남 */}
            <Box
              className="pc-thumb-overlay"
              aria-hidden="true"
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'flex-end',
                background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0) 60%)',
                opacity: 0,
                transform: 'translateY(6px)',
                willChange: 'opacity, transform',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                p: 2,
                pointerEvents: 'none',
              }}
            >
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>
                자세히 보기 →
              </Typography>
            </Box>
          </>
        ) : (
          <Box sx={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            bgcolor: 'var(--color-accent-teal)',
          }}>
            <FolderOpenRoundedIcon sx={{ fontSize: 64, color: '#fff', opacity: 0.85 }} />
          </Box>
        )}
      </Box>

      {/* 카드 내용 */}
      <CardContent sx={{
        flex: 1,
        display: 'flex', flexDirection: 'column', gap: 1.5,
        p: 2.5,
        '&:last-child': { pb: 2.5 },
      }}>
        {/* 제목 — 항상 2줄 높이 확보(1줄이어도 아래 요소 위치 고정) */}
        <Typography sx={{
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          fontSize: '1rem',
          lineHeight: 1.4,
          minHeight: '2.8em',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {project.title}
        </Typography>

        {/* 한 줄 설명 */}
        <Typography variant="body2" sx={{
          color: 'var(--color-text-muted)',
          lineHeight: 1.65,
          minHeight: '3.3em',
          flex: 1,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {project.description}
        </Typography>

        {/* 기술 스택 뱃지 — 최대 4개 + 나머지는 +N 표시로 항상 한 줄 높이 유지 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, minHeight: 22 }}>
          {project.tech_stack?.slice(0, 4).map(tech => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                bgcolor: 'var(--color-bg-secondary)',
                color: 'var(--color-text-secondary)',
                fontSize: '0.7rem',
                fontWeight: 600,
                border: '1px solid var(--color-border-warm)',
                height: 22,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          ))}
          {project.tech_stack?.length > 4 && (
            <Chip
              label={`+${project.tech_stack.length - 4}`}
              size="small"
              sx={{
                bgcolor: 'var(--color-bg-secondary)',
                color: 'var(--color-text-muted)',
                fontSize: '0.7rem',
                fontWeight: 600,
                border: '1px solid var(--color-border-warm)',
                height: 22,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          )}
        </Box>

        {/* 버튼 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
          {project.detail_url && (
            <Button
              component="a"
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="small"
              endIcon={<OpenInNewRoundedIcon sx={{ fontSize: '0.8rem !important' }} />}
              sx={{
                flex: '1 1 110px',
                fontSize: '0.78rem',
                py: 0.8,
                whiteSpace: 'nowrap',
                ...gradientSweepBg('var(--color-primary)', 'var(--color-primary-dark)'),
                color: '#fff',
                boxShadow: 'none',
                willChange: 'transform, box-shadow, background-position',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-position 0.5s ease',
                [HOVER_CAPABLE]: {
                  '&:hover': {
                    backgroundPosition: '100% 0%',
                    boxShadow: '0 4px 12px rgba(224,92,42,0.35)',
                  },
                },
                '&:focus-visible': {
                  backgroundPosition: '100% 0%',
                  boxShadow: '0 4px 12px rgba(224,92,42,0.35)',
                },
                '&:active': {
                  backgroundPosition: '100% 0%',
                  transform: 'scale(0.97)',
                },
              }}
            >
              Live Demo
            </Button>
          )}
          {project.github_url && (
            <Button
              component="a"
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
              startIcon={<GitHubIcon sx={{ fontSize: '0.85rem !important' }} />}
              sx={{
                flex: '1 1 110px',
                fontSize: '0.78rem',
                py: 0.8,
                whiteSpace: 'nowrap',
                borderColor: 'var(--color-border-strong)',
                color: 'var(--color-text-primary)',
                borderWidth: '1.5px',
                willChange: 'transform, background-color, color',
                transition: 'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease',
                [HOVER_CAPABLE]: {
                  '&:hover': {
                    bgcolor: 'var(--color-text-primary)',
                    color: '#fff',
                    borderColor: 'var(--color-text-primary)',
                    boxShadow: 'none',
                    transform: 'translateY(-2px)',
                  },
                },
                '&:focus-visible': {
                  bgcolor: 'var(--color-text-primary)',
                  color: '#fff',
                  borderColor: 'var(--color-text-primary)',
                },
                '&:active': {
                  bgcolor: 'var(--color-text-primary)',
                  color: '#fff',
                  transform: 'scale(0.97)',
                },
              }}
            >
              GitHub
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export function ProjectCardSkeleton() {
  return (
    <Card sx={{
      border: '1px solid var(--color-border-light)',
      borderRadius: '14px',
      overflow: 'hidden',
    }}>
      <Box sx={{ width: '100%', paddingTop: '62.5%', position: 'relative' }}>
        <Skeleton
          variant="rectangular"
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </Box>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Skeleton variant="text" width="65%" height={24} />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          <Skeleton variant="rounded" width={56} height={22} sx={{ borderRadius: '11px' }} />
          <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: '11px' }} />
          <Skeleton variant="rounded" width={48} height={22} sx={{ borderRadius: '11px' }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton variant="rounded" height={34} sx={{ flex: 1, borderRadius: '6px' }} />
          <Skeleton variant="rounded" height={34} sx={{ flex: 1, borderRadius: '6px' }} />
        </Box>
      </CardContent>
    </Card>
  );
}
