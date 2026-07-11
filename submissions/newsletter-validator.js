/**
 * Submissions Newsletter validation helper
 */
class SubmissionsNewsletterValidator {
    validate(email) {
        if (!email || typeof email !== "string") return false;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.trim());
    }
}
window.SubmissionsNewsletterValidator = SubmissionsNewsletterValidator;
