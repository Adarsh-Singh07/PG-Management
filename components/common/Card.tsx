
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 text-brand-primary">
            {icon}
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
