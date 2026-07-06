import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box, Typography, Grid, Tooltip, LinearProgress, Chip, Button, IconButton, Slider,
  Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, TextField, Snackbar, Alert,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { usePortfolio } from '../hooks/usePortfolio';
import { SKILL_ICONS, DEFAULT_SKILL_ICON } from '../utils/skillIcons';
import {
  availableSkills,
  skillCategories,
  groupByCategory,
} from '../data/skillsData';

function AnimatedProgress({ value, color }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <LinearProgress
      variant="determinate"
      value={displayValue}
      aria-label="숙련도"
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: 'var(--color-border-light)',
        '& .MuiLinearProgress-bar': {
          backgroundColor: color,
          borderRadius: 4,
          transition: 'transform 1s ease-in-out',
        },
      }}
    />
  );
}

const SkillCard = memo(function SkillCard({
  skill, color, isEditing, onToggleEdit, onLevelChange, onLevelCommit,
}) {
  const Icon = SKILL_ICONS[skill.icon] ?? DEFAULT_SKILL_ICON;

  return (
    <Tooltip title={skill.description} arrow placement="top" disableHoverListener={isEditing}>
      <Box sx={{
        p: 2.5,
        backgroundColor: 'var(--color-bg-primary)',
        borderRadius: '12px',
        border: '1px solid var(--color-border-light)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        },
      }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon sx={{ color, fontSize: 22 }} />
            <Typography sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {skill.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Chip
              label={`${skill.level}%`}
              size="small"
              sx={{
                backgroundColor: color,
                color: 'var(--color-text-on-color)',
                fontWeight: 700,
                fontSize: '0.7rem',
                height: 20,
              }}
            />
            <IconButton
              size="small"
              onClick={() => onToggleEdit(skill.id)}
              aria-label={`${skill.name} 숙련도 수정`}
              aria-pressed={isEditing}
            >
              {isEditing
                ? <CheckRoundedIcon fontSize="inherit" />
                : <EditRoundedIcon fontSize="inherit" />}
            </IconButton>
          </Box>
        </Box>
        {isEditing ? (
          <Slider
            size="small"
            value={skill.level}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            onChange={(_event, value) => onLevelChange(skill.id, value)}
            onChangeCommitted={(_event, value) => onLevelCommit(skill, value)}
            aria-label={`${skill.name} 숙련도`}
            sx={{ color }}
          />
        ) : (
          <AnimatedProgress value={skill.level} color={color} />
        )}
      </Box>
    </Tooltip>
  );
});

export default function AboutMeSkills() {
  const { aboutMeData, updateSkillLevel, addSkill } = usePortfolio();
  const { skills } = aboutMeData;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [newLevel, setNewLevel] = useState(50);
  const [editingId, setEditingId] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');

  const addedNames = useMemo(() => new Set(skills.map((skill) => skill.name)), [skills]);
  const addableSkills = useMemo(
    () => availableSkills.filter((skill) => !addedNames.has(skill.name)),
    [addedNames],
  );
  const groupedSkills = useMemo(() => groupByCategory(skills), [skills]);

  const handleAddSkill = () => {
    const skillToAdd = addableSkills.find((skill) => skill.id === Number(selectedSkillId));
    if (!skillToAdd) return;
    addSkill({ ...skillToAdd, level: newLevel });
    setDialogOpen(false);
    setSelectedSkillId('');
    setNewLevel(50);
    setSavedMessage(`${skillToAdd.name}이(가) 추가됐어요.`);
  };

  const handleToggleEdit = useCallback((id) => {
    setEditingId((prev) => (prev === id ? null : id));
  }, []);

  const handleLevelCommit = useCallback((skill, value) => {
    updateSkillLevel(skill.id, value);
    setSavedMessage(`${skill.name} 숙련도가 ${value}%로 저장됐어요.`);
  }, [updateSkillLevel]);

  return (
    <Box>
      <Box sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        mb: 3, flexWrap: 'wrap', gap: 2,
      }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--color-text-primary)' }}>
          Skills
        </Typography>
        {addableSkills.length > 0 && (
          <Button
            startIcon={<AddRoundedIcon />}
            onClick={() => setDialogOpen(true)}
            variant="outlined"
            sx={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              '&:hover': {
                borderColor: 'var(--color-primary-dark)',
                backgroundColor: 'rgba(224,92,42,0.06)',
              },
            }}
          >
            스킬 추가
          </Button>
        )}
      </Box>

      {groupedSkills.map(({ category, skills: categorySkills }) => {
        const color = skillCategories[category]?.color ?? 'var(--color-primary)';

        return (
          <Box key={category} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {category}
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              {categorySkills.map((skill) => (
                <Grid item xs={12} sm={6} md={4} key={skill.id}>
                  <SkillCard
                    skill={skill}
                    color={color}
                    isEditing={editingId === skill.id}
                    onToggleEdit={handleToggleEdit}
                    onLevelChange={updateSkillLevel}
                    onLevelCommit={handleLevelCommit}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>스킬 추가</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            select
            label="기술"
            value={selectedSkillId}
            onChange={(event) => setSelectedSkillId(event.target.value)}
            fullWidth
          >
            {addableSkills.map((skill) => (
              <MenuItem key={skill.id} value={skill.id}>{skill.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            type="number"
            label="숙련도 (%)"
            value={newLevel}
            onChange={(event) => {
              const value = Number(event.target.value);
              setNewLevel(Math.min(100, Math.max(0, Number.isNaN(value) ? 0 : value)));
            }}
            slotProps={{ htmlInput: { min: 0, max: 100 } }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>취소</Button>
          <Button onClick={handleAddSkill} disabled={!selectedSkillId} variant="contained">추가</Button>
        </DialogActions>
      </Dialog>

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
