import { useEffect, useState } from 'react';
import { useProductsStore } from './useProductsStore';
import Loading from './Loading';

const emptyForm = { name: '', price: '', category: '', image: '', description: '' };

export default function Admin() {
  const products = useProductsStore((state) => state.products);
  const loading = useProductsStore((state) => state.loading);
  const error = useProductsStore((state) => state.error);
  const loadProducts = useProductsStore((state) => state.loadProducts);
  const addProduct = useProductsStore((state) => state.addProduct);
  const removeProduct = useProductsStore((state) => state.removeProduct);

  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!form.name.trim() || !form.price || !form.category.trim()) {
      setFormError('Name, price, and category are required.');
      return;
    }

    setSubmitting(true);
    try {
      await addProduct({
        name: form.name.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        image:
          form.image.trim() ||
          `https://picsum.photos/seed/${encodeURIComponent(form.name.trim())}/400/400`,
        description: form.description.trim(),
      });
      setForm(emptyForm);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (id) => {
    setRemovingId(id);
    try {
      await removeProduct(id);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Admin — Manage Products</h1>

      <div className="flex flex-col gap-10 lg:flex-row">
        <form onSubmit={handleSubmit} className="w-full max-w-sm shrink-0 space-y-4">
          <h2 className="text-lg font-semibold">Add a product</h2>

          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Image URL (optional)</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Leave blank for a placeholder image"
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
            />
          </div>

          {formError && <p className="text-sm text-red-500">{formError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded bg-blue-600 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Adding...' : 'Add product'}
          </button>
        </form>

        <div className="flex-1">
          <h2 className="mb-4 text-lg font-semibold">Current products</h2>

          {loading && <Loading label="Loading products..." />}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="space-y-3">
              {products.length === 0 ? (
                <p className="text-gray-500">No products yet.</p>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 rounded border border-gray-200 p-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.category} — ${Number(product.price).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(product.id)}
                      disabled={removingId === product.id}
                      className="text-sm text-red-500 hover:underline disabled:opacity-50"
                    >
                      {removingId === product.id ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}