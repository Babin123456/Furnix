/**
 * Submissions Lazy Loader Helper
 */
class SubmissionsLazyLoader {
    constructor(selector = "img[data-src]") {
        this.images = document.querySelectorAll(selector);
    }

    init() {
        if (!("IntersectionObserver" in window)) {
            this.fallback();
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src");
                    obs.unobserve(img);
                }
            });
        });

        this.images.forEach(img => observer.observe(img));
    }

    fallback() {
        this.images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}
window.SubmissionsLazyLoader = SubmissionsLazyLoader;
