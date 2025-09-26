import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer: React.FC = () => {

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Demo', href: '#demo' },
      { label: 'Integrations', href: '#integrations' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Blog', href: '#blog' },
      { label: 'Press', href: '#press' },
    ],
    support: [
      { label: 'Help Center', href: '#help' },
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#api' },
      { label: 'Status', href: '#status' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'GDPR', href: '#gdpr' },
    ],
  };

  const socialLinks = [
    { icon: FacebookIcon, href: '#', label: 'Facebook' },
    { icon: TwitterIcon, href: '#', label: 'Twitter' },
    { icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
    { icon: InstagramIcon, href: '#', label: 'Instagram' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
        color: 'text.secondary',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
        borderTop: '1px solid #27272a',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.03) 0%, transparent 50%)
          `,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {/* Company Info */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 21px)' } }}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RestaurantMenuIcon sx={{ 
                  mr: 2, 
                  color: 'primary.main', 
                  fontSize: 32,
                  filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))'
                }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  ServeMenu
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8 }}>
                Transform your restaurant with our innovative QR menu platform. Streamline operations,
                enhance customer experience, and boost your revenue.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <IconButton
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      sx={{
                        color: 'grey.400',
                        '&:hover': {
                          color: 'primary.main',
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        },
                      }}
                    >
                      <Icon />
                    </IconButton>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {/* Links Sections */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '2 2 calc(66.666% - 21px)' } }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {Object.entries(footerLinks).map(([category, links]) => (
                <Box key={category} sx={{ flex: { xs: '1 1 calc(50% - 16px)', sm: '1 1 calc(25% - 24px)' } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: 'white',
                      mb: 2,
                      textTransform: 'capitalize',
                    }}
                  >
                    {category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        sx={{
                          color: 'grey.400',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          transition: 'color 0.3s',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Contact Info */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 16px)' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="body2">support@servemenu.com</Typography>
              </Box>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 16px)' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="body2">+1 (555) 123-4567</Typography>
              </Box>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 16px)' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant="body2">San Francisco, CA 94102</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'grey.800', my: 4 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            © {new Date().getFullYear()} ServeMenu. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="#privacy"
              sx={{
                color: 'grey.500',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Privacy
            </Link>
            <Link
              href="#terms"
              sx={{
                color: 'grey.500',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Terms
            </Link>
            <Link
              href="#cookies"
              sx={{
                color: 'grey.500',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
