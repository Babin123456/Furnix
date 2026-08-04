const test = require('node:test');
const assert = require('node:assert');
const {
  getAllReviews,
  getProductReviews,
  getAverageRating,
  addProductReview,
  renderStarRatingHTML
} = require('./review-engine.js');

test('Review Engine - Initial Reviews', () => {
  const reviews = getProductReviews('prod-1');
  assert.strictEqual(Array.isArray(reviews), true);
  assert.strictEqual(reviews.length >= 2, true);
});

test('Review Engine - Average Rating Calculation', () => {
  const ratingData = getAverageRating('prod-1');
  assert.strictEqual(ratingData.count, 2);
  assert.strictEqual(ratingData.average, 4.5);
});

test('Review Engine - Submit Valid Review', () => {
  const newRev = addProductReview('prod-99', 'Jane Doe', 5, 'Exceptional quality product!');
  assert.strictEqual(typeof newRev, 'object');
  assert.strictEqual(newRev.author, 'Jane Doe');
  assert.strictEqual(newRev.rating, 5);

  const updatedStats = getAverageRating('prod-99');
  assert.strictEqual(updatedStats.count, 1);
  assert.strictEqual(updatedStats.average, 5);
});

test('Review Engine - Reject Invalid Review Input', () => {
  assert.strictEqual(addProductReview('', 'Jane', 5, 'Good product'), false);
  assert.strictEqual(addProductReview('prod-1', 'A', 5, 'Good product'), false);
  assert.strictEqual(addProductReview('prod-1', 'Jane', 6, 'Good product'), false);
  assert.strictEqual(addProductReview('prod-1', 'Jane', 0, 'Good product'), false);
  assert.strictEqual(addProductReview('prod-1', 'Jane', 5, 'Short'), false);
});

test('Review Engine - Star Rating HTML Generation', () => {
  const html = renderStarRatingHTML(4.5);
  assert.strictEqual(html.includes('fa-star'), true);
  assert.strictEqual(html.includes('fa-star-half-stroke'), true);
});
