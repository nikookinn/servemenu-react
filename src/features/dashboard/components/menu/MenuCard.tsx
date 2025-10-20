import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  MenuBook,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface MenuCardProps {
  id: string;
  name: string;
  itemCount: number;
  status: 'active' | 'inactive' | 'draft';
  lastModified: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  disableNavigation?: boolean; // Optional prop to disable navigation
}

const MenuCard: React.FC<MenuCardProps> = ({
  id,
  name,
  itemCount,
  status,
  lastModified,
  onEdit,
  onDelete,
  onDuplicate,
  disableNavigation = false,
}) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };


  const handleCardClick = () => {
    // Don't navigate if navigation is disabled or menu is open
    if (disableNavigation || anchorEl) {
      return;
    }
    navigate(`/dashboard/menus/${id}`);
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
      onClick={handleCardClick}
      sx={{
        height: '240px', // Daha kompakt yükseklik
        minHeight: '240px', // Minimum yükseklik garantisi
        background: mode === 'dark'
          ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: mode === 'dark'
            ? '0 16px 48px rgba(0, 0, 0, 0.4)'
            : '0 16px 48px rgba(0, 0, 0, 0.15)',
          border: `1px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Menu Icon and Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 50,
              height: 50,
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
            <MenuBook
              sx={{
                fontSize: 24,
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

        {/* Menu Info */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: theme.palette.text.primary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
            }}
            title={name} // Tooltip for full name
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 1,
            }}
          >
            {itemCount} items
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              display: 'block',
              mb: 1.5,
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

export default MenuCard;
