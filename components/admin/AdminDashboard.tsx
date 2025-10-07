import React, { useState, useEffect } from 'react';
import { FullTenant, OccupancyStats, Announcement } from '../../types';
import { getAdminData } from '../../services/apiService';
import Card from '../common/Card';
import { UserIcon, AnnouncementIcon } from '../common/Icon';

const AdminDashboard: React.FC = () => {
  const [tenants, setTenants] = useState<FullTenant[]>([]);
  const [occupancy, setOccupancy] = useState<OccupancyStats | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAdminData();
        setTenants(data.tenants);
        setOccupancy(data.occupancy);
        setAnnouncements(data.announcements);
      } catch (err) {
        setError('Failed to load admin data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Occupancy" icon={<UserIcon />}>
                <p className="text-3xl font-bold">{occupancy?.occupied} / {occupancy?.totalRooms}</p>
                <p className="text-gray-500">Occupancy Rate: {occupancy?.occupancyRate}</p>
            </Card>
             <Card title="Broadcast Announcement" icon={<AnnouncementIcon />} className="md:col-span-2">
                <form className="space-y-3" onSubmit={e => { e.preventDefault(); alert('Announcement sent (simulation)!'); }}>
                    <input type="text" placeholder="Title" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                    <textarea placeholder="Message" rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm resize-none"></textarea>
                    <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-secondary hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Send</button>
                </form>
            </Card>
        </div>
        
        <Card title="Tenant Management" icon={<UserIcon />}>
            <div className="flex justify-end mb-4">
                 <button onClick={() => alert('Add Tenant form would show here.')} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark">Add Tenant</button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tenants.map(tenant => (
                            <tr key={tenant.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tenant.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.room}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.rentStatus}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button onClick={() => alert(`Editing ${tenant.name}`)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    <button onClick={() => alert(`Removing ${tenant.name}`)} className="text-red-600 hover:text-red-900">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
  );
};

export default AdminDashboard;
