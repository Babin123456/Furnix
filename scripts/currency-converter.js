/**
 * Furnix Storefront - Multi-Currency Exchange Engine
 * Handles real-time currency conversion, rate calculations, state persistence,
 * and DOM price node updates across Furnix pages.
 */

const DEFAULT_CURRENCY = 'USD';
const STORAGE_KEY = 'furnix_currency';

const EXCHANGE_RATES = {
  USD: { rate: 1.0, symbol: '$', label: 'USD ($)' },
  EUR: { rate: 0.92, symbol: '€', label: 'EUR (€)' },
  GBP: { rate: 0.78, symbol: '£', label: 'GBP (£)' },
  INR: { rate: 83.5, symbol: '₹', label: 'INR (₹)' },
  JPY: { rate: 155.0, symbol: '¥', label: 'JPY (¥)' }
};

/**
 * Get saved user currency from localStorage or default to USD
 */
function getSelectedCurrency() {
  if (typeof localStorage === 'undefined') return DEFAULT_CURRENCY;
  const saved = localStorage.getItem(STORAGE_KEY);
  return (saved && EXCHANGE_RATES[saved]) ? saved : DEFAULT_CURRENCY;
}

/**
 * Set and persist active user currency
 */
function setSelectedCurrency(currencyCode) {
  if (!EXCHANGE_RATES[currencyCode]) return false;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, currencyCode);
  }
  return true;
}

/**
 * Convert base amount (USD) to target currency
 */
function convertPrice(baseUsdAmount, targetCurrency = getSelectedCurrency()) {
  const amount = parseFloat(baseUsdAmount);
  if (isNaN(amount)) return 0;
  const currencyInfo = EXCHANGE_RATES[targetCurrency] || EXCHANGE_RATES[DEFAULT_CURRENCY];
  return +(amount * currencyInfo.rate).toFixed(2);
}

/**
 * Format a converted price with currency symbol
 */
function formatPrice(baseUsdAmount, targetCurrency = getSelectedCurrency()) {
  const converted = convertPrice(baseUsdAmount, targetCurrency);
  const info = EXCHANGE_RATES[targetCurrency] || EXCHANGE_RATES[DEFAULT_CURRENCY];
  if (targetCurrency === 'JPY') {
    return `${info.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${info.symbol}${converted.toFixed(2)}`;
}

/**
 * Update all DOM elements with data-base-price attributes
 */
function updateDOMPrices(targetCurrency = getSelectedCurrency()) {
  if (typeof document === 'undefined') return;
  const priceElements = document.querySelectorAll('[data-base-price]');
  priceElements.forEach(el => {
    const basePrice = parseFloat(el.getAttribute('data-base-price'));
    if (!isNaN(basePrice)) {
      el.textContent = formatPrice(basePrice, targetCurrency);
    }
  });
}

/**
 * Initialize currency converter listeners and dropdowns
 */
function initCurrencyConverter() {
  if (typeof document === 'undefined') return;
  const current = getSelectedCurrency();
  const selectElements = document.querySelectorAll('.currency-select');

  selectElements.forEach(select => {
    select.value = current;
    select.addEventListener('change', (e) => {
      const newCurrency = e.target.value;
      if (setSelectedCurrency(newCurrency)) {
        updateDOMPrices(newCurrency);
        // Synchronize all currency selects on the page
        document.querySelectorAll('.currency-select').forEach(s => {
          s.value = newCurrency;
        });
      }
    });
  });

  updateDOMPrices(current);
}

// Auto-init on DOMContentLoaded if running in browser
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initCurrencyConverter);
}

// Export for Node testing and module import
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DEFAULT_CURRENCY,
    EXCHANGE_RATES,
    getSelectedCurrency,
    setSelectedCurrency,
    convertPrice,
    formatPrice,
    updateDOMPrices,
    initCurrencyConverter
  };
}
