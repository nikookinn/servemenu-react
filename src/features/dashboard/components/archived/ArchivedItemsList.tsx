import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Restaurant,
  Edit,
  Delete,
  Restore,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';

interface ArchivedItem {
  id: string;
  name: string;
  itemCount: number;
  status: 'active' | 'inactive' | 'draft';
  lastModified: string;
  type: 'menu' | 'modifier';
  deletedAt: string;
}

interface ArchivedItemsListProps {
  items: ArchivedItem[];
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
}

const ArchivedItemsList: React.FC<ArchivedItemsListProps> = ({
  items,
  onRestore,
  onDelete,
}) => {
  const theme = useTheme();
  const { mode } = useDashboardTheme();

  const formatDeletedDate = (deletedAt: string) => {
    const date = new Date(deletedAt);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString();
      }
    }
  };

  if (items.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 4,
          background: mode === 'dark'
            ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: mode === 'dark'
              ? 'rgba(99, 102, 241, 0.1)'
              : 'rgba(79, 70, 229, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            border: `2px solid ${mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)'}`,
          }}
        >
          <Restaurant
            sx={{
              fontSize: 40,
              color: theme.palette.primary.main,
              opacity: 0.8,
            }}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: theme.palette.text.primary,
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          No Archived Items
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
            maxWidth: 400,
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: { xs: '0.95rem', md: '1rem' },
          }}
        >
          No archived items found. Items you archive will appear here.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map((item) => (
        <Card
          key={item.id}
          sx={{
            background: mode === 'dark'
              ? 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'dark'
                ? '0 8px 24px rgba(0, 0, 0, 0.3)'
                : '0 8px 24px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: mode === 'dark'
                      ? 'linear-gradient(135deg, #374151 0%, #4b5563 100%)'
                      : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.type === 'menu' ? (
                    <Restaurant sx={{ fontSize: '1.2rem', color: theme.palette.text.secondary }} />
                  ) : (
                    <Edit sx={{ fontSize: '1.2rem', color: theme.palette.text.secondary }} />
                  )}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {item.type === 'menu' ? 'Menu' : 'Modifier'} • {item.itemCount} items
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    Archived {formatDeletedDate(item.deletedAt)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label="Archived"
                  size="small"
                  sx={{
                    background: mode === 'dark'
                      ? 'rgba(156, 163, 175, 0.2)'
                      : 'rgba(156, 163, 175, 0.1)',
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                  }}
                />
                <Tooltip title="Restore item">
                  <IconButton
                    onClick={() => onRestore(item.id)}
                    sx={{
                      width: 36,
                      height: 36,
                      background: mode === 'dark'
                        ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)'
                        : 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
                      border: `1px solid ${theme.palette.primary.main}`,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        background: mode === 'dark'
                          ? 'linear-gradient(145deg, #2a2a2a 0%, #3a3a3a 100%)'
                          : 'linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 100%)',
                        transform: 'scale(1.05)',
                        boxShadow: mode === 'dark'
                          ? '0 4px 12px rgba(99, 102, 241, 0.3)'
                          : '0 4px 12px rgba(79, 70, 229, 0.2)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Restore sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete permanently">
                  <IconButton
                    onClick={() => onDelete(item.id)}
                    sx={{
                      width: 36,
                      height: 36,
                      background: mode === 'dark'
                        ? 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)'
                        : 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
                      border: `1px solid ${theme.palette.error.main}`,
                      color: theme.palette.error.main,
                      '&:hover': {
                        background: mode === 'dark'
                          ? 'linear-gradient(145deg, #2a2a2a 0%, #3a3a3a 100%)'
                          : 'linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 100%)',
                        transform: 'scale(1.05)',
                        boxShadow: mode === 'dark'
                          ? '0 4px 12px rgba(239, 68, 68, 0.3)'
                          : '0 4px 12px rgba(239, 68, 68, 0.2)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Delete sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ArchivedItemsList;
