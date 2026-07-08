import { useState, useEffect } from 'react';
import {
  Box, Typography, Container, TextField, Button,
  IconButton, Skeleton, Snackbar, Alert, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { supabase } from '../lib/supabase';
import { socialLinks } from '../data/socialLinks';
import { SOCIAL_ICONS } from '../utils/socialIcons';
import { HOVER_CAPABLE, gradientSweepBg } from '../utils/hoverEffects';
import LoadingSpinner from '../components/LoadingSpinner';
import ScrollReveal from '../components/ScrollReveal';

// 방명록 로딩 중 표시할 스켈레톤 — 실제 항목(이모지+이름+메시지) 모양을 그대로 흉내낸다
function GuestbookEntrySkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: 2, p: { xs: 2, sm: 2.5 }, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.06)' }}>
      <Skeleton variant="circular" width={44} height={44} sx={{ bgcolor: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
      <Box flex={1}>
        <Skeleton variant="text" width="35%" height={22} sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
        <Skeleton variant="text" width="90%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
        <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      </Box>
    </Box>
  );
}

const EMOJI_OPTIONS = ['👋', '😊', '🔥', '💪', '✨', '🚀', '🌟', '💡'];

const INITIAL_FORM = { name: '', message: '', email: '', organization: '', emoji: '👋' };

// 삭제 비밀번호 다이얼로그 — 비밀번호 검증은 서버(Supabase RPC)에서만 이뤄짐
function DeleteDialog({ open, onClose, onConfirm }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!pw || submitting) return;
    setSubmitting(true);
    const success = await onConfirm(pw);
    setSubmitting(false);
    if (success) {
      setPw(''); setError(false);
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setPw(''); setError(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
        <LockRoundedIcon sx={{ color: 'var(--color-primary)', fontSize: 20 }} />
        관리자 확인
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          방명록을 삭제하려면 관리자 비밀번호를 입력하세요.
        </Typography>
        <TextField
          label="비밀번호"
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false); }}
          onKeyDown={e => e.key === 'Enter' && handleConfirm()}
          fullWidth
          size="small"
          autoFocus
          disabled={submitting}
          error={error}
          helperText={error ? '비밀번호가 올바르지 않습니다.' : ''}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={handleClose} sx={{ color: 'text.secondary' }} disabled={submitting}>취소</Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={!pw || submitting}
        >
          {submitting ? '확인 중...' : '삭제'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function GuestbookEntry({ entry, onDelete }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const date = new Date(entry.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          display: 'flex',
          gap: 2,
          p: { xs: 2, sm: 2.5 },
          borderRadius: '12px',
          bgcolor: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          transition: 'background 0.2s',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
          position: 'relative',
        }}
      >
        {/* 이모지 */}
        <Box
          sx={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            bgcolor: 'rgba(242,192,56,0.2)', border: '2px solid rgba(242,192,56,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem',
          }}
        >
          {entry.emoji}
        </Box>

        <Box flex={1} minWidth={0}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'baseline', mb: 0.5, pr: 4 }}>
            <Typography fontWeight={700} sx={{ color: '#fff', fontSize: '0.95rem' }}>
              {entry.name}
            </Typography>
            {entry.organization && (
              <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem' }}>
                {entry.organization}
              </Typography>
            )}
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', ml: 'auto' }}>
              {date}
            </Typography>
          </Box>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.85)', fontSize: { xs: '0.88rem', sm: '0.92rem' },
              lineHeight: 1.65, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}
          >
            {entry.message}
          </Typography>
        </Box>

        {/* 삭제 버튼 */}
        <Tooltip title="삭제" placement="top">
          <IconButton
            size="small"
            onClick={() => setDialogOpen(true)}
            sx={{
              position: 'absolute', top: 8, right: 8,
              color: 'rgba(255,255,255,0.35)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.2s, color 0.2s',
              '&:hover': { color: '#ff6b6b', bgcolor: 'rgba(255,107,107,0.12)' },
            }}
          >
            <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <DeleteDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={async (password) => {
          const success = await onDelete(entry.id, password);
          if (success) setDialogOpen(false);
          return success;
        }}
      />
    </>
  );
}

