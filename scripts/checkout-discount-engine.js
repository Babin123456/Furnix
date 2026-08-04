/**
 * Furnix Checkout Discount & Tax Engine
 * Manages promotional coupons, free shipping thresholds, dynamic tax computation, and order calculations.
 */

(function(global) {
  'use strict';

  class CheckoutDiscountEngine {
    constructor() {
      this.coupons = {
        'FURNIX10': { type: 'percent', value: 10, description: '10% OFF Entire Order' },
        'WELCOME20': { type: 'fixed', value: 20, description: '$20 OFF Welcome Discount' },
        'FREESHIP': { type: 'freeship', value: 0, description: 'Free Shipping Voucher' }
      };

      this.activeCoupon = null;
      this.freeShippingThreshold = 250;
      this.standardShippingCost = 25;
      this.taxRate = 0.08; // 8% tax
    }

    applyCoupon(code) {
      if (!code) return { success: false, message: 'Please enter a coupon code.' };
      const normalized = String(code).trim().toUpperCase();
      
      if (this.coupons[normalized]) {
        this.activeCoupon = { code: normalized, ...this.coupons[normalized] };
        return { success: true, message: `Coupon ${normalized} applied! ${this.activeCoupon.description}`, coupon: this.activeCoupon };
      }

      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    removeCoupon() {
      this.activeCoupon = null;
    }

    calculateTotals(subtotal) {
      const numericSubtotal = Math.max(0, parseFloat(subtotal) || 0);
      let discount = 0;
      let shipping = numericSubtotal >= this.freeShippingThreshold ? 0 : this.standardShippingCost;

      if (this.activeCoupon) {
        if (this.activeCoupon.type === 'percent') {
          discount = (numericSubtotal * this.activeCoupon.value) / 100;
        } else if (this.activeCoupon.type === 'fixed') {
          discount = Math.min(numericSubtotal, this.activeCoupon.value);
        } else if (this.activeCoupon.type === 'freeship') {
          shipping = 0;
        }
      }

      const taxableAmount = Math.max(0, numericSubtotal - discount);
      const tax = taxableAmount * this.taxRate;
      const total = taxableAmount + shipping + tax;

      const freeShippingNeeded = Math.max(0, this.freeShippingThreshold - numericSubtotal);
      const freeShippingProgress = Math.min(100, (numericSubtotal / this.freeShippingThreshold) * 100);

      return {
        subtotal: numericSubtotal,
        discount,
        shipping,
        tax,
        total,
        freeShippingNeeded,
        freeShippingProgress,
        coupon: this.activeCoupon
      };
    }
  }

  global.FurnixCheckoutDiscountEngine = new CheckoutDiscountEngine();
})(typeof window !== 'undefined' ? window : this);
