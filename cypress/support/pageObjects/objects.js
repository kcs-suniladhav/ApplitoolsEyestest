/**
 * Page Objects Repository
 * Centralized storage of all page selectors and elements for Anne Marie Barton PLP
 */

const ANNE_MARIE_PAGE = {
  // Base URL
  baseUrl: 'https://stage7.visualcomfort.com',
  plpUrl: '/us/c/our-designers/anne-marie-barton',

  // Page elements
  body: 'body',
  pageTitle: 'h1, h2, [data-testid="page-title"], .page-title',
  
  // Images
  images: 'img',
  visibleImages: 'img:visible',

  // Product/Card selectors (multiple variants for flexibility)
  productCards: '[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card',
  
  // Product list container
  productListContainer: '[data-testid="product-list"], .product-list, .products, .product-grid',

  // Navigation and UI elements
  header: 'header, [data-testid="header"]',
  footer: 'footer, [data-testid="footer"]',
  searchBox: '[data-testid="search"], .search-input, input[type="search"]',
  
  // Sort and filter elements
  sortDropdown: '[data-testid="sort"], .sort-dropdown, select[name="sort"]',
  filterButton: '[data-testid="filters"], .filter-button, button[aria-label*="Filter"]',
  
  // Breadcrumb
  breadcrumb: '[data-testid="breadcrumb"], .breadcrumb, nav[aria-label="Breadcrumb"]',
  
  // Price elements
  productPrice: '.price, [data-testid="price"], .product-price',
  salePrice: '.sale-price, [data-testid="sale-price"], .discount-price',
  
  // Product name/title
  productName: '.product-name, [data-testid="product-name"], .product-title',
  
  // Add to cart button
  addToCartButton: 'button[aria-label*="Add to cart"], .add-to-cart, [data-testid="add-to-cart"]',
  
  // Rating/Reviews
  productRating: '[data-testid="rating"], .rating, .review-stars',
  productReviews: '[data-testid="reviews"], .reviews, .review-count',
};

const GRIDBUSTER_PAGE = {
  // Base URL
  baseUrl: 'https://stage7.visualcomfort.com',
  plpUrl: '/us/c/our-designers/gridbuster',

  // Page elements
  body: 'body',
  pageTitle: 'h1, h2, [data-testid="page-title"], .page-title',
  
  // Images
  images: 'img',
  visibleImages: 'img:visible',

  // Product/Card selectors (multiple variants for flexibility)
  productCards: '[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card',
  
  // Product list container
  productListContainer: '[data-testid="product-list"], .product-list, .products, .product-grid',

  // Navigation and UI elements
  header: 'header, [data-testid="header"]',
  footer: 'footer, [data-testid="footer"]',
  searchBox: '[data-testid="search"], .search-input, input[type="search"]',
  
  // Sort and filter elements
  sortDropdown: '[data-testid="sort"], .sort-dropdown, select[name="sort"]',
  filterButton: '[data-testid="filters"], .filter-button, button[aria-label*="Filter"]',
  
  // Breadcrumb
  breadcrumb: '[data-testid="breadcrumb"], .breadcrumb, nav[aria-label="Breadcrumb"]',
  
  // Price elements
  productPrice: '.price, [data-testid="price"], .product-price',
  salePrice: '.sale-price, [data-testid="sale-price"], .discount-price',
  
  // Product name/title
  productName: '.product-name, [data-testid="product-name"], .product-title',
  
  // Add to cart button
  addToCartButton: 'button[aria-label*="Add to cart"], .add-to-cart, [data-testid="add-to-cart"]',
  
  // Rating/Reviews
  productRating: '[data-testid="rating"], .rating, .review-stars',
  productReviews: '[data-testid="reviews"], .reviews, .review-count',
};

