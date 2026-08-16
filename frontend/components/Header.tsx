import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon } from './common/Icon';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
             <h1 className="text-xl font-bold text-brand-primary">Monkey Shoulders PG</h1>
          </div>
          <div className="flex items-center space-x-4">
             <div className="text-right hidden sm:block">
                <p className="font-medium text-gray-700">Welcome, {user?.name.split(' ')[0]}!</p>
                <p className="text-xs text-gray-500">{user?.role ? capitalize(user.role) : ''} View</p>
             </div>
            <div className="relative group">
              <button className="h-10 w-10 bg-brand-light rounded-full flex items-center justify-center text-brand-dark hover:bg-indigo-200 transition">
                <span className="sr-only">Open user menu</span>
                <UserIcon className="h-6 w-6" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 invisible group-hover:visible group-focus-within:visible">
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;