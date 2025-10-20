import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Add,
  Delete,
  DragIndicator,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../../context/ThemeContext';

export interface PriceOption {
  id: string;
  name: string;
  price: number | string;
}

interface PriceOptionsSectionProps {
  priceOptions: PriceOption[];
  errors: Record<string, string>;
  onAddPriceOption: () => void;
  onRemovePriceOption: (id: string) => void;
  onUpdatePriceOption: (id: string, field: keyof PriceOption, value: string | number) => void;
}

const PriceOptionsSection: React.FC<PriceOptionsSectionProps> = ({
  priceOptions,
  errors,
  onAddPriceOption,
  onRemovePriceOption,
  onUpdatePriceOption,
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
        Price Options
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {priceOptions.map((option) => (
          <Box
            key={option.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              border: mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: 1.5,
              background: mode === 'dark'
                ? 'rgba(255, 255, 255, 0.02)'
                : 'rgba(255, 255, 255, 0.5)',
            }}
          >
            <DragIndicator
              sx={{
                color: mode === 'dark' ? '#64748b' : '#94a3b8',
                cursor: 'grab',
              }}
            />
            
            <TextField
              label="Option Name"
              placeholder="e.g., Regular, Large, Family Size"
              value={option.name}
              onChange={(e) => onUpdatePriceOption(option.id, 'name', e.target.value)}
              size="small"
              sx={{ flex: 1 }}
            />
            
            <TextField
              label="Price"
              placeholder="0.00"
              value={option.price}
              onChange={(e) => onUpdatePriceOption(option.id, 'price', e.target.value)}
              size="small"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              sx={{ width: 120 }}
            />
            
            {priceOptions.length > 1 && (
              <IconButton
                onClick={() => onRemovePriceOption(option.id)}
                size="small"
                sx={{ color: '#ef4444' }}
              >
                <Delete />
              </IconButton>
            )}
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
          }}
        >
          Add Price Option
        </Button>
        
        {errors.priceOptions && (
          <Typography variant="caption" color="error">
            {errors.priceOptions}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PriceOptionsSection;
