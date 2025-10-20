import React from 'react';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Chip,
} from '@mui/material';
import { useDashboardTheme } from '../../../context/ThemeContext';
import { SelectedModifier } from '../useItemManagement';
import { ModifierData } from '../../../store/dashboardSlice';

// Note: Using SelectedModifier from useItemManagement for consistency

interface ModifierOptionsSectionProps {
  selectedModifiers: SelectedModifier[];
  availableModifiers: ModifierData[];
  onAddModifier: (modifier: ModifierData) => void;
  onRemoveModifier: (id: string) => void;
}

const ModifierOptionsSection: React.FC<ModifierOptionsSectionProps> = ({
  selectedModifiers,
  availableModifiers,
  onAddModifier,
  onRemoveModifier,
}) => {
  const { mode } = useDashboardTheme();

  // Filter out already selected modifiers by name (since we don't have modifierId in new interface)
  const availableOptions = availableModifiers.filter(
    modifier => !selectedModifiers.some(selected => selected.name === modifier.name)
  );


  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: mode === 'dark' ? '#ffffff' : '#1a202c',
          mb: 1,
        }}
      >
        Modifier Options
      </Typography>
      
      <Typography
        variant="body2"
        sx={{
          color: mode === 'dark' ? '#94a3b8' : '#64748b',
          mb: 2,
        }}
      >
        Add modifiers to customize this item. Customers can select from these options when ordering.
      </Typography>

      {/* Modifier Selection */}
      <Box sx={{ mb: 2 }}>
        <Autocomplete
          multiple
          options={availableOptions}
          getOptionLabel={(option) => option.name}
          value={selectedModifiers.map(selected => 
            availableModifiers.find(mod => mod.name === selected.name)
          ).filter(Boolean) as ModifierData[]}
          onChange={(_, newValues) => {
            // Yeni eklenen modifier'ları bul
            const currentNames = selectedModifiers.map(s => s.name);
            const newNames = newValues.map(v => v?.name).filter(Boolean) as string[];
            
            // Eklenen modifier'lar
            const addedModifiers = newValues.filter((v): v is ModifierData => 
              v !== undefined && !currentNames.includes(v.name)
            );
            addedModifiers.forEach(modifier => onAddModifier(modifier));
            
            // Kaldırılan modifier'lar
            const removedNames = currentNames.filter(name => !newNames.includes(name));
            removedNames.forEach(name => {
              const modifierToRemove = selectedModifiers.find(s => s.name === name);
              if (modifierToRemove) onRemoveModifier(modifierToRemove.id);
            });
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              if (!option) return null;
              return (
                <Chip
                  {...getTagProps({ index })}
                  key={option.id}
                  label={option.name}
                  size="small"
                  color={option.type === 'required' ? 'error' : 'primary'}
                  sx={{ 
                    fontSize: '0.75rem',
                    '& .MuiChip-deleteIcon': {
                      fontSize: '1rem'
                    }
                  }}
                />
              );
            }).filter(Boolean)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Modifier"
              placeholder="Choose from available modifiers"
              size="small"
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
          renderOption={(props, option) => {
            if (!option) return null;
            const { key, ...otherProps } = props;
            return (
              <Box 
                component="li" 
                key={key}
                {...otherProps} 
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {option.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: mode === 'dark' ? '#94a3b8' : '#64748b' }}>
                    {option.type === 'required' ? 'Required' : 'Optional'} • {option.options?.length || 0} options
                  </Typography>
                </Box>
                <Chip
                  label={option.type}
                  size="small"
                  color={option.type === 'required' ? 'error' : 'default'}
                  sx={{ fontSize: '0.75rem' }}
                />
              </Box>
            );
          }}
          sx={{ width: '100%' }}
          disabled={availableOptions.length === 0}
        />
      </Box>
    </Box>
  );
};

export default ModifierOptionsSection;
