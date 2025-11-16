
import React from 'react';
import type { FilterState, Range } from '../types';

interface AdvancedFiltersProps {
  show: boolean;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  uniqueLocations: string[];
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ show, filters, onFilterChange, uniqueLocations }) => {

  const handleRangeChange = (type: 'ageRange' | 'priceRange', field: 'min' | 'max', value: string) => {
    const numericValue = parseInt(value, 10) || 0;
    const newRange: Range = { ...filters[type], [field]: numericValue };
    onFilterChange({ [type]: newRange });
  };
  
  const handleLocationToggle = (location: string) => {
    const newLocations = new Set(filters.locations);
    if (newLocations.has(location)) {
      newLocations.delete(location);
    } else {
      newLocations.add(location);
    }
    onFilterChange({ locations: newLocations });
  };

  return (
    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${show ? 'max-h-screen' : 'max-h-0'}`}>
      <div className="pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Age Range */}
        <div>
          <h3 className="font-semibold text-slate-600 mb-2">טווח גילאים</h3>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input 
              type="number" 
              placeholder="מגיל"
              value={filters.ageRange.min}
              onChange={(e) => handleRangeChange('ageRange', 'min', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md" 
            />
            <span className="text-slate-500">-</span>
            <input 
              type="number" 
              placeholder="עד גיל" 
              value={filters.ageRange.max}
              onChange={(e) => handleRangeChange('ageRange', 'max', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-slate-600 mb-2">טווח מחירים (₪)</h3>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input 
              type="number" 
              placeholder="מחיר מינימום"
              value={filters.priceRange.min}
              onChange={(e) => handleRangeChange('priceRange', 'min', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md" 
            />
            <span className="text-slate-500">-</span>
            <input 
              type="number" 
              placeholder="מחיר מקסימום"
              value={filters.priceRange.max}
              onChange={(e) => handleRangeChange('priceRange', 'max', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md"
            />
          </div>
        </div>
        
        {/* Location Filter */}
        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="font-semibold text-slate-600 mb-2">סינון לפי מיקום</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueLocations.map(location => (
              <button
                key={location}
                onClick={() => handleLocationToggle(location)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${filters.locations.has(location) ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
