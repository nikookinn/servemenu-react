import React from 'react';
import { Box, Checkbox } from '@mui/material';
import { DragControls } from 'framer-motion';
import { DragIndicator } from '@mui/icons-material';

interface ItemControlsProps {
  isSelected: boolean;
  onSelect: () => void;
  dragControls?: DragControls;
  onDragActiveChange: (active: boolean) => void;
  mode: string;
  layout: 'mobile' | 'desktop';
}

const ItemControls: React.FC<ItemControlsProps> = ({
  isSelected,
  onSelect,
  dragControls,
  onDragActiveChange,
  mode,
  layout,
}) => {
  if (layout === 'mobile') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Checkbox
          checked={isSelected}
          onChange={onSelect}
          onClick={(e) => e.stopPropagation()}
          size="small"
          sx={{
            p: 0.5,
            color: mode === 'dark' ? '#64748b' : '#94a3b8',
            '&.Mui-checked': {
              color: '#6366f1',
            },
          }}
        />
        {dragControls && (
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
              cursor: 'grab',
              touchAction: 'none',
              p: 0.5,
              '&:active': {
                cursor: 'grabbing',
              },
            }}
          >
            <DragIndicator
              sx={{
                color: mode === 'dark' ? '#64748b' : '#94a3b8',
                fontSize: '1.3rem',
              }}
            />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: { md: 1.5, lg: 2 } }}>
      <Checkbox
        checked={isSelected}
        onChange={onSelect}
        onClick={(e) => e.stopPropagation()}
        size="small"
        sx={{
          p: 0.5,
          color: mode === 'dark' ? '#64748b' : '#94a3b8',
          '&.Mui-checked': {
            color: '#6366f1',
          },
        }}
      />
    </Box>
  );
};

export default ItemControls;