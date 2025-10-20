import React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  ContentCopy,
  DriveFileMove,
  Delete,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

interface ItemBulkActionsProps {
  selectedCount: number;
  onBulkCopy: (categoryId: string) => void;
  onBulkMove: (categoryId: string) => void;
  onBulkDelete: () => void;
  categories?: Array<{ id: string; name: string }>;
  currentCategoryId?: string; // Şu anki kategori ID'si
}

const ItemBulkActions: React.FC<ItemBulkActionsProps> = ({
  selectedCount,
  onBulkCopy,
  onBulkMove,
  onBulkDelete,
  categories,
  currentCategoryId,
}) => {
  const { mode } = useDashboardTheme();
  const { showSuccess } = useToast();
  const [moveAnchorEl, setMoveAnchorEl] = React.useState<null | HTMLElement>(null);
  const [copyAnchorEl, setCopyAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMoveClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoveAnchorEl(event.currentTarget);
  };

  const handleMoveClose = () => {
    setMoveAnchorEl(null);
  };

  const handleMoveToCategory = (categoryId: string) => {
    const targetCategory = allCategories.find(cat => cat.id === categoryId);
    onBulkMove(categoryId);
    handleMoveClose();
    
    // Toast mesajı göster
    showSuccess(
      `${selectedCount} item moved successfully`,
      `Items moved to ${targetCategory?.name || 'selected category'}`
    );
  };

  const handleCopyClick = (event: React.MouseEvent<HTMLElement>) => {
    setCopyAnchorEl(event.currentTarget);
  };

  const handleCopyClose = () => {
    setCopyAnchorEl(null);
  };

  const handleCopyToCategory = (categoryId: string) => {
    const targetCategory = allCategories.find(cat => cat.id === categoryId);
    onBulkCopy(categoryId);
    handleCopyClose();
    
    // Toast mesajı göster
    showSuccess(
      `${selectedCount} item copied successfully`,
      `Items copied to ${targetCategory?.name || 'selected category'}`
    );
  };

  // Use provided categories or fallback to mock data
  const allCategories = categories || [
    { id: 'cat-1', name: 'Appetizers' },
    { id: 'cat-2', name: 'Main Courses' },
    { id: 'cat-3', name: 'Desserts' },
    { id: 'cat-4', name: 'Beverages' },
    { id: 'cat-5', name: 'Salads' },
  ];

  // Şu anki kategoriyi hariç tut
  const availableCategories = allCategories.filter(category => 
    category.id !== currentCategoryId
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1,
        background: mode === 'dark'
          ? 'rgba(99, 102, 241, 0.1)'
          : 'rgba(99, 102, 241, 0.05)',
        border: mode === 'dark'
          ? '1px solid rgba(99, 102, 241, 0.3)'
          : '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: 0.75,
      }}
    >
      {/* Selected Count */}
      <Typography
        variant="body2"
        sx={{
          color: '#6366f1',
          fontWeight: 600,
          fontSize: '0.875rem',
          mr: 1,
        }}
      >
        {selectedCount} selected
      </Typography>

      {/* Copy Button */}
      <Button
        size="small"
        startIcon={<ContentCopy />}
        endIcon={<KeyboardArrowDown />}
        onClick={handleCopyClick}
        sx={{
          minWidth: 'auto',
          px: 1.5,
          py: 0.5,
          color: mode === 'dark' ? '#ffffff' : '#1a202c',
          background: mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.8)',
          border: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 0.5,
          textTransform: 'none',
          fontSize: '0.75rem',
          '&:hover': {
            background: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.9)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        Copy
      </Button>

      {/* Move Button */}
      <Button
        size="small"
        startIcon={<DriveFileMove />}
        endIcon={<KeyboardArrowDown />}
        onClick={handleMoveClick}
        sx={{
          minWidth: 'auto',
          px: 1.5,
          py: 0.5,
          color: mode === 'dark' ? '#ffffff' : '#1a202c',
          background: mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.8)',
          border: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 0.5,
          textTransform: 'none',
          fontSize: '0.75rem',
          '&:hover': {
            background: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.9)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        Move
      </Button>

      {/* Delete Button */}
      <Button
        size="small"
        startIcon={<Delete />}
        onClick={onBulkDelete}
        sx={{
          minWidth: 'auto',
          px: 1.5,
          py: 0.5,
          color: '#ef4444',
          background: mode === 'dark'
            ? 'rgba(239, 68, 68, 0.1)'
            : 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 0.5,
          textTransform: 'none',
          fontSize: '0.75rem',
          '&:hover': {
            background: mode === 'dark'
              ? 'rgba(239, 68, 68, 0.15)'
              : 'rgba(239, 68, 68, 0.1)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        Delete
      </Button>

      {/* Move Menu */}
      <Menu
        anchorEl={moveAnchorEl}
        open={Boolean(moveAnchorEl)}
        onClose={handleMoveClose}
        PaperProps={{
          sx: {
            background: mode === 'dark'
              ? 'rgba(30, 30, 30, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            minWidth: 180,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: mode === 'dark' ? '#94a3b8' : '#64748b',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Move to Category
          </Typography>
        </Box>
        {availableCategories.length === 0 ? (
          <MenuItem disabled sx={{ py: 1, px: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: mode === 'dark' ? '#64748b' : '#94a3b8',
                fontStyle: 'italic',
              }}
            >
              No other categories available
            </Typography>
          </MenuItem>
        ) : (
          availableCategories.map((category) => (
            <MenuItem
              key={category.id}
              onClick={() => handleMoveToCategory(category.id)}
              sx={{
                py: 1,
                px: 2,
                '&:hover': {
                  background: mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.1)'
                    : 'rgba(99, 102, 241, 0.05)',
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: mode === 'dark' ? '#ffffff' : '#1a202c',
                }}
              >
                {category.name}
              </Typography>
            </MenuItem>
          ))
        )}
      </Menu>

      {/* Copy Menu */}
      <Menu
        anchorEl={copyAnchorEl}
        open={Boolean(copyAnchorEl)}
        onClose={handleCopyClose}
        PaperProps={{
          sx: {
            background: mode === 'dark'
              ? 'rgba(30, 30, 30, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            minWidth: 180,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: mode === 'dark' ? '#94a3b8' : '#64748b',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Copy to Category
          </Typography>
        </Box>
        {availableCategories.length === 0 ? (
          <MenuItem disabled sx={{ py: 1, px: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: mode === 'dark' ? '#64748b' : '#94a3b8',
                fontStyle: 'italic',
              }}
            >
              No other categories available
            </Typography>
          </MenuItem>
        ) : (
          availableCategories.map((category) => (
            <MenuItem
              key={category.id}
              onClick={() => handleCopyToCategory(category.id)}
              sx={{
                py: 1,
                px: 2,
                '&:hover': {
                  background: mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.1)'
                    : 'rgba(99, 102, 241, 0.05)',
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: mode === 'dark' ? '#ffffff' : '#1a202c',
                }}
              >
                {category.name}
              </Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default ItemBulkActions;
