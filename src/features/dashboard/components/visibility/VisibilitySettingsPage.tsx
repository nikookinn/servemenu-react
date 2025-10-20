import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Visibility,
  VisibilityOff,
  Schedule,
  DateRange,
  Save,
  CheckCircle,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface VisibilitySettingsPageProps {
  itemName: string;
  itemType: 'category' | 'item';
  onBack: () => void;
  onSave: (settings: VisibilitySettings) => void;
  initialSettings?: VisibilitySettings;
}

export interface VisibilitySettings {
  visibility: 'visible' | 'hidden' | 'hideUntil' | 'showOnlyWithin';
  hideUntilDate?: Date;
  showOnlyWithin?: {
    days: string[];
    timeRange: [number, number]; // Hours in 24h format
  };
}

const VisibilitySettingsPage: React.FC<VisibilitySettingsPageProps> = ({
  itemName,
  itemType,
  onBack,
  onSave,
  initialSettings,
}) => {
  const { mode } = useDashboardTheme();

  const [settings, setSettings] = useState<VisibilitySettings>(
    initialSettings || {
      visibility: 'visible',
      hideUntilDate: new Date(),
      showOnlyWithin: {
        days: [],
        timeRange: [9, 17], // 9 AM to 5 PM
      },
    }
  );

  const weekDays = [
    { value: 'monday', label: 'Mon' },
    { value: 'tuesday', label: 'Tue' },
    { value: 'wednesday', label: 'Wed' },
    { value: 'thursday', label: 'Thu' },
    { value: 'friday', label: 'Fri' },
    { value: 'saturday', label: 'Sat' },
    { value: 'sunday', label: 'Sun' },
  ];

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      visibility: event.target.value as VisibilitySettings['visibility'],
    });
  };

  const handleDaysChange = (_event: React.MouseEvent<HTMLElement>, newDays: string[]) => {
    setSettings({
      ...settings,
      showOnlyWithin: {
        ...settings.showOnlyWithin!,
        days: newDays,
      },
    });
  };

  const handleTimeRangeChange = (_event: Event, newValue: number | number[]) => {
    setSettings({
      ...settings,
      showOnlyWithin: {
        ...settings.showOnlyWithin!,
        timeRange: newValue as [number, number],
      },
    });
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setSettings({
        ...settings,
        hideUntilDate: newDate,
      });
    }
  };

  const formatTime = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                Visibility Settings
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: mode === 'dark' ? '#94a3b8' : '#64748b',
                }}
              >
                {itemType === 'category' ? 'Categories' : 'Items'} / {itemName} / Visibility Settings
              </Typography>
            </Box>
          </Box>

          {/* Right: Save button */}
          <Button
            variant="contained"
            onClick={handleSave}
            startIcon={<Save />}
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
            Save Settings
          </Button>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, md: 3 },
            overflow: 'auto',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: mode === 'dark' ? '#ffffff' : '#1a202c',
              mb: 3,
            }}
          >
            Visibility Options
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup
              value={settings.visibility}
              onChange={handleVisibilityChange}
              sx={{ gap: 1 }}
            >
              {/* Visible (Default) */}
              <FormControlLabel
                value="visible"
                control={
                  <Radio
                    sx={{
                      color: mode === 'dark' ? '#94a3b8' : '#64748b',
                      '&.Mui-checked': {
                        color: '#10b981',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1.5,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Visibility sx={{ color: 'white', fontSize: '1rem' }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: mode === 'dark' ? '#ffffff' : '#1a202c',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                        }}
                      >
                        Always Visible
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: mode === 'dark' ? '#94a3b8' : '#64748b',
                          mt: 0.25,
                          fontSize: '0.8rem',
                        }}
                      >
                        This {itemType} will always be visible to customers
                      </Typography>
                    </Box>
                    {settings.visibility === 'visible' && (
                      <Chip
                        label="Default"
                        size="small"
                        sx={{
                          ml: 'auto',
                          background: '#10b981',
                          color: 'white',
                          fontWeight: 500,
                          fontSize: '0.7rem',
                          height: 20,
                        }}
                      />
                    )}
                  </Box>
                }
                sx={{
                  mb: 1,
                  mx: 0,
                  width: '100%',
                  background: settings.visibility === 'visible'
                    ? (mode === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)')
                    : 'transparent',
                  borderRadius: 1.5,
                  p: 1.5,
                  border: settings.visibility === 'visible'
                    ? '2px solid rgba(16, 185, 129, 0.3)'
                    : `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  transition: 'all 0.3s ease',
                }}
              />

              {/* Hidden from menu */}
              <FormControlLabel
                value="hidden"
                control={
                  <Radio
                    sx={{
                      color: mode === 'dark' ? '#94a3b8' : '#64748b',
                      '&.Mui-checked': {
                        color: '#ef4444',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1.5,
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <VisibilityOff sx={{ color: 'white', fontSize: '1rem' }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: mode === 'dark' ? '#ffffff' : '#1a202c',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                        }}
                      >
                        Hidden from Menu
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: mode === 'dark' ? '#94a3b8' : '#64748b',
                          mt: 0.25,
                          fontSize: '0.8rem',
                        }}
                      >
                        This {itemType} will be completely hidden from customers
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{
                  mb: 1,
                  mx: 0,
                  width: '100%',
                  background: settings.visibility === 'hidden'
                    ? (mode === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)')
                    : 'transparent',
                  borderRadius: 1.5,
                  p: 1.5,
                  border: settings.visibility === 'hidden'
                    ? '2px solid rgba(239, 68, 68, 0.3)'
                    : `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  transition: 'all 0.3s ease',
                }}
              />

              {/* Hide until */}
              <FormControlLabel
                value="hideUntil"
                control={
                  <Radio
                    sx={{
                      color: mode === 'dark' ? '#94a3b8' : '#64748b',
                      '&.Mui-checked': {
                        color: '#f59e0b',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1.5,
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Schedule sx={{ color: 'white', fontSize: '1rem' }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: mode === 'dark' ? '#ffffff' : '#1a202c',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                        }}
                      >
                        Hide Until
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: mode === 'dark' ? '#94a3b8' : '#64748b',
                          mt: 0.25,
                          fontSize: '0.8rem',
                        }}
                      >
                        Hide this {itemType} until a specific date and time
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{
                  mb: 1,
                  mx: 0,
                  width: '100%',
                  background: settings.visibility === 'hideUntil'
                    ? (mode === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)')
                    : 'transparent',
                  borderRadius: 1.5,
                  p: 1.5,
                  border: settings.visibility === 'hideUntil'
                    ? '2px solid rgba(245, 158, 11, 0.3)'
                    : `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  transition: 'all 0.3s ease',
                }}
              />

              {/* Date Time Picker for Hide Until */}
              {settings.visibility === 'hideUntil' && (
                <Box
                  sx={{
                    ml: { xs: 0, md: 4 },
                    mt: 1,
                    mb: 1,
                    p: 2,
                    background: mode === 'dark'
                      ? 'rgba(245, 158, 11, 0.05)'
                      : 'rgba(245, 158, 11, 0.02)',
                    border: `1px solid ${mode === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)'}`,
                    borderRadius: 1.5,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: mode === 'dark' ? '#ffffff' : '#1a202c',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    Select Date & Time
                  </Typography>
                  <DateTimePicker
                    label="Choose when to show this item"
                    value={settings.hideUntilDate}
                    onChange={handleDateChange}
                    sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        background: mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.8)',
                        '& fieldset': {
                          borderColor: mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgba(0, 0, 0, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#f59e0b',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f59e0b',
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: mode === 'dark' ? '#ffffff' : '#1a202c',
                      },
                      '& .MuiInputLabel-root': {
                        color: mode === 'dark' ? '#94a3b8' : '#64748b',
                      },
                    }}
                  />
                  {settings.hideUntilDate && (
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        background: mode === 'dark'
                          ? 'rgba(245, 158, 11, 0.1)'
                          : 'rgba(245, 158, 11, 0.05)',
                        borderRadius: 1.5,
                        border: `1px solid ${mode === 'dark' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.2)'}`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: mode === 'dark' ? '#fbbf24' : '#d97706',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <CheckCircle sx={{ fontSize: '1rem' }} />
                        Will be visible from: {formatDateTime(settings.hideUntilDate)}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              {/* Show only within */}
              <FormControlLabel
                value="showOnlyWithin"
                control={
                  <Radio
                    sx={{
                      color: mode === 'dark' ? '#94a3b8' : '#64748b',
                      '&.Mui-checked': {
                        color: '#8b5cf6',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1.5,
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <DateRange sx={{ color: 'white', fontSize: '1rem' }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: mode === 'dark' ? '#ffffff' : '#1a202c',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                        }}
                      >
                        Show Only Within
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: mode === 'dark' ? '#94a3b8' : '#64748b',
                          mt: 0.25,
                          fontSize: '0.8rem',
                        }}
                      >
                        Show this {itemType} only on specific days and times
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{
                  mb: 1,
                  mx: 0,
                  width: '100%',
                  background: settings.visibility === 'showOnlyWithin'
                    ? (mode === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)')
                    : 'transparent',
                  borderRadius: 1.5,
                  p: 1.5,
                  border: settings.visibility === 'showOnlyWithin'
                    ? '2px solid rgba(139, 92, 246, 0.3)'
                    : `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  transition: 'all 0.3s ease',
                }}
              />

              {/* Days and Time Range for Show Only Within */}
              {settings.visibility === 'showOnlyWithin' && (
                <Box
                  sx={{
                    ml: { xs: 0, md: 4 },
                    mt: 1,
                    mb: 1,
                    p: 2,
                    background: mode === 'dark'
                      ? 'rgba(139, 92, 246, 0.05)'
                      : 'rgba(139, 92, 246, 0.02)',
                    border: `1px solid ${mode === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)'}`,
                    borderRadius: 1.5,
                  }}
                >
                  {/* Days Selection */}
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: mode === 'dark' ? '#ffffff' : '#1a202c',
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    Select Days
                  </Typography>
                  <ToggleButtonGroup
                    value={settings.showOnlyWithin?.days || []}
                    onChange={handleDaysChange}
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      mb: 3,
                      '& .MuiToggleButton-root': {
                        border: `1px solid ${mode === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'}`,
                        color: mode === 'dark' ? '#a78bfa' : '#8b5cf6',
                        '&.Mui-selected': {
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                          color: 'white',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                          },
                        },
                        '&:hover': {
                          background: mode === 'dark'
                            ? 'rgba(139, 92, 246, 0.1)'
                            : 'rgba(139, 92, 246, 0.05)',
                        },
                      },
                    }}
                  >
                    {weekDays.map((day) => (
                      <ToggleButton key={day.value} value={day.value} size="small">
                        {day.label}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>

                  {/* Time Range Slider */}
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: mode === 'dark' ? '#ffffff' : '#1a202c',
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    Time Range
                  </Typography>
                  <Box sx={{ px: 2, mb: 2 }}>
                    <Slider
                      value={settings.showOnlyWithin?.timeRange || [9, 17]}
                      onChange={handleTimeRangeChange}
                      valueLabelDisplay="auto"
                      valueLabelFormat={formatTime}
                      min={0}
                      max={23}
                      marks={[
                        { value: 0, label: '00:00' },
                        { value: 6, label: '06:00' },
                        { value: 12, label: '12:00' },
                        { value: 18, label: '18:00' },
                        { value: 23, label: '23:00' },
                      ]}
                      sx={{
                        color: '#8b5cf6',
                        '& .MuiSlider-thumb': {
                          backgroundColor: '#8b5cf6',
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: '#8b5cf6',
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: mode === 'dark' ? '#374151' : '#e5e7eb',
                        },
                        '& .MuiSlider-mark': {
                          backgroundColor: mode === 'dark' ? '#6b7280' : '#9ca3af',
                        },
                        '& .MuiSlider-markLabel': {
                          color: mode === 'dark' ? '#94a3b8' : '#64748b',
                          fontSize: '0.75rem',
                        },
                      }}
                    />
                  </Box>

                  {/* Summary */}
                  {(settings.showOnlyWithin?.days?.length || 0) > 0 && (
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        background: mode === 'dark'
                          ? 'rgba(139, 92, 246, 0.1)'
                          : 'rgba(139, 92, 246, 0.05)',
                        borderRadius: 1.5,
                        border: `1px solid ${mode === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'}`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: mode === 'dark' ? '#c4b5fd' : '#7c3aed',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <CheckCircle sx={{ fontSize: '1rem' }} />
                        Available on {settings.showOnlyWithin?.days?.join(', ')} from{' '}
                        {formatTime(settings.showOnlyWithin?.timeRange?.[0] || 9)} to{' '}
                        {formatTime(settings.showOnlyWithin?.timeRange?.[1] || 17)}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default VisibilitySettingsPage;
