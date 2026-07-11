/**
 * Submissions Checkout Fields Validator
 */
class SubmissionsCheckoutValidator {
    constructor() {
        this.errors = [];
    }

    validateCardNumber(number) {
        const cleaned = String(number).replace(/\D/g, "");
        if (!cleaned || cleaned.length < 13 || cleaned.length > 19) {
            return false;
        }
        return this.luhnCheck(cleaned);
    }

    luhnCheck(val) {
        let sum = 0;
        let shouldDouble = false;
        for (let i = val.length - 1; i >= 0; i--) {
            let digit = parseInt(val.charAt(i), 10);
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validateExpiry(expiry) {
        const regex = /^(\d{2})\s*\/\s*(\d{2})$/;
        return regex.test(expiry);
    }
}
window.SubmissionsCheckoutValidator = SubmissionsCheckoutValidator;
