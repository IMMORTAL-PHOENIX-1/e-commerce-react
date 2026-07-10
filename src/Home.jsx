import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="mb-4 text-3xl font-bold">Welcome to MyShop</h1>
      <p className="mb-6 text-gray-600">Simple products, good prices.</p>
      <Link to="/products" className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
        Shop Now
      </Link>
    </section>
  );
}