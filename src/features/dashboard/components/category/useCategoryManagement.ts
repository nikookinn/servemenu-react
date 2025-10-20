import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { 
  addCategory, 
  updateCategory, 
  deleteCategory, 
  setCategoryCurrentView,
  setEditingCategory,
  setSelectedCategory,
  reorderCategories
} from '../../store/dashboardSlice';
import { VisibilitySettings } from '../visibility/VisibilitySettingsPage';
import { useToast } from '../../context/ToastContext';
import { Category, CategoryFormData } from '../../store/dashboardSlice';

// Re-export types for backward compatibility
export type { Category, CategoryFormData } from '../../store/dashboardSlice';

export const useCategoryManagement = (_menuId?: string) => {
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToast();
  
  // Get all state from Redux store
  const categories = useAppSelector(state => state.dashboard.categories || []);
  const currentView = useAppSelector(state => state.dashboard.ui.categoryCurrentView || 'list');
  const editingCategory = useAppSelector(state => state.dashboard.ui.editingCategory);
  const selectedCategory = useAppSelector(state => state.dashboard.selectedCategory);
  
  // Delete confirmation state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [categoryToDelete, setCategoryToDelete] = React.useState<Category | null>(null);

  const handleAddNewCategory = () => {
    dispatch(setCategoryCurrentView('add'));
  };

  const handleBackToList = () => {
    dispatch(setCategoryCurrentView('list'));
    dispatch(setEditingCategory(null));
  };

  const handleSaveCategory = (categoryData: CategoryFormData) => {
    const now = new Date();
    
    if (editingCategory) {
      // Update existing category
      const updatedCategory: Category = {
        ...editingCategory,
        name: categoryData.name,
        description: categoryData.description,
        selectedModifiers: categoryData.selectedModifiers,
        taxCategory: categoryData.taxCategory,
        lastModified: now.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        }),
      };
      
      dispatch(updateCategory(updatedCategory));
      
      // Toast mesajı göster
      showSuccess('Category updated successfully', `${updatedCategory.name} has been updated`);
    } else {
      // Create new category
      const newCategory: Category = {
        id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: categoryData.name,
        description: categoryData.description,
        itemCount: 0,
        status: 'active',
        lastModified: now.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        selectedModifiers: categoryData.selectedModifiers || [],
        visibilitySettings: {
          visibility: 'visible'
        }
      };
      
      dispatch(addCategory(newCategory));
      
      // Toast mesajı göster
      showSuccess('Category added successfully', `${newCategory.name} has been created`);
    }
    
    dispatch(setCategoryCurrentView('list'));
    dispatch(setEditingCategory(null));
    console.log('Category saved:', categoryData);
  };

  const handleEditCategory = (id: string) => {
    const categoryToEdit = categories.find((category: Category) => category.id === id);
    if (categoryToEdit) {
      dispatch(setEditingCategory(categoryToEdit));
      dispatch(setCategoryCurrentView('edit'));
    }
  };

  const handleDeleteCategory = (id: string) => {
    console.log('🗑️ handleDeleteCategory called with id:', id);
    console.log('📋 Current categories:', categories);
    
    // Categories are permanently deleted, not archived
    const categoryToDelete = categories.find(cat => cat.id === id);
    console.log('🔥 Dispatching deleteCategory action...');
    dispatch(deleteCategory(id));
    console.log('✅ Delete action dispatched');
    
    // Toast mesajı göster
    showSuccess('Category deleted successfully', `${categoryToDelete?.name || 'Category'} has been deleted`);
  };

  const handleDuplicateCategory = (id: string) => {
    try {
      const categoryToDuplicate = categories.find((category: Category) => category.id === id);
      if (!categoryToDuplicate) {
        showError('Category not found', 'The category you are trying to duplicate does not exist');
        return;
      }

      const now = new Date();
      const duplicatedCategory: Category = {
        ...categoryToDuplicate,
        id: Date.now().toString(),
        name: `${categoryToDuplicate.name} (Copy)`,
        lastModified: now.toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        }),
      };
      dispatch(addCategory(duplicatedCategory));
      
      // Toast mesajı göster
      showSuccess('Category duplicated successfully', `${duplicatedCategory.name} has been created`);
    } catch (error) {
      showError('Failed to duplicate category', 'An error occurred while duplicating the category');
      console.error('Error duplicating category:', error);
    }
  };

  const restoreCategory = (categoryData: Omit<Category, 'id'> & { id: string }) => {
    dispatch(addCategory(categoryData));
  };

  // Additional handlers for MenuDetailPage
  const handleSelectCategory = (category: Category) => {
    dispatch(setSelectedCategory(category));
    console.log('Selected category:', category);
  };

  const handleReorderCategories = (newOrder: Category[]) => {
    dispatch(reorderCategories(newOrder));
    console.log('Reorder categories:', newOrder);
  };

  const updateCategoryVisibility = (categoryId: string, visibilitySettings: VisibilitySettings) => {
    try {
      // Update category with new visibility settings
      const categoryToUpdate = categories.find((cat: Category) => cat.id === categoryId);
      if (!categoryToUpdate) {
        showError('Category not found', 'The category you are trying to update does not exist');
        return;
      }

      const updatedCategory = {
        ...categoryToUpdate,
        visibilitySettings
      };
      dispatch(updateCategory(updatedCategory));
      
      // Toast mesajı göster
      showSuccess('Category visibility updated', `${categoryToUpdate.name} visibility settings have been updated`);
    } catch (error) {
      showError('Failed to update visibility', 'An error occurred while updating category visibility');
      console.error('Error updating category visibility:', error);
    }
  };

  // Delete confirmation handlers
  const handleOpenDeleteConfirm = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setCategoryToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      handleDeleteCategory(categoryToDelete.id);
      setDeleteConfirmOpen(false);
      setCategoryToDelete(null);
    }
  };

  // selectedCategory is now from Redux store above

  return {
    // State
    categories,
    currentView,
    editingCategory,
    
    // Actions
    handleAddNewCategory,
    handleBackToList,
    handleSaveCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleDuplicateCategory,
    restoreCategory,
    handleSelectCategory,
    handleReorderCategories,
    updateCategoryVisibility,
    selectedCategory,
    
    // Delete confirmation state and handlers
    deleteConfirmOpen,
    categoryToDelete,
    onOpenDeleteConfirm: handleOpenDeleteConfirm,
    onCloseDeleteConfirm: handleCloseDeleteConfirm,
    onConfirmDelete: handleConfirmDelete,
    
    // Redux dispatch functions (for external use if needed)
    setCategoryCurrentView: (view: 'list' | 'add' | 'edit') => dispatch(setCategoryCurrentView(view)),
    setEditingCategory: (category: Category | null) => dispatch(setEditingCategory(category)),
  };
};
