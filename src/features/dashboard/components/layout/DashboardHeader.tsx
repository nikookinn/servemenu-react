import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Drawer,
  useTheme,
} from '@mui/material';
import {
  DarkMode,
  LightMode,
  Language,
  Fullscreen,
  FullscreenExit,
  PhoneIphone,
  Settings,
  Person,
  Logout,
  Upgrade,
  Menu as MenuIcon,
  RestaurantMenu as RestaurantMenuIcon,
  Notifications,
  NotificationsActive,
  ShoppingCart,
  Warning,
  Star,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleSidebar }) => {
  const { mode, toggleTheme } = useDashboardTheme();
  const theme = useTheme();
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [hasNotifications, setHasNotifications] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    if (notificationAnchorEl) {
      // Eğer drawer açıksa kapat
      setNotificationAnchorEl(null);
    } else {
      // Eğer drawer kapalıysa aç
      setNotificationAnchorEl(event.currentTarget);
    }
  };

  const handleCloseProfile = () => {
    setProfileAnchorEl(null);
  };

  const handleCloseLanguage = () => {
    setLanguageAnchorEl(null);
  };

  const handleCloseNotification = () => {
    setNotificationAnchorEl(null);
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleOpenPreview = () => {
    // This would open a mobile preview modal
    console.log('Opening mobile preview...');
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        background: mode === 'dark' 
          ? 'rgba(10, 10, 10, 0.8)' 
          : 'rgba(248, 250, 252, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        {/* Left Side - Logo + Hamburger */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
          >
            <RestaurantMenuIcon sx={{
              color: '#6366f1',
              fontSize: 32,
              filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))'
            }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                background: mode === 'dark'
                  ? 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)'
                  : 'linear-gradient(135deg, #1e293b 0%, #64748b 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ServeMenu
            </Typography>
          </Box>
          
          {/* Hamburger Menu Button */}
          <IconButton
            onClick={onToggleSidebar}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'rgba(79, 70, 229, 0.1)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Right Side - Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Desktop Only - Open Preview Button */}
          <Button
            startIcon={<PhoneIphone />}
            onClick={handleOpenPreview}
            sx={{
              display: { xs: 'none', md: 'flex' },
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'rgba(79, 70, 229, 0.1)',
              },
            }}
            variant="outlined"
            size="small"
          >
            Open Preview
          </Button>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'rgba(79, 70, 229, 0.1)',
              },
            }}
          >
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Desktop Only - Language Selector */}
          <IconButton
            onClick={handleLanguageClick}
            sx={{
              display: { xs: 'none', md: 'flex' },
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'rgba(79, 70, 229, 0.1)',
              },
            }}
          >
            <Language />
          </IconButton>
          <Menu
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={handleCloseLanguage}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
                minWidth: 180,
                background: mode === 'dark' 
                  ? 'rgba(17, 17, 17, 0.95)' 
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme.palette.divider}`,
              },
            }}
          >
            {languages.map((lang) => (
              <MenuItem
                key={lang.code}
                onClick={() => {
                  setSelectedLanguage(lang.code);
                  handleCloseLanguage();
                }}
                selected={selectedLanguage === lang.code}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{lang.flag}</span>
                  <Typography>{lang.name}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          {/* Desktop Only - Fullscreen Toggle */}
          <IconButton
            onClick={handleFullscreenToggle}
            sx={{
              display: { xs: 'none', md: 'flex' },
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'rgba(79, 70, 229, 0.1)',
              },
            }}
          >
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>

          {/* Notifications */}
          <IconButton
            onClick={handleNotificationClick}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.1)' 
                  : 'rgba(79, 70, 229, 0.1)',
              },
            }}
          >
            <Badge 
              badgeContent={hasNotifications ? notificationCount : 0} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.7rem',
                  minWidth: '18px',
                  height: '18px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                },
              }}
            >
              {hasNotifications ? <NotificationsActive /> : <Notifications />}
            </Badge>
          </IconButton>
          <Drawer
            anchor="right"
            open={Boolean(notificationAnchorEl)}
            onClose={handleCloseNotification}
            PaperProps={{
              sx: {
                width: 400,
                mt: '64px', // Navbar altından başlasın
                height: 'calc(100vh - 64px)', // Navbar yüksekliğini çıkar
                background: mode === 'dark' 
                  ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)' 
                  : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme.palette.divider}`,
                borderRight: 'none',
                boxShadow: mode === 'dark'
                  ? '-10px 0 40px rgba(0, 0, 0, 0.4)'
                  : '-10px 0 40px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              },
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%',
              overflow: 'hidden'
            }}>
            {/* Header */}
            <Box sx={{ 
              px: 3, 
              py: 2.5, 
              borderBottom: `1px solid ${theme.palette.divider}`,
              background: mode === 'dark'
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(79, 70, 229, 0.03) 0%, rgba(124, 58, 237, 0.03) 100%)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{
                    p: 1,
                    borderRadius: 2,
                    background: mode === 'dark'
                      ? 'rgba(99, 102, 241, 0.15)'
                      : 'rgba(79, 70, 229, 0.1)',
                  }}>
                    <NotificationsActive sx={{ 
                      fontSize: '1.2rem',
                      color: theme.palette.primary.main
                    }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                      Notifications
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: theme.palette.text.secondary,
                      fontSize: '0.75rem'
                    }}>
                      {notificationCount} new notifications
                    </Typography>
                  </Box>
                </Box>
                <Badge 
                  badgeContent={notificationCount} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.7rem',
                      minWidth: '18px',
                      height: '18px',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    },
                  }}
                />
              </Box>
            </Box>
            
            {/* Notifications List */}
            <Box sx={{ 
              py: 1, 
              flex: 1,
              overflowY: 'auto',
              // Custom scrollbar styling
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: mode === 'dark' 
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)' 
                  : 'linear-gradient(135deg, rgba(79, 70, 229, 0.4) 0%, rgba(124, 58, 237, 0.4) 100%)',
                borderRadius: '4px',
                '&:hover': {
                  background: mode === 'dark' 
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.6) 100%)' 
                    : 'linear-gradient(135deg, rgba(79, 70, 229, 0.6) 0%, rgba(124, 58, 237, 0.6) 100%)',
                },
              },
              // Firefox scrollbar
              scrollbarWidth: 'thin',
              scrollbarColor: mode === 'dark' 
                ? 'rgba(99, 102, 241, 0.4) transparent' 
                : 'rgba(79, 70, 229, 0.4) transparent',
            }}>
              {/* New Order */}
              <Box 
                onClick={handleCloseNotification} 
                sx={{ 
                  py: 2.5, 
                  px: 3,
                  mx: 1,
                  my: 0.5,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: `1px solid transparent`,
                  '&:hover': {
                    background: mode === 'dark'
                      ? 'rgba(34, 197, 94, 0.08)'
                      : 'rgba(34, 197, 94, 0.05)',
                    transform: 'translateX(-4px)',
                    border: `1px solid ${mode === 'dark' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)'}`,
                    boxShadow: mode === 'dark'
                      ? '0 4px 20px rgba(34, 197, 94, 0.15)'
                      : '0 4px 20px rgba(34, 197, 94, 0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', gap: 2.5, width: '100%', alignItems: 'flex-start' }}>
                  <Box sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    background: mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)'
                      : 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
                    border: `1px solid ${mode === 'dark' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)'}`,
                    minWidth: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: mode === 'dark'
                      ? '0 2px 8px rgba(34, 197, 94, 0.2)'
                      : '0 2px 8px rgba(34, 197, 94, 0.15)',
                  }}>
                    <ShoppingCart sx={{ 
                      fontSize: '1.3rem',
                      color: mode === 'dark' ? '#4ade80' : '#16a34a',
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                    }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 700, 
                      mb: 0.8, 
                      fontSize: '0.9rem',
                      color: theme.palette.text.primary,
                      lineHeight: 1.3,
                    }}>
                      New Order Received
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      fontSize: '0.8rem', 
                      mb: 1,
                      lineHeight: 1.4,
                    }}>
                      Order #1247 from Table 5 - $24.50
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: mode === 'dark' ? '#4ade80' : '#16a34a',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: mode === 'dark'
                        ? 'rgba(34, 197, 94, 0.1)'
                        : 'rgba(34, 197, 94, 0.08)',
                      px: 1,
                      py: 0.3,
                      borderRadius: 1,
                    }}>
                      2 minutes ago
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              {/* Low Stock Alert */}
              <Box 
                onClick={handleCloseNotification} 
                sx={{ 
                  py: 2.5, 
                  px: 3,
                  mx: 1,
                  my: 0.5,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: `1px solid transparent`,
                  '&:hover': {
                    background: mode === 'dark'
                      ? 'rgba(245, 158, 11, 0.08)'
                      : 'rgba(245, 158, 11, 0.05)',
                    transform: 'translateX(-4px)',
                    border: `1px solid ${mode === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.15)'}`,
                    boxShadow: mode === 'dark'
                      ? '0 4px 20px rgba(245, 158, 11, 0.15)'
                      : '0 4px 20px rgba(245, 158, 11, 0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', gap: 2.5, width: '100%', alignItems: 'flex-start' }}>
                  <Box sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    background: mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)'
                      : 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.15) 100%)',
                    border: `1px solid ${mode === 'dark' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.2)'}`,
                    minWidth: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: mode === 'dark'
                      ? '0 2px 8px rgba(245, 158, 11, 0.2)'
                      : '0 2px 8px rgba(245, 158, 11, 0.15)',
                  }}>
                    <Warning sx={{ 
                      fontSize: '1.3rem',
                      color: mode === 'dark' ? '#fbbf24' : '#d97706',
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                    }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 700, 
                      mb: 0.8, 
                      fontSize: '0.9rem',
                      color: theme.palette.text.primary,
                      lineHeight: 1.3,
                    }}>
                      Low Stock Alert
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      fontSize: '0.8rem', 
                      mb: 1,
                      lineHeight: 1.4,
                    }}>
                      Beef Tacos - Only 5 items left
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: mode === 'dark' ? '#fbbf24' : '#d97706',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: mode === 'dark'
                        ? 'rgba(245, 158, 11, 0.1)'
                        : 'rgba(245, 158, 11, 0.08)',
                      px: 1,
                      py: 0.3,
                      borderRadius: 1,
                    }}>
                      15 minutes ago
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              {/* Customer Feedback */}
              <Box 
                onClick={handleCloseNotification} 
                sx={{ 
                  py: 2.5, 
                  px: 3,
                  mx: 1,
                  my: 0.5,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: `1px solid transparent`,
                  '&:hover': {
                    background: mode === 'dark'
                      ? 'rgba(139, 92, 246, 0.08)'
                      : 'rgba(139, 92, 246, 0.05)',
                    transform: 'translateX(-4px)',
                    border: `1px solid ${mode === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)'}`,
                    boxShadow: mode === 'dark'
                      ? '0 4px 20px rgba(139, 92, 246, 0.15)'
                      : '0 4px 20px rgba(139, 92, 246, 0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', gap: 2.5, width: '100%', alignItems: 'flex-start' }}>
                  <Box sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    background: mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%)'
                      : 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)',
                    border: `1px solid ${mode === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'}`,
                    minWidth: 'fit-content',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: mode === 'dark'
                      ? '0 2px 8px rgba(139, 92, 246, 0.2)'
                      : '0 2px 8px rgba(139, 92, 246, 0.15)',
                  }}>
                    <Star sx={{ 
                      fontSize: '1.3rem',
                      color: mode === 'dark' ? '#a78bfa' : '#8b5cf6',
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                    }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 700, 
                      mb: 0.8, 
                      fontSize: '0.9rem',
                      color: theme.palette.text.primary,
                      lineHeight: 1.3,
                    }}>
                      Customer Feedback
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      fontSize: '0.8rem', 
                      mb: 1,
                      lineHeight: 1.4,
                    }}>
                      New 5-star review received
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: mode === 'dark' ? '#a78bfa' : '#8b5cf6',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: mode === 'dark'
                        ? 'rgba(139, 92, 246, 0.1)'
                        : 'rgba(139, 92, 246, 0.08)',
                      px: 1,
                      py: 0.3,
                      borderRadius: 1,
                    }}>
                      1 hour ago
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Additional Notifications */}
              {Array.from({ length: 5 }).map((_, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    py: 2.5, 
                    px: 3,
                    mx: 1,
                    my: 0.5,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: 0.7,
                    border: `1px solid transparent`,
                    '&:hover': {
                      background: mode === 'dark'
                        ? 'rgba(99, 102, 241, 0.08)'
                        : 'rgba(79, 70, 229, 0.05)',
                      transform: 'translateX(-4px)',
                      opacity: 1,
                      border: `1px solid ${mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.15)'}`,
                      boxShadow: mode === 'dark'
                        ? '0 4px 20px rgba(99, 102, 241, 0.15)'
                        : '0 4px 20px rgba(79, 70, 229, 0.1)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2.5, width: '100%', alignItems: 'flex-start' }}>
                    <Box sx={{
                      p: 1.5,
                      borderRadius: 2.5,
                      background: mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                      border: `1px solid ${mode === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)'}`,
                      minWidth: 'fit-content',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: mode === 'dark'
                        ? '0 2px 8px rgba(99, 102, 241, 0.2)'
                        : '0 2px 8px rgba(99, 102, 241, 0.15)',
                    }}>
                      <Notifications sx={{ 
                        fontSize: '1.3rem',
                        color: theme.palette.primary.main,
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                      }} />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ 
                        fontWeight: 700, 
                        mb: 0.8, 
                        fontSize: '0.9rem',
                        color: theme.palette.text.primary,
                        lineHeight: 1.3,
                      }}>
                        Sample Notification {index + 4}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        fontSize: '0.8rem', 
                        mb: 1,
                        lineHeight: 1.4,
                      }}>
                        This is a sample notification for testing scrolling
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: theme.palette.primary.main,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: mode === 'dark'
                          ? 'rgba(99, 102, 241, 0.1)'
                          : 'rgba(99, 102, 241, 0.08)',
                        px: 1,
                        py: 0.3,
                        borderRadius: 1,
                      }}>
                        {2 + index} hours ago
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            
            {/* Footer */}
            <Box sx={{ 
              p: 2, 
              borderTop: `1px solid ${theme.palette.divider}`,
              background: mode === 'dark'
                ? 'rgba(0, 0, 0, 0.2)'
                : 'rgba(0, 0, 0, 0.02)',
            }}>
              <Button 
                fullWidth 
                variant="contained"
                size="small"
                onClick={() => {
                  handleCloseNotification();
                  setHasNotifications(false);
                  setNotificationCount(0);
                }}
                sx={{
                  background: mode === 'dark'
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: 'white',
                  fontWeight: 600,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  '&:hover': {
                    background: mode === 'dark'
                      ? 'linear-gradient(135deg, #5b5ff1 0%, #7c3aed 100%)'
                      : 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                  },
                }}
              >
                Mark All as Read
              </Button>
            </Box>
            </Box>
          </Drawer>

          {/* Profile Section */}
          <IconButton onClick={handleProfileClick} sx={{ p: 0, ml: 1 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              JD
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleCloseProfile}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
                minWidth: 240,
                maxWidth: 260,
                background: mode === 'dark' 
                  ? 'rgba(17, 17, 17, 0.95)' 
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme.palette.divider}`,
                p: 1,
              },
            }}
          >
            {/* Welcome Header */}
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Welcome John Doe
              </Typography>
            </Box>

            {/* Upgrade Section */}
            <Box
              sx={{
                mx: 1,
                mb: 1,
                p: 2,
                borderRadius: 2,
                background: mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
                  : 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
                border: `1px solid ${mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)'}`,
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Box sx={{
                  p: 0.8,
                  borderRadius: 1.5,
                  background: mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'rgba(79, 70, 229, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Upgrade sx={{ 
                    fontSize: '1.1rem',
                    color: mode === 'dark' ? '#a5b4fc' : '#6366f1'
                  }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ 
                    fontWeight: 600, 
                    lineHeight: 1.2,
                    color: theme.palette.text.primary,
                    fontSize: '0.875rem'
                  }}>
                    Upgrade Plan
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: theme.palette.text.secondary,
                    fontSize: '0.7rem'
                  }}>
                    Premium Features
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ 
                color: theme.palette.text.secondary,
                mb: 1.5, 
                lineHeight: 1.3,
                fontSize: '0.8rem'
              }}>
                Advanced analytics & unlimited menus
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box sx={{
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  background: mode === 'dark'
                    ? 'rgba(34, 197, 94, 0.2)'
                    : 'rgba(34, 197, 94, 0.1)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: mode === 'dark' ? '#4ade80' : '#16a34a',
                }}>
                  Save 20%
                </Box>
                <Typography variant="caption" sx={{ 
                  color: theme.palette.text.secondary,
                  fontSize: '0.7rem'
                }}>
                  yearly plans
                </Typography>
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                size="small"
                sx={{
                  background: mode === 'dark'
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: 'white',
                  fontWeight: 600,
                  py: 0.8,
                  borderRadius: 1.5,
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  boxShadow: mode === 'dark'
                    ? '0 2px 8px rgba(99, 102, 241, 0.3)'
                    : '0 2px 8px rgba(79, 70, 229, 0.3)',
                  '&:hover': {
                    background: mode === 'dark'
                      ? 'linear-gradient(135deg, #5b5ff1 0%, #7c3aed 100%)'
                      : 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: mode === 'dark'
                      ? '0 4px 12px rgba(99, 102, 241, 0.4)'
                      : '0 4px 12px rgba(79, 70, 229, 0.4)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                View Plans
              </Button>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Menu Items */}
            <MenuItem onClick={handleCloseProfile}>
              <Settings sx={{ mr: 2, fontSize: '1.2rem' }} />
              Restaurant Settings
            </MenuItem>
            <MenuItem onClick={handleCloseProfile}>
              <Person sx={{ mr: 2, fontSize: '1.2rem' }} />
              Profile Settings
            </MenuItem>
            <MenuItem onClick={handleCloseProfile}>
              <Logout sx={{ mr: 2, fontSize: '1.2rem' }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
