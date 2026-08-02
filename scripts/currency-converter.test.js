const test = require('node:test');
const assert = require('node:assert');
const {
  DEFAULT_CURRENCY,
  EXCHANGE_RATES,
  convertPrice,
  formatPrice,
  getSelectedCurrency,
  setSelectedCurrency
} = require('./currency-converter.js');

test('Currency Converter - Default Currency', () => {
  assert.strictEqual(DEFAULT_CURRENCY, 'USD');
  assert.strictEqual(getSelectedCurrency(), 'USD');
});

test('Currency Converter - Convert Base USD Price', () => {
  assert.strictEqual(convertPrice(100, 'USD'), 100);
  assert.strictEqual(convertPrice(100, 'EUR'), 92);
  assert.strictEqual(convertPrice(100, 'GBP'), 78);
  assert.strictEqual(convertPrice(100, 'INR'), 8350);
  assert.strictEqual(convertPrice(100, 'JPY'), 15500);
});

test('Currency Converter - Format Price Output', () => {
  assert.strictEqual(formatPrice(100, 'USD'), '$100.00');
  assert.strictEqual(formatPrice(100, 'EUR'), '€92.00');
  assert.strictEqual(formatPrice(100, 'GBP'), '£78.00');
  assert.strictEqual(formatPrice(100, 'INR'), '₹8350.00');
  assert.strictEqual(formatPrice(100, 'JPY'), '¥15,500');
});

test('Currency Converter - Invalid Currency & Inputs', () => {
  assert.strictEqual(convertPrice(NaN, 'EUR'), 0);
  assert.strictEqual(convertPrice('invalid', 'USD'), 0);
  assert.strictEqual(setSelectedCurrency('INVALID_CURRENCY'), false);
});
