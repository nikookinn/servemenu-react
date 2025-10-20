import React from 'react';
import { Box } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import { DragControls } from 'framer-motion';

interface ItemDragHandleProps {
  dragControls?: DragControls;
  onDragActiveChange: (active: boolean) => void;
  mode: string;
  layout: 'mobile' | 'desktop';
}

const ItemDragHandle: React.FC<ItemDragHandleProps> = ({
  dragControls,
  onDragActiveChange,
  mode,
  layout,
}) => {
  if (!dragControls) {
    return null;
  }

  if (layout === 'mobile') {
    return null; // Handle zaten ItemControls'a dahil
  }

  return (
    <Box
      onPointerDown={(event: React.PointerEvent) => {
        event.stopPropagation();
        onDragActiveChange(true);
        dragControls.start(event);
      }}
      onPointerUp={() => {
        setTimeout(() => onDragActiveChange(false), 100);
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mr: { md: 1.5, lg: 2 },
        cursor: 'grab',
        touchAction: 'none',
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <DragIndicator
        sx={{
          color: mode === 'dark' ? '#64748b' : '#94a3b8',
          fontSize: '1.2rem',
          '&:hover': {
            color: mode === 'dark' ? '#94a3b8' : '#64748b',
          },
        }}
      />
    </Box>
  );
};

export default ItemDragHandle;