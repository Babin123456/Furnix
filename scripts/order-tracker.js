/**
 * Furnix Storefront - Customer Order Tracker Engine
 * Tracks completed customer orders, shipment status stages,
 * order lookup, and re-order history state.
 */

const ORDERS_STORAGE_KEY = 'furnix_order_history';

// Order shipment statuses
const ORDER_STATUSES = {
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered'
};

// Initial demo order history
const MOCK_ORDERS = [
  {
    orderId: 'FN-2026-8801',
    date: '2026-07-28',
    status: ORDER_STATUSES.DELIVERED,
    total: 450.00,
    items: [
      { name: 'Minimalist Wooden Chair', qty: 2, price: 150.00 },
      { name: 'Aura Pendant Lamp', qty: 1, price: 150.00 }
    ],
    trackingNumber: 'TRK-FURNIX-99214'
  },
  {
    orderId: 'FN-2026-8942',
    date: '2026-08-01',
    status: ORDER_STATUSES.IN_TRANSIT,
    total: 280.00,
    items: [
      { name: 'Modern Velvet Sofa', qty: 1, price: 280.00 }
    ],
    trackingNumber: 'TRK-FURNIX-99305'
  }
];

/**
 * Retrieve user order history from localStorage
 */
function getOrderHistory() {
  if (typeof localStorage === 'undefined') return MOCK_ORDERS;
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : MOCK_ORDERS;
  } catch (err) {
    return MOCK_ORDERS;
  }
}

/**
 * Save new checkout order into order history
 */
function recordNewOrder(orderData) {
  if (!orderData || !Array.isArray(orderData.items) || orderData.items.length === 0) {
    return false;
  }

  const history = getOrderHistory();
  const newOrder = {
    orderId: orderData.orderId || `FN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    status: ORDER_STATUSES.PROCESSING,
    total: parseFloat(orderData.total || 0),
    items: orderData.items,
    trackingNumber: `TRK-FURNIX-${Math.floor(10000 + Math.random() * 90000)}`
  };

  history.unshift(newOrder);

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save order history:', e);
    }
  }

  return newOrder;
}

/**
 * Search order history by Order ID or Tracking Number
 */
function findOrderById(query) {
  if (!query || typeof query !== 'string') return null;
  const history = getOrderHistory();
  const q = query.trim().toLowerCase();
  return history.find(o => 
    o.orderId.toLowerCase() === q || 
    (o.trackingNumber && o.trackingNumber.toLowerCase() === q)
  ) || null;
}

/**
 * Calculate progress percentage for order status bar
 */
function getStatusProgressPercentage(status) {
  switch (status) {
    case ORDER_STATUSES.PROCESSING: return 25;
    case ORDER_STATUSES.SHIPPED: return 50;
    case ORDER_STATUSES.IN_TRANSIT: return 75;
    case ORDER_STATUSES.DELIVERED: return 100;
    default: return 0;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ORDER_STATUSES,
    getOrderHistory,
    recordNewOrder,
    findOrderById,
    getStatusProgressPercentage
  };
}
