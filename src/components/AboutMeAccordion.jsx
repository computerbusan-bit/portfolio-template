import { useState } from 'react';
import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails, Chip,
  IconButton, TextField, Button, Fade, Snackbar, Alert,
} from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

const sectionIcons = {
  'dev-story': MenuBookRoundedIcon,
  philosophy: WorkRoundedIcon,
  personal: SchoolRoundedIcon,
};

export default function AboutMeAccordion({
  sections, showHomeBadge = false, editable = false, onUpdateContent,
}) {
  const [expanded, setExpanded] = useState(sections[0]?.id ?? false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const handleChange = (panelId) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panelId : false);
  };

  const startEditing = (event, section) => {
    event.stopPropagation();
    setEditingId(section.id);
    setDraft(section.content);
    setExpanded(section.id);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setDraft('');
  };

  const saveEditing = (section) => {
    if (!draft.trim()) return;
    onUpdateContent?.(section.id, draft.trim());
    setEditingId(null);
    setDraft('');
    setSavedMessage(`"${section.title}" 내용이 저장됐어요.`);
  };

  const isDraftEmpty = editingId !== null && !draft.trim();

  return (
    <Box>
      {sections.map((section) => {
        const Icon = sectionIcons[section.id] ?? MenuBookRoundedIcon;
        const isEditing = editingId === section.id;
        return (
          <Accordion
            key={section.id}
            expanded={expanded === section.id}
            onChange={handleChange(section.id)}
            disableGutters
            sx={{
              mb: 2,
              border: '1px solid var(--color-border-light)',
              borderRadius: '12px !important',
              overflow: 'hidden',
              '&:before': { display: 'none' },
              boxShadow: 'none',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRoundedIcon sx={{ color: 'var(--color-text-primary)' }} />}
              sx={{
                px: { xs: 2, md: 3 },
                py: 1,
                '& .MuiAccordionSummary-content': {
                  display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap',
                },
              }}
            >
              <Icon sx={{ color: 'var(--color-primary)' }} />
              <Typography sx={{
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}>
                {section.title}
              </Typography>
              {showHomeBadge && section.showInHome && (
                <Chip
                  label="홈에도 표시"
                  size="small"
                  sx={{
                    bgcolor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    border: '1px solid var(--color-border-warm)',
                    height: 22,
                  }}
                />
              )}
              {editable && (
                <IconButton
                  size="small"
                  onClick={(event) => startEditing(event, section)}
                  sx={{ ml: 'auto', color: 'var(--color-text-secondary)' }}
                  aria-label={`${section.title} 내용 수정`}
                >
                  <EditRoundedIcon fontSize="small" />
                </IconButton>
              )}
            </AccordionSummary>
            <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pb: 3 }}>
              {isEditing ? (
                <Fade in={isEditing}>
                  <Box>
                    <TextField
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      multiline
                      minRows={4}
                      fullWidth
                      autoFocus
                      error={isDraftEmpty}
                      helperText={isDraftEmpty ? '내용을 입력해주세요.' : ' '}
                      label={`${section.title} 내용`}
                      aria-label={`${section.title} 내용 수정 입력란`}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
                      <Button onClick={cancelEditing}>취소</Button>
                      <Button
                        variant="contained"
                        onClick={() => saveEditing(section)}
                        disabled={isDraftEmpty}
                      >
                        저장
                      </Button>
                    </Box>
                  </Box>
                </Fade>
              ) : (
                <Typography
                  variant="body1"
                  aria-live="polite"
                  sx={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.9,
                  }}
                >
                  {section.content}
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}

      <Snackbar
        open={Boolean(savedMessage)}
        autoHideDuration={2500}
        onClose={() => setSavedMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSavedMessage('')}>
          {savedMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
