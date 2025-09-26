import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Grow,
  Switch,
  Fade,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useInView } from 'react-intersection-observer';
import { PRICING_PLANS } from '../../../shared/constants';

const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Box
      id="pricing"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
          `,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Header Section */}
        <Box ref={ref} sx={{ textAlign: 'center', mb: 8 }}>
          <Fade in={inView} timeout={800}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Simple, Transparent Pricing
            </Typography>
          </Fade>
          
          <Fade in={inView} timeout={1000}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.25rem' },
                mb: 6,
              }}
            >
              Choose the perfect plan for your restaurant. No hidden fees, cancel anytime.
            </Typography>
          </Fade>
          
          {/* Pricing Toggle */}
          <Grow in={inView} timeout={1200}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: 2,
              mb: 2,
            }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 600,
                  color: !isAnnual ? 'primary.main' : 'text.secondary',
                  transition: 'color 0.3s ease',
                }}
              >
                Monthly
              </Typography>
              <Switch
                checked={isAnnual}
                onChange={(e) => setIsAnnual(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'primary.main',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'primary.main',
                  },
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 600,
                    color: isAnnual ? 'primary.main' : 'text.secondary',
                    transition: 'color 0.3s ease',
                  }}
                >
                  Annual
                </Typography>
                <Chip
                  label="Save 20%"
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                />
              </Box>
            </Box>
          </Grow>
        </Box>

        {/* Pricing Cards */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
          gap: 4, 
          alignItems: 'start',
          mt: 6,
        }}>
          {PRICING_PLANS.map((plan, index) => (
            <Box 
              key={plan.id} 
              sx={{ 
                position: 'relative',
                height: '100%',
              }}
            >
              <Grow in={inView} timeout={1000 + index * 200}>
                <Box
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 3,
                    background: plan.highlighted 
                      ? 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #111111 100%)'
                      : 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)',
                    border: '1px solid',
                    borderColor: plan.highlighted ? 'primary.main' : '#27272a',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: plan.highlighted 
                        ? '0 20px 40px rgba(99, 102, 241, 0.3)'
                        : '0 20px 40px rgba(0, 0, 0, 0.5)',
                      borderColor: plan.highlighted ? 'secondary.main' : 'primary.main',
                    },
                  }}
                >
                  {/* Most Popular Badge */}
                  {plan.highlighted && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10,
                      }}
                    >
                      <Chip
                        icon={<StarIcon />}
                        label="Most Popular"
                        sx={{
                          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                          color: '#000000',
                          fontWeight: 700,
                          px: 2,
                          py: 0.5,
                          fontSize: '0.85rem',
                          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.5)',
                          '& .MuiChip-icon': {
                            color: '#000000',
                          },
                        }}
                      />
                    </Box>
                  )}

                  {/* Plan Header */}
                  <Box sx={{ textAlign: 'center', mt: plan.highlighted ? 2 : 0 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: plan.highlighted ? 'primary.main' : 'text.primary',
                      }}
                    >
                      {plan.name}
                    </Typography>

                    <Box sx={{ mb: 2, minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h3"
                          component="span"
                          sx={{
                            fontWeight: 700,
                            color: plan.highlighted ? 'primary.main' : 'text.primary',
                          }}
                        >
                          ${isAnnual ? plan.annualPrice : plan.price}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="span"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {plan.price === 0 ? '' : isAnnual ? '/year' : '/month'}
                        </Typography>
                      </Box>
                      <Box sx={{ minHeight: '20px', mt: 0.5, textAlign: 'center' }}>
                        {isAnnual && plan.price > 0 && (
                          <Typography
                            variant="body2"
                            sx={{ 
                              color: 'success.main',
                              fontWeight: 600,
                              textDecoration: 'line-through',
                              opacity: 0.7,
                            }}
                          >
                            ${plan.price * 12}/year
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  {/* Features */}
                  <List sx={{ mb: 4 }}>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ py: 1, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon
                            sx={{
                              color: plan.highlighted ? 'primary.main' : 'success.main',
                              fontSize: 20,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature}
                          primaryTypographyProps={{
                            sx: {
                              fontWeight: 500,
                              color: 'text.primary',
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  {/* Button */}
                  <Button
                    variant={plan.highlighted ? 'contained' : 'outlined'}
                    fullWidth
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      mt: 'auto',
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </Box>
              </Grow>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PricingSection;
