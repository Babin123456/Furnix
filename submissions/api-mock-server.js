/**
 * Submissions API client mock server
 */
class SubmissionsApiMockServer {
    async postContact(data) {
        if (!data.name || data.name.length < 2) {
            return { success: false, message: "Invalid name input." };
        }
        return { success: true, message: "Mock message accepted by ECSoC_2026 validator." };
    }
}
window.SubmissionsApiMockServer = SubmissionsApiMockServer;
