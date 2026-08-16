
import React from 'react';
import { Payment } from '../types';
import Card from './common/Card';
import { RentIcon } from './common/Icon';

interface RentCardProps {
  payments: Payment[];
}

const statusColorMap: Record<Payment['status'], string> = {
  Paid: 'bg-green-100 text-green-800',
  Due: 'bg-yellow-100 text-yellow-800',
  Overdue: 'bg-red-100 text-red-800',
};

const RentCard: React.FC<RentCardProps> = ({ payments }) => {
    const sortedPayments = [...payments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const currentPayment = sortedPayments.find(p => p.status === 'Due' || p.status === 'Overdue') || sortedPayments[0];

  return (
    <Card title="Rent Status" icon={<RentIcon />}>
        {currentPayment && (
            <div className="mb-4 p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">{currentPayment.month}</p>
                        <p className="text-xl font-bold text-gray-900">₹{currentPayment.amount.toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColorMap[currentPayment.status]}`}>
                        {currentPayment.status}
                    </span>
                </div>
            </div>
        )}
      
      <h4 className="text-sm font-semibold text-gray-700 mb-2">Payment History</h4>
      <ul className="space-y-2 max-h-40 overflow-y-auto">
        {sortedPayments.map(payment => (
          <li key={payment.id} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-gray-50">
            <div>
              <p className="font-medium text-gray-800">{payment.month}</p>
              <p className="text-gray-500">Paid on {new Date(payment.date).toLocaleDateString()}</p>
            </div>
            <span className={`font-semibold ${payment.status === 'Paid' ? 'text-green-600' : 'text-gray-600'}`}>
              ₹{payment.amount.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RentCard;
