import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="mb-4 text-2xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-600 underline">
        Go back home
      </Link>
    </section>
  );
}