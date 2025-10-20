import React from 'react';
import {
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { DragControls } from 'framer-motion';
import { useDashboardTheme } from '../../context/ThemeContext';
import { Item } from './useItemManagement';
import ItemCardMobile from './itemCard/ItemCardMobile'
import ItemCardDesktop from './itemCard/ItemCardDesktop';
import ItemMenu from './itemCard/ItemMenu';

interface ItemCardProps {
  item: Item;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onVisibilitySettings: () => void;
  dragControls?: DragControls;
  isDragging?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onVisibilitySettings,
  dragControls,
  isDragging = false,
}) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDragActive, setIsDragActive] = React.useState(false);

  // Reset drag state on global pointer up
  React.useEffect(() => {
    const handleGlobalPointerUp = () => {
      setTimeout(() => setIsDragActive(false), 100);
    };

    document.addEventListener('pointerup', handleGlobalPointerUp);
    document.addEventListener('touchend', handleGlobalPointerUp);

    return () => {
      document.removeEventListener('pointerup', handleGlobalPointerUp);
      document.removeEventListener('touchend', handleGlobalPointerUp);
    };
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsDragActive(true);
    setTimeout(() => setIsDragActive(false), 100);
  };

  const handleEdit = (event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    onEdit();
    handleMenuClose();
  };

  const handleDelete = (event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    onDelete();
    handleMenuClose();
  };

  const handleDuplicate = (event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    onDuplicate();
    handleMenuClose();
  };

  const handleVisibility = (event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    onVisibilitySettings();
    handleMenuClose();
  };

  const handleCardClick = () => {
    if (!isDragActive && !Boolean(anchorEl)) {
      onEdit();
    }
  };

  return (
    <>
      <Box
        onClick={handleCardClick}
        sx={{
          background: mode === 'dark'
            ? isSelected
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
              : 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
            : isSelected
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          backdropFilter: 'blur(10px)',
          border: isSelected
            ? '2px solid #6366f1'
            : `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: { xs: 1.5, sm: 1.75, md: 2 },
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
          overflow: 'hidden',
          opacity: 1,
          transform: 'none',
          willChange: 'transform',
          '&:hover': !isDragging
            ? {
              transform: 'translateY(-1px)',
              boxShadow: mode === 'dark'
                ? '0 6px 20px rgba(0, 0, 0, 0.4)'
                : '0 6px 20px rgba(0, 0, 0, 0.15)',
              border: `1px solid ${theme.palette.primary.main}`,
            }
            : {},
        }}
      >
        {isMobile ? (
          <ItemCardMobile
            item={item}
            isSelected={isSelected}
            onSelect={onSelect}
            dragControls={dragControls}
            isDragActive={isDragActive}
            onDragActiveChange={setIsDragActive}
            onMenuClick={handleMenuClick}
            mode={mode}
          />
        ) : (
          <ItemCardDesktop
            item={item}
            isSelected={isSelected}
            onSelect={onSelect}
            dragControls={dragControls}
            onDragActiveChange={setIsDragActive}
            onMenuClick={handleMenuClick}
            mode={mode}
          />
        )}
      </Box>

      {/* Context Menu */}
      <ItemMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onVisibility={handleVisibility}
        mode={mode}
      />
    </>
  );
};

export default ItemCard;