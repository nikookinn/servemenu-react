import { useState } from 'react';
import { Menu } from './useMenuManagement';

export interface MenuDeleteDialog {
  open: boolean;
  itemId: string;
  itemName: string;
}

export interface MenuDeleteOperations {
  // Dialog state
  deleteDialog: MenuDeleteDialog;
  
  // Dialog actions
  openDeleteDialog: (id: string, name: string) => void;
  closeDeleteDialog: () => void;
  
  // Delete operations
  confirmDelete: (onDelete: (id: string) => void, onArchive?: (menu: Menu) => void) => void;
}

export const useMenuDelete = (menus: Menu[]): MenuDeleteOperations => {
  const [deleteDialog, setDeleteDialog] = useState<MenuDeleteDialog>({
    open: false,
    itemId: '',
    itemName: '',
  });

  const openDeleteDialog = (id: string, name: string) => {
    setDeleteDialog({
      open: true,
      itemId: id,
      itemName: name,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      itemId: '',
      itemName: '',
    });
  };

  const confirmDelete = (
    onDelete: (id: string) => void, 
    onArchive?: (menu: Menu) => void
  ) => {
    const { itemId } = deleteDialog;
    
    if (onArchive) {
      // Find the menu to archive
      const menuToDelete = menus.find(menu => menu.id === itemId);
      if (menuToDelete) {
        onArchive(menuToDelete);
      }
    }
    
    // Delete from active menus
    onDelete(itemId);
    
    // Close dialog
    closeDeleteDialog();
  };

  return {
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  };
};
