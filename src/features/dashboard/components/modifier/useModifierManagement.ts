import { useState } from 'react';
import { useModifierDelete } from './useModifierDelete';

interface ModifierData {
  id: string;
  name: string;
  type?: 'optional' | 'required';
  allowMultiple?: boolean;
  options?: any[];
  itemCount: number;
  status: 'active' | 'inactive' | 'draft';
  lastModified: string;
}

interface ModifierFormData {
  name: string;
  type: 'optional' | 'required';
  allowMultiple: boolean;
  options: any[];
}

export const useModifierManagement = () => {
  const [modifiers, setModifiers] = useState<ModifierData[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingModifier, setEditingModifier] = useState<ModifierData | null>(null);
  
  // Delete functionality
  const deleteOperations = useModifierDelete();

  const handleEdit = (id: string) => {
    const modifierToEdit = modifiers.find(modifier => modifier.id === id);
    if (modifierToEdit) {
      setEditingModifier(modifierToEdit);
      setCurrentView('edit');
    }
  };

  const handleDelete = (id: string) => {
    // Modifier'lar kalıcı olarak silinir (archived'a gitmez)
    setModifiers(prev => prev.filter(modifier => modifier.id !== id));
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate modifier:', id);
  };

  const handleAddNewModifier = () => {
    setCurrentView('add');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingModifier(null);
  };

  const handleSaveModifier = (modifierData: ModifierFormData) => {
    const now = new Date();
    
    if (editingModifier) {
      // Update existing modifier
      const updatedModifier: ModifierData = {
        ...editingModifier,
        name: modifierData.name,
        type: modifierData.type,
        allowMultiple: modifierData.allowMultiple,
        options: modifierData.options,
        itemCount: modifierData.options.length,
        lastModified: now.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        }),
      };
      
      setModifiers(prev => prev.map(modifier => 
        modifier.id === editingModifier.id ? updatedModifier : modifier
      ));
    } else {
      // Create new modifier
      const newModifier: ModifierData = {
        id: Date.now().toString(),
        name: modifierData.name,
        type: modifierData.type,
        allowMultiple: modifierData.allowMultiple,
        options: modifierData.options,
        itemCount: modifierData.options.length,
        status: 'active' as const,
        lastModified: now.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        }),
      };
      
      setModifiers(prev => [newModifier, ...prev]);
    }
    
    setCurrentView('list');
    setEditingModifier(null);
    console.log('Modifier saved:', modifierData);
  };

  const restoreModifier = (modifierData: any) => {
    const { type, deletedAt, ...cleanModifierData } = modifierData;
    setModifiers(prev => [cleanModifierData, ...prev]);
  };

  return {
    modifiers,
    currentView,
    editingModifier,
    handleAddNewModifier,
    handleBackToList,
    handleEdit,
    handleDelete,
    handleDuplicate,
    handleSaveModifier,
    restoreModifier,
    
    // Delete operations
    ...deleteOperations,
  };
};
