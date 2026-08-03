/// <reference types="vite/client" />

type CategoryFilterPayload = {
  id: string;
  name: string;
  slug: string;
  subcategories: string[];
};

interface Window {
  korre?: {
    platform: string;
    saveCategoryFilters: (filters: CategoryFilterPayload[]) => Promise<{ ok: boolean; path: string }>;
  };
}
