import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import {
  MoreVert,
  Edit,
  Delete,
  ContentCopy,
  Tune,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface ModifierCardProps {
  id: string;
  name: string;
  itemCount: number;
  status: 'active' | 'inactive' | 'draft';
  lastModified: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

const ModifierCard: React.FC<ModifierCardProps> = ({
  id,
  name,
  itemCount,
  status,
  lastModified,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active': return theme.palette.success.main;
      case 'inactive': return theme.palette.error.main;
      case 'draft': return theme.palette.warning.main;
      default: return theme.palette.text.secondary;
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        background: mode === 'dark'
          ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* Modifier Icon */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: 2,
            background: mode === 'dark'
              ? 'rgba(99, 102, 241, 0.1)'
              : 'rgba(79, 70, 229, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)'}`,
            flexShrink: 0,
          }}
        >
          <Tune
            sx={{
              fontSize: 28,
              color: theme.palette.primary.main,
              opacity: 0.7,
            }}
          />
        </Box>

        {/* Modifier Info - CSS Grid Layout */}
        <Box 
          sx={{ 
            flex: 1,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr 1fr 1fr',
              md: '1fr 1fr 1fr 1fr'
            },
            gap: 3,
            alignItems: 'center',
          }}
        >
          {/* Name Column */}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: { xs: '1rem', md: '1.25rem' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={name}
            >
              {name}
            </Typography>
          </Box>

          {/* Status Column */}
          <Box>
            <Chip
              label={status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
              size="small"
              sx={{
                backgroundColor: getStatusColor(),
                color: 'white',
                fontWeight: 500,
                fontSize: '0.75rem',
              }}
            />
          </Box>

          {/* Options Column */}
          <Box sx={{ display: { xs: 'block', md: 'block' } }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: { xs: '0.875rem', md: '0.875rem' },
              }}
            >
              {itemCount} options
            </Typography>
          </Box>

          {/* Last Modified Column */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
              }}
            >
              {lastModified}
            </Typography>
          </Box>
        </Box>

        {/* Actions */}
        <IconButton
          onClick={handleMenuClick}
          sx={{
            color: theme.palette.text.secondary,
            flexShrink: 0,
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? 'rgba(99, 102, 241, 0.1)'
                : 'rgba(79, 70, 229, 0.1)',
            },
          }}
        >
          <MoreVert />
        </IconButton>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 150,
            background: mode === 'dark'
              ? 'rgba(17, 17, 17, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            onEdit(id);
            handleMenuClose();
          }}
        >
          <Edit sx={{ mr: 2, fontSize: '1.2rem' }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDuplicate(id);
            handleMenuClose();
          }}
        >
          <ContentCopy sx={{ mr: 2, fontSize: '1.2rem' }} />
          Duplicate
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(id);
            handleMenuClose();
          }}
          sx={{ color: theme.palette.error.main }}
        >
          <Delete sx={{ mr: 2, fontSize: '1.2rem' }} />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default ModifierCard;
