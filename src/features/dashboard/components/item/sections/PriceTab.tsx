import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import {
  Add,
  Delete,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../../context/ThemeContext';
import { ItemFormData } from '../useItemManagement';

// Form-specific PriceOption that allows string prices from inputs
interface FormPriceOption {
  id: string;
  name: string;
  price: string | number;
}

interface PriceTabProps {
  formData: ItemFormData;
  priceOptions: FormPriceOption[];
  errors: Record<string, string>;
  onInputChange: (field: keyof ItemFormData, value: string | number | boolean | string[]) => void;
  onAddPriceOption: () => void;
  onRemovePriceOption: (id: string) => void;
  onUpdatePriceOption: (id: string, field: keyof FormPriceOption, value: string | number) => void;
}

const PriceTab: React.FC<PriceTabProps> = ({
  priceOptions,
  errors,
  onAddPriceOption,
  onRemovePriceOption,
  onUpdatePriceOption,
}) => {
  const { mode } = useDashboardTheme();

  // Check if we're in simple mode (only one price option with empty name)
  const isSimpleMode = priceOptions.length === 1 && !priceOptions[0].name.trim();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Header with explanation */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: mode === 'dark' ? '#ffffff' : '#1a202c',
            mb: 1,
          }}
        >
          Price & Options
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: mode === 'dark' ? '#94a3b8' : '#64748b',
            mb: 2,
          }}
        >
          Set pricing for different sizes or variations. Single price items can skip the option name.
        </Typography>
      </Box>

      {isSimpleMode ? (
        // Simple Mode: Single price field
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Price"
            placeholder="15.99"
            value={priceOptions[0]?.price || ''}
            onChange={(e) => {
              // Update the price option
              onUpdatePriceOption(priceOptions[0].id, 'price', e.target.value);
            }}
            error={!!errors.price}
            helperText={errors.price || 'Enter the price for this item'}
            type="number"
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
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
              '& input[type=number]::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
              '& input[type=number]::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
            }}
          />
          
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={onAddPriceOption}
            sx={{
              alignSelf: 'flex-start',
              textTransform: 'none',
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              color: mode === 'dark' ? '#ffffff' : '#1a202c',
              '&:hover': {
                borderColor: '#6366f1',
                color: '#6366f1',
              },
            }}
          >
            Add Price Options
          </Button>
        </Box>
      ) : (
        // Advanced Mode: Multiple price options
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: mode === 'dark' ? '#ffffff' : '#1a202c',
              mb: 1,
            }}
          >
            Price Options
          </Typography>
          
          {priceOptions.map((option, index) => (
            <Box
              key={option.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 2,
                border: mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                background: mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.02)'
                  : 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <TextField
                label="Option Name"
                placeholder={`Option ${index + 1} (e.g., Regular, Large)`}
                value={option.name}
                onChange={(e) => onUpdatePriceOption(option.id, 'name', e.target.value)}
                size="small"
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
              
              <TextField
                label="Price"
                placeholder="15.99"
                value={option.price}
                onChange={(e) => {
                  onUpdatePriceOption(option.id, 'price', e.target.value);
                }}
                size="small"
                type="number"
                sx={{ 
                  width: 140,
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
                  '& input[type=number]': {
                    MozAppearance: 'textfield',
                  },
                  '& input[type=number]::-webkit-outer-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                  '& input[type=number]::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                }}
              />
              
              <IconButton
                onClick={() => onRemovePriceOption(option.id)}
                size="small"
                sx={{ 
                  color: '#ef4444',
                  '&:hover': {
                    color: '#dc2626',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  },
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
          
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={onAddPriceOption}
            sx={{
              alignSelf: 'flex-start',
              textTransform: 'none',
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              color: mode === 'dark' ? '#ffffff' : '#1a202c',
              '&:hover': {
                borderColor: '#6366f1',
                color: '#6366f1',
                backgroundColor: mode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
              },
            }}
          >
            Add Another Option
          </Button>
          
          {errors.priceOptions && (
            <Typography variant="caption" color="error">
              {errors.priceOptions}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PriceTab;
