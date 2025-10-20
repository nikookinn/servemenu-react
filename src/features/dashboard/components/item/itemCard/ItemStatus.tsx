import React from 'react';
import { Chip } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

interface ItemStatusProps {
  isAvailable: boolean;
  mode: string;
  layout: 'mobile' | 'desktop';
}

const ItemStatus: React.FC<ItemStatusProps> = ({ isAvailable, mode, layout }) => {
  const height = layout === 'mobile' ? 28 : 24;
  const fontSize = layout === 'mobile' ? '0.75rem' : '0.75rem';

  return (
    <Chip
      icon={isAvailable ? <CheckCircle /> : <Cancel />}
      label={isAvailable ? 'Available' : 'Unavailable'}
      size="small"
      sx={{
        height: height,
        fontSize: fontSize,
        ...(layout === 'desktop' && {
          width: '100%',
          minWidth: { md: 80, lg: 100 },
        }),
        background: isAvailable
          ? mode === 'dark'
            ? 'rgba(34, 197, 94, 0.2)'
            : 'rgba(34, 197, 94, 0.1)'
          : mode === 'dark'
            ? 'rgba(239, 68, 68, 0.2)'
            : 'rgba(239, 68, 68, 0.1)',
        color: isAvailable ? '#22c55e' : '#ef4444',
        border: `1px solid ${isAvailable ? '#22c55e' : '#ef4444'}`,
        '& .MuiChip-icon': {
          fontSize: '0.875rem',
          color: isAvailable ? '#22c55e' : '#ef4444',
        },
      }}
    />
  );
};

export default ItemStatus;