import { Box, Typography, Container, Grid, TextField, Button, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function ContactSection() {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'var(--color-bg-terracotta)' }}
    >
      <Container maxWidth="md">
        {/* 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Box sx={{
            display: 'inline-block',
            px: 2, py: 0.5, mb: 2,
            backgroundColor: 'var(--color-secondary)',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'var(--color-text-on-color)',
          }}>
            CONTACT SECTION
          </Box>

          <Typography variant="h2" sx={{
            color: 'var(--color-text-on-dark)',
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.25rem' },
          }}>
            여기는 Contact 섹션입니다.
          </Typography>

          <Typography variant="body1" sx={{
            color: 'var(--color-text-on-dark)',
            opacity: 0.8,
            mt: 1.5,
          }}>
            연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
          </Typography>
        </Box>

        <Grid container spacing={5} justifyContent="center">
          {/* SNS 링크 */}
          <Grid item xs={12} sm={4}>
            <Box sx={{
              p: 3,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center',
            }}>
              <Typography variant="h6" sx={{ color: 'var(--color-text-on-dark)', mb: 2, fontWeight: 700 }}>
                SNS & 연락처
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton sx={{
                  color: 'var(--color-text-on-dark)',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  '&:hover': { backgroundColor: 'var(--color-secondary)' },
                }}>
                  <GitHubIcon />
                </IconButton>
                <IconButton sx={{
                  color: 'var(--color-text-on-dark)',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  '&:hover': { backgroundColor: 'var(--color-secondary)' },
                }}>
                  <LinkedInIcon />
                </IconButton>
                <IconButton sx={{
                  color: 'var(--color-text-on-dark)',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  '&:hover': { backgroundColor: 'var(--color-secondary)' },
                }}>
                  <EmailIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* 메시지 폼 */}
          <Grid item xs={12} sm={8}>
            <Box
              component="form"
              onSubmit={(e) => e.preventDefault()}
              sx={{
                p: 3,
                backgroundColor: 'var(--color-bg-primary)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{
                color: 'var(--color-text-primary)', fontWeight: 700,
              }}>
                메시지 보내기
              </Typography>
              <TextField
                placeholder="이름"
                size="small"
                fullWidth
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
              <TextField
                placeholder="이메일"
                size="small"
                fullWidth
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
              <TextField
                placeholder="메시지 내용이 들어갈 예정입니다."
                multiline
                rows={3}
                fullWidth
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: 'var(--color-button-primary)',
                  color: 'var(--color-button-primary-text)',
                  '&:hover': { backgroundColor: 'var(--color-button-hover)' },
                }}
              >
                메시지 전송
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
