import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './components/pages/DashboardPage';
import MenuManagementPage from './components/pages/MenuManagementPage';
import MenuDetailPage from './components/pages/MenuDetailPage';

// Placeholder components for other routes
const OrdersPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4">Orders</Typography>
    <Typography>Coming Soon</Typography>
  </Box>
);

const StoresPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4">Manage Stores</Typography>
    <Typography>Coming Soon</Typography>
  </Box>
);

const AnnouncementsPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4">Announcements</Typography>
    <Typography>Coming Soon</Typography>
  </Box>
);

const HotActionsPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4">Hot Actions</Typography>
    <Typography>Coming Soon</Typography>
  </Box>
);

const ReportsPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4">Reports</Typography>
    <Typography>Coming Soon</Typography>
  </Box>
);

const AccountingPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4">Accounting</Typography>
    <Typography>Coming Soon</Typography>
  </Box>
);

const FAQPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4">FAQ</Typography>
    <Typography>Coming Soon</Typography>
  </Box>
);

const IntegrationsPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4">Integrations</Typography>
    <Typography>Coming Soon</Typography>
  </Box>
);

const SettingsPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4">Settings</Typography>
    <Typography>Coming Soon</Typography>
  </Box>
);

const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="menus" element={<MenuManagementPage />} />
        <Route path="menus/:menuId" element={<MenuDetailPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="stores/*" element={<StoresPage />} />
        <Route path="announcements/*" element={<AnnouncementsPage />} />
        <Route path="hot-actions" element={<HotActionsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="accounting" element={<AccountingPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
