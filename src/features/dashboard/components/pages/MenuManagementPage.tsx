import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  Tooltip,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Add,
  ContentCopy,
  QrCode,
  Restaurant,
  Visibility,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';
import { AddMenuForm, AddMenuFormRef, MenuCard } from '../menu';
import { AddModifierForm, AddModifierFormRef, ModifierDeleteConfirmationDialog, ModifierCard, AddNewModifierCard, ModifierEmptyState, useModifierManagement } from '../modifier';
import MenuDeleteConfirmationDialog from '../menu/DeleteConfirmationDialog';
import { ArchivedItemsList, useArchivedItems, PermanentDeleteDialog } from '../archived';

const MenuManagementPage: React.FC = () => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'addModifier'>('list');
  const addMenuFormRef = useRef<AddMenuFormRef>(null);
  const addModifierFormRef = useRef<AddModifierFormRef>(null);
  const [menus, setMenus] = useState<{ id: string; name: string; itemCount: number; status: 'active' | 'inactive' | 'draft'; lastModified: string }[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    itemId: string;
    itemName: string;
    itemType: 'menu' | 'modifier';
  }>({
    open: false,
    itemId: '',
    itemName: '',
    itemType: 'menu',
  });

  const [permanentDeleteDialog, setPermanentDeleteDialog] = useState<{
    open: boolean;
    itemId: string;
    itemName: string;
    itemType: 'menu' | 'modifier';
  }>({
    open: false,
    itemId: '',
    itemName: '',
    itemType: 'menu',
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const handleEdit = (id: string) => {
    console.log('Edit menu:', id);
  };

  const handleDelete = (id: string) => {
    const currentData = getCurrentData();
    const item = currentData.find(item => item.id === id);
    if (item) {
      setDeleteDialog({
        open: true,
        itemId: id,
        itemName: item.name,
        itemType: activeTab === 0 ? 'menu' : 'modifier',
      });
    }
  };

  const handleDeleteConfirm = () => {
    const { itemId, itemType } = deleteDialog;
    
    if (itemType === 'menu') {
      const menuToDelete = menus.find(menu => menu.id === itemId);
      if (menuToDelete) {
        // Add to archived items using hook
        addArchivedItem({
          ...menuToDelete,
          type: 'menu',
        });
        // Remove from active menus
        setMenus(prev => prev.filter(menu => menu.id !== itemId));
      }
    } else {
      // Modifier'lar kalıcı olarak silinir (archived'a gitmez)
      handleModifierDelete(itemId);
    }
    
    setDeleteDialog({
      open: false,
      itemId: '',
      itemName: '',
      itemType: 'menu',
    });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({
      open: false,
      itemId: '',
      itemName: '',
      itemType: 'menu',
    });
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate menu:', id);
  };

  const handleRestore = (id: string) => {
    const restoredItem = restoreArchivedItem(id);
    if (restoredItem) {
      if (restoredItem.type === 'menu') {
        const { type, deletedAt, ...menuData } = restoredItem;
        setMenus(prev => [menuData, ...prev]);
      } else {
        restoreModifier(restoredItem);
      }
    }
  };

  const handlePermanentDelete = (id: string) => {
    const item = archivedItems.find(item => item.id === id);
    if (item) {
      setPermanentDeleteDialog({
        open: true,
        itemId: id,
        itemName: item.name,
        itemType: item.type,
      });
    }
  };

  const handlePermanentDeleteConfirm = () => {
    permanentlyDeleteItem(permanentDeleteDialog.itemId);
    setPermanentDeleteDialog({
      open: false,
      itemId: '',
      itemName: '',
      itemType: 'menu',
    });
  };

  const handlePermanentDeleteCancel = () => {
    setPermanentDeleteDialog({
      open: false,
      itemId: '',
      itemName: '',
      itemType: 'menu',
    });
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

  const handleAddNewMenu = () => {
    setCurrentView('add');
  };

  const handleBackToList = () => {
    setCurrentView('list');
  };

  const handleSaveMenu = (menuData: { name: string; description: string }) => {
    const newMenu = {
      id: Date.now().toString(),
      name: menuData.name,
      itemCount: 0,
      status: 'draft' as const,
      lastModified: 'Just now',
    };
    
    setMenus(prev => [newMenu, ...prev]);
    setCurrentView('list');
    console.log('Menu saved:', menuData);
  };

  const handleAddNewModifier = () => {
    setCurrentView('addModifier');
  };

  const handleSaveModifierWrapper = (modifierData: {
    name: string;
    type: 'optional' | 'required';
    allowMultiple: boolean;
    options: any[];
  }) => {
    handleSaveModifier(modifierData);
    setCurrentView('list');
  };

  // Use modifier management hook
  const { modifiers, handleEdit: handleModifierEdit, handleDelete: handleModifierDelete, handleDuplicate: handleModifierDuplicate, handleSaveModifier, restoreModifier } = useModifierManagement();
  
  // Use archived items hook
  const { items: archivedItems, addArchivedItem, restoreArchivedItem, permanentlyDeleteItem } = useArchivedItems();

  const getCurrentData = () => {
    switch (activeTab) {
      case 0: return menus;
      case 1: return modifiers;
      case 2: return archivedItems;
      default: return menus;
    }
  };

  return (
    <Box>
      {/* Header Section with Action Buttons */}
      <Box sx={{ 
        mb: 4, 
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
                borderRadius: 2,
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
        {currentView === 'add' || currentView === 'addModifier' ? (
          /* Back Button with Breadcrumb and Save Button */
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            width: '100%',
          }}>
            {/* Left Side - Back Button and Breadcrumb */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={handleBackToList}
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
                ← Back to {currentView === 'add' ? 'Menus' : 'Modifiers'}
              </Button>
              
              {/* Breadcrumb */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                  {currentView === 'add' ? 'Menus' : 'Modifiers'}
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: '1rem' }}>
                  /
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  {currentView === 'add' ? 'Add New Menu' : 'Add New Modifier'}
                </Typography>
              </Box>
            </Box>

            {/* Right Side - Save Button */}
            <Button
              variant="contained"
              onClick={() => {
                if (currentView === 'add' && addMenuFormRef.current) {
                  addMenuFormRef.current.save();
                } else if (currentView === 'addModifier' && addModifierFormRef.current) {
                  addModifierFormRef.current.save();
                }
              }}
              sx={{
                background: mode === 'dark'
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: 1,
                textTransform: 'none',
                fontSize: '0.875rem',
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
              {currentView === 'add' ? 'Save Menu' : 'Save Modifier'}
            </Button>
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
      {currentView === 'add' ? (
        /* Add Menu Form */
        <AddMenuForm
          ref={addMenuFormRef}
          onSave={handleSaveMenu}
        />
      ) : currentView === 'addModifier' ? (
        /* Add Modifier Form */
        <AddModifierForm
          ref={addModifierFormRef}
          onBack={handleBackToList}
          onSave={handleSaveModifierWrapper}
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
          ) : (
            /* Content Grid for Menus and Modifiers */
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {getCurrentData().map((item: any) => (
                <Box key={item.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.33% - 16px)', lg: '1 1 calc(25% - 18px)' } }}>
                  {activeTab === 1 ? (
                    <ModifierCard
                      {...item}
                      onEdit={handleModifierEdit}
                      onDelete={handleDelete}
                      onDuplicate={handleModifierDuplicate}
                    />
                  ) : (
                    <MenuCard
                      {...item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onDuplicate={handleDuplicate}
                    />
                  )}
                </Box>
              ))}
              
              {/* Add New Card - Always visible when there are items */}
              {activeTab === 0 && getCurrentData().length > 0 && (
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.33% - 16px)', lg: '1 1 calc(25% - 18px)' } }}>
                  <Card
                    onClick={handleAddNewMenu}
                    sx={{
                      height: '100%',
                      minHeight: '200px',
                      background: mode === 'dark'
                        ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
                        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      border: `2px dashed ${theme.palette.primary.main}`,
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: mode === 'dark'
                          ? '0 16px 48px rgba(99, 102, 241, 0.3)'
                          : '0 16px 48px rgba(79, 70, 229, 0.2)',
                        borderColor: theme.palette.primary.dark,
                        background: mode === 'dark'
                          ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)'
                          : 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: mode === 'dark'
                          ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                          : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Add sx={{ fontSize: '2rem', color: 'white' }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        textAlign: 'center',
                        mb: 1,
                      }}
                    >
                      Add New Menu
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        textAlign: 'center',
                        fontSize: '0.875rem',
                      }}
                    >
                      Create a new menu
                    </Typography>
                  </Card>
                </Box>
              )}

              {/* Add New Modifier Card */}
              {activeTab === 1 && getCurrentData().length > 0 && (
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.33% - 16px)', lg: '1 1 calc(25% - 18px)' } }}>
                  <AddNewModifierCard onClick={handleAddNewModifier} />
                </Box>
              )}
            </Box>
          )}
          {/* Empty State for Menus only */}
          {activeTab === 0 && getCurrentData().length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 4,
                background: mode === 'dark'
                  ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.1)'
                    : 'rgba(79, 70, 229, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  border: `2px solid ${mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)'}`,
                }}
              >
                <Restaurant
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.main,
                    opacity: 0.8,
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: theme.palette.text.primary,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                Create Your First Menu
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 4,
                  maxWidth: 400,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                }}
              >
                Start building your digital menu experience. Create your first menu to showcase your delicious offerings to customers.
              </Typography>
              <Button
                startIcon={<Add />}
                variant="contained"
                size="large"
                onClick={handleAddNewMenu}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
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
                Create Your First Menu
              </Button>
            </Box>
          )}

          {/* Empty State for Modifiers only */}
          {activeTab === 1 && getCurrentData().length === 0 && (
            <ModifierEmptyState onAddModifier={handleAddNewModifier} />
          )}
        </>
      )}

      {/* Premium Delete Confirmation Dialogs */}
      {deleteDialog.itemType === 'menu' ? (
        <MenuDeleteConfirmationDialog
          open={deleteDialog.open}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          itemName={deleteDialog.itemName}
          itemType={deleteDialog.itemType}
        />
      ) : (
        <ModifierDeleteConfirmationDialog
          open={deleteDialog.open}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          itemName={deleteDialog.itemName}
          itemType={deleteDialog.itemType}
        />
      )}

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
