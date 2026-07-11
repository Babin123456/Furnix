/**
 * Submissions Image Prefetch controller
 */
class SubmissionsImagePrefetch {
    prefetch(url) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = url;
        document.head.appendChild(link);
        console.log("ECSoC_2026 Prefetched Asset: ", url);
    }
}
window.SubmissionsImagePrefetch = SubmissionsImagePrefetch;
