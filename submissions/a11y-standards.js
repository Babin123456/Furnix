/**
 * Submissions Accessibility core standards integration listener
 */
document.addEventListener("DOMContentLoaded", () => {
    const announcer = new window.SubmissionsA11yAnnouncer();
    const helper = new window.SubmissionsA11yHelper();
    
    // Announce load
    announcer.announce("Furnix Portal accessibility engine fully activated for ECSoC_2026.");
});
