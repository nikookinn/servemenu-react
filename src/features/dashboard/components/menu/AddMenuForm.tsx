import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
} from '@mui/material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface AddMenuFormProps {
  onSave: (menuData: { name: string; description: string }) => void;
  editMode?: boolean;
  initialData?: {
    name: string;
    description: string;
  };
}

export interface AddMenuFormRef {
  save: () => void;
}

const AddMenuForm = forwardRef<AddMenuFormRef, AddMenuFormProps>(({ onSave, editMode = false, initialData }, ref) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
  });
  const [errors, setErrors] = useState({
    name: '',
    description: '',
  });

  // Update form data when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
      });
      // Clear any existing errors when switching to edit mode
      setErrors({
        name: '',
        description: '',
      });
    } else {
      // Reset form when switching back to add mode
      setFormData({
        name: '',
        description: '',
      });
      setErrors({
        name: '',
        description: '',
      });
    }
  }, [initialData, editMode]);

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
        {/* Header with Title and Save Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: '1.1rem',
              }}
            >
              {editMode ? 'Edit Menu' : 'Add New Menu'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
                mt: 0.5,
              }}
            >
              {editMode ? 'Update your menu details below' : 'Create a new menu for your restaurant'}
            </Typography>
          </Box>
          
          {/* Save Button */}
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.name.trim() || !formData.description.trim()}
            sx={{
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white',
              fontWeight: 600,
              px: 3,
              py: 1.5,
              borderRadius: 1,
              textTransform: 'none',
              fontSize: '0.875rem',
              minWidth: { xs: '100%', sm: 'auto' },
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
              '&:disabled': {
                background: mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
                color: mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'rgba(0, 0, 0, 0.3)',
                boxShadow: 'none',
                transform: 'none',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {editMode ? 'Update Menu' : 'Save Menu'}
          </Button>
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
