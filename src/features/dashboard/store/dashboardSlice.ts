import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VisibilitySettings } from '../components/visibility/VisibilitySettingsPage';

// Menu Interface
export interface Menu {
  id: string;
  name: string;
  description?: string;
  itemCount: number;
  status: 'active' | 'inactive' | 'draft';
  lastModified: string;
}

// Modifier Interface
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

// Category Interface - Complete
export interface Category {
  id: string;
  name: string;
  description?: string;
  itemCount: number;
  status: 'active' | 'inactive' | 'draft';
  lastModified: string;
  selectedModifiers?: string[];
  taxCategory?: string;
  visibilitySettings?: VisibilitySettings;
}

// Category Form Data Interface
export interface CategoryFormData {
  name: string;
  description: string;
  selectedModifiers: string[];
  taxCategory: string;
}

// Price Option Interface
export interface PriceOption {
  id: string;
  name: string;
  price: number;
  unit?: string;
}

// Selected Modifier Interface
export interface SelectedModifier {
  id: string;
  name: string;
  type: 'optional' | 'required';
  selectedOptions: string[];
}

// Item Interface - Extended with all properties
export interface Item {
  id: string;
  name: string;
  description?: string;
  category: string;
  images?: string[];
  status: 'available' | 'unavailable';
  lastModified: string;
  
  // Price Options
  priceOptions: PriceOption[];
  
  // Labels and Display
  labels?: string[];
  displayOptions?: string[];
  
  // Size and Unit
  size?: number;
  unit?: string;
  
  // Preparation Time
  preparationTime?: number;
  
  // Ingredient Warnings
  ingredientWarnings?: string[];
  
  // Tax Category
  taxCategory?: string;
  
  // Item Settings
  isSoldOut?: boolean;
  isAvailable?: boolean;
  isFeatured?: boolean;
  
  // Recommended Items
  recommendedItems?: string[];
  
  // Modifiers
  selectedModifiers?: SelectedModifier[];
  
  // Visibility Settings
  visibilitySettings?: VisibilitySettings;
}

// Item Form Data Interface
export interface ItemFormData {
  name: string;
  description: string;
  priceOptions: PriceOption[];
  labels: string[];
  displayOptions: string[];
  size: number | string;
  unit: string;
  preparationTime: number | string;
  ingredientWarnings: string[];
  taxCategory: string;
  isSoldOut: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  recommendedItems: string[];
  selectedModifiers: SelectedModifier[];
  images: string[];
}

// Archived Item Interface
export interface ArchivedItem {
  id: string;
  name: string;
  itemCount: number;
  status: 'active' | 'inactive' | 'draft';
  lastModified: string;
  type: 'menu'; // Sadece menu archive edilebilir
  deletedAt: string;
}

// UI State Interface
export interface UIState {
  // Menu Management
  menuCurrentView: 'list' | 'add' | 'edit';
  editingMenu: Menu | null;
  
  // Modifier Management  
  modifierCurrentView: 'list' | 'add' | 'edit';
  editingModifier: ModifierData | null;
  
  // Category Management
  categoryCurrentView: 'list' | 'add' | 'edit';
  editingCategory: Category | null;
  
  // Item Management
  itemCurrentView: 'list' | 'add' | 'edit';
  editingItem: Item | null;
  selectedItems: string[];
  searchQuery: string;
  
  // Calendar & Date Range
  calendarAnchor: boolean;
  dateRange: { startDate: string; endDate: string; };
  
  // Delete Dialogs
  deleteDialog: {
    open: boolean;
    itemId: string;
    itemName: string;
    itemType: 'menu' | 'modifier' | 'item' | 'category';
    mode: 'single' | 'bulk';
    selectedIds: string[];
  };
  
  // Visibility Settings
  visibilityView: {
    isOpen: boolean;
    item: any | null;
    type: 'category' | 'item' | null;
  };

  // Tab Management
  activeTab: number;

  // Permanent Delete Dialog
  permanentDeleteDialog: {
    open: boolean;
    itemId: string;
    itemName: string;
    itemType: 'menu' | 'modifier' | 'category';
  };

  // Theme Management
  themeMode: 'light' | 'dark';
}

// Dashboard State Interface
export interface DashboardState {
  // Core Dashboard State
  selectedStore: string;
  timePeriod: 'today' | 'week' | 'month';
  sidebarOpen: boolean;
  
