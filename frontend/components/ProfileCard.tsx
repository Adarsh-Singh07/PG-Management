import React from 'react';
import { User } from '../types';

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48" src={user.profileImageUrl} alt={`Profile of ${user.name}`} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-brand-primary font-semibold">{user.pgName}</div>
          <a href="#" className="block mt-1 text-2xl leading-tight font-bold text-black hover:underline">{user.name}</a>
          <p className="mt-2 text-gray-500">{user.location}</p>
          <div className="mt-4 flex items-center text-gray-700">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
            <span>Room {user.room}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;