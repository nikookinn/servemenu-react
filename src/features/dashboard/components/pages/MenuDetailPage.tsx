import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Drawer,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack,
  Menu as MenuIcon,
  Close,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';
import { useCategoryManagement } from '../category/useCategoryManagement';
import { useItemManagement } from '../item/useItemManagement';
import CategoryList from '../category/CategoryList';
import ItemList from '../item/ItemList';
import AddCategoryForm from '../category/AddCategoryForm';
import AddItemForm from '../item/AddItemForm';
import ItemDeleteConfirmationDialog from '../item/DeleteConfirmationDialog';
import { useItemDelete } from '../item/useItemDelete';
import VisibilitySettingsPage, { VisibilitySettings } from '../visibility/VisibilitySettingsPage';
import { Category } from '../../store/dashboardSlice';
import { Item } from '../../store/dashboardSlice';

const MenuDetailPage: React.FC = () => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const navigate = useNavigate();
  const { menuId } = useParams<{ menuId: string }>();
  
  // Responsive state with multiple breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // < 960px
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [visibilityView, setVisibilityView] = useState<{
    isOpen: boolean;
    item: Category | Item | null;
    type: 'category' | 'item' | null;
  }>({ isOpen: false, item: null, type: null });
  
  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  
  const handleCategorySelect = (category: Category) => {
    handleSelectCategory(category);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };
  
  // Mock menu data - replace with actual data fetching
  const menuName = menuId ? `Menu ${menuId}` : "Main Menu"; // Using menuId for now
  
  const {
    categories,
    selectedCategory,
    currentView: categoryView,
    editingCategory,
    handleAddNewCategory,
    handleBackToList: handleBackToCategoryList,
    handleSaveCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleDuplicateCategory,
    handleSelectCategory,
    handleReorderCategories,
    updateCategoryVisibility,
    // Delete confirmation props
    deleteConfirmOpen,
    categoryToDelete,
    onOpenDeleteConfirm,
    onCloseDeleteConfirm,
    onConfirmDelete,
  } = useCategoryManagement();

  const {
    items,
    selectedItems,
    searchQuery,
    currentView: itemView,
    editingItem,
    handleAddNewItem,
    handleBackToList: handleBackToItemList,
    handleSaveItem,
    handleEditItem,
    handleDeleteItem,
    handleDuplicateItem,
    handleSelectItem,
    handleConfirmBulkDelete,
    handleBulkCopy,
    handleBulkMove,
    handleSearchChange,
    handleReorderItems,
    updateItemVisibility,
  } = useItemManagement();

  // Delete dialog operations
  const {
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete
  } = useItemDelete(items);

  // Handle delete confirmation
  const handleConfirmDelete = () => {
    if (deleteDialog.mode === 'single' && deleteDialog.itemId) {
      handleDeleteItem(deleteDialog.itemId);
    } else if (deleteDialog.mode === 'bulk' && deleteDialog.selectedIds.length > 0) {
      handleConfirmBulkDelete();
    }
    confirmDelete();
  };

  // Handle delete dialog open
  const handleOpenDeleteDialog = (itemId: string) => {
    openDeleteDialog(itemId, 'single');
  };

  // Handle bulk delete dialog open
  const handleOpenBulkDeleteDialog = () => {
    if (selectedItems.length > 0) {
      const firstItem = items.find(item => selectedItems.includes(item.id));
      openDeleteDialog(firstItem?.id || '', 'bulk', selectedItems);
    }
  };

  const handleBackToMenus = () => {
    navigate('/dashboard/menus');
  };

  // Wrapper functions to bridge the signature mismatch between CategoryList and useCategoryManagement
  const handleEditCategoryWrapper = (category: Category) => {
    handleEditCategory(category.id);
  };

  const handleDuplicateCategoryWrapper = (category: Category) => {
    handleDuplicateCategory(category.id);
  };

  // Visibility Settings Handlers
  const handleCategoryVisibilitySettings = (category: Category) => {
    setVisibilityView({
      isOpen: true,
      item: category,
      type: 'category'
    });
  };

  const handleItemVisibilitySettings = (item: Item) => {
    setVisibilityView({
      isOpen: true,
      item: item,
      type: 'item'
    });
  };

  const handleVisibilityBack = () => {
    setVisibilityView({ isOpen: false, item: null, type: null });
  };

  const handleVisibilitySave = (settings: VisibilitySettings) => {
    if (visibilityView.item && visibilityView.type) {
      if (visibilityView.type === 'category') {
        updateCategoryVisibility(visibilityView.item.id, settings);
      } else if (visibilityView.type === 'item') {
        updateItemVisibility(visibilityView.item.id, settings);
      }
      console.log(`Visibility settings saved for ${visibilityView.type}:`, settings);
    }
    setVisibilityView({ isOpen: false, item: null, type: null });
  };

  // Render different views based on current state
  if (visibilityView.isOpen && visibilityView.item && visibilityView.type) {
    return (
      <VisibilitySettingsPage
        itemName={visibilityView.item.name}
        itemType={visibilityView.type}
        onBack={handleVisibilityBack}
        onSave={handleVisibilitySave}
        initialSettings={visibilityView.item.visibilitySettings}
      />
    );
  }

  if (categoryView === 'add' || categoryView === 'edit') {
    return (
      <AddCategoryForm
        initialData={editingCategory}
        onBack={handleBackToCategoryList}
        onSave={handleSaveCategory}
      />
    );
  }

  // Wrapper for handleSaveItem to provide categoryId
  const handleItemSave = (formData: any) => {
    if (selectedCategory) {
      handleSaveItem(formData, selectedCategory.id);
    }
  };

  // Render item add/edit form
  if (itemView === 'add' || itemView === 'edit') {
    return (
      <AddItemForm
        initialData={editingItem}
        categoryName={selectedCategory?.name}
        onBack={handleBackToItemList}
        onSave={handleItemSave}
      />
    );
  }

  return (
    <Box>

      {/* Header Section */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            flexWrap: 'wrap',
            gap: { xs: 1, md: 2 },
          }}
        >
          {/* Left: Back Button, Menu Name, and Mobile Category Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 }, flex: 1, minWidth: 0 }}>
            <IconButton
              onClick={handleBackToMenus}
              sx={{
                background: mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(10px)',
                border: mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(0, 0, 0, 0.1)',
                color: mode === 'dark' ? '#ffffff' : '#1a202c',
                '&:hover': {
                  background: mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ArrowBack />
            </IconButton>
            
            {/* Menu Name next to back button */}
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{
                fontWeight: 700,
                background: mode === 'dark'
                  ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                  : 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
                minWidth: 0,
              }}
            >
              {menuName}
            </Typography>
            
            {/* Mobile Category Toggle Button */}
            {isMobile && (
              <Tooltip title="Browse Categories" placement="bottom">
                <Box
                  onClick={handleDrawerToggle}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.3,
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    cursor: 'pointer',
                    background: mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: mode === 'dark'
                      ? '1px solid rgba(99, 102, 241, 0.3)'
                      : '1px solid rgba(99, 102, 241, 0.2)',
                    color: '#6366f1',
                    minWidth: 'auto',
                    '&:hover': {
                      background: mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
                        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <MenuIcon sx={{ fontSize: '1.2rem' }} />
                  <Typography
                    sx={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: '#6366f1',
                      lineHeight: 1,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Categories
                  </Typography>
                </Box>
              </Tooltip>
            )}
          </Box>
        </Box>

        <Divider
          sx={{
            borderColor: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
          }}
        />
      </Box>

      {/* Mobile Drawer for Categories */}
      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            sx: {
              width: 280,
              background: mode === 'dark'
                ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
                : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              border: mode === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.12)' 
                : '1px solid rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Drawer Header */}
            <Box
              sx={{
                p: 2,
                borderBottom: mode === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.12)' 
                  : '1px solid rgba(0, 0, 0, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: mode === 'dark' ? '#ffffff' : '#1a202c',
                }}
              >
                Categories
              </Typography>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: mode === 'dark' ? '#ffffff' : '#1a202c',
                }}
              >
                <Close />
              </IconButton>
            </Box>
            
            {/* Categories in Drawer */}
            <CategoryList
              categories={categories}
              items={items}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              onAddCategory={handleAddNewCategory}
              onEditCategory={handleEditCategoryWrapper}
              onDeleteCategory={handleDeleteCategory}
              onDuplicateCategory={handleDuplicateCategoryWrapper}
              onReorderCategories={handleReorderCategories}
              onVisibilitySettings={handleCategoryVisibilitySettings}
              deleteConfirmOpen={deleteConfirmOpen}
              categoryToDelete={categoryToDelete}
              onOpenDeleteConfirm={onOpenDeleteConfirm}
              onCloseDeleteConfirm={onCloseDeleteConfirm}
              onConfirmDelete={onConfirmDelete}
            />
          </Box>
        </Drawer>
      )}

      {/* Main Content - Single Container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: { 
            xs: 'calc(100vh - 160px)', 
            sm: 'calc(100vh - 180px)',
            md: 'calc(100vh - 200px)' 
          },
          background: mode === 'dark'
            ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.12)' 
            : '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left Section: Categories - Desktop Only */}
        {!isMobile && (
          <>
            <Box
              sx={{
                width: { md: '280px', lg: '300px', xl: '320px' },
                minWidth: { md: '260px', lg: '280px' },
                maxWidth: { md: '300px', lg: '320px' },
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CategoryList
                categories={categories}
                items={items}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                onAddCategory={handleAddNewCategory}
                onEditCategory={handleEditCategoryWrapper}
                onDeleteCategory={handleDeleteCategory}
                onDuplicateCategory={handleDuplicateCategoryWrapper}
                onReorderCategories={handleReorderCategories}
                onVisibilitySettings={handleCategoryVisibilitySettings}
                deleteConfirmOpen={deleteConfirmOpen}
                categoryToDelete={categoryToDelete}
                onOpenDeleteConfirm={onOpenDeleteConfirm}
                onCloseDeleteConfirm={onCloseDeleteConfirm}
                onConfirmDelete={onConfirmDelete}
              />
            </Box>

            {/* Vertical Divider */}
            <Box
              sx={{
                width: '0.5px',
                background: mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.08)' 
                  : 'rgba(0, 0, 0, 0.08)',
                flexShrink: 0,
              }}
            />
          </>
        )}

        {/* Right Section: Items */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            maxWidth: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          <ItemList
            selectedItems={selectedItems}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            categories={categories}
            onAddItem={handleAddNewItem}
            onEditItem={handleEditItem}
            onDeleteItem={handleOpenDeleteDialog}
            onDuplicateItem={handleDuplicateItem}
            onSelectItem={handleSelectItem}
            onBulkDelete={handleOpenBulkDeleteDialog}
            onBulkCopy={handleBulkCopy}
            onBulkMove={handleBulkMove}
            onSearchChange={handleSearchChange}
            onReorderItems={handleReorderItems}
            onVisibilitySettings={handleItemVisibilitySettings}
          />
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <ItemDeleteConfirmationDialog
        deleteDialog={deleteDialog}
        onClose={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default MenuDetailPage;
