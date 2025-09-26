import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Premium indigo
      light: '#8b5cf6', // Light purple
      dark: '#4338ca', // Dark indigo
    },
    secondary: {
      main: '#f59e0b', // Premium gold/amber
      light: '#fbbf24',
      dark: '#d97706',
    },
    background: {
      default: '#0a0a0a', // Deep black
      paper: '#111111', // Dark charcoal
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa', // Zinc-400
    },
    divider: '#27272a', // Zinc-800
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
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
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
          borderRadius: 12,
          padding: '12px 32px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
          },
        },
        outlined: {
          borderColor: '#374151',
          color: '#ffffff',
          '&:hover': {
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)',
          border: '1px solid #27272a',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7)',
            border: '1px solid #374151',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #27272a',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: '#ffffff',
          fontWeight: 600,
        },
      },
    },
  },
});
