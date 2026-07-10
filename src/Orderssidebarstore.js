import { create } from 'zustand';

// Pure filter/sort UI state — order data now comes from useOrdersStore.
export const useOrdersSidebarStore = create((set) => ({
  selectedStatus: 'All',
  searchTerm: '',
  sortBy: 'date-desc', // 'date-desc' | 'date-asc' | 'total-desc' | 'total-asc'

  setStatus: (status) => set({ selectedStatus: status }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSortBy: (sort) => set({ sortBy: sort }),
  resetFilters: () => set({ selectedStatus: 'All', searchTerm: '', sortBy: 'date-desc' }),
}));