  // Data State
  menus: Menu[];
  modifiers: ModifierData[];
  categories: Category[];
  items: Item[];
  archivedItems: ArchivedItem[];
  
  // Selected Category State
  selectedCategory: Category | null;
  
  // UI State
  ui: UIState;
}

// Initial State
const initialState: DashboardState = {
  // Core Dashboard State
  selectedStore: 'all',
  timePeriod: 'today',
  sidebarOpen: false,
  
  // Data State
  menus: [
    {
      id: '1',
      name: 'Ana Menü',
      description: 'Restoranımızın ana menüsü',
      itemCount: 25,
      status: 'active',
      lastModified: '15.01.2024',
    },
    {
      id: '2',
      name: 'Kahvaltı Menüsü',
      description: 'Sabah saatleri için özel kahvaltı seçenekleri',
      itemCount: 12,
      status: 'active',
      lastModified: '14.01.2024',
    },
    {
      id: '3',
      name: 'İçecek Menüsü',
      description: 'Sıcak ve soğuk içecek seçenekleri',
      itemCount: 18,
      status: 'draft',
      lastModified: '13.01.2024',
    },
  ],
  modifiers: [
    {
      id: '1',
      name: 'Boyut',
      type: 'required',
      allowMultiple: false,
      options: [
        { id: '1', name: 'Küçük', price: 0 },
        { id: '2', name: 'Orta', price: 5 },
        { id: '3', name: 'Büyük', price: 10 },
      ],
    },
    {
      id: '2',
      name: 'Ekstra Malzemeler',
      type: 'optional',
      allowMultiple: true,
      options: [
        { id: '1', name: 'Peynir', price: 3 },
        { id: '2', name: 'Domates', price: 2 },
        { id: '3', name: 'Marul', price: 1 },
      ],
    },
  ],
  categories: [
    {
      id: '1',
      name: 'Ana Yemekler',
      description: 'Doyurucu ana yemek seçenekleri',
      itemCount: 12,
      status: 'active',
      lastModified: '15.01.2024',
      selectedModifiers: ['1', '2'],
      taxCategory: 'standard',
    },
    {
      id: '2',
      name: 'İçecekler',
      description: 'Sıcak ve soğuk içecek çeşitleri',
      itemCount: 8,
      status: 'active',
      lastModified: '14.01.2024',
      selectedModifiers: ['1'],
      taxCategory: 'standard',
    },
    {
      id: '3',
      name: 'Tatlılar',
      description: 'Ev yapımı tatlı seçenekleri',
      itemCount: 6,
      status: 'active',
      lastModified: '13.01.2024',
      selectedModifiers: [],
      taxCategory: 'reduced',
    },
  ],
  items: [],
  archivedItems: [],
  
  // Selected Category State - Default to first category
  selectedCategory: {
    id: '1',
    name: 'Ana Yemekler',
    description: 'Doyurucu ana yemek seçenekleri',
    itemCount: 12,
    status: 'active' as const,
    lastModified: '15.01.2024',
    selectedModifiers: ['1', '2'],
    taxCategory: 'standard',
  },
  
  // UI State
  ui: {
    // Menu Management
    menuCurrentView: 'list',
    editingMenu: null,
    
    // Modifier Management
    modifierCurrentView: 'list',
    editingModifier: null,
    
    // Category Management
    categoryCurrentView: 'list',
    editingCategory: null,
    
    // Item Management
    itemCurrentView: 'list',
    editingItem: null,
    selectedItems: [],
    searchQuery: '',
    
    // Calendar & Date Range
    calendarAnchor: false,
    dateRange: { startDate: '', endDate: '' },
    
    // Delete Dialogs
    deleteDialog: {
      open: false,
      itemId: '',
      itemName: '',
      itemType: 'menu' as 'menu' | 'modifier' | 'item' | 'category',
      mode: 'single' as 'single' | 'bulk',
      selectedIds: [],
    },
    
    // Visibility Settings
    visibilityView: {
      isOpen: false,
      item: null,
      type: null,
    },

    // Tab Management
    activeTab: 0,

    // Permanent Delete Dialog
    permanentDeleteDialog: {
      open: false,
      itemId: '',
      itemName: '',
      itemType: 'menu',
    },

    // Theme Management
    themeMode: (() => {
      // Get saved theme from localStorage or default to dark
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('dashboard-theme');
        return (savedTheme as 'light' | 'dark') || 'dark';
      }
      return 'dark';
    })(),
  },
};

