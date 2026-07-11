/**
 * Submissions DOM Rendering Optimizer Listener
 */
document.addEventListener("DOMContentLoaded", () => {
    const monitor = new window.SubmissionsPerfMonitor();
    monitor.start("DOMContentLoaded_handler");

    const lazy = new window.SubmissionsLazyLoader();
    lazy.init();

    monitor.end("DOMContentLoaded_handler");
});
