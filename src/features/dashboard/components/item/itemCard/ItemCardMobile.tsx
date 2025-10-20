import React from 'react';
import { Box, Checkbox } from '@mui/material';
import { DragControls } from 'framer-motion';
import { Item } from '../useItemManagement';
import ItemControls from './ItemControls';
import ItemMenuButton from './ItemMenuButton';
import ItemImage from './ItemImage';
import ItemInfo from './ItemInfo';
import ItemLabels from './ItemLabels';
import ItemPrice from './ItemPrice';
import ItemStatus from './ItemStatus';

interface ItemCardMobileProps {
  item: Item;
  isSelected: boolean;
  onSelect: () => void;
  dragControls?: DragControls;
  isDragActive: boolean;
  onDragActiveChange: (active: boolean) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  mode: string;
}

const ItemCardMobile: React.FC<ItemCardMobileProps> = ({
  item,
  isSelected,
  onSelect,
  dragControls,
  onDragActiveChange,
  onMenuClick,
  mode,
}) => {
  return (
    <>
      {/* Top Row - Controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.5,
          width: '100%',
        }}
      >
        <ItemControls
          isSelected={isSelected}
          onSelect={onSelect}
          dragControls={dragControls}
          onDragActiveChange={onDragActiveChange}
          mode={mode}
          layout="mobile"
        />

        <ItemMenuButton onClick={onMenuClick} mode={mode} layout="mobile" />
      </Box>

      {/* Image and Content Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <ItemImage item={item} size="medium" mode={mode} />

        {/* Name and Price */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 0.5,
            }}
          >
            <ItemInfo
              name={item.name}
              description={undefined}
              mode={mode}
              layout="mobile"
              visibilitySettings={item.visibilitySettings}
            />

            {/* Labels and Display Options - Mobile */}
            {((item.labels && item.labels.length > 0) ||
              (item.displayOptions && item.displayOptions.length > 0)) && (
              <ItemLabels
                labels={item.labels}
                displayOptions={item.displayOptions}
                mode={mode}
                layout="mobile"
              />
            )}

            <ItemPrice item={item} layout="mobile" />
          </Box>

          {item.description && (
            <ItemInfo
              name=""
              description={item.description}
              mode={mode}
              layout="mobile"
            />
          )}
        </Box>
      </Box>

      {/* Status and Date Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <ItemStatus
          isAvailable={item.isAvailable}
          mode={mode}
          layout="mobile"
        />
      </Box>
    </>
  );
};

export default ItemCardMobile;