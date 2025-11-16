import React from 'react';

export const ActivityListItem = ({ activity }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-shadow duration-200">
      <div className="grid grid-cols-1 md:grid-cols-6 items-center p-4 gap-4">
        <div className="md:col-span-2">
          <h3 className="text-md font-bold text-teal-700">{activity.name}</h3>
          <p className="text-sm text-slate-500">{activity.category}</p>
        </div>
        <div className="text-sm text-slate-600">
          <span className="font-semibold block md:hidden">מיקום: </span>
          {activity.communityCenter}
        </div>
        <div className="text-sm text-slate-600">
            <span className="font-semibold block md:hidden">קהל יעד: </span>
            {activity.ageGroup}
        </div>
        <div className="text-sm text-slate-600 font-bold text-lg">
            <span className="font-semibold text-sm block md:hidden">מחיר: </span>
            {activity.price ? `₪${activity.price}` : 'לא צוין'}
        </div>
        <div className="md:col-span-1 flex justify-end">
          <button className="bg-teal-100 text-teal-700 font-bold py-2 px-4 rounded-full hover:bg-teal-200 transition duration-300 text-sm">
            פרטים
          </button>
        </div>
      </div>
    </div>
  );
};
