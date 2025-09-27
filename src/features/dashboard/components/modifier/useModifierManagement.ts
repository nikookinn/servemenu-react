import { useState } from 'react';
import { useModifierDelete } from './useModifierDelete';

interface ModifierData {
  id: string;
  name: string;
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
  
  // Delete functionality
  const deleteOperations = useModifierDelete();

  const handleEdit = (id: string) => {
    console.log('Edit modifier:', id);
  };

  const handleDelete = (id: string) => {
    // Modifier'lar kalıcı olarak silinir (archived'a gitmez)
    setModifiers(prev => prev.filter(modifier => modifier.id !== id));
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate modifier:', id);
  };

  const handleSaveModifier = (modifierData: ModifierFormData) => {
    const newModifier: ModifierData = {
      id: Date.now().toString(),
      name: modifierData.name,
      itemCount: modifierData.options.length,
      status: 'active' as const,
      lastModified: 'Just now',
    };
    
    setModifiers(prev => [newModifier, ...prev]);
    console.log('Modifier saved:', modifierData);
  };

  const restoreModifier = (modifierData: any) => {
    const { type, deletedAt, ...cleanModifierData } = modifierData;
    setModifiers(prev => [cleanModifierData, ...prev]);
  };

  return {
    modifiers,
    handleEdit,
    handleDelete,
    handleDuplicate,
    handleSaveModifier,
    restoreModifier,
    
    // Delete operations
    ...deleteOperations,
  };
};