// Dashboard Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Core Dashboard Actions
    setSelectedStore: (state, action: PayloadAction<string>) => {
      state.selectedStore = action.payload;
    },
    setTimePeriod: (state, action: PayloadAction<'today' | 'week' | 'month'>) => {
      state.timePeriod = action.payload;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },

    // Theme Actions
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.ui.themeMode = action.payload;
      // Also save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('dashboard-theme', action.payload);
      }
    },
    toggleTheme: (state) => {
      const newMode = state.ui.themeMode === 'light' ? 'dark' : 'light';
      state.ui.themeMode = newMode;
      // Also save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('dashboard-theme', newMode);
      }
    },

    // Menu Management Actions
    setMenuCurrentView: (state, action: PayloadAction<'list' | 'add' | 'edit'>) => {
      state.ui.menuCurrentView = action.payload;
    },
    setEditingMenu: (state, action: PayloadAction<Menu | null>) => {
      state.ui.editingMenu = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.menus.unshift(action.payload); // Add to beginning
    },
    updateMenu: (state, action: PayloadAction<Menu>) => {
      const index = state.menus.findIndex(menu => menu.id === action.payload.id);
      if (index !== -1) {
        state.menus[index] = action.payload;
      }
    },
    deleteMenu: (state, action: PayloadAction<string>) => {
      state.menus = state.menus.filter(menu => menu.id !== action.payload);
    },

    // Modifier Management Actions
    setModifierCurrentView: (state, action: PayloadAction<'list' | 'add' | 'edit'>) => {
      state.ui.modifierCurrentView = action.payload;
    },
    setEditingModifier: (state, action: PayloadAction<ModifierData | null>) => {
      state.ui.editingModifier = action.payload;
    },
    addModifier: (state, action: PayloadAction<ModifierData>) => {
      state.modifiers.unshift(action.payload); // Add to beginning
    },
    updateModifier: (state, action: PayloadAction<ModifierData>) => {
      const index = state.modifiers.findIndex(modifier => modifier.id === action.payload.id);
      if (index !== -1) {
        state.modifiers[index] = action.payload;
      }
    },
    deleteModifier: (state, action: PayloadAction<string>) => {
      state.modifiers = state.modifiers.filter(modifier => modifier.id !== action.payload);
    },

    // Category Management Actions
    setCategoryCurrentView: (state, action: PayloadAction<'list' | 'add' | 'edit'>) => {
      state.ui.categoryCurrentView = action.payload;
    },
    setEditingCategory: (state, action: PayloadAction<Category | null>) => {
      state.ui.editingCategory = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.unshift(action.payload); // Add to beginning
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    },
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
    reorderCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },

    // Item Management Actions
    setItemCurrentView: (state, action: PayloadAction<'list' | 'add' | 'edit'>) => {
      state.ui.itemCurrentView = action.payload;
    },
    setEditingItem: (state, action: PayloadAction<Item | null>) => {
      state.ui.editingItem = action.payload;
    },
    setSelectedItems: (state, action: PayloadAction<string[]>) => {
      state.ui.selectedItems = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.ui.searchQuery = action.payload;
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.unshift(action.payload); // Add to beginning
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    duplicateItem: (state, action: PayloadAction<Item>) => {
      state.items.unshift(action.payload); // Add duplicate to beginning
    },
    reorderItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    bulkDeleteItems: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter(item => !action.payload.includes(item.id));
    },
    bulkCopyItems: (state, action: PayloadAction<{ items: Item[]; targetCategoryId: string }>) => {
      const { items, targetCategoryId } = action.payload;
      const copiedItems = items.map(item => ({
        ...item,
        id: `${item.id}_copy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        category: targetCategoryId,
        lastModified: new Date().toLocaleDateString('tr-TR'),
      }));
      state.items.unshift(...copiedItems);
    },
    bulkMoveItems: (state, action: PayloadAction<{ itemIds: string[]; targetCategoryId: string }>) => {
      const { itemIds, targetCategoryId } = action.payload;
      state.items = state.items.map(item => 
        itemIds.includes(item.id) 
          ? { ...item, category: targetCategoryId, lastModified: new Date().toLocaleDateString('tr-TR') }
          : item
      );
    },
    toggleItemSelection: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.ui.selectedItems.indexOf(itemId);
      if (index > -1) {
        state.ui.selectedItems.splice(index, 1);
      } else {
        state.ui.selectedItems.push(itemId);
      }
    },
    selectAllItems: (state, action: PayloadAction<string[]>) => {
      state.ui.selectedItems = action.payload;
    },
    clearItemSelection: (state) => {
      state.ui.selectedItems = [];
    },
    updateItemVisibility: (state, action: PayloadAction<{ itemId: string; visibilitySettings: VisibilitySettings }>) => {
      const { itemId, visibilitySettings } = action.payload;
      const index = state.items.findIndex(item => item.id === itemId);
      if (index !== -1) {
        state.items[index].visibilitySettings = visibilitySettings;
        state.items[index].lastModified = new Date().toLocaleDateString('tr-TR');
      }
    },

    // Archived Items Actions
    addArchivedItem: (state, action: PayloadAction<ArchivedItem>) => {
      state.archivedItems.unshift(action.payload); // Add to beginning
    },
    restoreArchivedItem: (state, action: PayloadAction<string>) => {
      state.archivedItems = state.archivedItems.filter(item => item.id !== action.payload);
    },
    permanentlyDeleteArchivedItem: (state, action: PayloadAction<string>) => {
      state.archivedItems = state.archivedItems.filter(item => item.id !== action.payload);
    },

    // Calendar & Date Range Actions
    setCalendarAnchor: (state, action: PayloadAction<boolean>) => {
      state.ui.calendarAnchor = action.payload;
    },
    setDateRange: (state, action: PayloadAction<{ startDate: string; endDate: string; }>) => {
      state.ui.dateRange = action.payload;
    },

    // Delete Dialog Actions
    openDeleteDialog: (state, action: PayloadAction<{ itemId: string; itemName: string; itemType: 'menu' | 'modifier' | 'item' | 'category'; mode?: 'single' | 'bulk'; selectedIds?: string[] }>) => {
      state.ui.deleteDialog = {
        open: true,
        ...action.payload,
        mode: action.payload.mode || 'single',
        selectedIds: action.payload.selectedIds || [action.payload.itemId],
      };
    },
    closeDeleteDialog: (state) => {
      state.ui.deleteDialog = {
        open: false,
        itemId: '',
        itemName: '',
        itemType: 'menu',
        mode: 'single',
        selectedIds: [],
      };
    },

    // Visibility Settings Actions
    openVisibilityView: (state, action: PayloadAction<{ item: any; type: 'category' | 'item' }>) => {
      state.ui.visibilityView = {
        isOpen: true,
        ...action.payload,
      };
    },
    closeVisibilityView: (state) => {
      state.ui.visibilityView = {
        isOpen: false,
        item: null,
        type: null,
      };
    },

    // Tab Management Actions
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.ui.activeTab = action.payload;
    },

    // Permanent Delete Dialog Actions
    openPermanentDeleteDialog: (state, action: PayloadAction<{ itemId: string; itemName: string; itemType: 'menu' | 'modifier' | 'category' }>) => {
      state.ui.permanentDeleteDialog = {
        open: true,
        ...action.payload,
      };
    },
    closePermanentDeleteDialog: (state) => {
      state.ui.permanentDeleteDialog = {
        open: false,
        itemId: '',
        itemName: '',
        itemType: 'menu',
      };
    },
  },
});

// Export actions
export const {
  // Core Dashboard Actions
  setSelectedStore,
  setTimePeriod,
  setSidebarOpen,

  // Theme Actions
  setThemeMode,
  toggleTheme,

  // Menu Management Actions
  setMenuCurrentView,
  setEditingMenu,
  addMenu,
  updateMenu,
  deleteMenu,

  // Modifier Management Actions
  setModifierCurrentView,
  setEditingModifier,
  addModifier,
  updateModifier,
  deleteModifier,

  // Category Management Actions
  setCategoryCurrentView,
  setEditingCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  setSelectedCategory,
  reorderCategories,

  // Item Management Actions
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
  updateItemVisibility,

  // Archived Items Actions
  addArchivedItem,
  restoreArchivedItem,
  permanentlyDeleteArchivedItem,

  // Calendar & Date Range Actions
  setCalendarAnchor,
  setDateRange,

  // Delete Dialog Actions
  openDeleteDialog,
  closeDeleteDialog,

  // Visibility Settings Actions
  openVisibilityView,
  closeVisibilityView,

  // Tab Management Actions
  setActiveTab,

  // Permanent Delete Dialog Actions
  openPermanentDeleteDialog,
  closePermanentDeleteDialog,
} = dashboardSlice.actions;

// Export reducer
export default dashboardSlice.reducer;
