/**
 * Submissions Checkout Validator Unit Tests
 */
(function() {
    console.log("Starting checkout validation test suite...");
    const validator = new window.SubmissionsCheckoutValidator();
    
    // Test card numbers
    const validCard = "49927398716"; // Valid Luhn
    const invalidCard = "49927398717"; // Invalid Luhn

    console.assert(validator.validateCardNumber(validCard) === true, "Valid card check failed");
    console.assert(validator.validateCardNumber(invalidCard) === false, "Invalid card check failed");
    
    // Test emails
    console.assert(validator.validateEmail("test@example.com") === true, "Valid email check failed");
    console.assert(validator.validateEmail("testexample.com") === false, "Invalid email check failed");

    console.log("All validation tests executed.");
})();
