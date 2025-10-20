import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import {
  Edit,
  Delete,
  ContentCopy,
  Visibility,
} from '@mui/icons-material';

interface ItemMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onDuplicate: (e: React.MouseEvent) => void;
  onVisibility: (e: React.MouseEvent) => void;
  mode: string;
}

const ItemMenu: React.FC<ItemMenuProps> = ({
  anchorEl,
  onClose,
  onEdit,
  onDelete,
  onDuplicate,
  onVisibility,
  mode,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      disableAutoFocusItem
      disableRestoreFocus
      disableEnforceFocus
      slotProps={{
        paper: {
          onClick: (e: React.MouseEvent) => e.stopPropagation(),
        },
      }}
      PaperProps={{
        sx: {
          background: mode === 'dark'
            ? 'rgba(30, 30, 30, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          minWidth: 160,
        },
      }}
    >
      <MenuItem onClick={onEdit}>
        <Edit fontSize="small" sx={{ mr: 1 }} />
        Edit
      </MenuItem>
      <MenuItem onClick={onDuplicate}>
        <ContentCopy fontSize="small" sx={{ mr: 1 }} />
        Duplicate
      </MenuItem>
      <MenuItem onClick={onVisibility}>
        <Visibility fontSize="small" sx={{ mr: 1 }} />
        Visibility
      </MenuItem>
      <MenuItem
        onClick={onDelete}
        sx={{
          color: '#ef4444',
          '&:hover': {
            background: mode === 'dark'
              ? 'rgba(239, 68, 68, 0.1)'
              : 'rgba(239, 68, 68, 0.05)',
          },
        }}
      >
        <Delete fontSize="small" sx={{ mr: 1 }} />
        Delete
      </MenuItem>
    </Menu>
  );
};

export default ItemMenu;