import React from 'react';
import { SportIcon } from './icons/SportIcon.js';

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="bg-teal-500 p-2 rounded-full">
                <SportIcon className="h-8 w-8 text-white" />
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-teal-600">Amitim Activity Finder</h1>
                <p className="text-slate-500">מצאו את החוג המושלם עבורכם</p>
            </div>
        </div>
      </div>
    </header>
  );
};
