import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setMobileMenu } from '../store/landingSlice';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((state) => state.landing.mobileMenuOpen);

  const navigationItems = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile) {
      dispatch(setMobileMenu(false));
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #27272a',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <RestaurantMenuIcon sx={{ 
                mr: 2, 
                color: 'primary.main', 
                fontSize: 32,
                filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))'
              }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ServeMenu
              </Typography>
            </Box>

            {!isMobile ? (
              <>
                <Box sx={{ display: 'flex', gap: 4, mr: 4 }}>
                  {navigationItems.map((item) => (
                    <Typography
                      key={item.label}
                      component="a"
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        '&:hover': {
                          color: 'primary.main',
                          textShadow: '0 0 8px rgba(99, 102, 241, 0.5)',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -4,
                          left: 0,
                          width: 0,
                          height: 2,
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          transition: 'width 0.3s ease',
                        },
                        '&:hover::after': {
                          width: '100%',
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="outlined" color="primary">
                    Login
                  </Button>
                  <Button variant="contained" color="primary">
                    Start Free Trial
                  </Button>
                </Box>
              </>
            ) : (
              <IconButton
                edge="end"
                color="primary"
                aria-label="menu"
                onClick={() => dispatch(setMobileMenu(true))}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => dispatch(setMobileMenu(false))}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)',
            border: '1px solid #27272a',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              Menu
            </Typography>
            <IconButton onClick={() => dispatch(setMobileMenu(false))}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navigationItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => handleNavClick(item.href)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="outlined" color="primary" fullWidth>
              Login
            </Button>
            <Button variant="contained" color="primary" fullWidth>
              Start Free Trial
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
