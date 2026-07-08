/**
 * Submissions Accessibility focus boundary trap
 */
class SubmissionsA11yFocusTrap {
    constructor(element) {
        this.element = element;
    }

    trap() {
        const focusable = this.element.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        this.element.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        last.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === last) {
                        first.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}
window.SubmissionsA11yFocusTrap = SubmissionsA11yFocusTrap;
