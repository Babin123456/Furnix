/**
 * Submissions Quick View animation effects controller
 */
class SubmissionsQuickViewAnimation {
    fadeIn(element) {
        element.style.opacity = 0;
        element.style.display = "flex";
        let last = +new Date();
        const tick = () => {
            element.style.opacity = +element.style.opacity + (new Date() - last) / 400;
            last = +new Date();
            if (+element.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
        tick();
    }
}
window.SubmissionsQuickViewAnimation = SubmissionsQuickViewAnimation;
