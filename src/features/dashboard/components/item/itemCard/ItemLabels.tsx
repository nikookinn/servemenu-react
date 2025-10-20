import React from 'react';
import { Box } from '@mui/material';

interface ItemLabelsProps {
  labels?: string[];
  displayOptions?: string[];
  mode: string;
  layout: 'mobile' | 'desktop';
}

const ItemLabels: React.FC<ItemLabelsProps> = ({
  labels,
  displayOptions,
  mode,
  layout,
}) => {
  if (!labels?.length && !displayOptions?.length) {
    return null;
  }

  if (layout === 'mobile') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.25,
          mt: 0.5,
          mb: 0.5,
        }}
      >
        {/* Labels Row */}
        {labels && labels.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            {labels.slice(0, 2).map((label, index) => (
              <Box
                key={`label-${index}`}
                sx={{
                  px: 0.75,
                  py: 0.2,
                  borderRadius: 0.75,
                  background: mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  fontSize: '0.65rem',
                  color: '#6366f1',
                  fontWeight: 500,
                }}
              >
                {label}
              </Box>
            ))}
            {labels.length > 2 && (
              <Box
                sx={{
                  px: 0.75,
                  py: 0.2,
                  borderRadius: 0.75,
                  background: mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.15)'
                    : 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  fontSize: '0.65rem',
                  color: '#6366f1',
                  fontWeight: 500,
                  opacity: 0.8,
                }}
              >
                +{labels.length - 2}
              </Box>
            )}
          </Box>
        )}

        {/* Display Options Row */}
        {displayOptions && displayOptions.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            {displayOptions.slice(0, 2).map((option, index) => (
              <Box
                key={`option-${index}`}
                sx={{
                  px: 0.75,
                  py: 0.2,
                  borderRadius: 0.75,
                  background: mode === 'dark'
                    ? 'rgba(16, 185, 129, 0.2)'
                    : 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontSize: '0.65rem',
                  color: '#10b981',
                  fontWeight: 500,
                }}
              >
                {option}
              </Box>
            ))}
            {displayOptions.length > 2 && (
              <Box
                sx={{
                  px: 0.75,
                  py: 0.2,
                  borderRadius: 0.75,
                  background: mode === 'dark'
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  fontSize: '0.65rem',
                  color: '#10b981',
                  fontWeight: 500,
                  opacity: 0.8,
                }}
              >
                +{displayOptions.length - 2}
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mr: { md: 2, lg: 3 },
        minWidth: { md: 100, lg: 140 },
        maxWidth: { md: 120, lg: 140 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.25,
          width: '100%',
        }}
      >
        {/* Labels Row */}
        {labels && labels.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            {labels.slice(0, 2).map((label, index) => (
              <Box
                key={`label-${index}`}
                sx={{
                  px: 0.75,
                  py: 0.15,
                  borderRadius: 0.75,
                  background: mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  fontSize: '0.6rem',
                  color: '#6366f1',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Box>
            ))}
            {labels.length > 2 && (
              <Box
                sx={{
                  px: 0.75,
                  py: 0.15,
                  borderRadius: 0.75,
                  background: mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.15)'
                    : 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  fontSize: '0.6rem',
                  color: '#6366f1',
                  fontWeight: 500,
                  opacity: 0.8,
                }}
              >
                +{labels.length - 2}
              </Box>
            )}
          </Box>
        )}

        {/* Display Options Row */}
        {displayOptions && displayOptions.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            {displayOptions.slice(0, 2).map((option, index) => (
              <Box
                key={`option-${index}`}
                sx={{
                  px: 0.75,
                  py: 0.15,
                  borderRadius: 0.75,
                  background: mode === 'dark'
                    ? 'rgba(16, 185, 129, 0.2)'
                    : 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontSize: '0.6rem',
                  color: '#10b981',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {option}
              </Box>
            ))}
            {displayOptions.length > 2 && (
              <Box
                sx={{
                  px: 0.75,
                  py: 0.15,
                  borderRadius: 0.75,
                  background: mode === 'dark'
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  fontSize: '0.6rem',
                  color: '#10b981',
                  fontWeight: 500,
                  opacity: 0.8,
                }}
              >
                +{displayOptions.length - 2}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ItemLabels;