import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, MenuItem } from '../../../shared/types';
import { SAMPLE_MENU_ITEMS } from '../../../shared/constants';

interface LandingState {
  mobileMenuOpen: boolean;
  selectedCategory: string;
  menuItems: MenuItem[];
  cart: CartItem[];
  selectedItem: MenuItem | null;
  itemModalOpen: boolean;
  cartDrawerOpen: boolean;
}

const initialState: LandingState = {
  mobileMenuOpen: false,
  selectedCategory: 'appetizers',
  menuItems: SAMPLE_MENU_ITEMS,
  cart: [],
  selectedItem: null,
  itemModalOpen: false,
  cartDrawerOpen: false,
};

const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenu: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedItem: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedItem = action.payload;
    },
    toggleItemModal: (state) => {
      state.itemModalOpen = !state.itemModalOpen;
    },
    setItemModal: (state, action: PayloadAction<boolean>) => {
      state.itemModalOpen = action.payload;
    },
    toggleCartDrawer: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
    },
    setCartDrawer: (state, action: PayloadAction<boolean>) => {
      state.cartDrawerOpen = action.payload;
    },
    addToCart: (state, action: PayloadAction<MenuItem>) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.cart = state.cart.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  toggleMobileMenu,
  setMobileMenu,
  setSelectedCategory,
  setSelectedItem,
  toggleItemModal,
  setItemModal,
  toggleCartDrawer,
  setCartDrawer,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} = landingSlice.actions;

export default landingSlice.reducer;
