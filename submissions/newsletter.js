/**
 * Submissions Newsletter controller script
 */
document.addEventListener("DOMContentLoaded", () => {
    const validator = new window.SubmissionsNewsletterValidator();
    const feedback = new window.SubmissionsNewsletterSuccess();
    const container = document.getElementById("newsletter-form-container");

    if (container) {
        container.innerHTML = `
            <div id="newsletter-form-inner">
                <input type="email" id="news-email-field" placeholder="Enter your email">
                <button id="news-subscribe-btn">Subscribe</button>
            </div>
        `;

        document.getElementById("news-subscribe-btn").addEventListener("click", () => {
            const val = document.getElementById("news-email-field").value;
            if (validator.validate(val)) {
                feedback.showSuccess(container, val);
            } else {
                alert("Please enter a valid email address.");
            }
        });
    }
});
