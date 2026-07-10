import { create } from 'zustand';

// Pure filter/sort UI state — the actual product list now comes from
// useProductsStore (fetched via the fake API), so this store no longer
// needs to know about the data itself.
export const useProductSidebarStore = create((set) => ({
  selectedCategory: 'All',
  searchTerm: '',
  sortBy: 'default', // 'default' | 'price-asc' | 'price-desc'

  setCategory: (category) => set({ selectedCategory: category }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSortBy: (sort) => set({ sortBy: sort }),
  resetFilters: () => set({ selectedCategory: 'All', searchTerm: '', sortBy: 'default' }),
}));