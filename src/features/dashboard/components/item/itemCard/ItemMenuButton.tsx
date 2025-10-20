import React from 'react';
import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface ItemMenuButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  mode: string;
  layout: 'mobile' | 'desktop';
}

const ItemMenuButton: React.FC<ItemMenuButtonProps> = ({
  onClick,
  mode,
  layout,
}) => {
  if (layout === 'mobile') {
    return (
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        sx={{
          color: mode === 'dark' ? '#94a3b8' : '#64748b',
          p: 1,
          '&:hover': {
            color: mode === 'dark' ? '#ffffff' : '#1a202c',
            background: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MoreVert fontSize="small" />
      </IconButton>
    );
  }

  return (
    <IconButton
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      sx={{
        color: mode === 'dark' ? '#94a3b8' : '#64748b',
        '&:hover': {
          color: mode === 'dark' ? '#ffffff' : '#1a202c',
          background: mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <MoreVert fontSize="small" />
    </IconButton>
  );
};

export default ItemMenuButton;