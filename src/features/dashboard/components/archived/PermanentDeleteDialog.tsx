import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import { Warning } from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface PermanentDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType: 'menu' | 'modifier';
}

const PermanentDeleteDialog: React.FC<PermanentDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  itemName,
  itemType,
}) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      disableScrollLock
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: mode === 'dark'
            ? '#1a1a1a'
            : '#ffffff',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: mode === 'dark'
            ? '0 8px 24px rgba(0, 0, 0, 0.4)'
            : '0 8px 24px rgba(0, 0, 0, 0.15)',
          minWidth: '320px',
          maxWidth: '400px',
        }
      }}
      BackdropProps={{
        sx: {
          backgroundColor: mode === 'dark'
            ? 'rgba(0, 0, 0, 0.5)'
            : 'rgba(0, 0, 0, 0.3)',
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ p: 3, pb: 1, textAlign: 'center' }}>
        <Warning sx={{ 
          fontSize: 32, 
          color: '#dc2626',
          mb: 1
        }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          Permanently Delete?
        </Typography>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 3, pt: 1, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The {itemType} "{itemName}" will be permanently deleted.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
          This action cannot be undone.
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ p: 3, gap: 1.5 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onClose}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            py: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          onClick={onConfirm}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            py: 1,
            backgroundColor: '#dc2626',
            color: '#ffffff',
            border: 'none',
            borderRadius: 1,
            '&:hover': {
              backgroundColor: '#b91c1c',
            },
            '&:focus': {
              backgroundColor: '#dc2626',
            },
            '&:active': {
              backgroundColor: '#991b1b',
            },
          }}
        >
          Delete Forever
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermanentDeleteDialog;
