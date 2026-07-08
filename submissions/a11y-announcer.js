/**
 * Submissions Accessibility Screen Reader Live-Announcer module
 */
class SubmissionsA11yAnnouncer {
    constructor() {
        this.announcer = document.createElement("div");
        this.announcer.setAttribute("aria-live", "polite");
        this.announcer.setAttribute("aria-atomic", "true");
        this.announcer.style.position = "absolute";
        this.announcer.style.width = "1px";
        this.announcer.style.height = "1px";
        this.announcer.style.overflow = "hidden";
        this.announcer.style.clip = "rect(0 0 0 0)";
        document.body.appendChild(this.announcer);
    }

    announce(message) {
        this.announcer.textContent = message;
        console.log("ECSoC_2026 Screen Reader Announcement: ", message);
    }
}
window.SubmissionsA11yAnnouncer = SubmissionsA11yAnnouncer;
