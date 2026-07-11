/**
 * Submissions API Playground interactive client script
 */
document.addEventListener("DOMContentLoaded", () => {
    const mock = new window.SubmissionsApiMockServer();
    const btn = document.getElementById("send-mock-btn");
    const output = document.getElementById("api-output");

    if (btn && output) {
        btn.addEventListener("click", async () => {
            const resp = await mock.postContact({ name: "Tester", message: "API testing message." });
            output.textContent = JSON.stringify(resp, null, 4);
        });
    }
});
