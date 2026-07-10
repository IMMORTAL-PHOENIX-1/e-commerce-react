import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from './useCartStore';
import { useProductSidebarStore } from './productSidebarStore';
import { useProductsStore } from './useProductsStore';
import ProductSidebar from './ProductSidebar';
import Loading from './Loading';

export default function Products() {
  const addItem = useCartStore((state) => state.addItem);
  const selectedCategory = useProductSidebarStore((state) => state.selectedCategory);
  const searchTerm = useProductSidebarStore((state) => state.searchTerm);
  const sortBy = useProductSidebarStore((state) => state.sortBy);

  const products = useProductsStore((state) => state.products);
  const loading = useProductsStore((state) => state.loading);
  const error = useProductsStore((state) => state.error);
  const loadProducts = useProductsStore((state) => state.loadProducts);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  let filtered = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Shop</h1>

      {loading && <Loading label="Loading products..." />}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-8 sm:flex-row">
          <ProductSidebar categories={categories} />

          <div className="flex-1">
            {filtered.length === 0 ? (
              <p className="text-gray-500">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product) => (
                  <div key={product.id} className="rounded border border-gray-200 p-3">
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="mb-3 h-40 w-full rounded object-cover"
                      />
                      <h2 className="font-semibold">{product.name}</h2>
                    </Link>
                    <p className="mb-2 text-sm text-gray-500">{product.category}</p>
                    <p className="mb-3 font-medium">${product.price.toFixed(2)}</p>
                    <button
                      onClick={() => addItem(product)}
                      className="w-full rounded bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      Add to cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}