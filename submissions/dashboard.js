/**
 * Submissions Dashboard main execution script
 */
document.addEventListener("DOMContentLoaded", () => {
    const orders = window.mockOrdersData || [];
    const chart = new window.SubmissionsDashboardChart("dashboardChart");
    chart.render(orders);

    const statsContainer = document.getElementById("stats-panel");
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total Spend</h3>
                    <p>$1514.50</p>
                </div>
                <div class="stat-card">
                    <h3>Total Orders</h3>
                    <p>${orders.length}</p>
                </div>
            </div>
        `;
    }
});
