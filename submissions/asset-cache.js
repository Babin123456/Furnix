/**
 * Submissions Cache controller
 */
class SubmissionsAssetCache {
    async cacheAsset(cacheName, requestUrl) {
        if (!('caches' in window)) return;
        const cache = await caches.open(cacheName);
        await cache.add(requestUrl);
        console.log("Cached asset: ", requestUrl);
    }
}
window.SubmissionsAssetCache = SubmissionsAssetCache;
