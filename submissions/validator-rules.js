/**
 * Submissions Security validator integration script
 */
document.addEventListener("DOMContentLoaded", () => {
    const sanitizer = new window.SubmissionsSanitizer();
    const logger = new window.SubmissionsSecurityLogger();

    const dirtyText = "<script>alert('xss');</script>";
    const cleanText = sanitizer.sanitize(dirtyText);

    if (cleanText.includes("<script>")) {
        logger.logAlert("XSS Bypass", dirtyText);
    } else {
        console.log("Sanitization verified successfully: ", cleanText);
    }
});
