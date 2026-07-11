/**
 * Submissions State Actions dispatcher
 */
class SubmissionsStateAction {
    constructor(store) {
        this.store = store;
    }

    addToCartAction(item) {
        const current = this.store.getState().cart;
        this.store.setState({ cart: [...current, item] });
    }

    setAuthUserAction(user) {
        this.store.setState({ user });
    }
}
window.SubmissionsStateAction = SubmissionsStateAction;
