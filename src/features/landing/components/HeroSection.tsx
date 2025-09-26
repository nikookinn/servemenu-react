import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Fade,
  Grow,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import IPhone3D from './IPhone3D';

const HeroSection: React.FC = () => {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 8, md: 8 },
        pb: { xs: 4, md: 8 },
        background: 'radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 25%, #0f0f23 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.2,
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #9ca3af 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                    mb: 3,
                    lineHeight: 1.2,
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  Transform Your Restaurant with{' '}
                  <Box component="span" sx={{ 
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #f59e0b 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.5))',
                  }}>
                    QR Menu
                  </Box>{' '}
                  Solutions
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    fontWeight: 400,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    lineHeight: 1.6,
                    maxWidth: '600px',
                  }}
                >
                  Streamline ordering, boost sales, and enhance customer experience with our
                  contactless QR code menu system. Perfect for modern restaurants seeking premium solutions.
                </Typography>
                <Grow in timeout={1500}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 2 }, 
                    position: 'relative', 
                    zIndex: 10, 
                    justifyContent: { xs: 'center', md: 'flex-start' }, 
                    mb: { xs: 4, md: 0 },
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: { xs: '300px', sm: 'none' },
                    mx: { xs: 'auto', md: 0 }
                  }}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => {
                        console.log('Start Free Trial clicked');
                      }}
                      sx={{
                        backgroundColor: 'white',
                        color: 'white',
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.5, sm: 1.5 },
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        fontWeight: 700,
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 100,
                        pointerEvents: 'auto',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        minHeight: { xs: '48px', sm: 'auto' },
                        width: { xs: '100%', sm: 'auto' },
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                        },
                        '&:active': {
                          transform: 'translateY(0px)',
                          boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
                        },
                        transition: 'all 0.3s',
                      }}
                    >
                      Start Free Trial
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PlayCircleOutlineIcon />}
                      onClick={() => {
                        console.log('View Demo clicked');
                      }}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.5, sm: 1.5 },
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        fontWeight: 600,
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 100,
                        pointerEvents: 'auto',
                        minHeight: { xs: '48px', sm: 'auto' },
                        width: { xs: '100%', sm: 'auto' },
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                        '&:active': {
                          transform: 'translateY(0px)',
                        },
                        transition: 'all 0.3s',
                      }}
                    >
                      View Demo
                    </Button>
                  </Box>
                </Grow>
                <Box sx={{ 
                  mt: { xs: 3, md: 4 }, 
                  mb: { xs: 4, md: 0 }, 
                  display: 'flex', 
                  gap: { xs: 1, sm: 2, md: 4 }, 
                  flexWrap: 'wrap', 
                  justifyContent: { xs: 'space-between', md: 'flex-start' },
                  px: { xs: 2, md: 0 }
                }}>
                  {[
                    { number: '10K+', label: 'Active\nRestaurants' },
                    { number: '1M+', label: 'Orders\nProcessed' },
                    { number: '4.9/5', label: 'Customer\nRating' },
                  ].map((stat, index) => (
                    <Fade in timeout={2000 + index * 200} key={stat.label}>
                      <Box sx={{ 
                        textAlign: 'center',
                        flex: { xs: '1 1 30%', md: 'none' },
                        minWidth: { xs: '90px', sm: '120px' }
                      }}>
                        <Typography
                          variant="h4"
                          sx={{
                            color: 'white',
                            fontWeight: 700,
                            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                            lineHeight: 1.2,
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                            lineHeight: 1.3,
                            mt: 0.5,
                            whiteSpace: 'pre-line',
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </Fade>
                  ))}
                </Box>
              </Box>
            </Fade>
          </Box>
          <Box sx={{ flex: 1, order: { xs: 2, md: 2 } }}>
            <Grow in timeout={1500}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <IPhone3D />
              </Box>
            </Grow>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
