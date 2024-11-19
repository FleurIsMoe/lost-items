export interface LostItem {
  category: string;
  id: string;
  date: Date;
  title: string;
  description: string;
  location: string;
  found: boolean;
  addedBy: string;
  room?: string;
}

export type FilterState = "all" | "found" | "pending";

export interface Notification {
  id: string;
  itemId: string;
  title: string;
  date: Date;
  status: "pending" | "found" | "deleted";
  details?: string;
}

export interface SearchResult {
  item: LostItem;
  matches: ("title" | "description" | "location")[];
}

export type Language = 'en' | 'fr' | 'es' | 'de' | 'it';