/**
 * Submissions Event-Driven State Store Module
 */
class SubmissionsStateStore {
    constructor() {
        this.state = {
            cart: [],
            wishlist: [],
            user: null
        };
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(l => l(this.state));
    }
}
window.SubmissionsStateStore = SubmissionsStateStore;
