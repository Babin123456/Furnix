/**
 * Furnix Catalog Quantity Controller
 * Manages dynamic inline quantity selectors on catalog grid product cards.
 */
(function() {
    'use strict';

    function initCatalogQuantityControls() {
        const cartEngine = window.FurnixCartEngine;
        if (!cartEngine) return;

        // Find all product cards that contain a cart action area
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            // Ensure each product card has or can derive a unique product ID/data
            const cartBtn = card.querySelector('[data-cart-btn]');
            const imgEl = card.querySelector('img');
            const titleEl = card.querySelector('h4, h6');
            const priceEl = card.querySelector('.price');

            if (!cartBtn && !card.querySelector('.inline-quantity-selector')) return;

            // Generate a stable ID based on title if not explicitly present
            const productName = titleEl ? titleEl.textContent.trim() : 'Furniture Item';
            const productId = cartBtn?.getAttribute('data-product-id') || productName.toLowerCase().replace(/\s+/g, '-');

            if (cartBtn && !cartBtn.hasAttribute('data-product-id')) {
                cartBtn.setAttribute('data-product-id', productId);
            }

            // Extract price value safely
            let priceVal = 0;
            if (priceEl) {
                const priceText = priceEl.textContent.replace(/[^0-9.]/g, '');
                priceVal = parseFloat(priceText) || 0;
            }

            const imageSrc = imgEl ? imgEl.getAttribute('src') : 'images/furniture1.png';

            // Check current quantity in cart
            const items = cartEngine.getCartItems();
            const cartItem = items.find(i => i.id === productId);
            const currentQty = cartItem ? cartItem.quantity : 0;

            // Locate container for the action button/selector
            const actionContainer = cartBtn ? cartBtn.parentNode : card.querySelector('.inline-quantity-selector')?.parentNode;
            if (!actionContainer) return;

            if (currentQty > 0) {
                actionContainer.innerHTML = `
                    <div class="inline-quantity-selector flex between" style="display: flex; align-items: center; justify-content: space-between; background: var(--bg, #f4f4f4); border: 1px solid var(--border, #ddd); border-radius: 8px; padding: 10px 14px; margin-top: 6px;">
                        <button type="button" class="qty-btn decrement-btn" data-product-id="${productId}" aria-label="Decrease quantity" style="background: none; border: none; font-size: 1.2rem; font-weight: 700; cursor: pointer; color: var(--text, #333);">-</button>
                        <span class="qty-display" style="font-weight: 600; font-size: 1rem; color: var(--text, #333);">${currentQty}</span>
                        <button type="button" class="qty-btn increment-btn" data-product-id="${productId}" aria-label="Increase quantity" style="background: none; border: none; font-size: 1.2rem; font-weight: 700; cursor: pointer; color: var(--text, #333);">+</button>
                    </div>
                `;
            } else {
                actionContainer.innerHTML = `
                    <button class="btn brown-bg" style="display: block; text-align: center; width: 100%;" data-cart-btn data-product-id="${productId}">
                        Add to cart
                    </button>
                `;
            }
        });
    }

    // Global event delegation for catalog cart interactions
    document.addEventListener('click', (e) => {
        const cartEngine = window.FurnixCartEngine;
        if (!cartEngine) return;

        // Handle initial "Add to cart" click
        const cartBtn = e.target.closest('[data-cart-btn]');
        if (cartBtn) {
            e.preventDefault();
            const card = cartBtn.closest('.product-card');
            const productId = cartBtn.getAttribute('data-product-id');
            const titleEl = card?.querySelector('h4, h6');
            const priceEl = card?.querySelector('.price');
            const imgEl = card?.querySelector('img');

            const name = titleEl ? titleEl.textContent.trim() : 'Furniture Item';
            let price = 0;
            if (priceEl) {
                price = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) || 0;
            }
            const image = imgEl ? imgEl.getAttribute('src') : 'images/furniture1.png';

            cartEngine.addItem({ id: productId, name, price, image, quantity: 1 });
            initCatalogQuantityControls();
            return;
        }

        // Handle increment (+) click
        const incBtn = e.target.closest('.increment-btn');
        if (incBtn) {
            e.preventDefault();
            const productId = incBtn.getAttribute('data-product-id');
            cartEngine.updateQuantity(productId, 1);
            initCatalogQuantityControls();
            return;
        }

        // Handle decrement (-) click
        const decBtn = e.target.closest('.decrement-btn');
        if (decBtn) {
            e.preventDefault();
            const productId = decBtn.getAttribute('data-product-id');
            cartEngine.updateQuantity(productId, -1);
            initCatalogQuantityControls();
            return;
        }
    });

    // Re-initialize controls whenever cart updates globally
    window.addEventListener('furnix:cart-updated', () => {
        initCatalogQuantityControls();
    });

    document.addEventListener('DOMContentLoaded', () => {
        initCatalogQuantityControls();
    });

})();
