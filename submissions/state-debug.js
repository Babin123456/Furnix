/**
 * Submissions State changes debugger/logger
 */
class SubmissionsStateDebug {
    constructor(store) {
        this.store = store;
    }

    enableLogging() {
        this.store.subscribe((state) => {
            console.log("ECSoC_2026 State Debugger Output: ", state);
        });
    }
}
window.SubmissionsStateDebug = SubmissionsStateDebug;
