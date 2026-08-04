/**
 * Furnix Catalog State & URL Sync Manager
 * Synchronizes filter criteria, sorting, price range, and search parameters with the URL query string.
 * Supports deep linking, active filter badge rendering, and event-driven grid updates.
 */

(function(global) {
  'use strict';

  class CatalogStateManager {
    constructor() {
      this.state = {
        category: 'all',
        minPrice: 0,
        maxPrice: 10000,
        inStock: false,
        minRating: 0,
        sort: 'featured',
        searchQuery: ''
      };

      this.listeners = [];
      this.init();
    }

    init() {
      this.readUrlParams();
      window.addEventListener('popstate', () => {
        this.readUrlParams();
        this.notify();
      });
    }

    readUrlParams() {
      const params = new URLSearchParams(window.location.search);
      if (params.has('category')) this.state.category = params.get('category');
      if (params.has('minPrice')) this.state.minPrice = parseFloat(params.get('minPrice')) || 0;
      if (params.has('maxPrice')) this.state.maxPrice = parseFloat(params.get('maxPrice')) || 10000;
      if (params.has('inStock')) this.state.inStock = params.get('inStock') === 'true';
      if (params.has('minRating')) this.state.minRating = parseFloat(params.get('minRating')) || 0;
      if (params.has('sort')) this.state.sort = params.get('sort');
      if (params.has('q')) this.state.searchQuery = params.get('q');
    }

    updateState(newPartialState, updateUrl = true) {
      this.state = { ...this.state, ...newPartialState };
      if (updateUrl) {
        this.syncUrlParams();
      }
      this.notify();
    }

    syncUrlParams() {
      const params = new URLSearchParams();
      if (this.state.category && this.state.category !== 'all') params.set('category', this.state.category);
      if (this.state.minPrice > 0) params.set('minPrice', this.state.minPrice);
      if (this.state.maxPrice < 10000) params.set('maxPrice', this.state.maxPrice);
      if (this.state.inStock) params.set('inStock', 'true');
      if (this.state.minRating > 0) params.set('minRating', this.state.minRating);
      if (this.state.sort && this.state.sort !== 'featured') params.set('sort', this.state.sort);
      if (this.state.searchQuery) params.set('q', this.state.searchQuery);

      const queryString = params.toString();
      const newUrl = window.location.pathname + (queryString ? '?' + queryString : '');
      window.history.replaceState(this.state, '', newUrl);
    }

    resetFilters() {
      this.state = {
        category: 'all',
        minPrice: 0,
        maxPrice: 10000,
        inStock: false,
        minRating: 0,
        sort: 'featured',
        searchQuery: ''
      };
      this.syncUrlParams();
      this.notify();
    }

    subscribe(listener) {
      if (typeof listener === 'function') {
        this.listeners.push(listener);
      }
    }

    notify() {
      this.listeners.forEach(fn => fn(this.state));
      document.dispatchEvent(new CustomEvent('furnix-catalog-updated', { detail: { state: this.state } }));
    }

    filterProducts(products) {
      if (!Array.isArray(products)) return [];
      return products.filter(p => {
        if (this.state.category !== 'all' && p.category && p.category.toLowerCase() !== this.state.category.toLowerCase()) {
          return false;
        }
        const price = parseFloat(p.price) || 0;
        if (price < this.state.minPrice || price > this.state.maxPrice) {
          return false;
        }
        if (this.state.inStock && !p.inStock) {
          return false;
        }
        if (this.state.minRating > 0 && (parseFloat(p.rating) || 0) < this.state.minRating) {
          return false;
        }
        if (this.state.searchQuery) {
          const q = this.state.searchQuery.toLowerCase();
          const matchName = p.name && p.name.toLowerCase().includes(q);
          const matchDesc = p.description && p.description.toLowerCase().includes(q);
          if (!matchName && !matchDesc) return false;
        }
        return true;
      }).sort((a, b) => {
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        if (this.state.sort === 'price-low') return priceA - priceB;
        if (this.state.sort === 'price-high') return priceB - priceA;
        if (this.state.sort === 'rating') return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
        return 0;
      });
    }

    renderActiveBadges(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = '';

      const badges = [];
      if (this.state.category !== 'all') {
        badges.push({ label: `Category: ${this.state.category}`, key: 'category', defaultVal: 'all' });
      }
      if (this.state.minPrice > 0 || this.state.maxPrice < 10000) {
        badges.push({ label: `Price: $${this.state.minPrice} - $${this.state.maxPrice}`, key: 'priceRange', isPrice: true });
      }
      if (this.state.inStock) {
        badges.push({ label: 'In Stock Only', key: 'inStock', defaultVal: false });
      }
      if (this.state.minRating > 0) {
        badges.push({ label: `Rating: ${this.state.minRating}+ Stars`, key: 'minRating', defaultVal: 0 });
      }

      if (badges.length === 0) {
        containerEl.style.display = 'none';
        return;
      }

      containerEl.style.display = 'flex';
      badges.forEach(b => {
        const badgeEl = document.createElement('span');
        badgeEl.className = 'filter-badge';
        badgeEl.innerHTML = `${b.label} <button type="button" aria-label="Remove filter ${b.label}">&times;</button>`;
        badgeEl.querySelector('button').addEventListener('click', () => {
          if (b.isPrice) {
            this.updateState({ minPrice: 0, maxPrice: 10000 });
          } else {
            this.updateState({ [b.key]: b.defaultVal });
          }
        });
        containerEl.appendChild(badgeEl);
      });
    }
  }

  global.CatalogStateManager = new CatalogStateManager();
})(typeof window !== 'undefined' ? window : this);
