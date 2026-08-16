"use client";
import React, { useState, useEffect } from 'react';
import { OccupancyStats, FinancialStats, Complaint, Announcement } from '../../types';
import { getOwnerData } from '../../services/apiService';
import Card from '../common/Card';
import { UserIcon, RentIcon, ComplaintIcon, AnnouncementIcon } from '../common/Icon';

const OwnerDashboard: React.FC = () => {
  const [data, setData] = useState<{
    occupancy: OccupancyStats;
    financials: FinancialStats;
    complaints: Complaint[];
    announcements: Announcement[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getOwnerData();
        setData(result);
      } catch (err) {
        setError('Failed to load owner data.');
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

  if (error || !data) {
    return <div className="text-center text-red-500">{error || 'No data available'}</div>;
  }

  const { occupancy, financials, complaints, announcements } = data;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Owner's Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Occupancy" icon={<UserIcon />}>
              <p className="text-3xl font-bold">{occupancy.occupied} / {occupancy.totalRooms}</p>
              <p className="text-gray-500">Rate: {occupancy.occupancyRate}</p>
          </Card>
          <Card title="Financials (This Month)" icon={<RentIcon />}>
              <p className="text-lg font-bold text-green-600">Paid: ₹{financials.totalRentPaid.toLocaleString()}</p>
              <p className="text-lg font-bold text-red-600">Due: ₹{financials.totalRentDue.toLocaleString()}</p>
          </Card>
           <Card title="Total Revenue" icon={<RentIcon />}>
              <p className="text-3xl font-bold">₹{financials.monthlyRevenue.toLocaleString()}</p>
              <p className="text-gray-500">All time collected</p>
          </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Recent Complaints" icon={<ComplaintIcon />}>
                <ul className="space-y-3 max-h-64 overflow-y-auto">
                    {complaints.slice(0, 5).map(c => (
                        <li key={c.id} className="p-2 bg-gray-50 rounded-md">
                            <p className="text-sm font-medium">{c.category} - {c.tenantName}</p>
                            <p className="text-sm text-gray-600 truncate">{c.description}</p>
                        </li>
                    ))}
                </ul>
            </Card>
            <Card title="Recent Announcements" icon={<AnnouncementIcon />}>
                <ul className="space-y-3 max-h-64 overflow-y-auto">
                    {announcements.slice(0, 5).map(a => (
                        <li key={a.id} className="p-2 bg-gray-50 rounded-md">
                            <p className="text-sm font-medium">{a.title}</p>
                            <p className="text-sm text-gray-600 truncate">{a.content}</p>
                        </li>
                    ))}
                </ul>
            </Card>
       </div>

    </div>
  );
};

export default OwnerDashboard;