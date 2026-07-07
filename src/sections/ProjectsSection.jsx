import { useState, useEffect } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ProjectCard, ProjectCardSkeleton } from '../components/ProjectCard';

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .limit(3);
      setProjects(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Box
      component="section"
      id="projects"
      sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'var(--color-bg-primary)' }}
    >
      <Container maxWidth="lg">
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Box sx={{
            display: 'inline-block',
            px: 2, py: 0.5, mb: 2,
            backgroundColor: 'var(--color-accent-teal)',
            borderRadius: '20px',
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
            color: '#FFFFFF',
          }}>
            PROJECTS
          </Box>
          <Typography variant="h2" sx={{
            color: 'var(--color-text-primary)',
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.25rem' },
            borderBottom: '3px solid var(--color-secondary)',
            display: 'inline-block', pb: 0.5,
            lineHeight: 1.3,
          }}>
            대표 프로젝트
          </Typography>
          <Typography variant="body1" sx={{
            color: 'var(--color-text-muted)', mt: 2,
          }}>
            직접 설계하고 구현한 프로젝트들을 소개합니다.
          </Typography>
        </Box>

        {/* 카드 그리드 — 데스크톱 3열 / 태블릿 2열 / 모바일 1열 (CSS Grid: 각 열이 항상 균등한 폭을 보장) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
            mb: 6,
          }}
        >
          {loading ? (
            [0, 1, 2].map(i => <ProjectCardSkeleton key={i} />)
          ) : projects.length === 0 ? (
            <Box sx={{
              gridColumn: '1 / -1',
              textAlign: 'center', py: 10,
              color: 'var(--color-text-muted)',
            }}>
              <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>🗂️</Typography>
              <Typography variant="body1">프로젝트를 준비 중입니다.</Typography>
            </Box>
          ) : (
            projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </Box>

        {/* 더 보기 버튼 */}
        {!loading && projects.length > 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={Link}
              to="/projects"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
                borderWidth: '2px',
                px: 4,
                '&:hover': {
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  borderWidth: '2px',
                },
              }}
            >
              전체 프로젝트 더 보기 →
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
