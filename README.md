

# MyShop

A simple e-commerce front end built with React, Vite, and Tailwind CSS. Product data comes live from the [dummyjson.com](https://dummyjson.com) API; cart, orders, and order tracking are handled client-side.

## Features

- **Shop** — browse products fetched from dummyjson, filter by category, search, sort by price
- **Product detail** — full product view with add-to-cart
- **Cart** — add/remove items, adjust quantities, persists across refreshes (localStorage via Zustand)
- **Orders** — view order history, filter by status, search, sort
- **Track order** — look up an order by ID and see its shipping progress
- **Admin** — add or remove products (calls dummyjson's product endpoints; see note below)

## Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) for routing
- [Zustand](https://github.com/pmndrs/zustand) for state management (cart, product/order data, filters)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [dummyjson.com](https://dummyjson.com) as the product data source

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
src/
├── api.js                  # fetch wrappers around dummyjson + local order data
├── App.jsx                 # routes
├── main.jsx                # entry point
├── Navbar.jsx / Footer.jsx
├── Home.jsx
├── Products.jsx            # shop grid + filters
├── ProductSidebar.jsx / productSidebarStore.js
├── ProductDetail.jsx
├── useProductsStore.js     # product data + admin add/remove
├── Cart.jsx / useCartStore.js
├── Orders.jsx              # order history + filters
├── OrdersSidebar.jsx / ordersSidebarStore.js
├── useOrdersStore.js
├── ordersData.js           # local fake order history
├── Tracking.jsx / trackingStore.js
├── Admin.jsx                # add/remove products
├── Loading.jsx
└── NotFound.jsx
```

## Notes on data sources

- **Products** are fetched live from `https://dummyjson.com/products`. Field names are mapped (`title` → `name`, `thumbnail` → `image`) so the rest of the app stays clean.
- **Admin add/remove** calls dummyjson's `POST /products/add` and `DELETE /products/:id` endpoints. These are simulated by dummyjson — they respond successfully but don't persist changes server-side. The app reflects changes in local state after each call, so the UI still behaves correctly; a refresh resets the product list back to dummyjson's live data.
- **Orders and tracking** use local fake data (`ordersData.js`) since dummyjson has no order-history equivalent.
- **Cart** is fully local (Zustand + `persist` middleware), so it survives page refreshes.

## License

# No license specified — add one if you plan to make this public and want to define reuse terms.

# e-commerce-react

> > > > > > > 008027bc4558d90598c626e42bdaff35af3bc420
