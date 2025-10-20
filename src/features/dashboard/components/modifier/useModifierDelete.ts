import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { openDeleteDialog, closeDeleteDialog } from '../../store/dashboardSlice';

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
  const dispatch = useAppDispatch();
  
  // Get delete dialog state from Redux
  const deleteDialog = useAppSelector(state => ({
    open: state.dashboard.ui.deleteDialog.open && state.dashboard.ui.deleteDialog.itemType === 'modifier',
    itemId: state.dashboard.ui.deleteDialog.itemId,
    itemName: state.dashboard.ui.deleteDialog.itemName,
  }));

  const openModifierDeleteDialog = (id: string, name: string) => {
    dispatch(openDeleteDialog({
      itemId: id,
      itemName: name,
      itemType: 'modifier'
    }));
  };

  const closeModifierDeleteDialog = () => {
    dispatch(closeDeleteDialog());
  };

  const confirmDelete = (onDelete: (id: string) => void) => {
    const { itemId } = deleteDialog;
    if (itemId) {
      onDelete(itemId);
      dispatch(closeDeleteDialog());
    }
  };

  return {
    deleteDialog,
    openDeleteDialog: openModifierDeleteDialog,
    closeDeleteDialog: closeModifierDeleteDialog,
    confirmDelete,
  };
};
