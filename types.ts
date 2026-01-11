
export interface BranchLocation {
  City: string;
  "Phone Number": string | null;
  Rating: number | null;
  Reviews?: number | null;
  "Map URL": string | null;
  citySlug?: string;
}

export interface Architect {
  "Shop Name": string;
  "Category": string | null;
  "Website": string | null;
  "Locations": BranchLocation[];
  slug: string;
  // Computed values
  globalRating: number | null;
  totalReviews: number;
}

export interface CityInfo {
  name: string;
  slug: string;
  count: number;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
