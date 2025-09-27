import { useState } from 'react';
import { useMenuDelete } from './useMenuDelete';

export interface Menu {
  id: string;
  name: string;
  itemCount: number;
  status: 'active' | 'inactive' | 'draft';
  lastModified: string;
}

export interface MenuFormData {
  name: string;
  description: string;
}

export const useMenuManagement = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'add'>('list');
  
  // Delete functionality
  const deleteOperations = useMenuDelete(menus);

  const handleAddNewMenu = () => {
    setCurrentView('add');
  };

  const handleBackToList = () => {
    setCurrentView('list');
  };

  const handleSaveMenu = (menuData: MenuFormData) => {
    const newMenu: Menu = {
      id: Date.now().toString(),
      name: menuData.name,
      itemCount: 0,
      status: 'draft',
      lastModified: 'Just now',
    };
    
    setMenus(prev => [newMenu, ...prev]);
    setCurrentView('list');
    console.log('Menu saved:', menuData);
  };

  const handleEditMenu = (id: string) => {
    console.log('Edit menu:', id);
    // TODO: Implement edit functionality
  };

  const handleDeleteMenu = (id: string) => {
    setMenus(prev => prev.filter(menu => menu.id !== id));
  };

  const handleDuplicateMenu = (id: string) => {
    const menuToDuplicate = menus.find(menu => menu.id === id);
    if (menuToDuplicate) {
      const duplicatedMenu: Menu = {
        ...menuToDuplicate,
        id: Date.now().toString(),
        name: `${menuToDuplicate.name} (Copy)`,
        lastModified: 'Just now',
      };
      setMenus(prev => [duplicatedMenu, ...prev]);
    }
    console.log('Duplicate menu:', id);
  };

  const restoreMenu = (menuData: Omit<Menu, 'id'> & { id: string }) => {
    setMenus(prev => [menuData, ...prev]);
  };

  return {
    // State
    menus,
    currentView,
    
    // Actions
    handleAddNewMenu,
    handleBackToList,
    handleSaveMenu,
    handleEditMenu,
    handleDeleteMenu,
    handleDuplicateMenu,
    restoreMenu,
    
    // Delete operations
    ...deleteOperations,
    
    // Setters (for external use if needed)
    setMenus,
    setCurrentView,
  };
};
