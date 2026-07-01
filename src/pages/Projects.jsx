import { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { supabase } from '../lib/supabase';
import { ProjectCard, ProjectCardSkeleton } from '../components/ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });
      setProjects(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: 'var(--color-bg-primary)',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        {/* 페이지 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{
            display: 'inline-block',
            px: 2, py: 0.5, mb: 2,
            backgroundColor: 'var(--color-accent-teal)',
            borderRadius: '20px',
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
            color: '#FFFFFF',
          }}>
            ALL PROJECTS
          </Box>
          <Typography variant="h2" sx={{
            color: 'var(--color-text-primary)',
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            borderBottom: '3px solid var(--color-secondary)',
            display: 'inline-block', pb: 0.5,
            lineHeight: 1.3,
          }}>
            전체 프로젝트
          </Typography>
          <Typography variant="body1" sx={{
            color: 'var(--color-text-muted)', mt: 2,
          }}>
            {loading
              ? '프로젝트를 불러오는 중...'
              : `총 ${projects.length}개의 프로젝트`}
          </Typography>
        </Box>

        {/* 카드 그리드 — 데스크톱 3열 / 태블릿 2열 / 모바일 1열 */}
        <Grid container spacing={3}>
          {loading ? (
            [0, 1, 2, 3, 4, 5].map(i => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <ProjectCardSkeleton />
              </Grid>
            ))
          ) : projects.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{
                textAlign: 'center', py: 14,
                bgcolor: 'var(--color-bg-secondary)',
                borderRadius: '20px',
                border: '1px dashed var(--color-border-warm)',
              }}>
                <Typography sx={{ fontSize: '3rem', mb: 2 }}>🗂️</Typography>
                <Typography variant="h4" sx={{
                  color: 'var(--color-text-primary)', fontWeight: 700, mb: 1,
                }}>
                  프로젝트 준비 중
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--color-text-muted)' }}>
                  곧 멋진 프로젝트들을 소개할게요!
                </Typography>
              </Box>
            </Grid>
          ) : (
            projects.map(project => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
}
