/**
 * Submissions State persistence bridge
 */
class SubmissionsStatePersist {
    constructor(store, key = "furnix_persisted_state") {
        this.store = store;
        this.key = key;
    }

    saveState() {
        localStorage.setItem(this.key, JSON.stringify(this.store.getState()));
    }

    loadState() {
        const raw = localStorage.getItem(this.key);
        if (raw) {
            try {
                this.store.setState(JSON.parse(raw));
            } catch (e) {
                console.error("State parse error:", e);
            }
        }
    }
}
window.SubmissionsStatePersist = SubmissionsStatePersist;
