
import React from 'react';
import { SportIcon } from './icons/SportIcon';
import { ArtIcon } from './icons/ArtIcon';
import { CommunityIcon } from './icons/CommunityIcon';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: Set<string>;
  onCategoryToggle: (category: string) => void;
}

const categoryIcons: { [key: string]: React.FC<{className?: string}> } = {
  'ספורט והתעמלות': SportIcon,
  'אומנות': ArtIcon,
  'חברה וקהילה': CommunityIcon,
};

const categoryColors: { [key: string]: string } = {
  'ספורט והתעמלות': 'bg-blue-100 text-blue-600 ring-blue-500',
  'אומנות': 'bg-purple-100 text-purple-600 ring-purple-500',
  'חברה וקהילה': 'bg-green-100 text-green-600 ring-green-500',
};
const defaultColor = 'bg-gray-100 text-gray-600 ring-gray-500';


export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategories, onCategoryToggle }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => {
        const Icon = categoryIcons[category] || SportIcon;
        const colors = categoryColors[category] || defaultColor;
        const isSelected = selectedCategories.has(category);
        return (
          <button
            key={category}
            onClick={() => onCategoryToggle(category)}
            className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-full w-24 h-24 transition duration-200 transform hover:scale-105 focus:outline-none ${isSelected ? `ring-2 ${colors}` : `bg-white shadow-sm hover:shadow-md ${colors.split(' ')[0]}`}`}
            aria-pressed={isSelected}
          >
            <Icon className={`w-8 h-8 ${colors.split(' ')[1]}`} />
            <span className="text-xs font-semibold text-center">{category}</span>
          </button>
        );
      })}
    </div>
  );
};
