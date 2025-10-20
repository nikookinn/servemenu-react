import React from 'react';
import { Box, Checkbox } from '@mui/material';
import { DragControls } from 'framer-motion';
import { Item } from '../useItemManagement';
import ItemControls from './ItemControls';
import ItemDragHandle from './ItemDragHandle';
import ItemImage from './ItemImage';
import ItemInfo from './ItemInfo';
import ItemLabels from './ItemLabels';
import ItemPrice from './ItemPrice';
import ItemStatus from './ItemStatus';
import ItemMenuButton from './ItemMenuButton';

interface ItemCardDesktopProps {
  item: Item;
  isSelected: boolean;
  onSelect: () => void;
  dragControls?: DragControls;
  onDragActiveChange: (active: boolean) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  mode: string;
}

const ItemCardDesktop: React.FC<ItemCardDesktopProps> = ({
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
      <ItemControls
        isSelected={isSelected}
        onSelect={onSelect}
        dragControls={dragControls}
        onDragActiveChange={onDragActiveChange}
        mode={mode}
        layout="desktop"
      />

      <ItemDragHandle
        dragControls={dragControls}
        onDragActiveChange={onDragActiveChange}
        mode={mode}
        layout="desktop"
      />

      {/* Item Image */}
      <Box sx={{ mr: 2, flexShrink: 0 }}>
        <ItemImage item={item} size="small" mode={mode} />
      </Box>

      {/* Item Info */}
      <ItemInfo
        name={item.name}
        description={item.description}
        mode={mode}
        layout="desktop"
        visibilitySettings={item.visibilitySettings}
      />

      {/* Labels and Display Options - Desktop */}
      <ItemLabels
        labels={item.labels}
        displayOptions={item.displayOptions}
        mode={mode}
        layout="desktop"
      />

      {/* Price */}
      <Box sx={{ mr: { md: 2, lg: 3 } }}>
        <ItemPrice item={item} layout="desktop" />
      </Box>

      {/* Status */}
      <Box sx={{ mr: { md: 2, lg: 3 } }}>
        <ItemStatus
          isAvailable={item.isAvailable}
          mode={mode}
          layout="desktop"
        />
      </Box>

      {/* Menu Button */}
      <Box>
        <ItemMenuButton onClick={onMenuClick} mode={mode} layout="desktop" />
      </Box>
    </>
  );
};

export default ItemCardDesktop;