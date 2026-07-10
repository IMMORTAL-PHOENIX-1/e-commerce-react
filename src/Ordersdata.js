// Fake order history + tracking data.
export const orders = [
  {
    id: 'ORD-1001',
    date: '2026-06-01',
    status: 'Delivered',
    total: 82.0,
    items: [
      { name: 'Canvas Tote Bag', qty: 1, price: 28 },
      { name: 'Ceramic Mug', qty: 2, price: 14 },
      { name: 'Wool Beanie', qty: 1, price: 22 },
    ],
    tracking: [
      { step: 'Order placed', date: '2026-06-01', done: true },
      { step: 'Processing', date: '2026-06-02', done: true },
      { step: 'Shipped', date: '2026-06-03', done: true },
      { step: 'Out for delivery', date: '2026-06-05', done: true },
      { step: 'Delivered', date: '2026-06-05', done: true },
    ],
  },
  {
    id: 'ORD-1002',
    date: '2026-06-15',
    status: 'Shipped',
    total: 64.0,
    items: [{ name: 'Canvas Backpack', qty: 1, price: 64 }],
    tracking: [
      { step: 'Order placed', date: '2026-06-15', done: true },
      { step: 'Processing', date: '2026-06-16', done: true },
      { step: 'Shipped', date: '2026-06-17', done: true },
      { step: 'Out for delivery', date: null, done: false },
      { step: 'Delivered', date: null, done: false },
    ],
  },
  {
    id: 'ORD-1003',
    date: '2026-06-28',
    status: 'Processing',
    total: 57.0,
    items: [
      { name: 'Leather Wallet', qty: 1, price: 45 },
      { name: 'Ceramic Mug', qty: 1, price: 14 },
    ],
    tracking: [
      { step: 'Order placed', date: '2026-06-28', done: true },
      { step: 'Processing', date: '2026-06-29', done: true },
      { step: 'Shipped', date: null, done: false },
      { step: 'Out for delivery', date: null, done: false },
      { step: 'Delivered', date: null, done: false },
    ],
  },
  {
    id: 'ORD-1004',
    date: '2026-07-05',
    status: 'Pending',
    total: 38.0,
    items: [{ name: 'Sunglasses', qty: 1, price: 38 }],
    tracking: [
      { step: 'Order placed', date: '2026-07-05', done: true },
      { step: 'Processing', date: null, done: false },
      { step: 'Shipped', date: null, done: false },
      { step: 'Out for delivery', date: null, done: false },
      { step: 'Delivered', date: null, done: false },
    ],
  },
  {
    id: 'ORD-1005',
    date: '2026-05-20',
    status: 'Cancelled',
    total: 26.0,
    items: [{ name: 'Wool Scarf', qty: 1, price: 26 }],
    tracking: [
      { step: 'Order placed', date: '2026-05-20', done: true },
      { step: 'Cancelled', date: '2026-05-21', done: true },
    ],
  },
];