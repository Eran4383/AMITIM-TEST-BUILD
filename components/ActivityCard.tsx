
import React from 'react';
import type { Activity } from '../types';
import { ArtIcon } from './icons/ArtIcon';
import { CommunityIcon } from './icons/CommunityIcon';
import { SportIcon } from './icons/SportIcon';

interface ActivityCardProps {
  activity: Activity;
}

const categoryDetails: { [key: string]: { Icon: React.FC<{className?: string}>; color: string; image: string } } = {
  'ספורט והתעמלות': { Icon: SportIcon, color: 'blue', image: 'https://picsum.photos/seed/sport/400/300' },
  'אומנות': { Icon: ArtIcon, color: 'purple', image: 'https://picsum.photos/seed/art/400/300' },
  'חברה וקהילה': { Icon: CommunityIcon, color: 'green', image: 'https://picsum.photos/seed/community/400/300' },
};

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const details = categoryDetails[activity.category] || categoryDetails['ספורט והתעמלות'];
  const { Icon } = details;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className="relative">
        <img src={details.image} alt={activity.category} className="w-full h-40 object-cover" />
        <div className={`absolute top-2 left-2 bg-${details.color}-500 text-white text-xs font-bold px-3 py-1 rounded-full`}>
          {activity.category}
        </div>
        <div className="absolute bottom-2 right-2 bg-white text-slate-800 text-lg font-bold px-3 py-1 rounded-lg shadow-sm">
          {activity.price ? `₪${activity.price}` : '문의'}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-800 mb-2 truncate">{activity.name}</h3>
        <div className="space-y-2 text-sm text-slate-600 flex-grow">
          <p className="flex items-center"><svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>{activity.communityCenter}</p>
          <p className="flex items-center"><svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>{activity.ageGroup}</p>
          <p className="flex items-center"><svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>{activity.schedule || 'יפורסם בהמשך'}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200">
           <button className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-full hover:bg-teal-600 transition duration-300">
             לפרטים נוספים
           </button>
        </div>
      </div>
    </div>
  );
};
