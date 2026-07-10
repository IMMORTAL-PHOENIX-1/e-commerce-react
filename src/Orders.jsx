import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrdersStore } from './useOrdersStore';
import { useOrdersSidebarStore } from './ordersSidebarStore';
import OrdersSidebar from './OrdersSidebar';
import Loading from './Loading';

export default function Orders() {
  const orders = useOrdersStore((state) => state.orders);
  const loading = useOrdersStore((state) => state.loading);
  const error = useOrdersStore((state) => state.error);
  const loadOrders = useOrdersStore((state) => state.loadOrders);

  const selectedStatus = useOrdersSidebarStore((state) => state.selectedStatus);
  const searchTerm = useOrdersSidebarStore((state) => state.searchTerm);
  const sortBy = useOrdersSidebarStore((state) => state.sortBy);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const statuses = ['All', ...new Set(orders.map((o) => o.status))];

  let filtered = orders.filter((o) => {
    const matchesStatus = selectedStatus === 'All' || o.status === selectedStatus;
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (sortBy === 'date-desc') filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sortBy === 'date-asc') filtered = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
  if (sortBy === 'total-desc') filtered = [...filtered].sort((a, b) => b.total - a.total);
  if (sortBy === 'total-asc') filtered = [...filtered].sort((a, b) => a.total - b.total);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Your Orders</h1>

      {loading && <Loading label="Loading orders..." />}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-8 sm:flex-row">
          <OrdersSidebar statuses={statuses} />

          <div className="flex-1 space-y-4">
            {filtered.length === 0 ? (
              <p className="text-gray-500">No orders found.</p>
            ) : (
              filtered.map((order) => (
                <div key={order.id} className="rounded border border-gray-200 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-medium">{order.id}</p>
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs">{order.status}</span>
                  </div>
                  <p className="mb-1 text-sm text-gray-500">Placed on {order.date}</p>
                  <p className="mb-3 text-sm text-gray-500">
                    {order.items.length} item(s) — ${order.total.toFixed(2)}
                  </p>
                  <Link to={`/tracking?order=${order.id}`} className="text-sm text-blue-600 underline">
                    Track this order
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}