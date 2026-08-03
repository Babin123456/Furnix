# 🛠️ Furnix Storefront — Developer & Architecture Guide

Welcome to the **Furnix Storefront Developer Guide**. This document outlines the project architecture, frontend JS utility modules, testing procedures, and best practices for open-source contributors.

---

## 🏗️ Architecture & Module Organization

Furnix is designed around modular, high-performance vanilla JS modules and sleek neon CSS components.

```text
Furnix/
├── index.html                  # Storefront Landing Page
├── furniture.html              # Full Catalog Showcase & Filters
├── cart.html                   # Shopping Cart & Checkout Engine
├── account.html                # Account Dashboard & Order Tracker
├── style.css                   # Core Design System & Neon Styles
├── scripts/
│   ├── currency-converter.js   # Multi-Currency Exchange Engine
│   ├── review-engine.js        # Product Reviews & Rating Subsystem
│   ├── order-tracker.js        # Order History & Shipment Tracking
│   ├── coupon-engine.js       # Promo Vouchers & Discount Engine
│   ├── cart-engine.js          # Cart Operations & Persistence
│   └── dev-environment-check.js# Diagnostic Checker Script
└── docs/                       # Architecture & API References
```

---

## 🧪 Testing Suite

Furnix utilizes Node.js built-in test runner (`node --test`) for fast, zero-dependency unit testing.

### Running Unit Tests
```bash
node --test scripts/*.test.js
```

### Running Environment Diagnostics
```bash
node scripts/dev-environment-check.js
```

---

## 📖 Subsystem API Summaries

### 1. Multi-Currency Engine (`scripts/currency-converter.js`)
Supports real-time price conversion between USD, EUR, GBP, INR, and JPY.
- `convertPrice(baseUsdAmount, targetCurrency)`
- `formatPrice(baseUsdAmount, targetCurrency)`

### 2. Product Review Engine (`scripts/review-engine.js`)
Manages star ratings, user comments, and localStorage persistence.
- `getAverageRating(productId)`
- `addProductReview(productId, author, rating, comment)`

### 3. Order Tracker Engine (`scripts/order-tracker.js`)
Handles customer purchase histories and real-time shipment status tracking.
- `getOrderHistory()`
- `findOrderById(query)`

### 4. Promo Coupon Engine (`scripts/coupon-engine.js`)
Validates promotional discount codes and calculates savings.
- `validateCoupon(code, subtotal)`
- `calculateDiscount(code, subtotal)`

---

## 🤝 Contribution Guidelines
- Ensure all commits use standard conventional commit prefixes (`feat:`, `fix:`, `docs:`, `perf:`).
- Run unit tests and environment check before submitting Pull Requests.
