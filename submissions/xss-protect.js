/**
 * Submissions Security XSS protection middleware/bridge
 */
class SubmissionsXssProtect {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }

    protectForm(formElement, inputSelector) {
        formElement.addEventListener("submit", (e) => {
            const inputs = formElement.querySelectorAll(inputSelector);
            inputs.forEach(input => {
                input.value = this.sanitizer.sanitize(input.value);
            });
        });
    }
}
window.SubmissionsXssProtect = SubmissionsXssProtect;
