/**
 * Submissions Security CSRF token management module
 */
class SubmissionsCsrfTokens {
    generateToken() {
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        return Array.from(array, dec => dec.toString(16).padStart(8, "0")).join("");
    }

    injectTokenToForm(formElement) {
        const token = this.generateToken();
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "_csrf_token";
        input.value = token;
        formElement.appendChild(input);
    }
}
window.SubmissionsCsrfTokens = SubmissionsCsrfTokens;
