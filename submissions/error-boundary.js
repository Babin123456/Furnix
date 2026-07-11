/**
 * Submissions Error Boundary trap handler
 */
class SubmissionsErrorBoundary {
    constructor(reporter, fallback) {
        this.reporter = reporter;
        this.fallback = fallback;
    }

    init() {
        window.addEventListener("error", (event) => {
            this.reporter.report(event.error);
            this.fallback.render(event.error);
            event.preventDefault();
        });
    }
}
window.SubmissionsErrorBoundary = SubmissionsErrorBoundary;
