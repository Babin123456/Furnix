/**
 * Submissions State store test listener setup
 */
document.addEventListener("DOMContentLoaded", () => {
    const store = new window.SubmissionsStateStore();
    const dispatcher = new window.SubmissionsStateAction(store);
    const persistence = new window.SubmissionsStatePersist(store);
    const debug = new window.SubmissionsStateDebug(store);

    debug.enableLogging();
    persistence.loadState();

    console.log("Submissions State Management initialized for ECSoC_2026.");
});
