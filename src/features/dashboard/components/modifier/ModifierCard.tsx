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
        height: '100%',
        background: mode === 'dark'
          ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: mode === 'dark'
            ? '0 16px 48px rgba(0, 0, 0, 0.4)'
            : '0 16px 48px rgba(0, 0, 0, 0.15)',
          border: `1px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Modifier Icon and Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
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
          <IconButton
            onClick={handleMenuClick}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: mode === 'dark'
                  ? 'rgba(99, 102, 241, 0.1)'
                  : 'rgba(79, 70, 229, 0.1)',
              },
            }}
          >
            <MoreVert />
          </IconButton>
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
        </Box>

        {/* Modifier Info */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 2,
            }}
          >
            {itemCount} options
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              display: 'block',
              mb: 2,
            }}
          >
            Last modified: {lastModified}
          </Typography>
        </Box>

        {/* Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            size="small"
            sx={{
              backgroundColor: getStatusColor(),
              color: 'white',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ModifierCard;
