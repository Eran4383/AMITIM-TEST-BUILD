import React from 'react';
import { ActivityCard } from './ActivityCard.js';
import { ActivityListItem } from './ActivityListItem.js';

export const ResultsArea = ({ activities, viewMode, setViewMode }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-700 mb-2 sm:mb-0">
          נמצאו {activities.length} תוצאות
        </h2>
        <div className="flex items-center space-x-2 rtl:space-x-reverse bg-slate-200 p-1 rounded-full">
            <button onClick={() => setViewMode('grid')} className={`px-4 py-1 rounded-full text-sm font-semibold transition ${viewMode === 'grid' ? 'bg-white text-teal-600 shadow' : 'text-slate-600'}`}>תצוגת רשת</button>
            <button onClick={() => setViewMode('list')} className={`px-4 py-1 rounded-full text-sm font-semibold transition ${viewMode === 'list' ? 'bg-white text-teal-600 shadow' : 'text-slate-600'}`}>תצוגת רשימה</button>
        </div>
      </div>
      
      {activities.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 text-xl">לא נמצאו חוגים התואמים את החיפוש שלך.</p>
          <p className="text-slate-400 mt-2">נסה/י להרחיב את תנאי הסינון.</p>
        </div>
      ) : (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <ActivityCard key={`${activity.name}-${index}`} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <ActivityListItem key={`${activity.name}-${index}`} activity={activity} />
            ))}
          </div>
        )
      )}
    </div>
  );
};
