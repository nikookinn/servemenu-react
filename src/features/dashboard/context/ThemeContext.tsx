import React, { createContext, useContext, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createDashboardTheme } from '../theme/dashboardTheme';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleTheme } from '../store/dashboardSlice';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

const DashboardThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useDashboardTheme = () => {
  const context = useContext(DashboardThemeContext);
  if (context === undefined) {
    throw new Error('useDashboardTheme must be used within a DashboardThemeProvider');
  }
  return context;
};

interface DashboardThemeProviderProps {
  children: ReactNode;
}

export const DashboardThemeProvider: React.FC<DashboardThemeProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  
  // Get theme mode from Redux store
  const mode = useAppSelector(state => state.dashboard.ui.themeMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const theme = createDashboardTheme(mode);

  return (
    <DashboardThemeContext.Provider value={{ mode, toggleTheme: handleToggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </DashboardThemeContext.Provider>
  );
};
