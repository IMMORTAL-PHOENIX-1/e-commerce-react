import { create } from 'zustand';
import { fetchProducts, createProduct, deleteProduct } from './api';

// Holds the "server" data for products: what's loaded, whether it's
// still loading, and any error — separate from filter/sort UI state.
export const useProductsStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  loadProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await fetchProducts();
      set({ products, loading: false });
    } catch (err) {
      set({ error: 'Failed to load products.', loading: false });
    }
  },

  // Admin: add a new product and reflect it in local state.
  addProduct: async (product) => {
    const newProduct = await createProduct(product);
    set({ products: [...get().products, newProduct] });
    return newProduct;
  },

  // Admin: remove a product and reflect it in local state.
  removeProduct: async (id) => {
    await deleteProduct(id);
    set({ products: get().products.filter((p) => p.id !== id) });
  },
}));