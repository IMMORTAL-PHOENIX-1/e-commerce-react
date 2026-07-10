import { Link } from 'react-router-dom';
import { useCartStore } from './useCartStore';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <Link to="/products" className="text-blue-600 underline">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b border-gray-200 pb-4">
            <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover" />

            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => updateQty(item.id, item.qty - 1)} className="rounded border border-gray-300 px-2">
                -
              </button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)} className="rounded border border-gray-300 px-2">
                +
              </button>
            </div>

            <p className="w-16 text-right">${(item.price * item.qty).toFixed(2)}</p>

            <button onClick={() => removeItem(item.id)} className="text-sm text-red-500 hover:underline">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
        <button className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">Checkout</button>
      </div>
    </section>
  );
}