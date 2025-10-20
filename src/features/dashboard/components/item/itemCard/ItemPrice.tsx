import React from 'react';
import { Box, Typography } from '@mui/material';
import { Item } from '../useItemManagement';

interface ItemPriceProps {
  item: Item;
  layout: 'mobile' | 'desktop';
}

const ItemPrice: React.FC<ItemPriceProps> = ({ item, layout }) => {
  const calculatePrice = () => {
    let priceDisplay = '';
    let isRange = false;

    if (item.priceOptions && item.priceOptions.length > 0) {
      const prices = item.priceOptions
        .map(option => Number(option.price))
        .filter(price => !isNaN(price) && price > 0)
        .sort((a, b) => a - b);

      if (prices.length > 1) {
        const minPrice = prices[0];
        const maxPrice = prices[prices.length - 1];

        if (minPrice === maxPrice) {
          priceDisplay = `$${minPrice.toFixed(2)}`;
        } else {
          priceDisplay = `$${minPrice.toFixed(2)}`;
          isRange = true;
        }
      } else if (prices.length === 1) {
        priceDisplay = `$${prices[0].toFixed(2)}`;
      } else {
        // Fallback if no valid prices found
        priceDisplay = '$0.00';
      }
    } else {
      // Fallback for items without priceOptions
      priceDisplay = '$0.00';
    }

    return { priceDisplay, isRange };
  };

  const { priceDisplay, isRange } = calculatePrice();

  if (layout === 'mobile') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexShrink: 0,
          minWidth: 90,
          width: 90,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#10b981',
            fontSize: isRange ? '1.0rem' : '1.2rem',
            whiteSpace: 'nowrap',
          }}
        >
          {priceDisplay}
        </Typography>
        {isRange && (
          <Box
            sx={{
              ml: 0.5,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              color: 'white',
              fontWeight: 600,
            }}
          >
            +
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
        justifyContent: 'flex-start',
        minWidth: { md: 80, lg: 100 },
        width: { md: 80, lg: 100 },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: '#10b981',
          fontSize: isRange
            ? { md: '0.85rem', lg: '0.95rem' }
            : { md: '1rem', lg: '1.1rem' },
          whiteSpace: 'nowrap',
        }}
      >
        {priceDisplay}
      </Typography>
      {isRange && (
        <Box
          sx={{
            ml: 0.5,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            color: 'white',
            fontWeight: 600,
          }}
        >
          +
        </Box>
      )}
    </Box>
  );
};

export default ItemPrice;