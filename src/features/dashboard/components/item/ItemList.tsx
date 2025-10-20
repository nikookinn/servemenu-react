import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  IconButton,
  Collapse,
  useMediaQuery,
} from '@mui/material';
import {
  Add,
  Search,
  SearchOff,
} from '@mui/icons-material';
import { Reorder, useDragControls, motion } from 'framer-motion';
import { useDashboardTheme } from '../../context/ThemeContext';
import { useItemManagement } from './useItemManagement';
import { Item } from '../../store/dashboardSlice';
import { Category } from '../../store/dashboardSlice';
import ItemCard from './ItemCard';
import ItemBulkActions from './ItemBulkActions';

interface ItemListProps {
  items?: Item[];
  selectedItems?: string[];
  selectedCategory: Category | null;
  searchQuery?: string;
  categories?: Category[];
  onAddItem?: () => void;
  onEditItem?: (item: Item) => void;
  onDeleteItem?: (itemId: string) => void;
  onDuplicateItem?: (item: Item) => void;
  onSelectItem?: (itemId: string) => void;
  onBulkDelete?: () => void;
  onBulkCopy?: (categoryId: string) => void;
  onBulkMove?: (categoryId: string) => void;
  onSearchChange?: (query: string) => void;
  onReorderItems?: (items: Item[]) => void;
  onVisibilitySettings: (item: Item) => void;
}

// Wrapper component for draggable item cards
interface DraggableItemCardProps {
  item: Item;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onVisibilitySettings: () => void;
  mode: string;
}

const DraggableItemCard: React.FC<DraggableItemCardProps> = ({
  item,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onVisibilitySettings,
  mode,
}) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      key={item.id}
      value={item}
      dragListener={false}
      dragControls={dragControls}
      style={{ 
        background: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
        marginBottom: '4px',
        listStyle: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        outline: 'none',
        display: 'block',
        width: '100%'
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
            ? '0 12px 35px rgba(0, 0, 0, 0.6)' 
            : '0 12px 35px rgba(0, 0, 0, 0.3)',
        }}
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0,
          margin: 0,
          borderRadius: 0,
          outline: 'none'
        }}
      >
        <ItemCard
          item={item}
          isSelected={isSelected}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onVisibilitySettings={onVisibilitySettings}
          dragControls={dragControls}
        />
      </motion.div>
    </Reorder.Item>
  );
};

