/**
 * Submissions Checkout Feedback Manager
 */
class SubmissionsCheckoutFeedback {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    showFeedback(message, type = "error") {
        if (!this.container) return;
        const card = document.createElement("div");
        card.className = `validation-feedback-card ${type}`;
        card.innerText = message;
        this.container.appendChild(card);

        setTimeout(() => {
            card.remove();
        }, 5000);
    }
}
window.SubmissionsCheckoutFeedback = SubmissionsCheckoutFeedback;
