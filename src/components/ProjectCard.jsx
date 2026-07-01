import { useState } from 'react';
import {
  Box, Card, CardContent, CardMedia,
  Typography, Button, Chip, Skeleton,
} from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';

export function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);
  const thumbnailUrl = project.thumbnail_url
    || `https://image.thum.io/get/${project.detail_url}`;

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid var(--color-border-light)',
      borderRadius: '14px',
      overflow: 'hidden',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.14)',
      },
    }}>
      {/* 썸네일 — 1:1 비율 */}
      <Box sx={{
        position: 'relative',
        paddingTop: '100%',
        overflow: 'hidden',
        bgcolor: 'var(--color-bg-secondary)',
        flexShrink: 0,
      }}>
        {!imgError ? (
          <CardMedia
            component="img"
            image={thumbnailUrl}
            alt={project.title}
            onError={() => setImgError(true)}
            sx={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.04)' },
            }}
          />
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
        {/* 제목 */}
        <Typography sx={{
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          fontSize: '1rem',
          lineHeight: 1.4,
        }}>
          {project.title}
        </Typography>

        {/* 한 줄 설명 */}
        <Typography variant="body2" sx={{
          color: 'var(--color-text-muted)',
          lineHeight: 1.65,
          flex: 1,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {project.description}
        </Typography>

        {/* 기술 스택 뱃지 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {project.tech_stack?.map(tech => (
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
        </Box>

        {/* 버튼 */}
        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
          {project.detail_url && (
            <Button
              component="a"
              href={project.detail_url}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="small"
              endIcon={<OpenInNewRoundedIcon sx={{ fontSize: '0.8rem !important' }} />}
              sx={{
                flex: 1,
                fontSize: '0.78rem',
                py: 0.8,
                bgcolor: 'var(--color-primary)',
                color: '#fff',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'var(--color-primary-dark)',
                  boxShadow: '0 4px 12px rgba(224,92,42,0.35)',
                },
                transition: 'all 0.2s ease',
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
                flex: 1,
                fontSize: '0.78rem',
                py: 0.8,
                borderColor: 'var(--color-border-strong)',
                color: 'var(--color-text-primary)',
                borderWidth: '1.5px',
                '&:hover': {
                  bgcolor: 'var(--color-text-primary)',
                  color: '#fff',
                  borderColor: 'var(--color-text-primary)',
                  boxShadow: 'none',
                },
                transition: 'all 0.2s ease',
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
      <Box sx={{ paddingTop: '100%', position: 'relative' }}>
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
