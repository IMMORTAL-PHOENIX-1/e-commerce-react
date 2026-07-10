import { useOrdersSidebarStore } from './ordersSidebarStore';

export default function OrdersSidebar({ statuses }) {
  const selectedStatus = useOrdersSidebarStore((state) => state.selectedStatus);
  const searchTerm = useOrdersSidebarStore((state) => state.searchTerm);
  const sortBy = useOrdersSidebarStore((state) => state.sortBy);
  const setStatus = useOrdersSidebarStore((state) => state.setStatus);
  const setSearchTerm = useOrdersSidebarStore((state) => state.setSearchTerm);
  const setSortBy = useOrdersSidebarStore((state) => state.setSortBy);
  const resetFilters = useOrdersSidebarStore((state) => state.resetFilters);

  return (
    <aside className="w-full shrink-0 border-b border-gray-200 pb-6 sm:w-52 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium">Search order ID</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="e.g. ORD-1001"
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
        />
      </div>

      <div className="mb-6">
        <p className="mb-2 text-sm font-medium">Status</p>
        <ul className="space-y-1">
          {statuses.map((status) => (
            <li key={status}>
              <button
                onClick={() => setStatus(status)}
                className={`w-full rounded px-2 py-1 text-left text-sm ${
                  selectedStatus === status ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium">Sort by</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="total-desc">Total: High to Low</option>
          <option value="total-asc">Total: Low to High</option>
        </select>
      </div>

      <button onClick={resetFilters} className="text-sm text-blue-600 underline">
        Reset filters
      </button>
    </aside>
  );
}