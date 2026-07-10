import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTrackingStore } from "./trackingStore";
import Loading from "./Loading";

export default function Tracking() {
  const [searchParams] = useSearchParams();
  const searchId = useTrackingStore((state) => state.searchId);
  const order = useTrackingStore((state) => state.order);
  const loading = useTrackingStore((state) => state.loading);
  const notFound = useTrackingStore((state) => state.notFound);
  const setSearchId = useTrackingStore((state) => state.setSearchId);
  const search = useTrackingStore((state) => state.search);

  // Prefill from "Track this order" (?order=ORD-1001).
  useEffect(() => {
    const orderParam = searchParams.get("order");
    if (orderParam) setSearchId(orderParam);
  }, [searchParams, setSearchId]);

  // Debounce the fake API call so it doesn't fire on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => {
      search();
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchId, search]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Track your order</h1>

      <input
        type="text"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Enter order ID (e.g. ORD-1001)"
        className="mb-8 w-full max-w-sm rounded border border-gray-300 px-3 py-2 text-sm"
      />

      {loading && <Loading label="Looking up order..." />}
      {!loading && notFound && (
        <p className="text-gray-500">No order found with that ID.</p>
      )}

      {!loading && order && (
        <div>
          <p className="mb-1 font-medium">Order {order.id}</p>
          <p className="mb-6 text-sm text-gray-500">Placed on {order.date}</p>

          <ol className="space-y-4">
            {order.tracking.map((step, i) => (
              <li key={i} className="flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full ${step.done ? "bg-blue-600" : "bg-gray-300"}`}
                />
                <span className={step.done ? "font-medium" : "text-gray-400"}>
                  {step.step}
                </span>
                {step.done && step.date && (
                  <span className="text-sm text-gray-500">— {step.date}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
