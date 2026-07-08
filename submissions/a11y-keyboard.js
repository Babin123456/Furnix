/**
 * Submissions keyboard interaction controller
 */
class SubmissionsA11yKeyboard {
    constructor(announcer) {
        this.announcer = announcer;
    }

    bindEscapeKey(element, onClose) {
        element.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                onClose();
                this.announcer.announce("Modal closed.");
            }
        });
    }
}
window.SubmissionsA11yKeyboard = SubmissionsA11yKeyboard;
