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
  MenuBook,
  Delete,
  Restore,
  Archive,
} from '@mui/icons-material';
import { useDashboardTheme } from '../../context/ThemeContext';
import { ArchivedItem } from '../../store/dashboardSlice';

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
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
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
          <Archive
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
          <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
            {/* Icon */}
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
                flexShrink: 0,
              }}
            >
              <MenuBook
                sx={{
                  fontSize: 28,
                  color: theme.palette.primary.main,
                  opacity: 0.7,
                }}
              />
            </Box>

            {/* Info - CSS Grid Layout */}
            <Box 
              sx={{ 
                flex: 1,
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr 1fr 1fr',
                  md: '1fr 1fr 1fr 1fr'
                },
                gap: 3,
                alignItems: 'center',
              }}
            >
              {/* Name + Status Column */}
              <Box sx={{ minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '1rem', md: '1.25rem' },
                      flexShrink: 0,
                    }}
                    title={item.name}
                  >
                    {item.name}
                  </Typography>
                  <Chip
                    label="Archived"
                    size="small"
                    sx={{
                      backgroundColor: mode === 'dark'
                        ? 'rgba(156, 163, 175, 0.2)'
                        : 'rgba(156, 163, 175, 0.1)',
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      flexShrink: 0,
                      ml: 1,
                    }}
                  />
                </Box>
              </Box>

              {/* Type + Items Column */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: { xs: '0.875rem', md: '0.875rem' },
                  }}
                >
                  Menu • {item.itemCount} items
                </Typography>
              </Box>

              {/* Archived Date Column */}
              <Box sx={{ display: { xs: 'block', md: 'block' } }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.875rem',
                  }}
                >
                  Archived {formatDeletedDate(item.deletedAt)}
                </Typography>
              </Box>

              {/* Actions Column */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, justifyContent: 'flex-end' }}>
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

            {/* Mobile Actions */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1, flexShrink: 0 }}>
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
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ArchivedItemsList;
