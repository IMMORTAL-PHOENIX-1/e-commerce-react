// Products now come from the real dummyjson.com API. Orders/tracking
// still use local fake data since dummyjson has no equivalent for
// order history.
import { orders as ordersData } from "./ordersData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PRODUCTS_API = "https://dummyjson.com/products";

// dummyjson uses `title`/`thumbnail` — map to the `name`/`image` shape
// the rest of the app already expects, so nothing downstream has to change.
function mapProduct(p) {
  return {
    id: p.id,
    name: p.title,
    price: p.price,
    category: p.category,
    image: p.thumbnail,
    description: p.description,
  };
}

export async function fetchProducts() {
  const res = await fetch(`${PRODUCTS_API}?limit=0`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products.map(mapProduct);
}

export async function fetchProductById(id) {
  const res = await fetch(`${PRODUCTS_API}/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data || data.message) return null; // dummyjson returns { message: "..." } for a bad id
  return mapProduct(data);
}

// Admin: dummyjson's POST /products/add is simulated — it responds with
// what looks like a created product (usually id 195) but doesn't actually
// persist anything server-side. We still call it for a realistic round
// trip, then let the store hold the result locally.
export async function createProduct(product) {
  const res = await fetch(`${PRODUCTS_API}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: product.name,
      price: product.price,
      category: product.category,
      thumbnail: product.image,
      description: product.description,
    }),
  });
  if (!res.ok) throw new Error("Failed to create product");
  const data = await res.json();
  return mapProduct({ ...data, id: data.id ?? Date.now() });
}

// Admin: dummyjson's DELETE /products/:id is also simulated — it
// doesn't actually delete anything server-side. The store removes it
// from local state after this resolves, which is what makes it
// disappear from the UI.
export async function deleteProduct(id) {
  const res = await fetch(`${PRODUCTS_API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return true;
}

export async function fetchOrders() {
  await delay(600);
  return ordersData;
}

export async function fetchOrderById(id) {
  await delay(500);
  return (
    ordersData.find((o) => o.id.toUpperCase() === id.trim().toUpperCase()) ||
    null
  );
}
