import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import { useDashboardTheme } from '../../../context/ThemeContext';
import { ItemFormData } from '../useItemManagement';

interface BasicInformationSectionProps {
  formData: ItemFormData;
  errors: Record<string, string>;
  onInputChange: (field: keyof ItemFormData, value: string | number | boolean | string[]) => void;
}

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  formData,
  errors,
  onInputChange,
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
        Basic Information
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Item Name - Full Width */}
        <TextField
          label="Item Name"
          placeholder="e.g., Grilled Salmon, Caesar Salad"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name || 'Enter item name'}
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
        
        {/* Description - Compact */}
        <TextField
          label="Description"
          placeholder="Describe ingredients and what makes it special..."
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
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

        {/* Size, Unit & Prep Time Row - Smart Layout */}
        <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            label="Size"
            placeholder="250"
            value={formData.size || ''}
            onChange={(e) => onInputChange('size', e.target.value)}
            error={!!errors.size}
            helperText={errors.size || 'Quantity'}
            type="number"
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
          />
          
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
            <InputLabel>Unit</InputLabel>
            <Select
              value={formData.unit || ''}
              onChange={(e) => onInputChange('unit', e.target.value)}
              label="Unit"
            >
              <MenuItem value="gram">gram</MenuItem>
              <MenuItem value="kg">kg</MenuItem>
              <MenuItem value="ml">ml</MenuItem>
              <MenuItem value="liter">liter</MenuItem>
              <MenuItem value="piece">piece</MenuItem>
              <MenuItem value="portion">portion</MenuItem>
              <MenuItem value="slice">slice</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Prep Time"
            placeholder="15"
            value={formData.preparationTime || ''}
            onChange={(e) => onInputChange('preparationTime', e.target.value)}
            error={!!errors.preparationTime}
            helperText={errors.preparationTime || 'Minutes'}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            }}
            sx={{
              flex: 1,
              minWidth: '100px',
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
        </Box>
      </Box>
    </Box>
  );
};

export default BasicInformationSection;
