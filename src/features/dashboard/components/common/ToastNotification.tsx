import React from 'react';
import {
  Snackbar,
  Alert,
  Slide,
  SlideProps,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Warning,
  Info,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastNotificationProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  toast,
  onClose,
}) => {
  const { mode } = useDashboardTheme();

  if (!toast) return null;

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle sx={{ fontSize: '1.2rem' }} />;
      case 'error':
        return <Error sx={{ fontSize: '1.2rem' }} />;
      case 'warning':
        return <Warning sx={{ fontSize: '1.2rem' }} />;
      case 'info':
        return <Info sx={{ fontSize: '1.2rem' }} />;
      default:
        return <Info sx={{ fontSize: '1.2rem' }} />;
    }
  };

  const getSeverity = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <Snackbar
      open={!!toast}
      autoHideDuration={toast.duration || 4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
      sx={{
        '& .MuiSnackbar-root': {
          top: { xs: 100, md: 120 }, // Navbar altında orta-üst
        },
      }}
    >
      <Alert
        onClose={onClose}
        severity={getSeverity(toast.type)}
        icon={getIcon(toast.type)}
        sx={{
          minWidth: { xs: 280, sm: 320, md: 360 },
          maxWidth: { xs: 320, sm: 380, md: 420 },
          background: mode === 'dark'
            ? 'rgba(30, 30, 30, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          boxShadow: mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.4)'
            : '0 8px 32px rgba(0, 0, 0, 0.15)',
          '& .MuiAlert-icon': {
            alignItems: 'center',
          },
          '& .MuiAlert-message': {
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            py: 0.5,
          },
          '& .MuiAlert-action': {
            alignItems: 'flex-start',
            pt: 0.5,
          },
        }}
      >
        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
          {toast.title}
        </div>
        {toast.message && (
          <div style={{ 
            fontSize: '0.8rem', 
            opacity: 0.8,
            lineHeight: 1.3,
          }}>
            {toast.message}
          </div>
        )}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
