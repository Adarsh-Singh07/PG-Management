import React, { useState, useEffect } from 'react';
import { Complaint, ComplaintStatus } from '../../types';
import { getManagerData } from '../../services/apiService';
import Card from '../common/Card';
import { ComplaintIcon } from '../common/Icon';

const statusStyleMap: Record<ComplaintStatus, string> = {
  [ComplaintStatus.Submitted]: 'bg-blue-100 text-blue-800',
  [ComplaintStatus.InProgress]: 'bg-yellow-100 text-yellow-800',
  [ComplaintStatus.Resolved]: 'bg-green-100 text-green-800',
};

const ManagerDashboard: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getManagerData();
        setComplaints(data.complaints);
      } catch (err) {
        setError('Failed to load manager data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = (complaintId: string, newStatus: ComplaintStatus) => {
    alert(`Complaint ${complaintId} status changed to ${newStatus} (simulation).`);
    setComplaints(prev => prev.map(c => c.id === complaintId ? {...c, status: newStatus} : c));
  };


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
      <h2 className="text-2xl font-bold text-gray-800">Manager Dashboard</h2>
      <Card title="Active Complaints Queue" icon={<ComplaintIcon />}>
        <div className="space-y-4">
          {complaints.length > 0 ? complaints.map(c => (
            <div key={c.id} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">{c.category} <span className="text-sm font-normal text-gray-500">- {c.tenantName} ({c.room})</span></p>
                  <p className="text-gray-600 mt-1">{c.description}</p>
                   <p className="text-xs text-gray-400 mt-2">Submitted: {new Date(c.submittedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyleMap[c.status]}`}>{c.status}</span>
                    <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value as ComplaintStatus)}
                        className="text-xs border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value={ComplaintStatus.Submitted}>Submitted</option>
                        <option value={ComplaintStatus.InProgress}>In Progress</option>
                        <option value={ComplaintStatus.Resolved}>Resolved</option>
                    </select>
                </div>
              </div>
            </div>
          )) : <p>No active complaints.</p>}
        </div>
      </Card>
    </div>
  );
};

export default ManagerDashboard;