import React from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Autocomplete,
  TextField,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDashboardTheme } from '../../../context/ThemeContext';
import { ItemFormData } from '../useItemManagement';

interface ItemSettingsSectionProps {
  formData: ItemFormData;
  isSoldOut: boolean;
  isFeatured: boolean;
  onInputChange: (field: keyof ItemFormData, value: string | number | boolean | string[]) => void;
  onSoldOutChange: (value: boolean) => void;
  onFeaturedChange: (value: boolean) => void;
}

const ItemSettingsSection: React.FC<ItemSettingsSectionProps> = ({
  formData,
  isSoldOut,
  isFeatured,
  onInputChange,
  onSoldOutChange,
  onFeaturedChange,
}) => {
  const { mode } = useDashboardTheme();

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: mode === 'dark' ? '#ffffff' : '#1a202c',
          mb: 2,
        }}
      >
        Item Settings
      </Typography>
      
      {/* Switches Row - Side by Side */}
      <Box sx={{ 
        display: 'flex', 
        gap: 3, 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'flex-start'
      }}>
        <FormControlLabel
          control={
            <Switch
              checked={!isSoldOut}
              onChange={(e) => {
                onSoldOutChange(!e.target.checked);
                onInputChange('isAvailable', e.target.checked);
              }}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#10b981',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#10b981',
                },
              }}
            />
          }
          label="Available for customers"
          sx={{
            color: mode === 'dark' ? '#ffffff' : '#1a202c',
            m: 0,
          }}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={isFeatured}
              onChange={(e) => onFeaturedChange(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#f59e0b',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#f59e0b',
                },
              }}
            />
          }
          label="Featured item"
          sx={{
            color: mode === 'dark' ? '#ffffff' : '#1a202c',
            m: 0,
          }}
        />
      </Box>

      {/* Tax Category & Warnings - Compact Row */}
      <Box sx={{ mt: 1.5, display: 'flex', gap: 1.5, flexDirection: { xs: 'column', md: 'row' } }}>
        <FormControl 
          sx={{ 
            flex: 1,
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
        >
          <InputLabel>Tax Category</InputLabel>
          <Select
            value={formData.taxCategory || ''}
            onChange={(e) => onInputChange('taxCategory', e.target.value)}
            label="Tax Category"
          >
            <MenuItem value="standard">Standard Rate</MenuItem>
            <MenuItem value="reduced">Reduced Rate</MenuItem>
            <MenuItem value="zero">Zero Rate</MenuItem>
            <MenuItem value="exempt">Exempt</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          multiple
          options={['Contains Nuts', 'Dairy', 'Gluten', 'Eggs', 'Soy', 'Spicy', 'Hot']}
          value={formData.ingredientWarnings || []}
          onChange={(_, newValue) => onInputChange('ingredientWarnings', newValue)}
          sx={{ flex: 1.5 }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="filled"
                label={option}
                {...getTagProps({ index })}
                key={option}
                size="small"
                sx={{
                  bgcolor: mode === 'dark' ? '#dc2626' : '#ef4444',
                  color: '#ffffff',
                  fontWeight: 600,
                  '& .MuiChip-deleteIcon': {
                    color: '#ffffff',
                    '&:hover': {
                      color: '#f3f4f6',
                    },
                  },
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Warnings"
              placeholder="Allergen warnings"
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
      </Box>

      {/* Recommended Items - Compact */}
      <Box sx={{ mt: 1.5 }}>
        <Autocomplete
          multiple
          options={['Caesar Salad', 'French Fries', 'Garlic Bread', 'Soft Drinks', 'Wine']}
          value={formData.recommendedItems || []}
          onChange={(_, newValue) => onInputChange('recommendedItems', newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="filled"
                label={option}
                {...getTagProps({ index })}
                key={option}
                size="small"
                sx={{
                  bgcolor: mode === 'dark' ? '#059669' : '#10b981',
                  color: '#ffffff',
                  fontWeight: 600,
                  '& .MuiChip-deleteIcon': {
                    color: '#ffffff',
                    '&:hover': {
                      color: '#f3f4f6',
                    },
                  },
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Recommended Items"
              placeholder="Suggest complementary items"
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
      </Box>
    </Box>
  );
};

export default ItemSettingsSection;
