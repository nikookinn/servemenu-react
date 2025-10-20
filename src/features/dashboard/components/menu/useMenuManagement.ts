import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { 
  addMenu, 
  updateMenu, 
  deleteMenu, 
  addArchivedItem,
  setMenuCurrentView,
  setEditingMenu
} from '../../store/dashboardSlice';
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
  const dispatch = useAppDispatch();
  
  // Get all state from Redux store
  const menus = useAppSelector(state => state.dashboard.menus);
  const currentView = useAppSelector(state => state.dashboard.ui.menuCurrentView);
  const editingMenu = useAppSelector(state => state.dashboard.ui.editingMenu);
  
  // Delete functionality
  const deleteOperations = useMenuDelete(menus);

  const handleAddNewMenu = () => {
    dispatch(setMenuCurrentView('add'));
  };

  const handleBackToList = () => {
    dispatch(setMenuCurrentView('list'));
    dispatch(setEditingMenu(null));
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
      
      dispatch(updateMenu(updatedMenu));
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
      
      dispatch(addMenu(newMenu));
    }
    
    dispatch(setMenuCurrentView('list'));
    dispatch(setEditingMenu(null));
    console.log('Menu saved:', menuData);
  };

  const handleEditMenu = (id: string) => {
    const menuToEdit = menus.find((menu: Menu) => menu.id === id);
    if (menuToEdit) {
      dispatch(setEditingMenu(menuToEdit));
      dispatch(setMenuCurrentView('edit'));
    }
  };

  const handleDeleteMenu = (id: string) => {
    // Find the menu to archive
    const menuToDelete = menus.find((menu: Menu) => menu.id === id);
    if (menuToDelete) {
      // Add to archived items
      dispatch(addArchivedItem({
        id: menuToDelete.id,
        name: menuToDelete.name,
        itemCount: menuToDelete.itemCount,
        status: menuToDelete.status,
        lastModified: menuToDelete.lastModified,
        type: 'menu',
        deletedAt: new Date().toISOString()
      }));
    }
    // Remove from menus
    dispatch(deleteMenu(id));
  };

  const handleDuplicateMenu = (id: string) => {
    const menuToDuplicate = menus.find((menu: Menu) => menu.id === id);
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
      dispatch(addMenu(duplicatedMenu));
    }
    console.log('Duplicate menu:', id);
  };

  const restoreMenu = (menuData: Omit<Menu, 'id'> & { id: string }) => {
    dispatch(addMenu(menuData));
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
    
    // Redux dispatch functions (for external use if needed)
    setMenuCurrentView: (view: 'list' | 'add' | 'edit') => dispatch(setMenuCurrentView(view)),
    setEditingMenu: (menu: Menu | null) => dispatch(setEditingMenu(menu)),
  };
};
