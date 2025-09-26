import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createDashboardTheme } from '../theme/dashboardTheme';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useDashboardTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useDashboardTheme must be used within a DashboardThemeProvider');
  }
  return context;
};

interface DashboardThemeProviderProps {
  children: ReactNode;
}

export const DashboardThemeProvider: React.FC<DashboardThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    // Get saved theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('dashboard-theme');
    return (savedTheme as 'light' | 'dark') || 'dark';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('dashboard-theme', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    localStorage.setItem('dashboard-theme', mode);
  }, [mode]);

  const theme = createDashboardTheme(mode);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
