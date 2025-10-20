import React, { useState } from 'react';
import { Box, CssBaseline, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { DashboardThemeProvider } from '../../context/ThemeContext';
import { ToastProvider } from '../../context/ToastContext';

const DashboardLayoutContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile'da başlangıçta kapalı
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const theme = useTheme();

  const handleToggleSidebar = () => {
    // Mobile'da drawer toggle, desktop'ta collapse toggle
    if (window.innerWidth < 768) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <Box sx={{ 
      position: 'relative',
      // Enable natural mobile scrolling - body scroll
      WebkitOverflowScrolling: 'touch',
      overflowX: 'hidden'
    }}>
      <CssBaseline />
      
      {/* Header - Fixed at top */}
      <DashboardHeader onToggleSidebar={handleToggleSidebar} />
      
      {/* Sidebar - Fixed Position */}
      <DashboardSidebar 
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main Content - Body scroll, not container scroll */}
      <Box
        component="main"
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(ellipse at top, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)'
            : 'radial-gradient(ellipse at top, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
          minHeight: '100vh', // Full viewport height
          paddingTop: '64px', // Navbar için space
          // Sidebar için margin-left ekle (desktop'ta)
          marginLeft: {
            xs: 0, // Mobile'da margin yok
            md: sidebarCollapsed ? '72px' : '280px' // Desktop'ta sidebar genişliği kadar
          },
          transition: theme.transitions.create(['margin-left'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          position: 'relative',
          // Enable smooth mobile scrolling
          WebkitOverflowScrolling: 'touch',
          // Background overlay
          '&::before': {
            content: '""',
            position: 'fixed', // Fixed position for background
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
              ? `
                radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.03) 0%, transparent 50%)
              `
              : `
                radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(217, 119, 6, 0.02) 0%, transparent 50%)
              `,
            pointerEvents: 'none',
            zIndex: -1,
          },
        }}
      >
        {/* İçerik alanı - body scroll */}
        <Box sx={{ 
          position: 'relative', 
          zIndex: 1, 
          p: { xs: 2, md: 3 },
          // Enable smooth mobile scrolling
          WebkitOverflowScrolling: 'touch',
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

const DashboardLayout: React.FC = () => {
  return (
    <DashboardThemeProvider>
      <ToastProvider>
        <DashboardLayoutContent />
      </ToastProvider>
    </DashboardThemeProvider>
  );
};

export default DashboardLayout;