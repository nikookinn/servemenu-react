import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </Box>
  );
};

export default LandingPage;
