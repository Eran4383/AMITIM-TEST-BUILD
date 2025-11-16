
export interface Activity {
  name: string;
  category: string;
  communityCenter: string;
  ageGroup: string;
  price: string;
  notes: string;
  frequency: string;
  schedule: string;
}

export interface Range {
  min: number;
  max: number;
}

export interface FilterState {
  searchTerm: string;
  smartSearchTerms: string[];
  categories: Set<string>;
  ageRange: Range;
  priceRange: Range;
  locations: Set<string>;
}