const HOME_PAGE = {
  // Base URL
  baseUrl: 'https://stage7.visualcomfort.com',
  homeUrl: '/',

  // Page elements
  body: 'body',
  pageTitle: 'h1, h2, [data-testid="page-title"], .page-title',
  
  // Hero section
  heroSection: '[data-testid="hero"], .hero, .hero-section, .banner, .hero-banner, [role="banner"]',
  heroContent: '[data-testid="hero-content"], .hero-content, .hero-text',
    // additional fallbacks used on some templates
    heroFallback: '#hero, .masthead, .site-hero',
  
  // Images
  images: 'img',
  visibleImages: 'img:visible',

  // Product/Featured items
  productCards: '[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card, .featured-item',
    // extra fallbacks for other templates
    productCardFallback: '.product-grid-item, .grid-item, .product-list-item, .featured-item',
  featuredItems: '[data-testid="featured"], .featured, .featured-items, .promoted',
  
  // Product list container
  productListContainer: '[data-testid="product-list"], .product-list, .products, .product-grid, .featured-grid',

  // Navigation and UI elements
  header: 'header, [data-testid="header"]',
  footer: 'footer, [data-testid="footer"]',
  navigation: 'nav, [data-testid="navigation"], .nav-menu',
  searchBox: '[data-testid="search"], .search-input, input[type="search"]',
  
  // Sort and filter elements
  sortDropdown: '[data-testid="sort"], .sort-dropdown, select[name="sort"]',
  filterButton: '[data-testid="filters"], .filter-button, button[aria-label*="Filter"]',
  
  // Breadcrumb
  breadcrumb: '[data-testid="breadcrumb"], .breadcrumb, nav[aria-label="Breadcrumb"]',
  
  // Price elements
  productPrice: '.price, [data-testid="price"], .product-price',
  salePrice: '.sale-price, [data-testid="sale-price"], .discount-price',
  
  // Product name/title
  productName: '.product-name, [data-testid="product-name"], .product-title',
  
  // Add to cart button
  addToCartButton: 'button[aria-label*="Add to cart"], .add-to-cart, [data-testid="add-to-cart"]',
  
  // Rating/Reviews
  productRating: '[data-testid="rating"], .rating, .review-stars',
  productReviews: '[data-testid="reviews"], .reviews, .review-count',
};

const PLP_PAGE = ANNE_MARIE_PAGE;

/**
 * Helper function to get selector by key
 * @param {string} key - The selector key from PLP_PAGE object
 * @returns {string} - The CSS selector
 */
const getSelector = (key) => {
  return PLP_PAGE[key] || null;
};

/**
 * Helper function to check if element is visible
 * @param {string} selector - CSS selector
 * @returns {boolean} - true if visible, false otherwise
 */
const isElementVisible = (selector) => {
  const element = document.querySelector(selector);
  if (!element) return false;
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden';
};

/**
 * Get all visible elements matching selector
 * @param {string} selector - CSS selector
 * @returns {HTMLElement[]} - Array of visible elements
 */
const getVisibleElements = (selector) => {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).filter(el => {
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden';
  });
};

/**
 * Check if image is fully loaded
 * @param {HTMLImageElement} img - Image element
 * @returns {boolean} - true if loaded, false otherwise
 */
const isImageLoaded = (img) => {
  return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
};

/**
 * Validate grid alignment by checking if cards share common row positions
 * @param {HTMLElement[]} cards - Array of card elements
 * @returns {object} - Alignment validation result
 */
const validateGridAlignment = (cards) => {
  if (!cards || cards.length === 0) {
    return { isAligned: false, message: 'No cards found' };
  }

  const tops = cards.map(el => Math.round(el.getBoundingClientRect().top));
  const uniqueRows = new Set(tops);
  const cardHeights = cards.map(el => el.getBoundingClientRect().height);
  const avgHeight = cardHeights.reduce((a, b) => a + b, 0) / cardHeights.length;

  let heightVariance = 0;
  cardHeights.forEach((height) => {
    const deviation = Math.abs(height - avgHeight) / avgHeight;
    heightVariance = Math.max(heightVariance, deviation);
  });

  return {
    isAligned: uniqueRows.size > 1 && heightVariance < 0.2,
    totalCards: cards.length,
    totalRows: uniqueRows.size,
    maxHeightVariance: heightVariance.toFixed(2),
    message: uniqueRows.size > 1 ? `Grid aligned in ${uniqueRows.size} rows` : 'Cards not properly aligned in rows',
  };
};

// Export for CommonJS
module.exports = {
  PLP_PAGE,
  ANNE_MARIE_PAGE,
  GRIDBUSTER_PAGE,
  HOME_PAGE,
  getSelector,
  isElementVisible,
  getVisibleElements,
  isImageLoaded,
  validateGridAlignment,
};
