import { useState } from 'react';
import { useMenuDelete } from './useMenuDelete';

export interface Menu {
  id: string;
  name: string;
  description?: string;
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
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  
  // Delete functionality
  const deleteOperations = useMenuDelete(menus);

  const handleAddNewMenu = () => {
    setCurrentView('add');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingMenu(null);
  };

  const handleSaveMenu = (menuData: MenuFormData) => {
    const now = new Date();
    
    if (editingMenu) {
      // Update existing menu
      const updatedMenu: Menu = {
        ...editingMenu,
        name: menuData.name,
        description: menuData.description,
        lastModified: now.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        }),
      };
      
      setMenus(prev => prev.map(menu => 
        menu.id === editingMenu.id ? updatedMenu : menu
      ));
    } else {
      // Create new menu
      const newMenu: Menu = {
        id: Date.now().toString(),
        name: menuData.name,
        description: menuData.description,
        itemCount: 0,
        status: 'draft',
        lastModified: now.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        }),
      };
      
      setMenus(prev => [newMenu, ...prev]);
    }
    
    setCurrentView('list');
    setEditingMenu(null);
    console.log('Menu saved:', menuData);
  };

  const handleEditMenu = (id: string) => {
    const menuToEdit = menus.find(menu => menu.id === id);
    if (menuToEdit) {
      setEditingMenu(menuToEdit);
      setCurrentView('edit');
    }
  };

  const handleDeleteMenu = (id: string) => {
    setMenus(prev => prev.filter(menu => menu.id !== id));
  };

  const handleDuplicateMenu = (id: string) => {
    const menuToDuplicate = menus.find(menu => menu.id === id);
    if (menuToDuplicate) {
      const now = new Date();
      const duplicatedMenu: Menu = {
        ...menuToDuplicate,
        id: Date.now().toString(),
        name: `${menuToDuplicate.name} (Copy)`,
        lastModified: now.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        }),
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
    editingMenu,
    
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
