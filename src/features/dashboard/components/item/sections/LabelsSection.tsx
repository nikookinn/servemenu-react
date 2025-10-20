import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Chip,
  Autocomplete,
} from '@mui/material';
import { useDashboardTheme } from '../../../context/ThemeContext';

interface LabelsSectionProps {
  labels: string[];
  displayOptions: string[];
  onLabelsChange: (newLabels: string[]) => void;
  onDisplayOptionsChange: (newOptions: string[]) => void;
}

const LabelsSection: React.FC<LabelsSectionProps> = ({
  labels,
  displayOptions,
  onLabelsChange,
  onDisplayOptionsChange,
}) => {
  const { mode } = useDashboardTheme();

  const labelOptions = ['New', 'Bestseller', 'Spicy', 'Vegetarian', 'Vegan', 'Gluten Free', 'Popular', 'Chef Special'];
  const displayOptionsList = ['Dine In', 'Takeaway', 'Delivery', 'Drive Thru'];

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
        Labels & Display Options
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Labels & Display Options Row */}
        <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', md: 'row' } }}>
          <Autocomplete
            multiple
            options={labelOptions}
            value={labels}
            onChange={(_, newValue) => onLabelsChange(newValue)}
            sx={{ flex: 1 }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="filled"
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                  size="small"
                  sx={{
                    bgcolor: mode === 'dark' ? '#4f46e5' : '#6366f1',
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
                label="Labels"
                placeholder="New, Bestseller, Spicy..."
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
          
          <Autocomplete
            multiple
            options={displayOptionsList}
            value={displayOptions}
            onChange={(_, newValue) => onDisplayOptionsChange(newValue)}
            sx={{ flex: 1 }}
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
                label="Display Options"
                placeholder="Dine In, Takeaway..."
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
    </Box>
  );
};

export default LabelsSection;
