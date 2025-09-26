import React, { useState } from 'react';
import { Box, CssBaseline, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { DashboardThemeProvider } from '../../context/ThemeContext';

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
      height: '100vh', // Tam viewport height
      width: '100vw',
      position: 'relative',
      overflow: 'hidden' // Ana container'da overflow gizle
    }}>
      <CssBaseline />
      <style>
        {`
          html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            height: 100vh !important; /* Sabit yükseklik */
          }
          #root {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            height: 100vh !important; /* Sabit yükseklik */
          }
        `}
      </style>
      
      {/* Header - Fixed at top */}
      <DashboardHeader onToggleSidebar={handleToggleSidebar} />
      
      {/* Main Layout Container */}
      <Box sx={{ 
        display: 'flex', 
        width: '100%',
        height: 'calc(100vh - 64px)', // Header yüksekliğini çıkar
        mt: '64px', // Navbar altına yerleştir
        overflow: 'hidden' // Ana layout'ta overflow gizle
      }}>
        {/* Sidebar */}
        <DashboardSidebar 
          open={sidebarOpen}
          collapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main Content - Bu alan scroll edilebilir */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(ellipse at top, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)'
              : 'radial-gradient(ellipse at top, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
            height: 'calc(100vh - 64px)', // Navbar height'ını çıkar
            position: 'relative',
            overflow: 'hidden', // Ana content area'da overflow gizle
            display: 'flex',
            flexDirection: 'column',
            // Scroll bar stilleri kaldırıldı - içerik alanında olacak
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
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
              zIndex: 0,
            },
          }}
        >
          {/* İçerik alanı - scroll burada olacak */}
          <Box sx={{ 
            position: 'relative', 
            zIndex: 1, 
            height: '100%', // Tam height kullan
            overflowY: 'auto', // Scroll sadece burada
            overflowX: 'hidden',
            // Custom scrollbar styling
            '&::-webkit-scrollbar': {
              width: '12px',
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.05)',
              borderRadius: '6px',
              margin: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.mode === 'dark' 
                ? 'rgba(99, 102, 241, 0.5)' 
                : 'rgba(79, 70, 229, 0.5)',
              borderRadius: '6px',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              '&:hover': {
                background: theme.palette.mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.7)' 
                  : 'rgba(79, 70, 229, 0.7)',
              },
              '&:active': {
                background: theme.palette.mode === 'dark' 
                  ? 'rgba(99, 102, 241, 0.9)' 
                  : 'rgba(79, 70, 229, 0.9)',
              },
            },
            // Firefox scrollbar styling
            scrollbarWidth: 'thin',
            scrollbarColor: theme.palette.mode === 'dark' 
              ? 'rgba(99, 102, 241, 0.5) transparent' 
              : 'rgba(79, 70, 229, 0.5) transparent',
          }}>
            {/* Padding içerik için */}
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const DashboardLayout: React.FC = () => {
  return (
    <DashboardThemeProvider>
      <DashboardLayoutContent />
    </DashboardThemeProvider>
  );
};

export default DashboardLayout;