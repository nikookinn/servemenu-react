import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Add,
  Delete,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface ModifierOption {
  id: string;
  name: string;
  price: string;
  unit: string;
}

interface AddModifierFormProps {
  onSave: (modifierData: {
    name: string;
    type: 'optional' | 'required';
    allowMultiple: boolean;
    options: ModifierOption[];
  }) => void;
  editMode?: boolean;
  initialData?: {
    name: string;
    type: 'optional' | 'required';
    allowMultiple: boolean;
    options: ModifierOption[];
  };
}

export interface AddModifierFormRef {
  save: () => void;
}

const AddModifierForm = forwardRef<AddModifierFormRef, AddModifierFormProps>(({ onSave, editMode = false, initialData }, ref) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'optional' as 'optional' | 'required',
    allowMultiple: initialData?.allowMultiple || false,
  });
  const [options, setOptions] = useState<ModifierOption[]>(
    initialData?.options && initialData.options.length > 0 
      ? initialData.options 
      : [{ id: '1', name: '', price: '', unit: '' }]
  );
  const [errors, setErrors] = useState({
    name: '',
    options: '',
  });

  const handleInputChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const value = field === 'allowMultiple' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleOptionChange = (optionId: string, field: keyof ModifierOption, value: string) => {
    setOptions(prev => prev.map(option => 
      option.id === optionId ? { ...option, [field]: value } : option
    ));
    
    // Clear options error when user starts typing
    if (errors.options) {
      setErrors(prev => ({ ...prev, options: '' }));
    }
  };

  const addNewOption = () => {
    const newOption: ModifierOption = {
      id: Date.now().toString(),
      name: '',
      price: '',
      unit: '',
    };
    setOptions(prev => [...prev, newOption]);
  };

  const removeOption = (optionId: string) => {
    if (options.length > 1) {
      setOptions(prev => prev.filter(option => option.id !== optionId));
    }
  };

  const validateForm = () => {
    const newErrors = { name: '', options: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Modifier name is required';
    }
    
    const validOptions = options.filter(option => 
      option.name.trim() && option.price.trim() && option.unit.trim()
    );
    
    if (validOptions.length === 0) {
      newErrors.options = 'At least one complete modifier option is required';
    }
    
    setErrors(newErrors);
    return !newErrors.name && !newErrors.options;
  };

  const handleSave = () => {
    if (validateForm()) {
      const validOptions = options.filter(option => 
        option.name.trim() && option.price.trim() && option.unit.trim()
      );
      
      onSave({
        name: formData.name,
        type: formData.type,
        allowMultiple: formData.allowMultiple,
        options: validOptions,
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
              {editMode ? 'Edit Modifier' : 'Add New Modifier'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
                mt: 0.5,
              }}
            >
              {editMode ? 'Update your modifier details below' : 'Create modifier options for menu items'}
            </Typography>
          </Box>
          
          {/* Save Button */}
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.name.trim() || options.length === 0 || !options.every(opt => opt.name.trim() && opt.price.trim())}
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
            {editMode ? 'Update Modifier' : 'Save Modifier'}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Modifier Name Field */}
          <TextField
            label="Modifier Name"
            placeholder="e.g., Size, Toppings, Extras"
            value={formData.name}
            onChange={handleInputChange('name')}
            onKeyPress={handleKeyPress}
            error={!!errors.name}
            helperText={errors.name || 'Enter a descriptive name for this modifier group'}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: theme.palette.primary.main,
              },
            }}
          />

          {/* Type Selection */}
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              label="Type"
              onChange={handleInputChange('type')}
              sx={{
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                  borderWidth: 2,
                },
              }}
            >
              <MenuItem value="optional">Optional</MenuItem>
              <MenuItem value="required">Required</MenuItem>
            </Select>
          </FormControl>

          {/* Allow Multiple Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allowMultiple}
                onChange={handleInputChange('allowMultiple')}
                sx={{
                  color: theme.palette.primary.main,
                  '&.Mui-checked': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            }
            label="Allow adding same choice multiple times"
            sx={{
              '& .MuiFormControlLabel-label': {
                color: theme.palette.text.primary,
                fontSize: '0.875rem',
              },
            }}
          />

          {/* Modifier Options Section */}
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: theme.palette.text.primary,
                fontSize: '1rem',
              }}
            >
              Modifier Options
            </Typography>
            
            {errors.options && (
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.error.main,
                  mb: 1.5,
                  display: 'block',
                }}
              >
                {errors.options}
              </Typography>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {options.map((option) => (
                <Box
                  key={option.id}
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'flex-start',
                    p: 1.5,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1.5,
                    background: mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.02)'
                      : 'rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <TextField
                    label="Name"
                    placeholder="e.g., Small, Large, Extra Cheese"
                    value={option.name}
                    onChange={(e) => handleOptionChange(option.id, 'name', e.target.value)}
                    size="small"
                    sx={{ flex: 2 }}
                  />
                  <TextField
                    label="Price"
                    placeholder="0.00"
                    value={option.price}
                    onChange={(e) => handleOptionChange(option.id, 'price', e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Unit"
                    placeholder="e.g., each, oz, ml"
                    value={option.unit}
                    onChange={(e) => handleOptionChange(option.id, 'unit', e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  {options.length > 1 && (
                    <IconButton
                      onClick={() => removeOption(option.id)}
                      size="small"
                      sx={{
                        color: theme.palette.error.main,
                        mt: 0.5,
                        '&:hover': {
                          backgroundColor: mode === 'dark'
                            ? 'rgba(244, 67, 54, 0.1)'
                            : 'rgba(244, 67, 54, 0.1)',
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>

            {/* Add Option Button */}
            <Button
              startIcon={<Add />}
              variant="outlined"
              size="small"
              onClick={addNewOption}
              sx={{
                mt: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                py: 0.75,
                px: 2,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.1)'
                    : 'rgba(79, 70, 229, 0.1)',
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              Add Option
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

AddModifierForm.displayName = 'AddModifierForm';

export default AddModifierForm;
