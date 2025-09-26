// Dashboard feature exports
export { default as DashboardLayout } from './components/layout/DashboardLayout';
export { default as DashboardPage } from './components/pages/DashboardPage';
export { default as MenuManagementPage } from './components/pages/MenuManagementPage';
export { default as DashboardHeader } from './components/layout/DashboardHeader';
export { default as DashboardSidebar } from './components/layout/DashboardSidebar';

// Theme and context exports
export { DashboardThemeProvider, useDashboardTheme } from './context/ThemeContext';
export { createDashboardTheme } from './theme/dashboardTheme';

// Store exports
export { default as dashboardReducer } from './store/dashboardSlice';
export * from './store/dashboardSlice';
