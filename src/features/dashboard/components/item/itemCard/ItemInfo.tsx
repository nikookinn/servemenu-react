import React from 'react';
import { Box, Typography } from '@mui/material';
import { VisibilitySettings } from '../../visibility/VisibilitySettingsPage';
import VisibilityIcon from '../../visibility/VisibilityIcon';

interface ItemInfoProps {
  name: string;
  description?: string;
  mode: string;
  layout: 'mobile' | 'desktop';
  visibilitySettings?: VisibilitySettings;
}

const ItemInfo: React.FC<ItemInfoProps> = ({ name, description, mode, layout, visibilitySettings }) => {
  if (layout === 'mobile') {
    return (
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: mode === 'dark' ? '#ffffff' : '#1a202c',
              fontSize: '1.1rem',
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </Typography>
          <VisibilityIcon 
            visibilitySettings={visibilitySettings} 
            fontSize="1.1rem"
          />
        </Box>
        {description && (
          <Typography
            variant="body2"
            sx={{
              color: mode === 'dark' ? '#94a3b8' : '#64748b',
              fontSize: '0.8rem',
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, minWidth: 0, mr: { md: 0.5, lg: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: mode === 'dark' ? '#ffffff' : '#1a202c',
            fontSize: { md: '0.9rem', lg: '1rem' },
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </Typography>
        <VisibilityIcon 
          visibilitySettings={visibilitySettings} 
          fontSize={{ md: '0.9rem', lg: '1rem' }}
        />
      </Box>
      {description && (
        <Typography
          variant="body2"
          sx={{
            color: mode === 'dark' ? '#94a3b8' : '#64748b',
            fontSize: '0.875rem',
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ItemInfo;