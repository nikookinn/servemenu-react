import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  ContentCopy,
  QrCode,
  Launch,
  Link,
  Restaurant,
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
        {/* Menu Icon and Actions */}
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
            <Restaurant
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

        {/* Menu Info */}
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
            {itemCount} items
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

const MenuManagementPage: React.FC = () => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEdit = (id: string) => {
    console.log('Edit menu:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete menu:', id);
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate menu:', id);
  };

  const handleOpenCustomerApp = () => {
    console.log('Opening customer app...');
  };

  const handleCopyLink = () => {
    console.log('Copying link...');
  };

  const handleShowQRCode = () => {
    console.log('Showing QR code...');
  };

  const menus = [
    {
      id: '1',
      name: 'Main Menu',
      itemCount: 45,
      status: 'active' as const,
      lastModified: '2 hours ago',
    },
    {
      id: '2',
      name: 'Breakfast Menu',
      itemCount: 18,
      status: 'active' as const,
      lastModified: '1 day ago',
    },
    {
      id: '3',
      name: 'Drinks Menu',
      itemCount: 25,
      status: 'active' as const,
      lastModified: '3 days ago',
    },
    {
      id: '4',
      name: 'Seasonal Specials',
      itemCount: 12,
      status: 'draft' as const,
      lastModified: '1 week ago',
    },
    {
      id: '5',
      name: 'Kids Menu',
      itemCount: 8,
      status: 'inactive' as const,
      lastModified: '2 weeks ago',
    },
    {
      id: '6',
      name: 'Desserts',
      itemCount: 15,
      status: 'active' as const,
      lastModified: '5 days ago',
    },
  ];

  const modifiers = [
    {
      id: '1',
      name: 'Size Options',
      itemCount: 3,
      status: 'active' as const,
      lastModified: '1 day ago',
    },
    {
      id: '2',
      name: 'Extra Toppings',
      itemCount: 12,
      status: 'active' as const,
      lastModified: '3 days ago',
    },
    {
      id: '3',
      name: 'Spice Level',
      itemCount: 4,
      status: 'active' as const,
      lastModified: '1 week ago',
    },
  ];

  const archivedMenus = [
    {
      id: '7',
      name: 'Summer Menu 2023',
      itemCount: 22,
      status: 'inactive' as const,
      lastModified: '3 months ago',
    },
    {
      id: '8',
      name: 'Holiday Specials',
      itemCount: 16,
      status: 'inactive' as const,
      lastModified: '6 months ago',
    },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 0: return menus;
      case 1: return modifiers;
      case 2: return archivedMenus;
      default: return menus;
    }
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)'
                : 'linear-gradient(135deg, #1e293b 0%, #64748b 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Menu
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '1rem',
            }}
          >
            Craft Your Digital Menu
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            startIcon={<Launch />}
            variant="outlined"
            onClick={handleOpenCustomerApp}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Open Customer App
          </Button>
          <Button
            startIcon={<Link />}
            variant="outlined"
            onClick={handleCopyLink}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Copy Link
          </Button>
          <Button
            startIcon={<QrCode />}
            variant="contained"
            onClick={handleShowQRCode}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Restaurant QR Code
          </Button>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              height: 3,
              borderRadius: 1.5,
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                fontWeight: 600,
              },
            },
          }}
        >
          <Tab label="Menus" />
          <Tab label="Modifiers" />
          <Tab label="Archived" />
        </Tabs>
      </Box>

      {/* Add New Button */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<Add />}
          variant="contained"
          size="large"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1.5,
          }}
        >
          + Add New {activeTab === 0 ? 'Menu' : activeTab === 1 ? 'Modifier' : 'Item'}
        </Button>
      </Box>

      {/* Content Grid */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {getCurrentData().map((item) => (
          <Box key={item.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.33% - 16px)', lg: '1 1 calc(25% - 18px)' } }}>
            <MenuCard
              {...item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          </Box>
        ))}
      </Box>

      {/* Empty State */}
      {getCurrentData().length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 4,
          }}
        >
          <Restaurant
            sx={{
              fontSize: 64,
              color: theme.palette.text.secondary,
              opacity: 0.5,
              mb: 2,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            No {activeTab === 0 ? 'Menus' : activeTab === 1 ? 'Modifiers' : 'Archived Items'} Found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
            }}
          >
            Get started by creating your first {activeTab === 0 ? 'menu' : activeTab === 1 ? 'modifier' : 'item'}.
          </Typography>
          <Button
            startIcon={<Add />}
            variant="contained"
            size="large"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Create {activeTab === 0 ? 'Menu' : activeTab === 1 ? 'Modifier' : 'Item'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MenuManagementPage;
