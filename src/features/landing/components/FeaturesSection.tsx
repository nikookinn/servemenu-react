import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Fade,
} from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import StoreIcon from '@mui/icons-material/Store';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PaymentIcon from '@mui/icons-material/Payment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: QrCode2Icon,
    title: 'QR Code Ordering System',
    description: 'Contactless ordering with instant QR code generation for each table. Customers scan and order directly from their phones.',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  },
  {
    icon: StoreIcon,
    title: 'Multi-store Management',
    description: 'Manage multiple restaurant locations from a single dashboard. Centralized control with location-specific customization.',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  },
  {
    icon: AnalyticsIcon,
    title: 'Real-time Analytics',
    description: 'Track orders, revenue, and customer behavior in real-time. Make data-driven decisions to grow your business.',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    icon: PaymentIcon,
    title: 'Payment Integration',
    description: 'Accept payments through multiple gateways including Stripe and PayPal. Secure and seamless transactions.',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    icon: MenuBookIcon,
    title: 'Customizable Menus',
    description: 'Create beautiful, branded menus with unlimited customization options. Update prices and items instantly.',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  },
];

const FeaturesSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Box
      id="features"
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
      <Container maxWidth="lg">
        <Box ref={ref} sx={{ textAlign: 'center', mb: 8 }}>
          <Fade in={inView} timeout={1000}>
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
              Powerful Features for Modern Restaurants
            </Typography>
          </Fade>
          <Fade in={inView} timeout={1200}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              Everything you need to digitize your restaurant operations and enhance customer experience
            </Typography>
          </Fade>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(33.333% - 21px)' } }}>
                <Fade in={inView} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: 'divider',
                      backgroundColor: 'background.paper',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                        borderColor: feature.color,
                        '& .feature-icon': {
                          transform: 'scale(1.1) rotate(5deg)',
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 3,
                        }}
                      >
                        <Box
                          className="feature-icon"
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '20px',
                            background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}40 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.3s',
                          }}
                        >
                          <Icon
                            sx={{
                              fontSize: 40,
                              color: feature.color,
                            }}
                          />
                        </Box>
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          textAlign: 'center',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          textAlign: 'center',
                          lineHeight: 1.7,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
