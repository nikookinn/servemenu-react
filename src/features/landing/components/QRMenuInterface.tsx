import React, { useState } from 'react';
import { Box, Card, Typography, Button, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const QRMenuInterface: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tacos');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Demo items
    { id: 1, name: 'Beef Street Tacos', price: 12.99, quantity: 1, image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=300&h=200&fit=crop&auto=format' },
    { id: 2, name: 'Beef Quas-lla', price: 14.99, quantity: 1, image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300&h=200&fit=crop&auto=format' },
  ]);
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #000000 0%, #111111 100%)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '42px',
      }}
    >
      {/* App Content - Scrollable */}
      <Box
        sx={{
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Restaurant Header */}
        <Box
          sx={{
            background: 'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)',
            pt: 7,
            px: 3,
            pb: 3,
            textAlign: 'center',
            borderBottom: '1px solid #333',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '2.4rem' },
              fontWeight: 800,
              color: '#b3b3b3',
              textShadow: '0 2px 15px rgb(140, 0, 255), 0 0 30px rgb(116, 30, 255)',
              mb: 0.5,
              letterSpacing: '2px',
              fontFamily: '"TAN Headline", sans-serif',
              filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5))',
              lineHeight: 1,
            }}
          >
            NEXT BEER
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              fontWeight: 400,
              color: 'white',
              mb: 0.5,
              mt: 0,
              letterSpacing: { xs: '2px', sm: '4px' },
              textTransform: 'uppercase',
              fontFamily: '"Fraunces", serif',
              opacity: 0.9,
              lineHeight: 1,
            }}
          >
            Resto & Pub
          </Typography>
          <Typography
            sx={{
              fontSize: '0.9rem',
              color: '#999',
              mb: 1.5,
            }}
          >
            Authentic Mexican Cuisine • 4.9 ⭐ (2.1k reviews)
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Chip
              label="🚚 Free Delivery"
              size="small"
              sx={{
                backgroundColor: '#f59e0b',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}
            />
            <Chip
              label="⚡ 25-30 min"
              size="small"
              sx={{
                backgroundColor: '#ec4899',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>

        {/* Categories */}
        <Box
          sx={{
            p: 1.5,
            borderBottom: '1px solid #333',
            background: '#0a0a0a',
          }}
        >
          <Typography
            sx={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'white',
              mb: 1.5,
            }}
          >
            Menu Categories
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
            {[
              { name: 'Tacos', icon: '🌮', color: '#10b981' },
              { name: 'Burritos', icon: '🌯', color: '#8b5cf6' },
              { name: 'Quesadillas', icon: '🧀', color: '#f59e0b' },
              { name: 'Nachos', icon: '🥙', color: '#ef4444' },
              { name: 'Drinks', icon: '🍺', color: '#06b6d4' },
            ].map((cat, idx) => (
              <Chip
                key={idx}
                icon={<span style={{ fontSize: '0.9rem' }}>{cat.icon}</span>}
                label={cat.name}
                onClick={() => {
                  console.log('Category clicked:', cat.name);
                  setSelectedCategory(cat.name);
                }}
                sx={{
                  backgroundColor: selectedCategory === cat.name ? cat.color : '#2a2a2a',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  minWidth: 'auto',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: selectedCategory === cat.name ? cat.color : cat.color + '40',
                    transform: 'scale(1.05)',
                  },
                  '& .MuiChip-icon': {
                    color: 'white',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Menu Items */}
        <Box sx={{ p: 2, pb: 10 }}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'white',
              mb: 2,
            }}
          >
            {selectedCategory}
          </Typography>

          {/* Menu Item Cards - Premium Grid Design */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: { xs: 1, sm: 1.5 } }}>
            {[
            {
              name: 'Beef Street Tacos',
              price: 12.99,
              rating: 4.8,
              image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=300&h=200&fit=crop&auto=format',
            },
            {
              name: 'Al Pastor Tacos',
              price: 13.99,
              rating: 4.9,
              image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=200&fit=crop&auto=format',
            },
            {
              name: 'Chicken Burrito',
              price: 15.99,
              rating: 4.7,
              image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=200&fit=crop&auto=format',
            },
            {
              name: 'Beef Que-illa',
              price: 14.99,
              rating: 4.6,
              image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300&h=200&fit=crop&auto=format',
            },
            {
              name: 'Loaded Nachos',
              price: 16.99,
              rating: 4.8,
              image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=200&fit=crop&auto=format',
            },
            {
              name: 'Chicken Ench-das',
              price: 17.99,
              rating: 4.5,
              image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300&h=200&fit=crop&auto=format',
            },
            ].map((item, idx) => (
              <Card
                key={idx}
                sx={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: { xs: 1, sm: 1 },
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#222',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2)',
                  },
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    height: { xs: 50, sm: 70 },
                    objectFit: 'cover',
                  }}
                  src={item.image}
                  alt={item.name}
                />
                <Box sx={{ p: { xs: 0.5, sm: 1.5 } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.85rem' },
                      fontWeight: 700,
                      color: 'white',
                      lineHeight: 1.2,
                      mb: { xs: 0.3, sm: 0.5 },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 0.5, sm: 1 } }}>
                    <Typography
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        fontWeight: 700,
                        color: '#6366f1',
                      }}
                    >
                      ${item.price}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ color: '#fbbf24', fontSize: { xs: '0.6rem', sm: '0.75rem' }, mr: 0.2 }} />
                      <Typography sx={{ fontSize: { xs: '0.55rem', sm: '0.7rem' }, color: '#ccc' }}>
                        {item.rating}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    onClick={() => {
                      console.log('Add to cart clicked for:', item.name);
                      const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
                      if (existingItem) {
                        setCartItems(prev => prev.map(cartItem => 
                          cartItem.name === item.name 
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                        ));
                      } else {
                        const newCartItem: CartItem = {
                          id: Date.now(),
                          name: item.name,
                          price: item.price,
                          quantity: 1,
                          image: item.image,
                        };
                        setCartItems(prev => [...prev, newCartItem]);
                      }
                    }}
                    fullWidth
                    sx={{
                      backgroundColor: ['#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'][idx % 6],
                      color: 'white',
                      py: { xs: 0.1, sm: 0.3 },
                      fontSize: { xs: '0.6rem', sm: '0.75rem' },
                      fontWeight: 600,
                      borderRadius: { xs: 0.6, sm: 1 },
                      cursor: 'pointer',
                      minHeight: { xs: '24px', sm: '32px' },
                      '&:hover': {
                        backgroundColor: ['#059669', '#7c3aed', '#d97706', '#dc2626', '#0891b2', '#db2777'][idx % 6],
                        transform: 'scale(1.02)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Floating Cart Button */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 15, sm: 20 },
          left: { xs: 10, sm: 20 },
          right: { xs: 10, sm: 20 },
          backgroundColor: '#000',
          borderRadius: { xs: 1.5, sm: 2 },
          p: { xs: 1.5, sm: 2 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
          minHeight: { xs: '60px', sm: 'auto' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1 }, flex: 1 }}>
          <ShoppingCartIcon sx={{ color: 'white', fontSize: { xs: '1.1rem', sm: '1.2rem' } }} />
          <Typography sx={{ 
            color: 'white', 
            fontWeight: 600, 
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {cartCount} items • ${cartTotal.toFixed(2)}
          </Typography>
        </Box>
        <Button
          onClick={() => {
            console.log('View Cart clicked, items:', cartCount);
            setShowCart(true);
          }}
          sx={{
            backgroundColor: '#f59e0b',
            color: 'white',
            fontWeight: 700,
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            px: { xs: 1.5, sm: 2 },
            py: { xs: 0.8, sm: 1 },
            borderRadius: { xs: 0.8, sm: 1 },
            cursor: 'pointer',
            minWidth: { xs: '80px', sm: 'auto' },
            flexShrink: 0,
            '&:hover': {
              backgroundColor: '#d97706',
              transform: 'scale(1.05)',
            },
          }}
        >
          View Cart
        </Button>
      </Box>

      {/* Cart Modal */}
      {showCart && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '42px',
            overflow: 'hidden',
          }}
        >
          {/* Cart Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: '1px solid #333',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#111',
            }}
          >
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>
              Your Cart ({cartCount} items)
            </Typography>
            <Button
              onClick={() => setShowCart(false)}
              sx={{
                color: 'white',
                fontSize: '1.2rem',
                minWidth: '32px',
                width: '32px',
                height: '32px',
                p: 0,
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              ✕
            </Button>
          </Box>

          {/* Cart Items */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  mb: 1.5,
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', p: 1.5, alignItems: 'center' }}>
                  <Box
                    component="img"
                    sx={{
                      width: 50,
                      height: 50,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                    src={item.image}
                    alt={item.name}
                  />
                  <Box sx={{ flex: 1, ml: 1.5 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'white', mb: 0.3 }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 600 }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Button
                      onClick={() => {
                        setCartItems(prev => prev.map(cartItem => 
                          cartItem.id === item.id && cartItem.quantity > 1
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem
                        ).filter(cartItem => !(cartItem.id === item.id && cartItem.quantity === 1)));
                      }}
                      sx={{
                        minWidth: '24px',
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        fontSize: '0.9rem',
                        p: 0,
                        borderRadius: 1,
                        '&:hover': { backgroundColor: '#dc2626' },
                      }}
                    >
                      −
                    </Button>
                    <Typography sx={{ color: 'white', mx: 0.8, fontSize: '0.8rem', minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </Typography>
                    <Button
                      onClick={() => {
                        setCartItems(prev => prev.map(cartItem => 
                          cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                        ));
                      }}
                      sx={{
                        minWidth: '24px',
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        fontSize: '0.9rem',
                        p: 0,
                        borderRadius: 1,
                        '&:hover': { backgroundColor: '#059669' },
                      }}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>

          {/* Cart Footer */}
          <Box
            sx={{
              p: 3,
              borderTop: '1px solid #333',
              backgroundColor: '#111',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>
                Total: ${cartTotal.toFixed(2)}
              </Typography>
            </Box>
            <Button
              fullWidth
              disabled={cartItems.length === 0}
              onClick={() => {
                if (cartItems.length > 0) {
                  setShowCart(false);
                  setShowSuccess(true);
                  setCartItems([]);
                  setTimeout(() => setShowSuccess(false), 3000);
                }
              }}
              sx={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                py: 1.2,
                fontSize: '0.9rem',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#7c3aed',
                },
                '&:disabled': {
                  backgroundColor: '#333',
                  color: '#666',
                },
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      )}

      {/* Success Message */}
      {showSuccess && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '42px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              p: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: '3rem',
                mb: 2,
              }}
            >
              ✅
            </Typography>
            <Typography
              sx={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#10b981',
                mb: 1,
              }}
            >
              Order Placed Successfully!
            </Typography>
            <Typography
              sx={{
                fontSize: '0.9rem',
                color: '#ccc',
                mb: 2,
              }}
            >
              Your order is being prepared
            </Typography>
            <Typography
              sx={{
                fontSize: '0.8rem',
                color: '#666',
              }}
            >
              Estimated time: 25-30 minutes
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QRMenuInterface;
