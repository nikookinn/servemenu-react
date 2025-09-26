import { createTheme, Theme } from '@mui/material/styles';

// Dashboard-specific theme that doesn't affect landing page
export const createDashboardTheme = (mode: 'light' | 'dark'): Theme => {
  const isDark = mode === 'dark';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#6366f1' : '#4f46e5',
        light: isDark ? '#8b5cf6' : '#7c3aed',
        dark: isDark ? '#4338ca' : '#3730a3',
      },
      secondary: {
        main: isDark ? '#f59e0b' : '#d97706',
        light: isDark ? '#fbbf24' : '#f59e0b',
        dark: isDark ? '#d97706' : '#b45309',
      },
      background: {
        default: isDark ? '#0a0a0a' : '#f8fafc',
        paper: isDark ? '#111111' : '#ffffff',
      },
      text: {
        primary: isDark ? '#ffffff' : '#1e293b',
        secondary: isDark ? '#a1a1aa' : '#64748b',
      },
      divider: isDark ? '#27272a' : '#e2e8f0',
      error: {
        main: '#ef4444',
      },
      warning: {
        main: '#f59e0b',
      },
      success: {
        main: '#10b981',
      },
      info: {
        main: '#3b82f6',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.6,
      },
      body1: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
          contained: {
            background: isDark 
              ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
              : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            boxShadow: isDark 
              ? '0 4px 20px rgba(99, 102, 241, 0.3)'
              : '0 4px 20px rgba(79, 70, 229, 0.3)',
            '&:hover': {
              background: isDark
                ? 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)'
                : 'linear-gradient(135deg, #3730a3 0%, #6d28d9 100%)',
              boxShadow: isDark
                ? '0 8px 32px rgba(99, 102, 241, 0.4)'
                : '0 8px 32px rgba(79, 70, 229, 0.4)',
            },
          },
          outlined: {
            borderColor: isDark ? '#374151' : '#d1d5db',
            color: isDark ? '#ffffff' : '#374151',
            '&:hover': {
              borderColor: isDark ? '#6366f1' : '#4f46e5',
              backgroundColor: isDark 
                ? 'rgba(99, 102, 241, 0.1)' 
                : 'rgba(79, 70, 229, 0.1)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            background: isDark 
              ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: isDark ? '1px solid #27272a' : '1px solid #e2e8f0',
            boxShadow: isDark 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: isDark 
                ? '0 16px 48px rgba(0, 0, 0, 0.4)'
                : '0 16px 48px rgba(0, 0, 0, 0.15)',
              border: isDark ? '1px solid #374151' : '1px solid #cbd5e1',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDark 
              ? 'rgba(10, 10, 10, 0.8)'
              : 'rgba(248, 250, 252, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: isDark ? '1px solid #27272a' : '1px solid #e2e8f0',
            boxShadow: isDark 
              ? '0 4px 20px rgba(0, 0, 0, 0.3)'
              : '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: isDark 
              ? 'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)'
              : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            borderRight: isDark ? '1px solid #27272a' : '1px solid #e2e8f0',
            backdropFilter: 'blur(20px)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            background: isDark
              ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
              : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            color: '#ffffff',
            fontWeight: 500,
            fontSize: '0.75rem',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '2px 8px',
            '&:hover': {
              backgroundColor: isDark 
                ? 'rgba(99, 102, 241, 0.1)'
                : 'rgba(79, 70, 229, 0.1)',
            },
            '&.Mui-selected': {
              backgroundColor: isDark 
                ? 'rgba(99, 102, 241, 0.2)'
                : 'rgba(79, 70, 229, 0.2)',
              '&:hover': {
                backgroundColor: isDark 
                  ? 'rgba(99, 102, 241, 0.3)'
                  : 'rgba(79, 70, 229, 0.3)',
              },
            },
          },
        },
      },
    },
  });
};
