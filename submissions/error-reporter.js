/**
 * Submissions Error reporter module
 */
class SubmissionsErrorReporter {
    report(error) {
        console.error("[ECSoC_2026 Error Captured]:", error ? error.message : "Unknown error");
    }
}
window.SubmissionsErrorReporter = SubmissionsErrorReporter;
