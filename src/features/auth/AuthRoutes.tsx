import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const AuthPlaceholder = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4">Authentication Module</Typography>
    <Typography>Coming Soon</Typography>
  </Box>
);

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<AuthPlaceholder />} />
      <Route path="register" element={<AuthPlaceholder />} />
      <Route path="*" element={<AuthPlaceholder />} />
    </Routes>
  );
};

export default AuthRoutes;
