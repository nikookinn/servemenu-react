import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  Warning,
  Delete,
  Cancel,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';
import { ItemDeleteDialog } from './useItemDelete';

interface ItemDeleteConfirmationDialogProps {
  deleteDialog: ItemDeleteDialog;
  onClose: () => void;
  onConfirm: () => void;
}

const ItemDeleteConfirmationDialog: React.FC<ItemDeleteConfirmationDialogProps> = ({
  deleteDialog,
  onClose,
  onConfirm,
}) => {
  const { mode } = useDashboardTheme();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  // Safety check - don't render if deleteDialog is not properly initialized
  if (!deleteDialog) {
    return null;
  }

  return (
    <Dialog
      open={deleteDialog.open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: mode === 'dark'
            ? 'rgba(20, 20, 20, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
          boxShadow: mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.5)'
            : '0 8px 32px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          pb: 1,
          borderBottom: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          <Warning sx={{ color: '#ef4444', fontSize: '1.5rem' }} />
        </Box>
        <Typography
          component="span"
          variant="h6"
          sx={{
            fontWeight: 600,
            color: mode === 'dark' ? '#ffffff' : '#1a202c',
          }}
        >
          {deleteDialog.mode === 'bulk' 
            ? `Delete ${deleteDialog.selectedIds?.length || 0} Items`
            : 'Delete Item'
          }
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Typography
          variant="body1"
          sx={{
            color: mode === 'dark' ? '#e2e8f0' : '#374151',
            mb: 2,
            lineHeight: 1.6,
          }}
        >
          {deleteDialog.mode === 'bulk' ? (
            <>
              Are you sure you want to delete <strong>{deleteDialog.selectedIds?.length || 0}</strong> items? 
              This action will permanently remove these items from your menu.
            </>
          ) : (
            <>
              Are you sure you want to delete the item <strong>"{deleteDialog.itemName || 'Unknown Item'}"</strong>? 
              This action will permanently remove this item from your menu.
            </>
          )}
        </Typography>
        
        <Box
          sx={{
            p: 2,
            background: mode === 'dark'
              ? 'rgba(239, 68, 68, 0.05)'
              : 'rgba(239, 68, 68, 0.02)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#ef4444',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Warning fontSize="small" />
            This action cannot be undone
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          pt: 0,
          gap: 2,
          borderTop: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          startIcon={<Cancel />}
          sx={{
            borderColor: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(0, 0, 0, 0.2)',
            color: mode === 'dark' ? '#ffffff' : '#1a202c',
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            py: 1,
            '&:hover': {
              borderColor: mode === 'dark'
                ? 'rgba(255, 255, 255, 0.3)'
                : 'rgba(0, 0, 0, 0.3)',
              background: mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          startIcon={<Delete />}
          sx={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1,
            '&:hover': {
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {deleteDialog.mode === 'bulk' 
            ? `Delete ${deleteDialog.selectedIds?.length || 0} Items`
            : 'Delete Item'
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemDeleteConfirmationDialog;
