/**
 * Submissions Quick View Controller Script
 */
document.addEventListener("DOMContentLoaded", () => {
    const helper = new window.SubmissionsQuickViewHelper();
    const anim = new window.SubmissionsQuickViewAnimation();

    const mockItem = {
        name: "Luxe Neon Lounge Chair",
        price: 349.99,
        specs: {
            Material: "Steel Frame, Custom Velvet",
            Dimensions: "85cm x 75cm x 90cm",
            Color: "Cyberpunk Pink"
        }
    };

    const viewBody = document.getElementById("quick-view-body");
    if (viewBody) {
        viewBody.innerHTML = `
            <h3>${mockItem.name}</h3>
            <p>Price: ${helper.formatPrice(mockItem.price)}</p>
            <ul>
                ${helper.renderSpecs(mockItem.specs)}
            </ul>
        `;
    }

    const modal = document.getElementById("quick-view-modal");
    if (modal) {
        anim.fadeIn(modal);
    }
});
