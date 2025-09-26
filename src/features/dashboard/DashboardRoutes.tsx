import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const DashboardPlaceholder = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4">Dashboard Module</Typography>
    <Typography>Coming Soon</Typography>
  </Box>
);

const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPlaceholder />} />
      <Route path="menu" element={<DashboardPlaceholder />} />
      <Route path="analytics" element={<DashboardPlaceholder />} />
      <Route path="*" element={<DashboardPlaceholder />} />
    </Routes>
  );
};

export default DashboardRoutes;