export default function ContactSection() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchEntries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('guestbook')
      .select('id, name, message, organization, emoji, created_at')
      .order('created_at', { ascending: false })
      .limit(20);
    setEntries(data || []);
    setLoading(false);
  };

  useEffect(() => {
    const load = async () => { await fetchEntries(); };
    load();
  }, []);

  // 비밀번호 검증은 Supabase 함수(delete_guestbook_entry)가 서버에서 수행 — 클라이언트는 결과만 받음
  const handleDelete = async (id, password) => {
    const { data, error } = await supabase.rpc('delete_guestbook_entry', {
      entry_id: id,
      input_password: password,
    });
    if (error) {
      setSnackbar({ open: true, message: '삭제에 실패했습니다.', severity: 'error' });
      return false;
    }
    if (!data) {
      // 비밀번호 불일치 — 다이얼로그에서 자체적으로 에러 표시
      return false;
    }
    setSnackbar({ open: true, message: '방명록이 삭제됐습니다.', severity: 'info' });
    setEntries(prev => prev.filter(e => e.id !== id));
    return true;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from('guestbook').insert({
      name: form.name.trim(),
      message: form.message.trim(),
      email: form.email.trim() || null,
      organization: form.organization.trim() || null,
      emoji: form.emoji,
    });
    if (error) {
      setSnackbar({ open: true, message: '등록에 실패했습니다. 다시 시도해주세요.', severity: 'error' });
    } else {
      setSnackbar({ open: true, message: '방명록이 등록됐어요! 감사합니다 🎉', severity: 'success' });
      setForm(INITIAL_FORM);
      await fetchEntries();
    }
    setSubmitting(false);
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'var(--color-bg-terracotta)' }}
    >
      <Container maxWidth="md">

        {/* 섹션 헤더 */}
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Box sx={{
              display: 'inline-block', px: 2, py: 0.5, mb: 2,
              bgcolor: 'rgba(242,192,56,0.25)', borderRadius: '20px',
              fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
              color: '#F2C038', border: '1px solid rgba(242,192,56,0.4)',
            }}>
              GET IN TOUCH
            </Box>
            <Typography variant="h2" sx={{
              color: '#fff', fontWeight: 800,
              fontSize: { xs: '1.9rem', md: '2.5rem' }, lineHeight: 1.2, mb: 1.5,
            }}>
              안녕하세요, 반가워요! 👋
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.95rem', sm: '1.05rem' } }}>
              언제든지 연락주세요. 방명록에 흔적을 남겨주셔도 좋아요.
            </Typography>
          </Box>
        </ScrollReveal>

        {/* ── 연락처 카드 영역 ── */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: { xs: 6, md: 8 } }}>
          {/* 이메일 카드 */}
          <Box sx={{
            flex: 1, p: { xs: 2.5, sm: 3 }, borderRadius: '16px',
            bgcolor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', gap: 2,
          }}>
            <Box sx={{
              width: 48, height: 48, borderRadius: '12px', flexShrink: 0,
              bgcolor: 'rgba(242,192,56,0.2)', border: '1px solid rgba(242,192,56,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <EmailIcon sx={{ color: '#F2C038', fontSize: 22 }} />
            </Box>
            <Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', mb: 0.25 }}>
                EMAIL
              </Typography>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '0.88rem', sm: '0.95rem' } }}>
                computer.busan@gmail.com
              </Typography>
            </Box>
          </Box>

          {/* SNS 카드 */}
          <Box sx={{
            p: { xs: 2.5, sm: 3 }, borderRadius: '16px',
            bgcolor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1.5,
          }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em' }}>
              SOCIAL
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
              {socialLinks.map(({ id, icon, label, href }) => {
                const Icon = SOCIAL_ICONS[icon];
                return (
                  <Tooltip key={id} title={label} placement="top">
                    <IconButton
                      component="a"
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={label}
                      sx={{
                        color: '#fff', bgcolor: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        width: 44, height: 44, borderRadius: '10px',
                        '&:hover': { bgcolor: '#F2C038', color: '#1A1A1A', borderColor: '#F2C038' },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Icon />
                    </IconButton>
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* ── 방명록 영역 ── */}
        <Box>
          {/* 방명록 헤더 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{ width: 4, height: 28, borderRadius: 2, bgcolor: '#F2C038', flexShrink: 0 }} />
            <Typography variant="h4" fontWeight={700} sx={{ color: '#fff', fontSize: { xs: '1.2rem', sm: '1.4rem' } }}>
              방명록
            </Typography>
            <Box sx={{
              ml: 1, px: 1.5, py: 0.25, borderRadius: '20px',
              bgcolor: 'rgba(242,192,56,0.2)', border: '1px solid rgba(242,192,56,0.3)',
            }}>
              <Typography sx={{ color: '#F2C038', fontSize: '0.78rem', fontWeight: 700 }}>
                {entries.length}개
              </Typography>
            </Box>
          </Box>

          {/* 방명록 목록 */}
          <Box
            sx={{
              mb: 4,
              maxHeight: entries.length > 3 ? 360 : 'none',
              overflowY: entries.length > 3 ? 'auto' : 'visible',
              pr: entries.length > 3 ? 0.5 : 0,
              display: 'flex', flexDirection: 'column', gap: 2,
              '&::-webkit-scrollbar': { width: 4 },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2 },
            }}
          >
            {loading ? (
              <>
                <GuestbookEntrySkeleton />
                <GuestbookEntrySkeleton />
                <GuestbookEntrySkeleton />
              </>
            ) : entries.length === 0 ? (
              <Box sx={{
                textAlign: 'center', py: 6, borderRadius: '16px',
                bgcolor: 'rgba(255,255,255,0.06)', border: '1px dashed rgba(255,255,255,0.2)',
              }}>
                <Typography sx={{ fontSize: '2rem', mb: 1 }}>✍️</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                  아직 방명록이 없어요. 첫 번째로 남겨보세요!
                </Typography>
              </Box>
            ) : (
              entries.map(entry => (
                <GuestbookEntry key={entry.id} entry={entry} onDelete={handleDelete} />
              ))
            )}
          </Box>

          {/* 방명록 작성 폼 */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: '20px', bgcolor: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ color: 'var(--color-text-primary)', mb: 3, fontSize: '1.05rem' }}>
              ✍️ 방명록 남기기
            </Typography>

            {/* 이모지 선택 */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', mb: 1.5, letterSpacing: '0.05em' }}>
                이모지 선택
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>
                {EMOJI_OPTIONS.map(emoji => (
                  <Box
                    key={emoji}
                    onClick={() => setForm(p => ({ ...p, emoji }))}
                    sx={{
                      width: 44, height: 44, borderRadius: '10px', cursor: 'pointer',
                      fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '2px solid',
                      borderColor: form.emoji === emoji ? 'var(--color-primary)' : 'var(--color-border-light)',
                      bgcolor: form.emoji === emoji ? 'rgba(224,92,42,0.08)' : 'transparent',
                      transition: 'all 0.15s ease',
                      '&:hover': { borderColor: 'var(--color-primary)', transform: 'scale(1.1)' },
                    }}
                  >
                    {emoji}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* 이름 + 소속 */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
              <TextField name="name" label="이름 *" value={form.name} onChange={handleChange} required fullWidth size="small" />
              <TextField name="organization" label="소속/직업 (선택)" value={form.organization} onChange={handleChange} fullWidth size="small" placeholder="회사, 학교 등" />
            </Box>

            {/* 이메일 */}
            <TextField
              name="email" label="이메일 (선택, 비공개)" value={form.email}
              onChange={handleChange} type="email" fullWidth size="small"
              sx={{ mb: 2 }} helperText="이메일은 공개되지 않습니다"
            />

            {/* 메시지 */}
            <TextField
              name="message" label="메시지 *" value={form.message}
              onChange={handleChange} required fullWidth multiline rows={3} sx={{ mb: 3 }}
              placeholder="안녕하세요! 방문 기념으로 한 마디 남겨주세요 😊"
              slotProps={{ htmlInput: { maxLength: 500 } }}
              helperText={`${form.message.length} / 500`}
            />

            <Button
              type="submit" variant="contained" fullWidth
              disabled={!form.name.trim() || !form.message.trim() || submitting}
              endIcon={submitting ? <LoadingSpinner size={16} thickness={2} color="#fff" trackColor="rgba(255,255,255,0.3)" /> : <SendRoundedIcon />}
              sx={{
                py: 1.5, fontWeight: 700, fontSize: '0.95rem',
                ...gradientSweepBg('var(--color-bg-terracotta)', '#A83B2F'),
                color: '#fff',
                willChange: 'transform, background-position',
                transition: 'transform 0.2s ease, background-position 0.5s ease',
                [HOVER_CAPABLE]: {
                  '&:hover': { backgroundPosition: '100% 0%' },
                },
                '&:focus-visible': { backgroundPosition: '100% 0%' },
                '&:active': { backgroundPosition: '100% 0%', transform: 'scale(0.98)' },
                '&:disabled': { backgroundImage: 'none', bgcolor: 'rgba(192,69,56,0.3)', color: 'rgba(255,255,255,0.5)' },
              }}
            >
              {submitting ? '등록 중...' : '방명록 남기기'}
            </Button>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(p => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar(p => ({ ...p, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
