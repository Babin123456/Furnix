/**
 * Furnix Storefront - Product Review & Rating Engine
 * Manages customer product reviews, average rating scores,
 * localStorage persistence, and review submissions.
 */

const REVIEWS_STORAGE_KEY = 'furnix_product_reviews';

// Default initial reviews for catalog items
const INITIAL_REVIEWS = {
  'prod-1': [
    { id: 'rev-101', author: 'Elena Rostova', rating: 5, comment: 'Exquisite minimalism! The quality exceeded my expectations.', date: '2026-05-12' },
    { id: 'rev-102', author: 'Marcus Vance', rating: 4, comment: 'Very comfortable and stylish neon aesthetic.', date: '2026-06-01' }
  ],
  'prod-2': [
    { id: 'rev-201', author: 'Sophia Chen', rating: 5, comment: 'Stunning craftsmanship and incredibly sturdy build.', date: '2026-06-18' }
  ]
};

/**
 * Get all product reviews stored locally
 */
function getAllReviews() {
  if (typeof localStorage === 'undefined') return INITIAL_REVIEWS;
  try {
    const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_REVIEWS;
  } catch (err) {
    return INITIAL_REVIEWS;
  }
}

/**
 * Get reviews for a specific product ID
 */
function getProductReviews(productId) {
  const reviews = getAllReviews();
  return reviews[productId] || [];
}

/**
 * Calculate average rating score for a product
 */
function getAverageRating(productId) {
  const list = getProductReviews(productId);
  if (!list || list.length === 0) return { average: 0, count: 0 };
  const total = list.reduce((sum, item) => sum + item.rating, 0);
  const average = +(total / list.length).toFixed(1);
  return { average, count: list.length };
}

/**
 * Submit a new review for a product
 */
function addProductReview(productId, author, rating, comment) {
  if (!productId || typeof productId !== 'string') return false;
  if (!author || typeof author !== 'string' || author.trim().length < 2) return false;
  const numericRating = Number(rating);
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) return false;
  if (!comment || typeof comment !== 'string' || comment.trim().length < 10) return false;

  const all = getAllReviews();
  if (!all[productId]) {
    all[productId] = [];
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    author: author.trim(),
    rating: numericRating,
    comment: comment.trim(),
    date: new Date().toISOString().split('T')[0]
  };

  all[productId].unshift(newReview);

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(all));
    } catch (e) {
      console.error('Error saving review to localStorage:', e);
    }
  }

  return newReview;
}

/**
 * Generate star rating HTML string
 */
function renderStarRatingHTML(score) {
  const fullStars = Math.floor(score);
  const hasHalf = score % 1 >= 0.5;
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += '<i class="fa-solid fa-star text-warning" aria-hidden="true"></i>';
    } else if (i === fullStars + 1 && hasHalf) {
      html += '<i class="fa-solid fa-star-half-stroke text-warning" aria-hidden="true"></i>';
    } else {
      html += '<i class="fa-regular fa-star text-muted" aria-hidden="true"></i>';
    }
  }
  return html;
}

// Export for Node environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getAllReviews,
    getProductReviews,
    getAverageRating,
    addProductReview,
    renderStarRatingHTML
  };
}
