import { useState } from 'react';

export interface ModifierDeleteDialog {
  open: boolean;
  itemId: string;
  itemName: string;
}

export interface ModifierDeleteOperations {
  // Dialog state
  deleteDialog: ModifierDeleteDialog;
  
  // Dialog actions
  openDeleteDialog: (id: string, name: string) => void;
  closeDeleteDialog: () => void;
  
  // Delete operations
  confirmDelete: (onDelete: (id: string) => void) => void;
}

export const useModifierDelete = (): ModifierDeleteOperations => {
  const [deleteDialog, setDeleteDialog] = useState<ModifierDeleteDialog>({
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

  const confirmDelete = (onDelete: (id: string) => void) => {
    const { itemId } = deleteDialog;
    onDelete(itemId);
    closeDeleteDialog();
  };

  return {
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  };
};
