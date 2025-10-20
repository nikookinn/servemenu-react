import React from 'react';
import {
  VisibilityOff,
  Schedule,
  DateRange,
} from '@mui/icons-material';
import { Tooltip, Box } from '@mui/material';
import { VisibilitySettings } from './VisibilitySettingsPage';

interface VisibilityIconProps {
  visibilitySettings?: VisibilitySettings;
  fontSize?: string | object;
}

const VisibilityIcon: React.FC<VisibilityIconProps> = ({
  visibilitySettings,
  fontSize = '1rem',
}) => {
  // If no visibility settings or default visible, don't show icon
  if (!visibilitySettings || visibilitySettings.visibility === 'visible') {
    return null;
  }

  const getIconAndTooltip = () => {
    switch (visibilitySettings.visibility) {
      case 'hidden':
        return {
          icon: <VisibilityOff sx={{ fontSize }} />,
          tooltip: 'Hidden from customers',
          color: '#f87171', // red-400
        };
      case 'hideUntil':
        return {
          icon: <Schedule sx={{ fontSize }} />,
          tooltip: `Hidden until ${visibilitySettings.hideUntilDate?.toLocaleDateString()}`,
          color: '#fbbf24', // amber-400
        };
      case 'showOnlyWithin':
        return {
          icon: <DateRange sx={{ fontSize }} />,
          tooltip: 'Visible only during specific times',
          color: '#60a5fa', // blue-400
        };
      default:
        return null;
    }
  };

  const iconData = getIconAndTooltip();
  if (!iconData) return null;

  return (
    <Tooltip title={iconData.tooltip} arrow>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: iconData.color,
          opacity: 0.9,
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        {iconData.icon}
      </Box>
    </Tooltip>
  );
};

export default VisibilityIcon;
