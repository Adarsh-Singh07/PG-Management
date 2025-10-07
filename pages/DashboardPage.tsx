import React from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard />
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Monkey Shoulders Co-Living. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