const ItemList: React.FC<ItemListProps> = ({
  items: propsItems,
  selectedItems: propsSelectedItems,
  selectedCategory,
  searchQuery: propsSearchQuery,
  categories: propsCategories,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onDuplicateItem,
  onSelectItem,
  onBulkDelete,
  onBulkCopy,
  onBulkMove,
  onSearchChange,
  onReorderItems,
  onVisibilitySettings,
}) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // < 960px
  const isSmallScreen = useMediaQuery('(max-width: 1660px)'); // < 1660px
  const isCompactScreen = useMediaQuery('(max-width: 1075px)'); // < 1075px
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  
  // Use props if provided, otherwise fallback to hook
  const {
    categories: hookCategories,
    selectedItems: hookSelectedItems,
    searchQuery: hookSearchQuery,
    getFilteredItems,
    handleAddNewItem: hookHandleAddNewItem,
    handleEditItem: hookHandleEditItem,
    handleDeleteItem: hookHandleDeleteItem,
    handleDuplicateItem: hookHandleDuplicateItem,
    handleSelectItem: hookHandleSelectItem,
    handleBulkDelete: hookHandleBulkDelete,
    handleBulkCopy: hookHandleBulkCopy,
    handleBulkMove: hookHandleBulkMove,
    handleSearchChange: hookHandleSearchChange,
    handleReorderItems: hookHandleReorderItems,
  } = useItemManagement();
  
  // Use props or fallback to hook values
  const categories = propsCategories || hookCategories;
  const selectedItems = propsSelectedItems || hookSelectedItems;
  const searchQuery = propsSearchQuery || hookSearchQuery;
  const items = propsItems || getFilteredItems(selectedCategory?.id);
  
  // Use props handlers or fallback to hook handlers
  const handleAddNewItem = onAddItem || hookHandleAddNewItem;
  const handleEditItem = onEditItem || hookHandleEditItem;
  const handleDeleteItem = onDeleteItem || hookHandleDeleteItem;
  const handleDuplicateItem = onDuplicateItem || hookHandleDuplicateItem;
  const handleSelectItem = onSelectItem || hookHandleSelectItem;
  const handleBulkDelete = onBulkDelete || hookHandleBulkDelete;
  const handleBulkCopy = onBulkCopy || hookHandleBulkCopy;
  const handleBulkMove = onBulkMove || hookHandleBulkMove;
  const handleSearchChange = onSearchChange || hookHandleSearchChange;
  const handleReorderItems = onReorderItems || hookHandleReorderItems;
  
  // Local state for search expansion
  const [searchExpanded, setSearchExpanded] = React.useState(false);

  const hasSelectedItems = selectedItems.length > 0;
  
  const handleSearchToggle = () => {
    setSearchExpanded(!searchExpanded);
    if (searchExpanded && searchQuery) {
      handleSearchChange('');
    }
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
            width: '100%',
            gap: { xs: 1, sm: 1.5, md: 2 },
            minHeight: { xs: 40, sm: 44, md: 48 },
            flexWrap: { xs: 'wrap', sm: 'wrap', md: 'nowrap' },
            alignItems: { xs: 'flex-start', md: 'center' },
          }}
        >
          {/* Left Side - Breadcrumb and Add Button */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, sm: 1.5, md: 2 }, 
            flex: { xs: '1 1 100%', sm: '1 1 60%', md: '1 1 auto' }, 
            minWidth: 0,
            height: { xs: 'auto', md: '100%' },
            order: { xs: 1, md: 1 }
          }}>
            {/* Breadcrumb - Responsive */}
            <Box
              sx={{
                minWidth: { xs: 80, sm: 100, md: 150, lg: 180 },
                maxWidth: { xs: '100%', sm: '100%', md: 200, lg: 250 },
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                flexShrink: 1,
                flex: { xs: '1 1 auto', md: '0 1 auto' }
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
                {isVerySmallScreen 
                  ? (selectedCategory?.name || 'Select').substring(0, 12) + (selectedCategory?.name && selectedCategory.name.length > 12 ? '...' : '')
                  : isMobile 
                    ? selectedCategory?.name || 'Select category' 
                    : `Categories / ${selectedCategory?.name || 'Select a category'}`}
              </Typography>
            </Box>
            
            {/* Desktop Add Button */}
            {!isMobile && (
              <Button
                variant="contained"
                startIcon={!isSmallScreen ? <Add /> : undefined}
                onClick={handleAddNewItem}
                disabled={!selectedCategory}
                size={isSmallScreen ? "small" : "medium"}
                sx={{
                  background: selectedCategory
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)',
                  color: selectedCategory ? 'white' : mode === 'dark' ? '#64748b' : '#94a3b8',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 0.75,
                  px: { md: 1.5, lg: 2 },
                  py: { md: 0.75, lg: 1.3 },
                  minWidth: { md: 70, lg: 90 },
                  maxWidth: { md: 90, lg: 120 },
                  fontSize: { md: '0.75rem', lg: '0.875rem' },
                  flexShrink: 0,
                  '&:hover': {
                    background: selectedCategory
                      ? 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)'
                      : mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(0, 0, 0, 0.15)',
                    transform: selectedCategory ? 'translateY(-1px)' : 'none',
                    boxShadow: selectedCategory ? '0 4px 12px rgba(99, 102, 241, 0.4)' : 'none',
                  },
                  '&:disabled': {
                    background: mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                    color: mode === 'dark' ? '#64748b' : '#94a3b8',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isSmallScreen ? <Add /> : 'Item'}
              </Button>
            )}
            
            {/* Desktop Bulk Actions - Between Add Button and Search on large screens */}
            {!isMobile && !isSmallScreen && hasSelectedItems && (
              <ItemBulkActions
                selectedCount={selectedItems.length}
                onBulkCopy={handleBulkCopy}
                onBulkMove={handleBulkMove}
                onBulkDelete={handleBulkDelete}
                categories={categories?.map((cat: Category) => ({ id: cat.id, name: cat.name }))}
                currentCategoryId={selectedCategory?.id}
              />
            )}

          </Box>

          {/* Right Side - Search and Mobile Add Button */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 0.5, sm: 1 },
            flex: { xs: '1 1 100%', sm: '1 1 40%', md: '0 0 auto' },
            height: { xs: 'auto', md: '100%' },
            minWidth: { xs: '100%', sm: 'auto', md: 'fit-content' },
            maxWidth: { xs: '100%', sm: '100%', md: 'none' },
            order: { xs: 3, md: 2 },
            mt: { xs: 1, md: 0 },
            justifyContent: { xs: 'stretch', sm: 'flex-end', md: 'flex-end' }
          }}>
            {/* Mobile Add Button */}
            {isMobile && (
              <IconButton
                onClick={handleAddNewItem}
                disabled={!selectedCategory}
                sx={{
                  background: selectedCategory
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                  color: selectedCategory ? 'white' : mode === 'dark' ? '#64748b' : '#94a3b8',
                  borderRadius: 0.75,
                  '&:hover': {
                    background: selectedCategory
                      ? 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)'
                      : mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                    transform: selectedCategory ? 'translateY(-1px)' : 'none',
                  },
                  '&:disabled': {
                    background: mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                    color: mode === 'dark' ? '#64748b' : '#94a3b8',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Add />
              </IconButton>
            )}
            {/* Search Toggle/Field */}
            {isMobile || isCompactScreen ? (
              <IconButton
                onClick={handleSearchToggle}
                sx={{
                  background: mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                  color: mode === 'dark' ? '#ffffff' : '#1a202c',
                  flexShrink: 0,
                  '&:hover': {
                    background: mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                {searchExpanded ? <SearchOff /> : <Search />}
              </IconButton>
            ) : (
              <TextField
                placeholder={isSmallScreen ? "Search..." : "Search items..."}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search
                        sx={{
                          color: mode === 'dark' ? '#94a3b8' : '#64748b',
                          fontSize: { md: '1rem', lg: '1.1rem' },
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { md: '180px', lg: '220px', xl: '260px' },
                  maxWidth: { md: '180px', lg: '220px', xl: '260px' },
                  minWidth: { md: '160px', lg: '180px' },
                  flexShrink: 1,
                  '& .MuiOutlinedInput-root': {
                    background: mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                    '& fieldset': {
                      borderColor: mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 0, 0, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.3)'
                        : 'rgba(0, 0, 0, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6366f1',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: mode === 'dark' ? '#ffffff' : '#1a202c',
                    '&::placeholder': {
                      color: mode === 'dark' ? '#64748b' : '#94a3b8',
                      opacity: 1,
                    },
                  },
                }}
              />
            )}
          </Box>
        </Box>
        
        {/* Desktop Bulk Actions - Separate Row for small screens only */}
        {!isMobile && isSmallScreen && hasSelectedItems && (
          <Box
            sx={{
              width: '100%',
              mt: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <ItemBulkActions
              selectedCount={selectedItems.length}
              onBulkMove={handleBulkMove}
              onBulkCopy={handleBulkCopy}
              onBulkDelete={handleBulkDelete}
              categories={categories?.map((cat: Category) => ({ id: cat.id, name: cat.name }))}
              currentCategoryId={selectedCategory?.id}
            />
          </Box>
        )}

        {/* Mobile/Compact Search Field */}
        {(isMobile || isCompactScreen) && (
          <Collapse in={searchExpanded}>
            <Box sx={{ pt: 1, width: '100%' }}>
              <TextField
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                size="small"
                fullWidth
                autoFocus={searchExpanded}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search
                        sx={{
                          color: mode === 'dark' ? '#94a3b8' : '#64748b',
                          fontSize: '1.2rem',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                    '& fieldset': {
                      borderColor: mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 0, 0, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.3)'
                        : 'rgba(0, 0, 0, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6366f1',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: mode === 'dark' ? '#ffffff' : '#1a202c',
                    '&::placeholder': {
                      color: mode === 'dark' ? '#64748b' : '#94a3b8',
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>
          </Collapse>
        )}
      </Box>

      {/* Items Content */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 0.5, md: 2 },
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {!selectedCategory ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: mode === 'dark' ? '#64748b' : '#94a3b8',
              }}
            >
              Select a category to view items
            </Typography>
          </Box>
        ) : items.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: mode === 'dark' ? '#ffffff' : '#1a202c',
                mb: 1,
              }}
            >
              No items available
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: mode === 'dark' ? '#94a3b8' : '#64748b',
                mb: 3,
              }}
            >
              {searchQuery
                ? `No items found matching "${searchQuery}"`
                : `No items in ${selectedCategory.name} category yet`}
            </Typography>
            {!searchQuery && (
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddNewItem}
                sx={{
                  borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  color: mode === 'dark' ? '#ffffff' : '#1a202c',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#6366f1',
                    color: '#6366f1',
                  },
                }}
              >
                Add First Item
              </Button>
            )}
          </Box>
        ) : (
          <Reorder.Group 
            axis="y" 
            values={items} 
            onReorder={handleReorderItems}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: 0,
              margin: 0,
              listStyle: 'none'
            }}
          >
            {items.map((item: Item) => (
              <DraggableItemCard
                key={item.id}
                item={item}
                isSelected={selectedItems.includes(item.id)}
                onSelect={() => handleSelectItem(item.id)}
                onEdit={() => handleEditItem(item)}
                onDelete={() => handleDeleteItem(item.id)}
                onDuplicate={() => handleDuplicateItem(item)}
                onVisibilitySettings={() => onVisibilitySettings(item)}
                mode={mode}
              />
            ))}
          </Reorder.Group>
        )}
      </Box>
    </Box>
  );
};

export default ItemList;
