import React from 'react';
import {
  Card,
  Typography,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import {
  Add,
  Tune,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface AddNewModifierCardProps {
  onClick: () => void;
}

export const AddNewModifierCard: React.FC<AddNewModifierCardProps> = ({ onClick }) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        height: '100%',
        minHeight: '200px',
        background: mode === 'dark'
          ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: `2px dashed ${theme.palette.primary.main}`,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: mode === 'dark'
            ? '0 16px 48px rgba(99, 102, 241, 0.3)'
            : '0 16px 48px rgba(79, 70, 229, 0.2)',
          borderColor: theme.palette.primary.dark,
          background: mode === 'dark'
            ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)'
            : 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
        },
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: mode === 'dark'
            ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
            : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          transition: 'all 0.3s ease',
        }}
      >
        <Add sx={{ fontSize: '2rem', color: 'white' }} />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          textAlign: 'center',
          mb: 1,
        }}
      >
        Add New Modifier
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          textAlign: 'center',
          fontSize: '0.875rem',
        }}
      >
        Create a new modifier
      </Typography>
    </Card>
  );
};

interface ModifierEmptyStateProps {
  onAddModifier: () => void;
}

export const ModifierEmptyState: React.FC<ModifierEmptyStateProps> = ({ onAddModifier }) => {
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
        <Tune
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
        No Modifiers Found
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
        Get started by creating your first modifier to customize menu items.
      </Typography>
      <Button
        startIcon={<Add />}
        variant="contained"
        size="large"
        onClick={onAddModifier}
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
        Create Your First Modifier
      </Button>
    </Box>
  );
};
