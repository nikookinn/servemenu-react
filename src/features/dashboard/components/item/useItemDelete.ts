import { useState } from 'react';

// Import Item from dashboardSlice to avoid interface mismatch
import { Item } from '../../store/dashboardSlice';

export interface ItemDeleteDialog {
  open: boolean;
  itemId: string | null;
  itemName: string;
  mode: 'single' | 'bulk';
  selectedIds: string[];
}

export interface ItemDeleteOperations {
  deleteDialog: ItemDeleteDialog;
  openDeleteDialog: (itemId: string, mode: 'single' | 'bulk', selectedIds?: string[]) => void;
  closeDeleteDialog: () => void;
  confirmDelete: () => void;
}

export const useItemDelete = (items: Item[]): ItemDeleteOperations => {
  const [deleteDialog, setDeleteDialog] = useState<ItemDeleteDialog>({
    open: false,
    itemId: null,
    itemName: '',
    mode: 'single',
    selectedIds: []
  });

  const openDeleteDialog = (itemId: string, mode: 'single' | 'bulk', selectedIds: string[] = []) => {
    const item = items.find(i => i.id === itemId);
    setDeleteDialog({
      open: true,
      itemId,
      itemName: item?.name || '',
      mode,
      selectedIds: mode === 'bulk' ? selectedIds : [itemId]
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(prev => ({
      ...prev,
      open: false,
      itemId: null,
      itemName: '',
      selectedIds: []
    }));
  };

  const confirmDelete = () => {
    // This will be handled by the parent component
    // For now, just close the dialog
    closeDeleteDialog();
  };

  return {
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete
  };
};
