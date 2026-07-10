import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from './api';
import { useCartStore } from './useCartStore';
import Loading from './Loading';

export default function ProductDetail() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProductById(id).then((result) => {
      if (!cancelled) {
        setProduct(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <Loading label="Loading product..." />;

  if (!product) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Product not found</h1>
        <Link to="/products" className="text-blue-600 underline">
          Back to shop
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-8 sm:flex-row">
        <img src={product.image} alt={product.name} className="h-80 w-full rounded object-cover sm:w-80" />
        <div>
          <h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
          <p className="mb-1 text-sm text-gray-500">{product.category}</p>
          <p className="mb-4 text-xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="mb-6 text-gray-600">{product.description}</p>
          <button
            onClick={() => addItem(product)}
            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}