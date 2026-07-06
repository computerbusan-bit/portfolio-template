import { useState } from 'react';
import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails, Chip,
} from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

const sectionIcons = {
  'dev-story': MenuBookRoundedIcon,
  philosophy: WorkRoundedIcon,
  personal: SchoolRoundedIcon,
};

export default function AboutMeAccordion({ sections, showHomeBadge = false }) {
  const [expanded, setExpanded] = useState(sections[0]?.id ?? false);

  const handleChange = (panelId) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panelId : false);
  };

  return (
    <Box>
      {sections.map((section) => {
        const Icon = sectionIcons[section.id] ?? MenuBookRoundedIcon;
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
            </AccordionSummary>
            <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pb: 3 }}>
              <Typography variant="body1" sx={{
                color: 'var(--color-text-secondary)',
                lineHeight: 1.9,
              }}>
                {section.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
