import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastNotification, { ToastMessage, ToastType } from '../components/common/ToastNotification';

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string, duration?: number) => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((
    type: ToastType, 
    title: string, 
    message?: string, 
    duration?: number
  ) => {
    const id = Date.now().toString();
    setToast({
      id,
      type,
      title,
      message,
      duration,
    });
  }, []);

  const showSuccess = useCallback((title: string, message?: string) => {
    showToast('success', title, message, 4000);
  }, [showToast]);

  const showError = useCallback((title: string, message?: string) => {
    showToast('error', title, message, 5000);
  }, [showToast]);

  const showWarning = useCallback((title: string, message?: string) => {
    showToast('warning', title, message, 4500);
  }, [showToast]);

  const showInfo = useCallback((title: string, message?: string) => {
    showToast('info', title, message, 3500);
  }, [showToast]);

  const handleClose = useCallback(() => {
    setToast(null);
  }, []);

  const contextValue: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastNotification toast={toast} onClose={handleClose} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
