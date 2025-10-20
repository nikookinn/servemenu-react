import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { 
  addModifier, 
  updateModifier, 
  deleteModifier, 
  setModifierCurrentView,
  setEditingModifier
} from '../../store/dashboardSlice';
import { useModifierDelete } from './useModifierDelete';

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
  unit?: string;
}

export interface ModifierData {
  id: string;
  name: string;
  type: 'optional' | 'required';
  allowMultiple: boolean;
  options: ModifierOption[];
}

export interface ModifierFormData {
  name: string;
  type: 'optional' | 'required';
  allowMultiple: boolean;
  options: ModifierOption[];
}

export const useModifierManagement = () => {
  const dispatch = useAppDispatch();
  
  // Get all state from Redux store
  const modifiers = useAppSelector(state => state.dashboard.modifiers);
  const currentView = useAppSelector(state => state.dashboard.ui.modifierCurrentView);
  const editingModifier = useAppSelector(state => state.dashboard.ui.editingModifier);
  
  // Delete functionality
  const deleteOperations = useModifierDelete();

  const handleAddNewModifier = () => {
    dispatch(setModifierCurrentView('add'));
  };

  const handleBackToList = () => {
    dispatch(setModifierCurrentView('list'));
    dispatch(setEditingModifier(null));
  };

  const handleSaveModifier = (modifierData: ModifierFormData) => {
    if (editingModifier) {
      // Update existing modifier
      const updatedModifier: ModifierData = {
        ...editingModifier,
        name: modifierData.name,
        type: modifierData.type,
        allowMultiple: modifierData.allowMultiple,
        options: modifierData.options,
      };
      
      dispatch(updateModifier(updatedModifier));
    } else {
      // Create new modifier
      const newModifier: ModifierData = {
        id: Date.now().toString(),
        name: modifierData.name,
        type: modifierData.type,
        allowMultiple: modifierData.allowMultiple,
        options: modifierData.options,
      };
      
      dispatch(addModifier(newModifier));
    }
    
    dispatch(setModifierCurrentView('list'));
    dispatch(setEditingModifier(null));
    console.log('Modifier saved:', modifierData);
  };

  const handleEdit = (id: string) => {
    const modifierToEdit = modifiers.find((modifier: ModifierData) => modifier.id === id);
    if (modifierToEdit) {
      dispatch(setEditingModifier(modifierToEdit));
      dispatch(setModifierCurrentView('edit'));
    }
  };

  const handleDelete = (id: string) => {
    // Modifier'lar direkt silinir, archive'a gitmez
    // Sadece aktif listeden kaldır
    dispatch(deleteModifier(id));
  };

  const handleDuplicate = (id: string) => {
    const modifierToDuplicate = modifiers.find((modifier: ModifierData) => modifier.id === id);
    if (modifierToDuplicate) {
      const duplicatedModifier: ModifierData = {
        ...modifierToDuplicate,
        id: Date.now().toString(),
        name: `${modifierToDuplicate.name} (Copy)`,
      };
      dispatch(addModifier(duplicatedModifier));
    }
    console.log('Duplicate modifier:', id);
  };

  const restoreModifier = (modifierData: Omit<ModifierData, 'id'> & { id: string }) => {
    dispatch(addModifier(modifierData));
  };

  return {
    // State
    modifiers,
    currentView,
    editingModifier,
    
    // Actions
    handleAddNewModifier,
    handleBackToList,
    handleSaveModifier,
    handleEdit,
    handleDelete,
    handleDuplicate,
    restoreModifier,
    
    // Delete operations
    ...deleteOperations,
    
    // Redux dispatch functions (for external use if needed)
    setModifierCurrentView: (view: 'list' | 'add' | 'edit') => dispatch(setModifierCurrentView(view)),
    setEditingModifier: (modifier: ModifierData | null) => dispatch(setEditingModifier(modifier)),
  };
};
