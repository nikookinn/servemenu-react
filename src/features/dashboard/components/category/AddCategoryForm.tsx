import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import {
  ArrowBack,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';
import { Category, CategoryFormData } from '../../store/dashboardSlice';
import { useAppSelector } from '../../../../app/hooks';
import { ModifierData } from '../../store/dashboardSlice';

export interface AddCategoryFormRef {
  save: () => void;
}

interface AddCategoryFormProps {
  initialData?: Category | null;
  onBack: () => void;
  onSave: (data: CategoryFormData) => void;
}


const AddCategoryForm = forwardRef<AddCategoryFormRef, AddCategoryFormProps>(({
  initialData,
  onBack,
  onSave,
}, ref) => {
  const { mode } = useDashboardTheme();
  
  // Get modifiers from Redux store
  const modifiers = useAppSelector(state => state.dashboard.modifiers);
  
  // Form state
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    selectedModifiers: [],
    taxCategory: '',
  });
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Tax category options
  const taxCategories = [
    { value: 'standard', label: 'Standard Rate' },
    { value: 'reduced', label: 'Reduced Rate' },
    { value: 'zero', label: 'Zero Rate' },
    { value: 'exempt', label: 'Exempt' }
  ];

  // All modifiers are available for selection
  const availableModifiers: ModifierData[] = modifiers;

  // Initialize form with existing data
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || '',
        selectedModifiers: (initialData as any).selectedModifiers || [],
        taxCategory: (initialData as any).taxCategory || '',
      });
      setErrors({});
    } else {
      // Reset form for add mode
      setFormData({
        name: '',
        description: '',
        selectedModifiers: [],
        taxCategory: '',
      });
      setErrors({});
    }
  }, [initialData]);

  // Expose save method to parent
  useImperativeHandle(ref, () => ({
    save: handleSave
  }));

  const handleInputChange = (field: keyof CategoryFormData, value: string | string[]) => {
    setFormData((prev: CategoryFormData) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    const fieldName = field as string;
    if (errors[fieldName]) {
      setErrors((prev: Record<string, string>) => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic Information validation
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Category name is required (minimum 2 characters)';
    }
    
    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = 'Description is required (minimum 10 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: mode === 'dark'
          ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        backdropFilter: 'blur(10px)',
        border: mode === 'dark' 
          ? '1px solid rgba(255, 255, 255, 0.12)' 
          : '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 2,
        overflow: 'hidden',
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          borderBottom: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.12)' 
            : '1px solid rgba(0, 0, 0, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 0 },
        }}
      >
        {/* Left: Back button and breadcrumb */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <IconButton
            onClick={onBack}
            sx={{
              background: mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
              color: mode === 'dark' ? '#ffffff' : '#1a202c',
              '&:hover': {
                background: mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: mode === 'dark' ? '#ffffff' : '#1a202c',
                mb: 0.5,
              }}
            >
              {initialData ? 'Edit Category' : 'Add New Category'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: mode === 'dark' ? '#94a3b8' : '#64748b',
              }}
            >
              Categories / {initialData ? 'Edit Category' : 'Add New Category'}
            </Typography>
          </Box>
        </Box>

        {/* Right: Save button */}
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            fontWeight: 600,
            textTransform: 'none',
            px: 3,
            py: 1,
            borderRadius: 1.5,
            width: { xs: '100%', md: 'auto' },
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {initialData ? 'Update Category' : 'Save Category'}
        </Button>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: mode === 'dark' ? '#ffffff' : '#1a202c',
              mb: 2,
            }}
          >
            Category Details
          </Typography>

          {/* Category Name Field */}
          <TextField
            label="Category Name"
            placeholder="e.g., Appetizers, Main Courses, Desserts"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name || 'Enter category name'}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.02)' 
                  : 'rgba(0, 0, 0, 0.02)',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6366f1',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6366f1',
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#6366f1',
              },
            }}
          />

          {/* Category Description Field */}
          <TextField
            label="Description"
            placeholder="Describe what this category contains and when it's available..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            error={!!errors.description}
            helperText={errors.description || 'Brief description'}
            multiline
            rows={2}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.02)' 
                  : 'rgba(0, 0, 0, 0.02)',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6366f1',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6366f1',
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#6366f1',
              },
            }}
          />

          {/* Modifier Groups Selection */}
          <Autocomplete
            multiple
            options={availableModifiers}
            getOptionLabel={(option) => option.name}
            value={availableModifiers.filter((mod: ModifierData) => formData.selectedModifiers.includes(mod.id))}
            onChange={(_, newValue) => {
              handleInputChange('selectedModifiers', newValue.map((mod: ModifierData) => mod.id));
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                  key={option.id}
                  sx={{
                    backgroundColor: mode === 'dark' 
                      ? 'rgba(99, 102, 241, 0.1)' 
                      : 'rgba(99, 102, 241, 0.05)',
                    borderColor: '#6366f1',
                    color: mode === 'dark' ? '#ffffff' : '#1a202c',
                    '& .MuiChip-deleteIcon': {
                      color: mode === 'dark' ? '#ffffff' : '#1a202c',
                    },
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Modifier Groups"
                placeholder="Select modifier groups..."
                helperText="Choose which modifier groups apply to items in this category"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.02)' 
                      : 'rgba(0, 0, 0, 0.02)',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#6366f1',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#6366f1',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#6366f1',
                  },
                }}
              />
            )}
          />

          {/* Tax Category Selection */}
          <FormControl fullWidth>
            <InputLabel
              sx={{
                '&.Mui-focused': {
                  color: '#6366f1',
                },
              }}
            >
              Tax Category
            </InputLabel>
            <Select
              value={formData.taxCategory}
              label="Tax Category"
              onChange={(e) => handleInputChange('taxCategory', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.02)' 
                    : 'rgba(0, 0, 0, 0.02)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6366f1',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6366f1',
                  borderWidth: 2,
                },
              }}
            >
              {taxCategories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Select the tax category that applies to items in this category
            </FormHelperText>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
});

AddCategoryForm.displayName = 'AddCategoryForm';

export default AddCategoryForm;
