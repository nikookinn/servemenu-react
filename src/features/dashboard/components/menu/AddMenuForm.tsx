import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  useTheme,
} from '@mui/material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface AddMenuFormProps {
  onBack: () => void;
  onSave: (menuData: { name: string; description: string }) => void;
}

export interface AddMenuFormRef {
  save: () => void;
}

const AddMenuForm = forwardRef<AddMenuFormRef, AddMenuFormProps>(({ onBack, onSave }, ref) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (field: 'name' | 'description') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      description: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Menu name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Menu name must be at least 2 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Menu description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.description;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        name: formData.name.trim(),
        description: formData.description.trim(),
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      handleSave();
    }
  };

  // Expose save method to parent component
  useImperativeHandle(ref, () => ({
    save: handleSave,
  }));

  return (
    <Box>
      {/* Form Content */}
      <Box
        sx={{
          background: mode === 'dark'
            ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: '1.1rem',
            }}
          >
            Add New Menu
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Menu Name Field */}
          <TextField
            label="Menu Name"
            placeholder="e.g., Main Menu, Breakfast Menu, Drinks Menu"
            value={formData.name}
            onChange={handleInputChange('name')}
            onKeyPress={handleKeyPress}
            error={!!errors.name}
            helperText={errors.name || 'Enter a descriptive name for your menu'}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.02)' 
                  : 'rgba(0, 0, 0, 0.02)',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: theme.palette.primary.main,
              },
            }}
          />

          {/* Menu Description Field */}
          <TextField
            label="Menu Description"
            placeholder="Describe what this menu contains and when it's available..."
            value={formData.description}
            onChange={handleInputChange('description')}
            onKeyPress={handleKeyPress}
            error={!!errors.description}
            helperText={errors.description || 'Provide a detailed description of this menu'}
            multiline
            rows={4}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.02)' 
                  : 'rgba(0, 0, 0, 0.02)',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: theme.palette.primary.main,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
});

AddMenuForm.displayName = 'AddMenuForm';

export default AddMenuForm;
