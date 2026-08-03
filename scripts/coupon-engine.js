/**
 * Furnix Storefront - Promo Coupon & Discount Engine
 * Manages promotional codes, percentage and flat discounts,
 * minimum order spend validations, and savings calculations.
 */

const COUPON_STORAGE_KEY = 'furnix_active_coupon';

const VALID_COUPONS = {
  'FURNIX10': { type: 'percent', value: 10, minSpend: 50, description: '10% OFF orders over $50' },
  'NEON20': { type: 'percent', value: 20, minSpend: 150, description: '20% OFF orders over $150' },
  'SAVE50': { type: 'flat', value: 50, minSpend: 300, description: '$50 FLAT OFF orders over $300' },
  'WELCOME5': { type: 'flat', value: 5, minSpend: 0, description: '$5 OFF welcome voucher' }
};

/**
 * Validate a coupon code against subtotal spend
 */
function validateCoupon(code, subtotal = 0) {
  if (!code || typeof code !== 'string') {
    return { valid: false, message: 'Please enter a coupon code.' };
  }

  const normalized = code.trim().toUpperCase();
  const coupon = VALID_COUPONS[normalized];

  if (!coupon) {
    return { valid: false, message: 'Invalid or expired coupon code.' };
  }

  const numericSubtotal = parseFloat(subtotal) || 0;
  if (numericSubtotal < coupon.minSpend) {
    return {
      valid: false,
      message: `Minimum order amount of $${coupon.minSpend.toFixed(2)} required for ${normalized}.`
    };
  }

  return {
    valid: true,
    code: normalized,
    coupon: coupon,
    message: `Coupon ${normalized} applied successfully!`
  };
}

/**
 * Calculate total discount amount for a given coupon
 */
function calculateDiscount(code, subtotal = 0) {
  const result = validateCoupon(code, subtotal);
  if (!result.valid) return 0;

  const { coupon } = result;
  const numericSubtotal = parseFloat(subtotal) || 0;

  if (coupon.type === 'percent') {
    return +((numericSubtotal * coupon.value) / 100).toFixed(2);
  } else if (coupon.type === 'flat') {
    return Math.min(coupon.value, numericSubtotal);
  }

  return 0;
}

/**
 * Get active coupon stored in localStorage
 */
function getActiveCoupon() {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(COUPON_STORAGE_KEY) || null;
}

/**
 * Save active coupon code in localStorage
 */
function setActiveCoupon(code) {
  if (typeof localStorage === 'undefined') return;
  if (code) {
    localStorage.setItem(COUPON_STORAGE_KEY, code.toUpperCase());
  } else {
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VALID_COUPONS,
    validateCoupon,
    calculateDiscount,
    getActiveCoupon,
    setActiveCoupon
  };
}
