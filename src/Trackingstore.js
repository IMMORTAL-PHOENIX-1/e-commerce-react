import { create } from 'zustand';
import { fetchOrderById } from './api';

export const useTrackingStore = create((set, get) => ({
  searchId: '',
  order: null,
  loading: false,
  notFound: false,

  setSearchId: (id) => set({ searchId: id, notFound: false }),

  search: async () => {
    const id = get().searchId.trim();
    if (!id) {
      set({ order: null, notFound: false, loading: false });
      return;
    }
    set({ loading: true, notFound: false });
    const order = await fetchOrderById(id);
    // Ignore stale responses if the user kept typing after this fired.
    if (get().searchId.trim() === id) {
      set({ order, loading: false, notFound: !order });
    }
  },
}));