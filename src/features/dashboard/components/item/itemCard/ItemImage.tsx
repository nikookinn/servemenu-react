import React from 'react';
import { Box, Typography } from '@mui/material';
import { Item } from '../useItemManagement';

interface ItemImageProps {
  item: Item;
  size: 'small' | 'medium';
  mode: string;
}

const ItemImage: React.FC<ItemImageProps> = ({ item, size, mode }) => {
  const dimensions = size === 'small' ? { width: 48, height: 48, fontSize: '20px' } : { width: 56, height: 56, fontSize: '24px' };
  const indicatorSize = size === 'small' ? 16 : 20;
  const indicatorFontSize = size === 'small' ? '0.6rem' : '0.7rem';

  return (
    <Box
      sx={{
        position: 'relative',
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: size === 'small' ? 1 : 1.5,
        overflow: 'hidden',
        flexShrink: 0,
        background: mode === 'dark'
          ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      {((item.image && item.image.trim() !== '') || (item.images && item.images.length > 0 && item.images[0] && item.images[0].trim() !== '')) ? (
        <>
          <Box
            component="img"
            src={item.image || item.images?.[0]}
            alt={item.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '🍽️';
                parent.style.fontSize = dimensions.fontSize;
              }
            }}
          />
          {/* Multiple images indicator */}
          {item.images && item.images.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                top: size === 'small' ? 2 : 4,
                right: size === 'small' ? 2 : 4,
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                borderRadius: '50%',
                width: indicatorSize,
                height: indicatorSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: indicatorFontSize,
                fontWeight: 600,
              }}
            >
              {item.images.length}
            </Box>
          )}
        </>
      ) : (
        <Typography
          sx={{
            fontSize: dimensions.fontSize,
            color: mode === 'dark' ? '#64748b' : '#94a3b8',
          }}
        >
          🍽️
        </Typography>
      )}
    </Box>
  );
};

export default ItemImage;