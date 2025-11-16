import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header.js';
import { FilterBar } from './components/FilterBar.js';
import { ResultsArea } from './components/ResultsArea.js';
import { Footer } from './components/Footer.js';
import { activities as allActivities } from './data/activities.js';
import { parseAgeGroup, parsePrice } from './utils/parsers.js';

const App = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    smartSearchTerms: [],
    categories: new Set(),
    ageRange: { min: 0, max: 120 },
    priceRange: { min: 0, max: 2000 },
    locations: new Set(),
  });
  
  const [viewMode, setViewMode] = useState('grid');

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const filteredActivities = useMemo(() => {
    return allActivities.filter((activity) => {
      // Search Term Filter
      const searchTerms = [filters.searchTerm.toLowerCase(), ...filters.smartSearchTerms.map(t => t.toLowerCase())];
      const matchesSearch = filters.searchTerm === '' || searchTerms.some(term => 
        activity.name.toLowerCase().includes(term) ||
        activity.category.toLowerCase().includes(term) ||
        activity.communityCenter.toLowerCase().includes(term)
      );

      // Category Filter
      const matchesCategory = filters.categories.size === 0 || filters.categories.has(activity.category);

      // Location Filter
      const matchesLocation = filters.locations.size === 0 || filters.locations.has(activity.communityCenter);

      // Age Range Filter
      const activityAgeRange = parseAgeGroup(activity.ageGroup);
      const matchesAge = activityAgeRange.min <= filters.ageRange.max && activityAgeRange.max >= filters.ageRange.min;
      
      // Price Range Filter
      const activityPrice = parsePrice(activity.price);
      const matchesPrice = activityPrice >= filters.priceRange.min && activityPrice <= filters.priceRange.max;

      return matchesSearch && matchesCategory && matchesLocation && matchesAge && matchesPrice;
    });
  }, [filters]);

  const uniqueCategories = useMemo(() => Array.from(new Set(allActivities.map(a => a.category))), []);
  const uniqueLocations = useMemo(() => Array.from(new Set(allActivities.map(a => a.communityCenter))), []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar 
          filters={filters}
          onFilterChange={handleFilterChange}
          uniqueCategories={uniqueCategories}
          uniqueLocations={uniqueLocations}
        />
        <ResultsArea 
          activities={filteredActivities}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
