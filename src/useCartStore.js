import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cart state lives here so any component (Navbar badge, Cart page,
// Product cards) can read/update it without prop drilling.
// `persist` keeps the cart in localStorage so it survives a refresh.
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // { id, name, price, image, qty }

      addItem: (product, qty = 1) => {
        const items = get().items;
        const existing = items.find((item) => item.id === product.id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === product.id ? { ...item, qty: item.qty + qty } : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, qty }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQty: (id, qty) => {
        if (qty < 1) return;
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, qty } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      // Derived values — called as functions so they're always fresh.
      totalItems: () => get().items.reduce((sum, item) => sum + item.qty, 0),
      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.qty, 0),
    }),
    { name: 'cart-storage' }
  )
);