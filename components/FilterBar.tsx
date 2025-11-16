
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { CategoryFilter } from './CategoryFilter';
import { AdvancedFilters } from './AdvancedFilters';
import type { FilterState } from '../types';
import { getRelatedSearchTerms } from '../services/geminiService';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  uniqueCategories: string[];
  uniqueLocations: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, uniqueCategories, uniqueLocations }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoadingSmartSearch, setIsLoadingSmartSearch] = useState(false);
  const debounceTimeout = useRef<number | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    onFilterChange({ searchTerm: newSearchTerm, smartSearchTerms: [] });

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (newSearchTerm.length > 2) {
      setIsLoadingSmartSearch(true);
      debounceTimeout.current = window.setTimeout(async () => {
        try {
          const relatedTerms = await getRelatedSearchTerms(newSearchTerm);
          onFilterChange({ smartSearchTerms: relatedTerms });
        } catch (error) {
          console.error("Smart search failed, falling back to regular search:", error);
          onFilterChange({ smartSearchTerms: [] });
        } finally {
          setIsLoadingSmartSearch(false);
        }
      }, 500);
    } else {
        setIsLoadingSmartSearch(false);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);


  const handleCategoryToggle = useCallback((category: string) => {
    const newCategories = new Set(filters.categories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    onFilterChange({ categories: newCategories });
  }, [filters.categories, onFilterChange]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">סינון לפי קטגוריה</h2>
        <CategoryFilter
          categories={uniqueCategories}
          selectedCategories={filters.categories}
          onCategoryToggle={handleCategoryToggle}
        />
      </div>

      <div className="relative">
        <label htmlFor="search" className="sr-only">חיפוש חופשי</label>
        <div className="relative">
          <input
            id="search"
            type="text"
            placeholder="חיפוש חופשי (לדוגמה: כדורגל, יוגה...)"
            value={filters.searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-full text-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {isLoadingSmartSearch && (
             <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="animate-spin h-5 w-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
          )}
        </div>
      </div>

      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-teal-600 font-semibold hover:text-teal-700 transition duration-150 ease-in-out"
        >
          {showAdvanced ? 'הסתר סינון מתקדם' : 'הצג סינון מתקדם'}
          <svg className={`inline-block w-4 h-4 ml-1 transition-transform transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
      </div>

      <AdvancedFilters
        show={showAdvanced}
        filters={filters}
        onFilterChange={onFilterChange}
        uniqueLocations={uniqueLocations}
      />
    </div>
  );
};
