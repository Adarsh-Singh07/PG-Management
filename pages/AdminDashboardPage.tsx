import React from 'react';
import Header from '../components/Header';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <AdminDashboard />
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Monkey Shoulders Co-Living. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboardPage;