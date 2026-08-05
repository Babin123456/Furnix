/**
 * Furnix Shopping Cart Calculator Module
 * Provides pure functional calculation for cart totals, promo code validation, tax estimation, and shipping fees.
 */

(function(global) {
    'use strict';

    const VALID_PROMOS = {
        'FURNIX10': { type: 'percentage', value: 10, label: '10% Off Cart' },
        'NEON20': { type: 'fixed', value: 20, label: '$20 Flat Discount' },
        'ECSOC2026': { type: 'percentage', value: 15, label: '15% ECSoC Special' }
    };

    const FREE_SHIPPING_THRESHOLD = 500;
    const STANDARD_SHIPPING_FEE = 25;
    const ESTIMATED_TAX_RATE = 0.08; // 8%

    const CartCalculator = {
        /**
         * Validates a promotional code string.
         * @param {string} code 
         * @returns {Object|null}
         */
        validatePromoCode(code) {
            if (!code || typeof code !== 'string') return null;
            const normalized = code.trim().toUpperCase();
            return VALID_PROMOS[normalized] ? { code: normalized, ...VALID_PROMOS[normalized] } : null;
        },

        /**
         * Calculates full summary details for a given list of cart items and optional promo code.
         * @param {Array<{price: number, quantity: number}>} items 
         * @param {string} [promoCode] 
         * @returns {Object}
         */
        calculateSummary(items = [], promoCode = '') {
            const safeItems = Array.isArray(items) ? items : [];

            const subtotal = safeItems.reduce((acc, item) => {
                const price = parseFloat(item.price) || 0;
                const qty = parseInt(item.quantity, 10) || 1;
                return acc + (price * qty);
            }, 0);

            const discountEngine = global.FurnixCheckoutDiscountEngine;
            let totals = {
                subtotal,
                discount: 0,
                shipping: (subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0) ? 0 : STANDARD_SHIPPING_FEE,
                tax: subtotal * ESTIMATED_TAX_RATE,
                total: subtotal + ((subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0) ? 0 : STANDARD_SHIPPING_FEE) + (subtotal * ESTIMATED_TAX_RATE),
                freeShippingNeeded: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
                freeShippingProgress: Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
            };

            if (discountEngine) {
                if (promoCode) discountEngine.applyCoupon(promoCode);
                totals = discountEngine.calculateTotals(subtotal);
            }

            return {
                itemCount: safeItems.reduce((acc, item) => acc + (parseInt(item.quantity, 10) || 1), 0),
                subtotal: totals.subtotal,
                discountAmount: totals.discount,
                discountedSubtotal: totals.subtotal - totals.discount,
                shippingFee: totals.shipping,
                estimatedTax: totals.tax,
                grandTotal: totals.total,
                freeShippingNeeded: totals.freeShippingNeeded,
                freeShippingProgress: totals.freeShippingProgress,
                promoApplied: totals.coupon,
                isFreeShipping: totals.shipping === 0 && subtotal > 0
            };
        },

        /**
         * Formats a numeric value into USD currency string.
         * @param {number} amount 
         * @returns {string}
         */
        formatCurrency(amount) {
            const val = Number.isFinite(amount) ? amount : 0;
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            }).format(val);
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = CartCalculator;
    } else {
        global.CartCalculator = CartCalculator;
    }
})(typeof window !== 'undefined' ? window : this);
