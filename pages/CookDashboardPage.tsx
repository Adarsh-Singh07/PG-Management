import React from 'react';
import Header from '../components/Header';
import CookDashboard from '../components/cook/CookDashboard';

const CookDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <CookDashboard />
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Monkey Shoulders Co-Living. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CookDashboardPage;