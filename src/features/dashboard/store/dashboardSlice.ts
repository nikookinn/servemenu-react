import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
  selectedStore: string;
  timePeriod: 'today' | 'week' | 'month';
  sidebarOpen: boolean;
  activeMenuTab: number;
  metrics: {
    totalOrders: number;
    revenue: number;
    customers: number;
    feedback: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  selectedStore: 'all',
  timePeriod: 'today',
  sidebarOpen: true,
  activeMenuTab: 0,
  metrics: {
    totalOrders: 1247,
    revenue: 24580,
    customers: 892,
    feedback: 4.8,
  },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedStore: (state, action: PayloadAction<string>) => {
      state.selectedStore = action.payload;
    },
    setTimePeriod: (state, action: PayloadAction<'today' | 'week' | 'month'>) => {
      state.timePeriod = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setActiveMenuTab: (state, action: PayloadAction<number>) => {
      state.activeMenuTab = action.payload;
    },
    updateMetrics: (state, action: PayloadAction<Partial<DashboardState['metrics']>>) => {
      state.metrics = { ...state.metrics, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSelectedStore,
  setTimePeriod,
  toggleSidebar,
  setSidebarOpen,
  setActiveMenuTab,
  updateMetrics,
  setLoading,
  setError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
