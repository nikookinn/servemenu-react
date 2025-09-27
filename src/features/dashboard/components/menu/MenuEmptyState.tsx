import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import {
  Add,
  MenuBook,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface MenuEmptyStateProps {
  onAddMenu: () => void;
}

const MenuEmptyState: React.FC<MenuEmptyStateProps> = ({ onAddMenu }) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 4,
        background: mode === 'dark'
          ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: mode === 'dark'
            ? 'rgba(99, 102, 241, 0.1)'
            : 'rgba(79, 70, 229, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 3,
          border: `2px solid ${mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)'}`,
        }}
      >
        <MenuBook
          sx={{
            fontSize: 40,
            color: theme.palette.primary.main,
            opacity: 0.8,
          }}
        />
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: theme.palette.text.primary,
          fontSize: { xs: '1.5rem', md: '2rem' },
        }}
      >
        Create Your First Menu
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          mb: 4,
          maxWidth: 400,
          mx: 'auto',
          lineHeight: 1.6,
          fontSize: { xs: '0.95rem', md: '1rem' },
        }}
      >
        Start building your digital menu experience. Create your first menu to showcase your delicious offerings to customers.
      </Typography>
      <Button
        startIcon={<Add />}
        variant="contained"
        size="large"
        onClick={onAddMenu}
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          px: 4,
          py: 1.5,
          background: mode === 'dark'
            ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
            : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          boxShadow: mode === 'dark'
            ? '0 4px 20px rgba(99, 102, 241, 0.3)'
            : '0 4px 20px rgba(79, 70, 229, 0.3)',
          '&:hover': {
            background: mode === 'dark'
              ? 'linear-gradient(135deg, #5b5ff1 0%, #7c3aed 100%)'
              : 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
            boxShadow: mode === 'dark'
              ? '0 6px 24px rgba(99, 102, 241, 0.4)'
              : '0 6px 24px rgba(79, 70, 229, 0.4)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Create Your First Menu
      </Button>
    </Box>
  );
};

export default MenuEmptyState;
