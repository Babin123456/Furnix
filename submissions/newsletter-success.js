/**
 * Submissions Newsletter success message builder
 */
class SubmissionsNewsletterSuccess {
    showSuccess(container, email) {
        container.innerHTML = `
            <div class="newsletter-success-feedback">
                <h4>Success!</h4>
                <p>Welcome to ECSoC_2026. Subscribed: <strong>${email}</strong></p>
            </div>
        `;
    }
}
window.SubmissionsNewsletterSuccess = SubmissionsNewsletterSuccess;
