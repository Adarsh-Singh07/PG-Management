"use client";
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('alex');
  const [password, setPassword] = useState('password123');
  const { login, error, loading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-primary">Monkey Shoulders PG Management</h1>
            <p className="text-gray-600 mt-2">Portal Login</p>
        </div>
        <div className="max-w-sm w-full bg-white shadow-xl rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <div className="mt-1">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                        />
                    </div>
                </div>

                 {error && <p className="text-xs text-red-500 text-center">{error}</p>}


                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </div>
                 <div className="text-xs text-center text-gray-500 space-y-1">
                    <p className="font-semibold">Test Logins (user / pass):</p>
                    <p>Tenant: alex / password123 OR priya / password456</p>
                    <p>Admin: admin / adminpass</p>
                    <p>Owner: owner / ownerpass</p>
                    <p>Manager: manager / managerpass</p>
                    <p>Cook: cook / cookpass</p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default LoginPage;