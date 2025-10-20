import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  ContentCopy,
  DragIndicator,
  Visibility,
  Warning,
  Cancel,
} from '@mui/icons-material';
import { Reorder, useDragControls, motion } from 'framer-motion';
import { useDashboardTheme } from '../../context/ThemeContext';
import { Category, Item } from '../../store/dashboardSlice';
import VisibilityIcon from '../visibility/VisibilityIcon';

interface CategoryListProps {
  categories: Category[];
  items: Item[]; // Gerçek zamanlı item sayısı hesaplamak için
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
  onAddCategory: () => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onDuplicateCategory: (category: Category) => void;
  onReorderCategories: (newOrder: Category[]) => void;
  onVisibilitySettings: (category: Category) => void;
  
  // Delete confirmation props
  deleteConfirmOpen: boolean;
  categoryToDelete: Category | null;
  onOpenDeleteConfirm: (category: Category) => void;
  onCloseDeleteConfirm: () => void;
  onConfirmDelete: () => void;
}

// Wrapper component for draggable category items
interface DraggableCategoryItemProps {
  category: Category;
  items: Item[]; // Gerçek zamanlı item sayısı hesaplamak için
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, category: Category) => void;
  mode: string;
  isMobile: boolean;
  isLast?: boolean;
}

const DraggableCategoryItem: React.FC<DraggableCategoryItemProps> = ({
  category,
  items,
  selectedCategory,
  onSelectCategory,
  onMenuClick,
  mode,
  isMobile,
  isLast = false,
}) => {
  const theme = useTheme();
  const dragControls = useDragControls();

  // Gerçek zamanlı item sayısını hesapla
  const realTimeItemCount = items.filter(item => item.category === category.id).length;

  const handleDragStart = (event: React.PointerEvent) => {
    const startTime = Date.now();
    const startDrag = () => {
      event.preventDefault();
      dragControls.start(event);
    };
    
    // Touch: 150ms delay to distinguish scroll vs drag
    if (event.pointerType === 'touch') {
      setTimeout(() => {
        if (Date.now() - startTime >= 150) {
          startDrag();
        }
      }, 150);
    } else {
      // Mouse: Immediate drag
      startDrag();
    }
  };

  return (
    <Reorder.Item
      key={category.id}
      value={category}
      dragListener={false}
      dragControls={dragControls}
      style={{ 
        background: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
        listStyle: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        outline: 'none',
        display: 'block',
        width: '100%',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y'
      }}
      whileDrag={{ 
        zIndex: 1000,
      }}
      dragTransition={{ 
        bounceStiffness: 600, 
        bounceDamping: 30 
      }}
    >
      <motion.div
        whileDrag={{
          scale: 1.0,
          boxShadow: mode === 'dark' 
            ? '0 10px 30px rgba(0, 0, 0, 0.6)' 
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0,
          margin: 0,
          borderRadius: 0,
          outline: 'none',
        }}
      >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: { xs: 1.5, sm: 1.25, md: 1 },
          px: { xs: 1.5, sm: 1.75, md: 2 },
          cursor: 'pointer',
          background: selectedCategory?.id === category.id
            ? mode === 'dark'
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
              : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
            : 'transparent',
          borderLeft: selectedCategory?.id === category.id ? '3px solid #6366f1' : 'none',
          borderBottom: !isLast ? `1px solid ${theme.palette.divider}` : 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: selectedCategory?.id === category.id
              ? mode === 'dark'
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
              : mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
          },
        }}
        onClick={() => onSelectCategory(category)}
      >
        {/* Drag Handle */}
        <Box
          onPointerDown={handleDragStart}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: { xs: 0.5, sm: 0.75, md: 1 },
            cursor: 'grab',
            touchAction: 'pan-y',
            p: { xs: 0.5, sm: 0.25, md: 0 },
            '&:active': {
              cursor: 'grabbing',
              touchAction: 'none',
            },
          }}
        >
          <DragIndicator
            sx={{
              color: mode === 'dark' ? '#64748b' : '#94a3b8',
              fontSize: { xs: '1.1rem', sm: '1.05rem', md: '1rem' },
              '&:hover': {
                color: mode === 'dark' ? '#94a3b8' : '#64748b',
              },
            }}
          />
        </Box>

        {/* Category Content */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant={isMobile ? 'body2' : 'body1'}
              sx={{
                fontWeight: selectedCategory?.id === category.id ? 600 : 500,
                color: mode === 'dark' ? '#ffffff' : '#1a202c',
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                lineHeight: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              }}
            >
              {category.name}
            </Typography>
            <VisibilityIcon 
              visibilitySettings={category.visibilitySettings} 
              fontSize={{ xs: '0.875rem', sm: '1rem', md: '1.125rem' }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 0.75, md: 1 } }}>
            <Chip
              label={realTimeItemCount}
              size="small"
              sx={{
                height: { xs: 16, sm: 18, md: 20 },
                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                background: mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
                color: mode === 'dark' ? '#ffffff' : '#1a202c',
                '& .MuiChip-label': {
                  px: { xs: 0.5, md: 1 },
                },
              }}
            />
            <IconButton
              size="small"
              onClick={(e) => onMenuClick(e, category)}
              sx={{
                color: mode === 'dark' ? '#94a3b8' : '#64748b',
                p: { xs: 0.5, md: 1 },
                '&:hover': {
                  color: mode === 'dark' ? '#ffffff' : '#1a202c',
                },
              }}
            >
              <MoreVert fontSize={isMobile ? 'small' : 'small'} />
            </IconButton>
          </Box>
        </Box>
      </Box>
      </motion.div>
    </Reorder.Item>
  );
};

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  items,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  onDuplicateCategory,
  onReorderCategories,
  onVisibilitySettings,
  
  // Delete confirmation props
  deleteConfirmOpen,
  categoryToDelete,
  onOpenDeleteConfirm,
  onCloseDeleteConfirm,
  onConfirmDelete,
}) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // < 960px
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg')); // < 1200px
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedCategoryForMenu, setSelectedCategoryForMenu] = React.useState<Category | null>(null);
  
  // Delete confirmation state will come from props

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, category: Category) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedCategoryForMenu(category);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCategoryForMenu(null);
  };

  const handleEdit = () => {
    if (selectedCategoryForMenu) {
      onEditCategory(selectedCategoryForMenu);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedCategoryForMenu) {
      onOpenDeleteConfirm(selectedCategoryForMenu);
    }
    handleMenuClose();
  };

  const handleDuplicate = () => {
    if (selectedCategoryForMenu) {
      onDuplicateCategory(selectedCategoryForMenu);
    }
    handleMenuClose();
  };

  const handleVisibility = () => {
    if (selectedCategoryForMenu) {
      onVisibilitySettings(selectedCategoryForMenu);
    }
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: { xs: 0.5, md: 2 },
          borderBottom: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.12)' 
            : '1px solid rgba(0, 0, 0, 0.12)',
          minHeight: { xs: 64, md: 72 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        {/* Main Action Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: { xs: 1, sm: 1.5, md: 2 },
            height: { xs: 40, sm: 44, md: 48 },
            flexWrap: 'nowrap',
          }}
        >
          {/* Left Side - Breadcrumb */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, md: 2 }, 
            flex: 1, 
            minWidth: 0,
            height: '100%'
          }}>
            <Box
              sx={{
                minWidth: { xs: 100, sm: 120, md: 150 },
                maxWidth: { xs: '70%', sm: '80%', md: 200 },
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                flexShrink: 1,
              }}
            >
              <Typography
                variant={isMobile ? 'body2' : 'h6'}
                sx={{
                  color: mode === 'dark' ? '#94a3b8' : '#64748b',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Categories
              </Typography>
            </Box>
          </Box>

          {/* Right Side - Add Button */}
          <Box sx={{ 
            flexShrink: 0, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            height: '100%'
          }}>
            {isMobile ? (
              <IconButton
                onClick={onAddCategory}
                size={isSmallScreen ? "small" : "medium"}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Add fontSize={isSmallScreen ? "small" : "medium"} />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                startIcon={!isSmallScreen ? <Add /> : undefined}
                onClick={onAddCategory}
                size={isSmallScreen ? "small" : "medium"}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 0.75,
                  px: { md: 1.5, lg: 2 },
                  py: { md: 0.75, lg: 1.3 },
                  minWidth: { md: 80, lg: 100 },
                  fontSize: { md: '0.8rem', lg: '0.875rem' },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isSmallScreen ? <Add /> : 'Category'}
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Categories List */}
      <Box
        sx={{
          flex: 1,
        }}
      >
        {categories.length === 0 ? (
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: mode === 'dark' ? '#94a3b8' : '#64748b',
                mb: 2,
              }}
            >
              No categories yet
            </Typography>
            <Button
              variant="outlined"
              size={isMobile ? 'small' : 'small'}
              startIcon={!isMobile ? <Add /> : undefined}
              onClick={onAddCategory}
              sx={{
                borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                color: mode === 'dark' ? '#ffffff' : '#1a202c',
                textTransform: 'none',
                px: { xs: 1.5, md: 2 },
                '&:hover': {
                  borderColor: '#6366f1',
                  color: '#6366f1',
                },
              }}
            >
              {isMobile ? <Add sx={{ mr: 0.5 }} /> : null}
              Add First Category
            </Button>
          </Box>
        ) : (
          <Reorder.Group 
            axis="y" 
            values={categories} 
            onReorder={onReorderCategories}
            style={{ 
              padding: 0, 
              margin: 0, 
              listStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
          >
            {categories.map((category, index) => (
              <DraggableCategoryItem
                key={category.id}
                category={category}
                items={items}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
                onMenuClick={handleMenuClick}
                mode={mode}
                isMobile={isMobile}
                isLast={index === categories.length - 1}
              />
            ))}
          </Reorder.Group>
        )}
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            background: mode === 'dark'
              ? 'rgba(30, 30, 30, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            minWidth: 150,
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <ContentCopy fontSize="small" sx={{ mr: 1 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleVisibility}>
          <Visibility fontSize="small" sx={{ mr: 1 }} />
          Visibility
        </MenuItem>
        <MenuItem 
          onClick={handleDelete}
          sx={{ 
            color: theme.palette.error.main,
            '&:hover': {
              backgroundColor: mode === 'dark' 
                ? 'rgba(239, 68, 68, 0.1)' 
                : 'rgba(239, 68, 68, 0.05)',
            },
          }}
        >
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Simple Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={onCloseDeleteConfirm}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: mode === 'dark'
              ? 'rgba(20, 20, 20, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            pb: 1,
            borderBottom: mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '2px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <Warning sx={{ color: '#ef4444', fontSize: '1.5rem' }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: mode === 'dark' ? '#ffffff' : '#1a202c',
            }}
          >
            Delete Category
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Typography
            variant="body1"
            sx={{
              color: mode === 'dark' ? '#e2e8f0' : '#374151',
              mb: 2,
              lineHeight: 1.6,
            }}
          >
            Are you sure you want to delete the category <strong>"{categoryToDelete?.name}"</strong>? 
            This action will also delete all items within this category.
          </Typography>
          
          <Box
            sx={{
              p: 2,
              background: mode === 'dark'
                ? 'rgba(239, 68, 68, 0.05)'
                : 'rgba(239, 68, 68, 0.02)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#ef4444',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Warning fontSize="small" />
              This action cannot be undone
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            pt: 0,
            gap: 2,
            borderTop: mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <Button
            onClick={onCloseDeleteConfirm}
            variant="outlined"
            startIcon={<Cancel />}
            sx={{
              borderColor: mode === 'dark'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
              color: mode === 'dark' ? '#ffffff' : '#1a202c',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirmDelete}
            variant="contained"
            startIcon={<Delete />}
            sx={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              },
            }}
          >
            Delete Category
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryList;
