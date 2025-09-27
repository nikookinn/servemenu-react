import React from 'react';
import {
  Card,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface AddNewMenuCardProps {
  onClick: () => void;
}

const AddNewMenuCard: React.FC<AddNewMenuCardProps> = ({ onClick }) => {
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
            ? 'linear-gradient(145deg, #1a1a1a 0%, #222222 100%)'
            : 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
        },
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          boxShadow: mode === 'dark'
            ? '0 8px 32px rgba(99, 102, 241, 0.4)'
            : '0 8px 32px rgba(79, 70, 229, 0.3)',
        }}
      >
        <Add
          sx={{
            fontSize: 32,
            color: 'white',
          }}
        />
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
        Add New Menu
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          textAlign: 'center',
          fontSize: '0.875rem',
        }}
      >
        Create a new menu for your restaurant
      </Typography>
    </Card>
  );
};

export default AddNewMenuCard;
