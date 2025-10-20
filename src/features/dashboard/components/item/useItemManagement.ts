import { useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { 
  setItemCurrentView, 
  setEditingItem, 
  setSelectedItems, 
  setSearchQuery,
  addItem,
  updateItem,
  deleteItem,
  duplicateItem,
  reorderItems,
  bulkDeleteItems,
  bulkCopyItems,
  bulkMoveItems,
  toggleItemSelection,
  selectAllItems,
  clearItemSelection,
  updateItemVisibility
} from '../../store/dashboardSlice';
import { ItemFormData, Item, PriceOption, SelectedModifier } from '../../store/dashboardSlice';
import { VisibilitySettings } from '../visibility/VisibilitySettingsPage';
import { useToast } from '../../context/ToastContext';

// Export types for use in components
export type { Item, ItemFormData, PriceOption, SelectedModifier };

export const useItemManagement = () => {
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToast();
  
  // Redux selectors
  const items = useAppSelector(state => state.dashboard.items);
  const categories = useAppSelector(state => state.dashboard.categories);
  const modifiers = useAppSelector(state => state.dashboard.modifiers);
  const currentView = useAppSelector(state => state.dashboard.ui.itemCurrentView);
  const editingItem = useAppSelector(state => state.dashboard.ui.editingItem);
  const selectedItems = useAppSelector(state => state.dashboard.ui.selectedItems);
  const searchQuery = useAppSelector(state => state.dashboard.ui.searchQuery);
  const deleteDialog = useAppSelector(state => state.dashboard.ui.deleteDialog);
  const visibilityView = useAppSelector(state => state.dashboard.ui.visibilityView);

  // Helper function to convert ItemFormData to Item
  const convertFormDataToItem = useCallback((formData: ItemFormData, categoryId: string): Omit<Item, 'id' | 'lastModified'> => {
    return {
      name: formData.name,
      description: formData.description || undefined,
      category: categoryId,
      images: formData.images.filter(img => img.trim() !== ''),
      status: formData.isAvailable ? 'available' : 'unavailable',
      priceOptions: formData.priceOptions.map(option => ({
        ...option,
        price: typeof option.price === 'string' ? parseFloat(option.price) || 0 : option.price,
      })),
      labels: formData.labels,
      displayOptions: formData.displayOptions,
      size: typeof formData.size === 'string' ? parseFloat(formData.size) || undefined : formData.size || undefined,
      unit: formData.unit || undefined,
      preparationTime: typeof formData.preparationTime === 'string' ? parseFloat(formData.preparationTime) || undefined : formData.preparationTime || undefined,
      ingredientWarnings: formData.ingredientWarnings,
      taxCategory: formData.taxCategory || undefined,
      isSoldOut: formData.isSoldOut,
      isAvailable: formData.isAvailable,
      isFeatured: formData.isFeatured,
      recommendedItems: formData.recommendedItems,
      selectedModifiers: formData.selectedModifiers,
    };
  }, []);

  // Helper function to convert Item to ItemFormData
  const convertItemToFormData = useCallback((item: Item): ItemFormData => {
    return {
      name: item.name,
      description: item.description || '',
      priceOptions: item.priceOptions || [{ id: '1', name: '', price: 0 }],
      labels: item.labels || [],
      displayOptions: item.displayOptions || [],
      size: item.size || '',
      unit: item.unit || 'piece',
      preparationTime: item.preparationTime || '',
      ingredientWarnings: item.ingredientWarnings || [],
      taxCategory: item.taxCategory || 'standard',
      isSoldOut: item.isSoldOut || false,
      isAvailable: item.isAvailable !== false, // Default to true if undefined
      isFeatured: item.isFeatured || false,
      recommendedItems: item.recommendedItems || [],
      selectedModifiers: item.selectedModifiers || [],
      images: item.images || [],
    };
  }, []);

  // Filtered items based on category and search
  const getFilteredItems = useCallback((categoryId?: string) => {
    let filteredItems = items;

    // Filter by category
    if (categoryId) {
      filteredItems = filteredItems.filter((item: Item) => item.category === categoryId);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredItems = filteredItems.filter((item: Item) =>
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    }

    return filteredItems;
  }, [items, searchQuery]);

  // CRUD Operations
  const handleAddItem = useCallback((formData: ItemFormData, categoryId: string) => {
    try {
      // Validation
      if (!formData.name.trim()) {
        showError('Item name is required', 'Please enter a valid item name');
        return;
      }
      
      if (!formData.priceOptions || formData.priceOptions.length === 0) {
        showError('Price is required', 'Please add at least one price option');
        return;
      }

      const newItem: Item = {
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...convertFormDataToItem(formData, categoryId),
        lastModified: new Date().toLocaleDateString('tr-TR'),
      };

      dispatch(addItem(newItem));
      dispatch(setItemCurrentView('list'));
      dispatch(setEditingItem(null));
      
      // Toast mesajı göster
      showSuccess('Item added successfully', `${newItem.name} has been added to the menu`);
    } catch (error) {
      showError('Failed to add item', 'An error occurred while adding the item');
      console.error('Error adding item:', error);
    }
  }, [dispatch, convertFormDataToItem, showSuccess, showError]);

  const handleUpdateItem = useCallback((formData: ItemFormData) => {
    try {
      if (!editingItem) {
        showError('No item selected', 'Please select an item to update');
        return;
      }

      // Validation
      if (!formData.name.trim()) {
        showError('Item name is required', 'Please enter a valid item name');
        return;
      }

      const updatedItem: Item = {
        ...editingItem,
        ...convertFormDataToItem(formData, editingItem.category),
        lastModified: new Date().toLocaleDateString('tr-TR'),
      };

      dispatch(updateItem(updatedItem));
      dispatch(setItemCurrentView('list'));
      dispatch(setEditingItem(null));
      
      // Toast mesajı göster
      showSuccess('Item updated successfully', `${updatedItem.name} has been updated`);
    } catch (error) {
      showError('Failed to update item', 'An error occurred while updating the item');
      console.error('Error updating item:', error);
    }
  }, [dispatch, editingItem, convertFormDataToItem, showSuccess, showError]);

  const handleDeleteItem = useCallback((itemId: string) => {
    try {
      const itemToDelete = items.find(item => item.id === itemId);
      
      if (!itemToDelete) {
        showError('Item not found', 'The item you are trying to delete does not exist');
        return;
      }

      dispatch(deleteItem(itemId));
      // Clear selection if deleted item was selected
      if (selectedItems.includes(itemId)) {
        const newSelection = selectedItems.filter((id: string) => id !== itemId);
        dispatch(setSelectedItems(newSelection));
      }
      
      // Toast mesajı göster
      showSuccess('Item deleted successfully', `${itemToDelete.name} has been deleted`);
    } catch (error) {
      showError('Failed to delete item', 'An error occurred while deleting the item');
      console.error('Error deleting item:', error);
    }
  }, [dispatch, selectedItems, items, showSuccess, showError]);

  const handleDuplicateItem = useCallback((item: Item) => {
    const duplicatedItem: Item = {
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${item.name} (Copy)`,
      lastModified: new Date().toLocaleDateString('tr-TR'),
    };

    dispatch(duplicateItem(duplicatedItem));
    
    // Toast mesajı göster
    showSuccess('Item duplicated successfully', `${duplicatedItem.name} has been created`);
  }, [dispatch, showSuccess]);

  // View Management
  const handleAddNewItem = useCallback(() => {
    dispatch(setItemCurrentView('add'));
    dispatch(setEditingItem(null));
  }, [dispatch]);

  const handleEditItem = useCallback((item: Item) => {
    dispatch(setEditingItem(item));
    dispatch(setItemCurrentView('edit'));
  }, [dispatch]);

  const handleBackToList = useCallback(() => {
    dispatch(setItemCurrentView('list'));
    dispatch(setEditingItem(null));
  }, [dispatch]);

  // Search Management
  const handleSearchChange = useCallback((query: string) => {
    dispatch(setSearchQuery(query));
  }, [dispatch]);

  // Selection Management
  const handleSelectItem = useCallback((itemId: string) => {
    dispatch(toggleItemSelection(itemId));
  }, [dispatch]);

  const handleSelectAllItems = useCallback((categoryId?: string) => {
    const filteredItems = getFilteredItems(categoryId);
    const allItemIds = filteredItems.map((item: Item) => item.id);
    dispatch(selectAllItems(allItemIds));
  }, [dispatch, getFilteredItems]);

  const handleClearSelection = useCallback(() => {
    dispatch(clearItemSelection());
  }, [dispatch]);

  // Bulk Operations
  const handleBulkDelete = useCallback(() => {
    try {
      if (selectedItems.length === 0) {
        showError('No items selected', 'Please select items to delete');
        return;
      }
      
      const itemsToDelete = items.filter((item: Item) => selectedItems.includes(item.id));
      if (itemsToDelete.length === 0) {
        showError('Selected items not found', 'The selected items could not be found');
        return;
      }

      // Bulk delete dialog'u parent component'te handle edilecek
      console.log('Bulk delete requested for:', selectedItems);
    } catch (error) {
      showError('Bulk delete failed', 'An error occurred during bulk delete operation');
      console.error('Error in bulk delete:', error);
    }
  }, [selectedItems, items, showError]);

  const handleConfirmBulkDelete = useCallback(() => {
    try {
      const itemsToDelete = items.filter((item: Item) => selectedItems.includes(item.id));
      
      console.log('🗑️ Confirming bulk delete for:', selectedItems);
      dispatch(bulkDeleteItems(selectedItems));
      console.log('🧹 Clearing selection...');
      dispatch(clearItemSelection());
      
      // Toast mesajı göster
      showSuccess(
        `${itemsToDelete.length} items deleted successfully`,
        `${itemsToDelete.length} items have been removed from the menu`
      );
    } catch (error) {
      showError('Failed to delete items', 'An error occurred while deleting the selected items');
      console.error('Error in bulk delete confirmation:', error);
    }
  }, [dispatch, selectedItems, items, showSuccess, showError]);

  const handleBulkCopy = useCallback((targetCategoryId: string) => {
    if (selectedItems.length === 0) return;

    const itemsToCopy = items.filter((item: Item) => selectedItems.includes(item.id));
    dispatch(bulkCopyItems({ items: itemsToCopy, targetCategoryId }));
    dispatch(clearItemSelection());
  }, [dispatch, selectedItems, items]);

  const handleBulkMove = useCallback((targetCategoryId: string) => {
    if (selectedItems.length === 0) return;

    dispatch(bulkMoveItems({ itemIds: selectedItems, targetCategoryId }));
    dispatch(clearItemSelection());
  }, [dispatch, selectedItems]);

  // Reordering
  const handleReorderItems = useCallback((newOrder: Item[]) => {
    dispatch(reorderItems(newOrder));
  }, [dispatch]);

  // Visibility Settings
  const handleVisibilitySettings = useCallback((item: Item) => {
    // Visibility view will be handled by parent component
    console.log('Visibility settings requested for:', item);
  }, []);

  const handleUpdateVisibility = useCallback((itemId: string, visibilitySettings: VisibilitySettings) => {
    const item = items.find(i => i.id === itemId);
    
    // Date objesini string'e çevir (Redux serialization için)
    const serializedSettings: any = {
      ...visibilitySettings,
      hideUntilDate: visibilitySettings.hideUntilDate 
        ? visibilitySettings.hideUntilDate.toISOString() 
        : undefined
    };
    
    dispatch(updateItemVisibility({ itemId, visibilitySettings: serializedSettings }));
    
    // Toast mesajı göster
    showSuccess('Visibility updated successfully', `${item?.name || 'Item'} visibility settings have been updated`);
  }, [dispatch, items, showSuccess]);

  // Delete Dialog Operations - Handled by parent component
  // These functions are no longer needed as dialog is handled externally

  // Save Item Operation (wrapper for add/update)
  const handleSaveItem = useCallback((formData: ItemFormData, categoryId?: string) => {
    if (editingItem) {
      handleUpdateItem(formData);
    } else if (categoryId) {
      handleAddItem(formData, categoryId);
    }
  }, [editingItem, handleUpdateItem, handleAddItem]);

  // Sample data generation for development
  const generateSampleItems = useCallback((categoryId: string, count: number = 10) => {
    const sampleItemNames = [
      'Margherita Pizza', 'Chicken Caesar Salad', 'Beef Burger', 'Fish & Chips',
      'Pasta Carbonara', 'Grilled Salmon', 'Vegetable Curry', 'Chocolate Cake',
      'Fresh Orange Juice', 'Cappuccino', 'Greek Salad', 'BBQ Ribs',
      'Mushroom Risotto', 'Chicken Wings', 'Ice Cream Sundae'
    ];

    const sampleDescriptions = [
      'Fresh and delicious', 'Made with premium ingredients', 'Chef\'s special recipe',
      'Popular choice', 'Homemade with love', 'Seasonal favorite'
    ];

    const sampleLabels = ['New', 'Bestseller', 'Spicy', 'Vegetarian', 'Popular'];
    const sampleDisplayOptions = ['Dine In', 'Takeaway', 'Delivery'];

    for (let i = 0; i < count; i++) {
      const randomName = sampleItemNames[Math.floor(Math.random() * sampleItemNames.length)];
      const randomDescription = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
      const randomPrice = Math.floor(Math.random() * 50) + 10;

      const sampleItem: Item = {
        id: `sample_item_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
        name: `${randomName} ${i + 1}`,
        description: randomDescription,
        category: categoryId,
        status: Math.random() > 0.2 ? 'available' : 'unavailable',
        lastModified: new Date().toLocaleDateString('tr-TR'),
        priceOptions: [
          {
            id: '1',
            name: '',
            price: randomPrice,
          }
        ],
        labels: [sampleLabels[Math.floor(Math.random() * sampleLabels.length)]],
        displayOptions: sampleDisplayOptions.slice(0, Math.floor(Math.random() * 3) + 1),
        isAvailable: Math.random() > 0.2,
        isFeatured: Math.random() > 0.7,
        preparationTime: Math.floor(Math.random() * 30) + 5,
      };

      dispatch(addItem(sampleItem));
    }
  }, [dispatch]);

  // Memoized computed values
  const itemStats = useMemo(() => {
    return {
      total: items.length,
      available: items.filter((item: Item) => item.status === 'available').length,
      unavailable: items.filter((item: Item) => item.status === 'unavailable').length,
      selected: selectedItems.length,
    };
  }, [items, selectedItems]);

  return {
    // State
    items,
    categories,
    modifiers,
    currentView,
    editingItem,
    selectedItems,
    searchQuery,
    deleteDialog,
    visibilityView,
    itemStats,

    // Helper functions
    getFilteredItems,
    convertFormDataToItem,
    convertItemToFormData,

    // CRUD operations
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleDuplicateItem,

    // View management
    handleAddNewItem,
    handleEditItem,
    handleBackToList,

    // Search
    handleSearchChange,

    // Selection
    handleSelectItem,
    handleSelectAllItems,
    handleClearSelection,

    // Bulk operations
    handleBulkDelete,
    handleConfirmBulkDelete,
    handleBulkCopy,
    handleBulkMove,

    // Reordering
    handleReorderItems,

    // Visibility
    handleVisibilitySettings,
    updateItemVisibility: handleUpdateVisibility,

    // Save Item
    handleSaveItem,

    // Development helpers
    generateSampleItems,
  };
};

export default useItemManagement;
