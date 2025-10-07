import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CookDashboardPage from './pages/CookDashboardPage';
import ManagerDashboardPage from './pages/ManagerDashboardPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import { UserRole } from './types';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  switch (user.role) {
    case UserRole.Admin:
      return <AdminDashboardPage />;
    case UserRole.Cook:
      return <CookDashboardPage />;
    case UserRole.Manager:
      return <ManagerDashboardPage />;
    case UserRole.Owner:
      return <OwnerDashboardPage />;
    case UserRole.Tenant:
    default:
      return <DashboardPage />;
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;