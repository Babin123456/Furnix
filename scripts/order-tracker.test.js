const test = require('node:test');
const assert = require('node:assert');
const {
  ORDER_STATUSES,
  getOrderHistory,
  recordNewOrder,
  findOrderById,
  getStatusProgressPercentage
} = require('./order-tracker.js');

test('Order Tracker - Initial Mock Orders', () => {
  const history = getOrderHistory();
  assert.strictEqual(Array.isArray(history), true);
  assert.strictEqual(history.length >= 2, true);
});

test('Order Tracker - Record New Order', () => {
  const newOrder = recordNewOrder({
    total: 350.00,
    items: [{ name: 'Aura Pendant Lamp', qty: 2, price: 175.00 }]
  });

  assert.strictEqual(typeof newOrder, 'object');
  assert.strictEqual(newOrder.total, 350.00);
  assert.strictEqual(newOrder.status, ORDER_STATUSES.PROCESSING);
});

test('Order Tracker - Search Order by ID', () => {
  const order = findOrderById('FN-2026-8801');
  assert.strictEqual(order !== null, true);
  assert.strictEqual(order.total, 450.00);
});

test('Order Tracker - Reject Invalid Order Submission', () => {
  assert.strictEqual(recordNewOrder(null), false);
  assert.strictEqual(recordNewOrder({ items: [] }), false);
});

test('Order Tracker - Calculate Status Timeline Percentage', () => {
  assert.strictEqual(getStatusProgressPercentage(ORDER_STATUSES.PROCESSING), 25);
  assert.strictEqual(getStatusProgressPercentage(ORDER_STATUSES.SHIPPED), 50);
  assert.strictEqual(getStatusProgressPercentage(ORDER_STATUSES.IN_TRANSIT), 75);
  assert.strictEqual(getStatusProgressPercentage(ORDER_STATUSES.DELIVERED), 100);
});
