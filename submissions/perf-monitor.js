/**
 * Submissions Performance Monitor
 */
class SubmissionsPerfMonitor {
    constructor() {
        this.timings = {};
    }

    start(label) {
        this.timings[label] = performance.now();
    }

    end(label) {
        if (!this.timings[label]) return;
        const duration = performance.now() - this.timings[label];
        console.log(`[ECSoC_2026 Perf] ${label}: ${duration.toFixed(2)}ms`);
        delete this.timings[label];
    }
}
window.SubmissionsPerfMonitor = SubmissionsPerfMonitor;
