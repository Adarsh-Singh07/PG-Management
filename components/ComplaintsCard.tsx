import React, { useState, useCallback } from 'react';
import { Complaint, ComplaintStatus } from '../types';
import Card from './common/Card';
import { ComplaintIcon, SparklesIcon } from './common/Icon';
import { refineComplaintText } from '../services/geminiService';
import { submitComplaint } from '../services/apiService';

interface ComplaintsCardProps {
  complaints: Complaint[];
  onAddComplaint: (complaint: Complaint) => void;
}

const statusStyleMap: Record<ComplaintStatus, string> = {
  [ComplaintStatus.Submitted]: 'bg-blue-100 text-blue-800',
  [ComplaintStatus.InProgress]: 'bg-yellow-100 text-yellow-800',
  [ComplaintStatus.Resolved]: 'bg-green-100 text-green-800',
};

const ComplaintsCard: React.FC<ComplaintsCardProps> = ({ complaints, onAddComplaint }) => {
  const [newComplaint, setNewComplaint] = useState('');
  const [category, setCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState('');

  const handleRefine = useCallback(async () => {
    if (!newComplaint.trim()) return;
    setIsRefining(true);
    setError('');
    try {
      const refinedText = await refineComplaintText(newComplaint);
      setNewComplaint(refinedText);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsRefining(false);
    }
  }, [newComplaint]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaint.trim() || !category.trim()) return;

    setIsSubmitting(true);
    setError('');
    try {
      const submittedComplaint = await submitComplaint({ category, description: newComplaint });
      onAddComplaint(submittedComplaint);
      setNewComplaint('');
      setCategory('General');
    } catch (err) {
        setError((err as Error).message);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Card title="Complaints & Requests" icon={<ComplaintIcon />}>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
          >
            <option>General</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Wi-Fi</option>
            <option>Housekeeping</option>
          </select>
        </div>
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <div className="relative">
                <textarea
                    id="description"
                    rows={4}
                    value={newComplaint}
                    onChange={(e) => setNewComplaint(e.target.value)}
                    placeholder="Describe your issue here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm resize-none"
                />
                <button
                    type="button"
                    onClick={handleRefine}
                    disabled={isRefining || !newComplaint.trim()}
                    className="absolute bottom-2 right-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isRefining ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                       <>
                        <SparklesIcon className="h-4 w-4 mr-1"/>
                        Refine
                       </>
                    )}
                </button>
            </div>
            
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-secondary hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
        {error && <p className="text-xs text-red-500 text-center mt-2">{error}</p>}
      </form>

      <h4 className="text-sm font-semibold text-gray-700 mb-2">Your Past Complaints</h4>
      <ul className="space-y-3 max-h-48 overflow-y-auto">
        {complaints.map(c => (
          <li key={c.id} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800 text-sm">{c.category}</p>
                <p className="text-gray-600 text-sm">{c.description}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyleMap[c.status]}`}>{c.status}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{new Date(c.submittedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ComplaintsCard;
