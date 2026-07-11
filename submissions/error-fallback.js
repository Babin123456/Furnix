/**
 * Submissions Error Fallback rendering engine
 */
class SubmissionsErrorFallback {
    render(error) {
        const root = document.getElementById("error-boundary-root");
        const template = document.getElementById("error-template");
        if (root && template) {
            root.innerHTML = template.innerHTML;
            console.log("Error fallback UI loaded for ECSoC_2026.");
        }
    }
}
window.SubmissionsErrorFallback = SubmissionsErrorFallback;
