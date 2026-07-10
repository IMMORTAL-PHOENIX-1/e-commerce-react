import { create } from 'zustand';
import { fetchOrders } from './api';

export const useOrdersStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,

  loadOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await fetchOrders();
      set({ orders, loading: false });
    } catch (err) {
      set({ error: 'Failed to load orders.', loading: false });
    }
  },
}));