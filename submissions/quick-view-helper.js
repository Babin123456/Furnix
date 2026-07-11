/**
 * Submissions Quick View details formatter helper
 */
class SubmissionsQuickViewHelper {
    formatPrice(price) {
        return `$${parseFloat(price).toFixed(2)}`;
    }

    renderSpecs(specs) {
        if (!specs) return "";
        return Object.entries(specs).map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`).join("");
    }
}
window.SubmissionsQuickViewHelper = SubmissionsQuickViewHelper;
