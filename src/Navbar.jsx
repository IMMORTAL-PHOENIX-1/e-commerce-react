import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "./useCartStore";

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());

  const linkClass = ({ isActive }) =>
    `text-sm ${isActive ? "text-black font-medium" : "text-gray-500 hover:text-black"}`;

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold">
          MyShop
        </Link>

        <nav className="flex gap-6">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Shop
          </NavLink>
          <NavLink to="/orders" className={linkClass}>
            Orders
          </NavLink>
          <NavLink to="/tracking" className={linkClass}>
            Track Order
          </NavLink>
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        </nav>

        <Link to="/cart" className="text-sm text-gray-700 hover:text-black">
          Cart
          {totalItems > 0 && (
            <span className="ml-1 rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}