import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Tooltip,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Add,
  ContentCopy,
  QrCode,
  Visibility,
  ArrowBack,
  ChevronRight,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { 
  setActiveTab,
  setModifierCurrentView, 
  openPermanentDeleteDialog,
  closePermanentDeleteDialog
} from '../../store/dashboardSlice';
import { AddMenuForm, MenuCard, MenuEmptyState, AddNewMenuCard, useMenuManagement } from '../menu';
import { AddModifierForm, AddModifierFormRef, ModifierDeleteConfirmationDialog, ModifierCard, ModifierEmptyState, useModifierManagement } from '../modifier';
import MenuDeleteConfirmationDialog from '../menu/DeleteConfirmationDialog';
import { ArchivedItemsList, useArchivedItems, PermanentDeleteDialog, ArchivedItem } from '../archived';

const MenuManagementPage: React.FC = () => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const dispatch = useAppDispatch();
  
  // Get state from Redux store
  const activeTab = useAppSelector(state => state.dashboard.ui.activeTab);
  const addModifierFormRef = useRef<AddModifierFormRef>(null);
  
  // Use menu management hook
  const { 
    menus, 
    currentView: menuCurrentView, 
    editingMenu,
    handleAddNewMenu, 
    handleBackToList: handleBackToMenuList, 
    handleSaveMenu, 
    handleEditMenu, 
    handleDeleteMenu, 
    handleDuplicateMenu, 
    restoreMenu,
    // Delete operations
    deleteDialog: menuDeleteDialog,
    openDeleteDialog: openMenuDeleteDialog,
    closeDeleteDialog: closeMenuDeleteDialog,
    confirmDelete: confirmMenuDelete
  } = useMenuManagement();

  // Get permanent delete dialog state from Redux
  const permanentDeleteDialog = useAppSelector(state => ({
    open: state.dashboard.ui.permanentDeleteDialog?.open || false,
    itemId: state.dashboard.ui.permanentDeleteDialog?.itemId || '',
    itemName: state.dashboard.ui.permanentDeleteDialog?.itemName || '',
    itemType: 'menu' as const, // MenuManagementPage only handles menus
  }));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(setActiveTab(newValue));
    
    // Reset all form states when switching tabs
    if (menuCurrentView !== 'list') {
      handleBackToMenuList(); // Reset menu form state
    }
    if (modifierCurrentView !== 'list') {
      dispatch(setModifierCurrentView('list')); // Reset modifier form state
    }
  };
  const handleEdit = (id: string) => {
    handleEditMenu(id);
  };

  const handleDelete = (id: string) => {
    const menu = menus.find((menu: any) => menu.id === id);
    if (menu) {
      openMenuDeleteDialog(id, menu.name);
    }
  };

  const handleModifierDeleteClick = (id: string) => {
    const modifier = modifiers.find((modifier: any) => modifier.id === id);
    if (modifier) {
      openModifierDeleteDialog(id, modifier.name);
    }
  };

  const handleMenuDeleteConfirm = () => {
    confirmMenuDelete(
      handleDeleteMenu
      // handleDeleteMenu zaten archive'a ekliyor, callback'e gerek yok
    );
  };

  const handleModifierDeleteConfirm = () => {
    confirmModifierDelete(handleModifierDelete);
  };

  const handleMenuDeleteCancel = () => {
    closeMenuDeleteDialog();
  };

  const handleModifierDeleteCancel = () => {
    closeModifierDeleteDialog();
  };

  const handleDuplicate = (id: string) => {
    handleDuplicateMenu(id);
  };

  const handleRestore = (id: string) => {
    const restoredItem = restoreArchivedItem(id);
    if (restoredItem) {
      // Sadece menu restore edilebilir
      const { type, deletedAt, ...menuData } = restoredItem;
      restoreMenu(menuData);
    }
  };

  const handlePermanentDelete = (id: string) => {
    const item = archivedItems.find((item: any) => item.id === id);
    if (item) {
      dispatch(openPermanentDeleteDialog({
        itemId: id,
        itemName: item.name,
        itemType: item.type,
      }));
    }
  };

  const handlePermanentDeleteConfirm = () => {
    permanentlyDeleteItem(permanentDeleteDialog.itemId);
    dispatch(closePermanentDeleteDialog());
  };

  const handlePermanentDeleteCancel = () => {
    dispatch(closePermanentDeleteDialog());
  };

  const handleOpenCustomerApp = () => {
    console.log('Opening customer app...');
  };

  const handleCopyLink = () => {
    console.log('Copying link...');
  };

  const handleShowQRCode = () => {
    console.log('Showing QR code...');
  };

  const handleBackToList = () => {
    if (menuCurrentView !== 'list') {
      handleBackToMenuList();
    } else {
      dispatch(setModifierCurrentView('list'));
    }
  };



  // Use modifier management hook
  const { 
    modifiers, 
    currentView: modifierCurrentView,
    editingModifier,
    handleAddNewModifier,
    handleBackToList: handleBackToModifierList,
    handleEdit: handleModifierEdit, 
    handleDelete: handleModifierDelete, 
    handleDuplicate: handleModifierDuplicate, 
    handleSaveModifier, 
    // Delete operations from useModifierDelete
    deleteDialog: modifierDeleteDialogFromHook,
    openDeleteDialog: openModifierDeleteDialog,
    closeDeleteDialog: closeModifierDeleteDialog,
    confirmDelete: confirmModifierDelete
  } = useModifierManagement();
  
  // Use archived items hook
  const { items: archivedItems, restoreArchivedItem, permanentlyDeleteItem } = useArchivedItems();

  const getCurrentData = () => {
    switch (activeTab) {
      case 0: return menus;
      case 1: return modifiers;
      case 2: return archivedItems.filter((item: ArchivedItem) => item.type === 'menu');
      default: return menus;
    }
  };

  return (
    <Box>
      {/* Header Section with Action Buttons */}
      <Box sx={{ 
        mb: 1, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: { xs: 'center', md: 'flex-start' },
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2.5, md: 2 },
      }}>
        {/* Left Side - Title and Description */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2rem' },
            }}
          >
            {activeTab === 0 ? 'Menu Management' : activeTab === 1 ? 'Modifier Management' : 'Archived Items'}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: '0.875rem', md: '1rem' },
              lineHeight: 1.6,
            }}
          >
            {activeTab === 0 
              ? 'Craft and manage your digital menu experience.' 
              : activeTab === 1 
              ? 'Create and organize modifier groups for your menu items.'
              : 'View and restore your archived menus and modifiers.'
            }
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, md: 1.5 },
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', md: 'flex-start' },
          width: { xs: '100%', md: 'auto' },
        }}>
          {/* QR Code Button - Now visible on mobile */}
          <Tooltip title="Restaurant QR Code">
            <IconButton
              onClick={handleShowQRCode}
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'rgba(79, 70, 229, 0.1)',
                border: `1px solid ${theme.palette.divider}`,
                size: { xs: 'small', md: 'medium' },
                p: { xs: 1, md: 1.5 },
                '&:hover': {
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(99, 102, 241, 0.2)' 
                    : 'rgba(79, 70, 229, 0.2)',
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <QrCode sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
            </IconButton>
          </Tooltip>

          {/* Copy URL Button - Now visible on mobile */}
          <Tooltip title="Copy Restaurant URL">
            <IconButton
              onClick={handleCopyLink}
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'rgba(79, 70, 229, 0.1)',
                border: `1px solid ${theme.palette.divider}`,
                size: { xs: 'small', md: 'medium' },
                p: { xs: 1, md: 1.5 },
                '&:hover': {
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(99, 102, 241, 0.2)' 
                    : 'rgba(79, 70, 229, 0.2)',
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <ContentCopy sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
            </IconButton>
          </Tooltip>

          {/* Open Customer App Button */}
          <Tooltip title="Open Customer App">
            <Button
              startIcon={<Visibility sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />}
              onClick={handleOpenCustomerApp}
              variant="contained"
              size="small"
              sx={{
                background: mode === 'dark'
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                fontWeight: 600,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                borderRadius: 1,
                textTransform: 'none',
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                minWidth: { xs: 'auto', sm: '140px' },
                flexShrink: 0,
                boxShadow: mode === 'dark'
                  ? '0 4px 20px rgba(99, 102, 241, 0.3)'
                  : '0 4px 20px rgba(79, 70, 229, 0.3)',
                '&:hover': {
                  background: mode === 'dark'
                    ? 'linear-gradient(135deg, #5b5ff1 0%, #7c3aed 100%)'
                    : 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                  boxShadow: mode === 'dark'
                    ? '0 6px 24px rgba(99, 102, 241, 0.4)'
                    : '0 6px 24px rgba(79, 70, 229, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Open Customer App
              </Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                Preview
              </Box>
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              height: 3,
              borderRadius: 1.5,
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                fontWeight: 600,
              },
            },
          }}
        >
          <Tab label="Menus" />
          <Tab label="Modifiers" />
          <Tab label="Archived" />
        </Tabs>
      </Box>

      {/* Add New Button / Back Button with Breadcrumb */}
      <Box sx={{ mb: 4 }}>
        {menuCurrentView === 'add' || menuCurrentView === 'edit' ? (
          /* Back Button with Breadcrumb for Menu */
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              variant="outlined"
              size="large"
              onClick={handleBackToMenuList}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.1)'
                    : 'rgba(79, 70, 229, 0.1)',
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Back to Menus
            </Button>
            
            {/* Breadcrumb */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                Menus
              </Typography>
              <ChevronRight 
                sx={{ 
                  color: theme.palette.text.secondary, 
                  fontSize: '1.2rem'
                }} 
              />
              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                {menuCurrentView === 'edit' ? 'Edit Menu' : 'Add New Menu'}
              </Typography>
            </Box>
          </Box>
        ) : modifierCurrentView === 'add' || modifierCurrentView === 'edit' ? (
          /* Back Button with Breadcrumb for Modifier */
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              variant="outlined"
              size="large"
              onClick={handleBackToModifierList}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.1)'
                    : 'rgba(79, 70, 229, 0.1)',
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Back to Modifiers
            </Button>
            
            {/* Breadcrumb */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                component="button"
                onClick={handleBackToList}
                sx={{
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    textDecoration: 'underline',
                  },
                }}
              >
                Modifiers
              </Typography>
              <ChevronRight 
                sx={{ 
                  color: theme.palette.text.secondary, 
                  fontSize: '1.2rem'
                }} 
              />
              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                {modifierCurrentView === 'edit' ? 'Edit Modifier' : 'Add New Modifier'}
              </Typography>
            </Box>
          </Box>
        ) : activeTab !== 2 ? (
          /* Add New Button - Hide on Archived tab */
          <Button
            startIcon={<Add />}
            variant="contained"
            size="large"
            onClick={activeTab === 0 ? handleAddNewMenu : handleAddNewModifier}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1.5,
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              boxShadow: mode === 'dark'
                ? '0 4px 20px rgba(99, 102, 241, 0.3)'
                : '0 4px 20px rgba(79, 70, 229, 0.3)',
              '&:hover': {
                background: mode === 'dark'
                  ? 'linear-gradient(135deg, #5b5ff1 0%, #7c3aed 100%)'
                  : 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                boxShadow: mode === 'dark'
                  ? '0 6px 24px rgba(99, 102, 241, 0.4)'
                  : '0 6px 24px rgba(79, 70, 229, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Add New {activeTab === 0 ? 'Menu' : activeTab === 1 ? 'Modifier' : 'Item'}
          </Button>
        ) : null}
      </Box>

      {/* Content Area - Conditional Rendering */}
      {menuCurrentView === 'add' ? (
        /* Add Menu Form */
        <AddMenuForm
          onSave={handleSaveMenu}
        />
      ) : menuCurrentView === 'edit' ? (
        /* Edit Menu Form */
        <AddMenuForm
          onSave={handleSaveMenu}
          editMode={true}
          initialData={{
            name: editingMenu?.name || '',
            description: editingMenu?.description || ''
          }}
        />
      ) : modifierCurrentView === 'add' ? (
        /* Add Modifier Form */
        <AddModifierForm
          ref={addModifierFormRef}
          onSave={handleSaveModifier}
        />
      ) : modifierCurrentView === 'edit' ? (
        /* Edit Modifier Form */
        <AddModifierForm
          ref={addModifierFormRef}
          onSave={handleSaveModifier}
          editMode={true}
          initialData={{
            name: editingModifier?.name || '',
            type: editingModifier?.type || 'optional',
            allowMultiple: editingModifier?.allowMultiple || false,
            options: editingModifier?.options || []
          }}
        />
      ) : (
        <>
          {activeTab === 2 ? (
            /* Archived Items List View */
            <ArchivedItemsList
              items={archivedItems}
              onRestore={handleRestore}
              onDelete={handlePermanentDelete}
            />
          ) : activeTab === 1 ? (
            /* Modifier List View - Archive Style */
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {getCurrentData().map((item: any) => (
                <ModifierCard
                  key={item.id}
                  {...item}
                  onEdit={handleModifierEdit}
                  onDelete={handleModifierDeleteClick}
                  onDuplicate={handleModifierDuplicate}
                />
              ))}
            </Box>
          ) : (
            /* Menu Grid View */
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                  xl: 'repeat(4, 1fr)',
                },
                gap: 2.5,
                width: '100%',
                maxWidth: '1400px',
              }}
            >
              {/* Add New Menu Card - Always visible first when there are items */}
              {getCurrentData().length > 0 && (
                <AddNewMenuCard onClick={handleAddNewMenu} />
              )}
              
              {getCurrentData().map((item: any) => (
                <MenuCard
                  key={item.id}
                  {...item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  disableNavigation={false}
                />
              ))}
            </Box>
          )}
          {/* Empty State for Menus only */}
          {activeTab === 0 && getCurrentData().length === 0 && (
            <MenuEmptyState onAddMenu={handleAddNewMenu} />
          )}

          {/* Empty State for Modifiers only */}
          {activeTab === 1 && getCurrentData().length === 0 && (
            <ModifierEmptyState onAddModifier={handleAddNewModifier} />
          )}
        </>
      )}

      {/* Premium Delete Confirmation Dialogs */}
      <MenuDeleteConfirmationDialog
        open={menuDeleteDialog.open}
        onClose={handleMenuDeleteCancel}
        onConfirm={handleMenuDeleteConfirm}
        itemName={menuDeleteDialog.itemName}
        itemType="menu"
      />
      
      <ModifierDeleteConfirmationDialog
        open={modifierDeleteDialogFromHook.open}
        onClose={handleModifierDeleteCancel}
        onConfirm={handleModifierDeleteConfirm}
        itemName={modifierDeleteDialogFromHook.itemName}
        itemType="modifier"
      />

      {/* Permanent Delete Confirmation Dialog */}
      <PermanentDeleteDialog
        open={permanentDeleteDialog.open}
        onClose={handlePermanentDeleteCancel}
        onConfirm={handlePermanentDeleteConfirm}
        itemName={permanentDeleteDialog.itemName}
        itemType={permanentDeleteDialog.itemType}
      />
    </Box>
  );
};

export default MenuManagementPage;
