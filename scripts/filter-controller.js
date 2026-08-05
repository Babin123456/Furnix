/**
 * Furnix Multi-Criteria Filter Controller
 * Manages product sorting, price filtering, category selection, and URL param synchronization.
 */

(function(global) {
    'use strict';

    class FilterController {
        constructor() {
            this.stateManager = global.CatalogStateManager || null;
            this.init();
        }

        init() {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindUIControls();
            });
        }

        bindUIControls() {
            const sortSelect = document.getElementById('sortSelect') || document.getElementById('catalogSortSelect');
            const priceSlider = document.getElementById('priceRangeSlider');
            const categorySelect = document.getElementById('categoryFilterSelect');
            const inStockCheckbox = document.getElementById('inStockFilterCheckbox');
            const badgeContainer = document.getElementById('activeFilterBadges');
            const resetBtn = document.getElementById('resetFiltersBtn');

            if (this.stateManager) {
                if (badgeContainer) {
                    this.stateManager.subscribe(() => {
                        this.stateManager.renderActiveBadges(badgeContainer);
                    });
                    this.stateManager.renderActiveBadges(badgeContainer);
                }

                if (sortSelect) {
                    sortSelect.value = this.stateManager.state.sort || 'featured';
                    sortSelect.addEventListener('change', (e) => {
                        this.stateManager.updateState({ sort: e.target.value });
                    });
                }

                if (priceSlider) {
                    priceSlider.value = this.stateManager.state.maxPrice || 10000;
                    priceSlider.addEventListener('input', (e) => {
                        this.stateManager.updateState({ maxPrice: parseFloat(e.target.value) });
                    });
                }

                if (categorySelect) {
                    categorySelect.value = this.stateManager.state.category || 'all';
                    categorySelect.addEventListener('change', (e) => {
                        this.stateManager.updateState({ category: e.target.value });
                    });
                }

                if (inStockCheckbox) {
                    inStockCheckbox.checked = !!this.stateManager.state.inStock;
                    inStockCheckbox.addEventListener('change', (e) => {
                        this.stateManager.updateState({ inStock: e.target.checked });
                    });
                }

                if (resetBtn) {
                    resetBtn.addEventListener('click', () => {
                        this.stateManager.resetFilters();
                        if (sortSelect) sortSelect.value = 'featured';
                        if (priceSlider) priceSlider.value = 10000;
                        if (categorySelect) categorySelect.value = 'all';
                        if (inStockCheckbox) inStockCheckbox.checked = false;
                    });
                }
            }
        }

        applyFilters(items = []) {
            if (this.stateManager) {
                return this.stateManager.filterProducts(items);
            }
            return items;
        }

        setFilter(key, value) {
            if (this.stateManager) {
                this.stateManager.updateState({ [key]: value });
            }
        }
    }

    global.FurnixFilterController = new FilterController();
})(typeof window !== 'undefined' ? window : this);
