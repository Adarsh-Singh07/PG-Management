
import React from 'react';
import { Announcement } from '../types';
import Card from './common/Card';
import { AnnouncementIcon } from './common/Icon';

interface AnnouncementsCardProps {
  announcements: Announcement[];
}

const AnnouncementsCard: React.FC<AnnouncementsCardProps> = ({ announcements }) => {
  return (
    <Card title="Announcements" icon={<AnnouncementIcon />}>
      <ul className="space-y-4 max-h-96 overflow-y-auto">
        {announcements.map((item) => (
          <li key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <h5 className="font-bold text-gray-900">{item.title}</h5>
            <p className="text-sm text-gray-600 mt-1">{item.content}</p>
            <div className="text-xs text-gray-400 mt-2 flex justify-between">
              <span>By {item.author}</span>
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default AnnouncementsCard;
