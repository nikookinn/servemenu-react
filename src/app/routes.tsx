import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../features/landing';

// Lazy load future features
const AuthRoutes = React.lazy(() => import('../features/auth/AuthRoutes').catch(() => ({ default: () => <div>Auth module loading...</div> })));
const DashboardRoutes = React.lazy(() => import('../features/dashboard/DashboardRoutes').catch(() => ({ default: () => <div>Dashboard module loading...</div> })));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth Routes (Future) */}
      <Route path="/auth/*" element={
        <React.Suspense fallback={<div>Loading...</div>}>
          <AuthRoutes />
        </React.Suspense>
      } />
      
      {/* Dashboard Routes (Future) */}
      <Route path="/dashboard/*" element={
        <React.Suspense fallback={<div>Loading...</div>}>
          <DashboardRoutes />
        </React.Suspense>
      } />
      
      {/* Redirect unknown routes to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
