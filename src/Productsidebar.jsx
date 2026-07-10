import { useProductSidebarStore } from './productSidebarStore';

// categories is passed in from Products.jsx since it's derived from
// whatever product data actually loaded from the fake API.
export default function ProductSidebar({ categories }) {
  const selectedCategory = useProductSidebarStore((state) => state.selectedCategory);
  const searchTerm = useProductSidebarStore((state) => state.searchTerm);
  const sortBy = useProductSidebarStore((state) => state.sortBy);
  const setCategory = useProductSidebarStore((state) => state.setCategory);
  const setSearchTerm = useProductSidebarStore((state) => state.setSearchTerm);
  const setSortBy = useProductSidebarStore((state) => state.setSortBy);
  const resetFilters = useProductSidebarStore((state) => state.resetFilters);

  return (
    <aside className="w-full shrink-0 border-b border-gray-200 pb-6 sm:w-52 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium">Search</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
        />
      </div>

      <div className="mb-6">
        <p className="mb-2 text-sm font-medium">Category</p>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setCategory(cat)}
                className={`w-full rounded px-2 py-1 text-left text-sm ${
                  selectedCategory === cat ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
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
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <button onClick={resetFilters} className="text-sm text-blue-600 underline">
        Reset filters
      </button>
    </aside>
  );
}