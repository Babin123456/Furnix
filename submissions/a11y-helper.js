/**
 * Submissions Accessibility Helpers module
 */
class SubmissionsA11yHelper {
    setAriaAttributes(el, attrs) {
        Object.entries(attrs).forEach(([key, val]) => {
            el.setAttribute(key, val);
        });
    }

    addKeyboardListener(el, key, callback) {
        el.addEventListener("keydown", (e) => {
            if (e.key === key) {
                e.preventDefault();
                callback(e);
            }
        });
    }
}
window.SubmissionsA11yHelper = SubmissionsA11yHelper;
