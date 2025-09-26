import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Collapse,
  useTheme,
} from '@mui/material';
import {
  Dashboard,
  Restaurant,
  ShoppingCart,
  Store,
  Campaign,
  Whatshot,
  Assessment,
  AccountBalance,
  Help,
  Extension,
  Settings,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDashboardTheme } from '../../context/ThemeContext';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 72;

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
    path: '/dashboard',
  },
  {
    id: 'menus',
    label: 'Menus',
    icon: <Restaurant />,
    path: '/dashboard/menus',
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <ShoppingCart />,
    path: '/dashboard/orders',
  },
  {
    id: 'stores',
    label: 'Manage Stores',
    icon: <Store />,
    children: [
      { id: 'stores-list', label: 'All Stores', icon: <Store />, path: '/dashboard/stores' },
      { id: 'stores-add', label: 'Add Store', icon: <Store />, path: '/dashboard/stores/add' },
      { id: 'stores-settings', label: 'Store Settings', icon: <Settings />, path: '/dashboard/stores/settings' },
    ],
  },
  {
    id: 'announcements',
    label: 'Announcements',
    icon: <Campaign />,
    children: [
      { id: 'announcements-list', label: 'All Announcements', icon: <Campaign />, path: '/dashboard/announcements' },
      { id: 'announcements-create', label: 'Create Announcement', icon: <Campaign />, path: '/dashboard/announcements/create' },
    ],
  },
  {
    id: 'hot-actions',
    label: 'Hot Actions',
    icon: <Whatshot />,
    path: '/dashboard/hot-actions',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <Assessment />,
    path: '/dashboard/reports',
  },
  {
    id: 'accounting',
    label: 'Accounting',
    icon: <AccountBalance />,
    path: '/dashboard/accounting',
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: <Help />,
    path: '/dashboard/faq',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: <Extension />,
    path: '/dashboard/integrations',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    path: '/dashboard/settings',
  },
];

interface DashboardSidebarProps {
  open: boolean;
  collapsed: boolean;
  onClose?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ open, collapsed, onClose }) => {
  const { mode } = useDashboardTheme();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-collapse expanded items when sidebar is collapsed
  React.useEffect(() => {
    if (collapsed) {
      // Always collapse when sidebar is collapsed
      setExpandedItems([]);
    }
  }, [collapsed]);

  // Prevent sub-menu flashing during drawer expansion
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    if (collapsed !== undefined) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // Match drawer transition duration
      
      return () => clearTimeout(timer);
    }
  }, [collapsed]);

  const handleItemClick = (item: SidebarItem) => {
    if (item.children) {
      setExpandedItems(prev => 
        prev.includes(item.id) 
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      );
    } else if (item.path) {
      navigate(item.path);
      onClose?.();
    }
  };

  const isSelected = (path: string) => {
    return location.pathname === path;
  };

  const isParentSelected = (item: SidebarItem) => {
    if (!item.children) return false;
    return item.children.some(child => child.path && isSelected(child.path));
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const selected = item.path ? isSelected(item.path) : isParentSelected(item);
    return (
      <React.Fragment key={item.id}>
        <ListItemButton
          onClick={() => handleItemClick(item)}
          selected={selected}
          sx={{
            py: 1,
            mx: (collapsed && !isMobile) ? 0.5 : 1,
            borderRadius: 2,
            mb: 0.5,
            justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start',
            minHeight: 48,
            '&.Mui-selected': {
              backgroundColor: mode === 'dark' 
                ? 'rgba(99, 102, 241, 0.15)'
                : 'rgba(79, 70, 229, 0.15)',
              '&:hover': {
                backgroundColor: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.2)'
                  : 'rgba(79, 70, 229, 0.2)',
              },
            },
            '&:hover': {
              backgroundColor: mode === 'dark' 
                ? 'rgba(99, 102, 241, 0.08)'
                : 'rgba(79, 70, 229, 0.08)',
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: selected 
                ? theme.palette.primary.main 
                : theme.palette.text.secondary,
              minWidth: (collapsed && !isMobile) ? 'auto' : 40,
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              width: (collapsed && !isMobile) ? '100%' : 'auto',
            }}
          >
            {item.icon}
          </ListItemIcon>
          {!(collapsed && !isMobile) && (
            <>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: selected ? 600 : 500,
                  color: selected 
                    ? theme.palette.primary.main 
                    : theme.palette.text.primary,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              />
              {hasChildren && (
                isExpanded ? <ExpandLess /> : <ExpandMore />
              )}
            </>
          )}
        </ListItemButton>
        {hasChildren && !(collapsed && !isMobile) && (!isTransitioning || isMobile) && (
          <Collapse 
            in={isExpanded} 
            timeout={300}
            unmountOnExit
            sx={{
              '& .MuiCollapse-wrapper': {
                overflow: 'hidden',
              },
              '& .MuiCollapse-wrapperInner': {
                overflow: 'hidden',
              },
            }}
          >
            <List component="div" disablePadding sx={{ 
              overflow: 'hidden',
              py: 0.5,
            }}>
              {item.children!.map(child => renderSidebarItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawerContent = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden' // Prevent content overflow during transitions
    }}>

      {/* Navigation Items */}
      <Box sx={{ 
        flex: 1, 
        pt: 2, 
        pb: 2, 
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: 0, // Allow flex item to shrink
        // Custom scrollbar styling
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: mode === 'dark' 
            ? 'rgba(99, 102, 241, 0.3)' 
            : 'rgba(79, 70, 229, 0.3)',
          borderRadius: '3px',
          '&:hover': {
            background: mode === 'dark' 
              ? 'rgba(99, 102, 241, 0.5)' 
              : 'rgba(79, 70, 229, 0.5)',
          },
        },
        // Firefox scrollbar styling
        scrollbarWidth: 'thin',
        scrollbarColor: mode === 'dark' 
          ? 'rgba(99, 102, 241, 0.3) transparent' 
          : 'rgba(79, 70, 229, 0.3) transparent',
      }}>
        <List component="nav" disablePadding sx={{ 
          overflowX: 'hidden',
          width: '100%'
        }}>
          {sidebarItems.map(item => renderSidebarItem(item))}
        </List>
      </Box>

      {/* Sidebar Footer */}
      {!collapsed && (
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            background: mode === 'dark'
              ? 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Need Help?
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Contact our support team
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );

  const drawerWidth = collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH;

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={isMobile ? onClose : undefined}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        width: isMobile ? DRAWER_WIDTH : drawerWidth,
        flexShrink: 0,
        display: { xs: 'block' },
        transition: theme.transitions.create(['width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: isMobile ? DRAWER_WIDTH : drawerWidth,
          boxSizing: 'border-box',
          background: mode === 'dark'
            ? 'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          borderRight: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(20px)',
          transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          overflowY: 'auto',
          top: isMobile ? 0 : 64, // Mobile'da full height, desktop'ta navbar altında
          height: isMobile ? '100vh' : 'calc(100vh - 64px)', // Mobile'da full height
          zIndex: isMobile ? theme.zIndex.drawer : 'auto',
        },
      }}
    >
      {isMobile && (
        // Mobile header
        <Box sx={{ 
          p: 2, 
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: mode === 'dark'
            ? 'rgba(99, 102, 241, 0.05)'
            : 'rgba(79, 70, 229, 0.03)',
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main,
            textAlign: 'center'
          }}>
            ServeMenu
          </Typography>
        </Box>
      )}
      {drawerContent}
    </Drawer>
  );
};

export default DashboardSidebar;
