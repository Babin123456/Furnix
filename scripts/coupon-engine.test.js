const test = require('node:test');
const assert = require('node:assert');
const {
  VALID_COUPONS,
  validateCoupon,
  calculateDiscount,
  setActiveCoupon,
  getActiveCoupon
} = require('./coupon-engine.js');

test('Coupon Engine - Valid Coupon Verification', () => {
  const result = validateCoupon('FURNIX10', 100);
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.code, 'FURNIX10');
});

test('Coupon Engine - Percentage Discount Calculation', () => {
  const discount = calculateDiscount('FURNIX10', 100);
  assert.strictEqual(discount, 10);
});

test('Coupon Engine - Flat Discount Calculation', () => {
  const discount = calculateDiscount('SAVE50', 350);
  assert.strictEqual(discount, 50);
});

test('Coupon Engine - Minimum Spend Validation Enforcement', () => {
  const result = validateCoupon('NEON20', 100); // Requires $150
  assert.strictEqual(result.valid, false);
  assert.strictEqual(result.message.includes('Minimum order amount'), true);
});

test('Coupon Engine - Invalid or Unknown Code Handling', () => {
  const result = validateCoupon('INVALID_CODE', 200);
  assert.strictEqual(result.valid, false);
  assert.strictEqual(calculateDiscount('INVALID_CODE', 200), 0);
});
