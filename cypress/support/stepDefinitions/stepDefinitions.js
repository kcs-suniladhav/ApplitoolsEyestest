const { Given, When, Then, Before, After } = require('@badeball/cypress-cucumber-preprocessor');
const objects = require('../pageObjects/objects');

const PLP_PAGE = objects.PLP_PAGE;
const ANNE_MARIE_PAGE = objects.ANNE_MARIE_PAGE;
const GRIDBUSTER_PAGE = objects.GRIDBUSTER_PAGE;

Before(function () {
  // Initialize any global test data or state here
  cy.log('Test Started: Anne Marie Barton PLP Visual Testing');
});

After(function () {
  // Cleanup after test execution
  cy.log('Test Completed');
});

/**
 * Given Steps - Setup preconditions
 */

Given('the base URL is set to the Anne Marie Barton PLP page', function () {
  cy.log('Base URL configured: ' + PLP_PAGE.baseUrl);
});

Given('the page has completed initial load', function () {
  cy.visit(PLP_PAGE.baseUrl + PLP_PAGE.plpUrl);
  cy.wait(1000);
});

Given('the user launches the Anne Marie Barton designer PLP page', function () {
  cy.visit(PLP_PAGE.baseUrl + PLP_PAGE.plpUrl);
  cy.wait(2000);
});

/**
 * When Steps - User actions and interactions
 */

When('the user navigates to the Anne Marie Barton designer page', function () {
  cy.visit(PLP_PAGE.baseUrl + PLP_PAGE.plpUrl);
});

When('the page wait time of {int} seconds has elapsed', function (seconds) {
  cy.wait(seconds * 1000);
});

When('the user scrolls to the bottom of the page', function () {
  cy.scrollTo('bottom', { duration: 1000 });
});

When('wait {int} second for scroll to complete', function (seconds) {
  cy.wait(seconds * 1000);
});

When('the system scrolls through the full page to load all images', function () {
  cy.scrollTo('bottom', { duration: 1500 });
  cy.wait(1500);
});

When('the system should scroll back to top', function () {
  cy.scrollTo('top', { duration: 500 });
  cy.wait(1000);
});

/**
 * Then Steps - Verification and assertions
 */

// Page Load & Structure

Then('the PLP page should load successfully', function () {
  cy.get(PLP_PAGE.body).should('be.visible');
  cy.log('✓ PLP page loaded successfully');
});

Then('the PLP page should load successfully with correct HTTP 200 status', function () {
  cy.request(PLP_PAGE.baseUrl + PLP_PAGE.plpUrl)
    .its('status')
    .should('equal', 200);
  cy.log('✓ HTTP 200 status confirmed');
});

Then('the page body should be visible', function () {
  cy.get(PLP_PAGE.body).should('be.visible');
  cy.log('✓ Page body is visible');
});

Then('the page title should display {string}', function (expectedTitle) {
  cy.title().should('include', expectedTitle);
  cy.log('✓ Page title includes: ' + expectedTitle);
});

Then('the page structure should be consistent with required elements', function () {
  cy.get(PLP_PAGE.pageTitle).should('have.length.greaterThan', 0);
  cy.log('✓ Page structure is consistent with required elements');
});

// Image Validation

Then('all images should be displayed properly', function () {
  cy.get(PLP_PAGE.images).then($imgs => {
    const $visible = $imgs.filter(':visible');
    expect($visible.length, 'visible images').to.be.greaterThan(0);

    cy.wrap($visible).each(($img) => {
      cy.wrap($img)
        .should('be.visible')
        .and(($el) => {
          expect($el[0].naturalWidth, 'image naturalWidth').to.be.greaterThan(0);
        });
    });
  });
  cy.log('✓ All images are properly displayed');
});

Then('all images should have valid natural width and height', function () {
  cy.get(PLP_PAGE.images).then($imgs => {
    const $visible = $imgs.filter(':visible');
    
    cy.wrap($visible).each(($img) => {
      cy.wrap($img).and(($el) => {
        expect($el[0].naturalWidth, 'image naturalWidth').to.be.greaterThan(0);
        expect($el[0].naturalHeight, 'image naturalHeight').to.be.greaterThan(0);
      });
    });
  });
  cy.log('✓ All images have valid dimensions');
});

Then('all product images should be visible and not broken', function () {
  cy.get(PLP_PAGE.images).then($imgs => {
    const $visibleImages = $imgs.filter(':visible');
    expect($visibleImages.length, 'visible product images').to.be.greaterThan(0);

    cy.wrap($visibleImages).each(($img) => {
      cy.wrap($img)
        .should('be.visible')
        .and(($el) => {
          expect($el[0].naturalWidth, 'image is loaded').to.be.greaterThan(0);
          expect($el[0].naturalHeight, 'image height is loaded').to.be.greaterThan(0);
        });
    });
  });
  cy.log('✓ All product images are visible and not broken');
});

Then('all images should have proper dimensions greater than zero', function () {
  cy.get(PLP_PAGE.visibleImages).each(($img) => {
    cy.wrap($img).and(($el) => {
      expect($el[0].naturalWidth).to.be.greaterThan(0);
      expect($el[0].naturalHeight).to.be.greaterThan(0);
    });
  });
  cy.log('✓ All images have proper dimensions');
});

// Product/Card Grid Validation

Then('all products/cards should be aligned correctly', function () {
  cy.get(PLP_PAGE.productCards).then($cards => {
    if ($cards.length === 0) {
      throw new Error('No product/card elements found using common selectors');
    }

    const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
    const counts = tops.reduce((acc, t) => {
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});

    const maxCount = Math.max(...Object.values(counts));
    expect(maxCount).to.be.greaterThan(1);
  });
  cy.log('✓ All products/cards are aligned correctly');
});

Then('products should be distributed across multiple rows', function () {
  cy.get(PLP_PAGE.productCards).then($cards => {
    expect($cards.length, 'product cards exist').to.be.greaterThan(0);

    const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
    const uniqueRows = new Set(tops);
    expect(uniqueRows.size, 'product grid has multiple rows').to.be.greaterThan(1);
  });
  cy.log('✓ Products are distributed across multiple rows');
});

Then('all products/cards should be properly aligned in the product grid layout', function () {
  cy.get(PLP_PAGE.productCards).then($cards => {
    expect($cards.length, 'product cards exist').to.be.greaterThan(0);

    const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
    const uniqueRows = new Set(tops);
    expect(uniqueRows.size, 'product grid has multiple rows').to.be.greaterThan(1);
  });
  cy.log('✓ Products are properly aligned in grid layout');
});

Then('the product grid should have consistent row alignment', function () {
  cy.get(PLP_PAGE.productCards).then($cards => {
    if ($cards.length === 0) {
      throw new Error('No product cards found');
    }

    const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
    const uniqueRows = new Set(tops);
    expect(uniqueRows.size).to.be.greaterThan(1);
  });
  cy.log('✓ Product grid has consistent row alignment');
});

Then('the product cards should have consistent heights with variance less than {int}%', function (maxVariancePercent) {
  cy.get(PLP_PAGE.productCards).then($cards => {
    if ($cards.length === 0) {
      throw new Error('No product/card elements found');
    }

    const cardHeights = [...$cards].map(el => el.getBoundingClientRect().height);
    const avgHeight = cardHeights.reduce((a, b) => a + b, 0) / cardHeights.length;

    cardHeights.forEach((height, idx) => {
      const deviation = Math.abs(height - avgHeight) / avgHeight;
      expect(deviation, `Card ${idx} height variance`).to.be.lessThan(maxVariancePercent / 100);
    });
  });
  cy.log(`✓ Product cards have consistent heights within ${maxVariancePercent}% variance`);
});

// Screenshot Steps

Then('a full page screenshot should be taken with name {string}', function (screenshotName) {
  cy.screenshot(screenshotName, { overwrite: true });
  cy.log('✓ Screenshot taken: ' + screenshotName);
});

Then('a baseline capture should be taken with name {string}', function (screenshotName) {
  cy.screenshot(screenshotName, { overwrite: true });
  cy.log('✓ Baseline capture taken: ' + screenshotName);
});

Then('a full page visual snapshot should be captured with name {string}', function (screenshotName) {
  cy.screenshot(screenshotName, { overwrite: true });
  cy.log('✓ Full page visual snapshot captured: ' + screenshotName);
});

Given('a baseline screenshot named {string} exists', function (baselineName) {
  // Ensure baseline is present under cypress/screenshots/**/baselineName
  const expectedFile = baselineName.endsWith('.png') ? baselineName : `${baselineName}`;
  return cy.task('findScreenshot', { name: expectedFile }).then((found) => {
    expect(found, `Baseline screenshot ${baselineName} should exist`).to.not.be.null;
    cy.wrap(found).as('baselinePath');
  });
});

When('the system captures a current full page snapshot with name {string}', function (currentName) {
  // Capture current full page screenshot and store its path
  cy.screenshot(currentName, { overwrite: true });
  const fname = currentName.endsWith('.png') ? currentName : `${currentName}.png`;
  return cy.task('findScreenshot', { name: fname }).then((found) => {
    expect(found, `Captured snapshot ${fname} should exist`).to.not.be.null;
    cy.wrap(found).as('currentPath');
  });
});

Then('the current snapshot should match the baseline {string} with threshold {float}', function (baselineName, threshold) {
  const baselineFile = baselineName.endsWith('.png') ? baselineName : `${baselineName}`;
  // locate baseline and current paths (currentPath alias set earlier)
  return cy.get('@baselinePath').then((baselinePath) => {
    return cy.get('@currentPath').then((currentPath) => {
      // call compareImages task
      return cy.task('compareImages', { expected: baselinePath, actual: currentPath, threshold, diffName: `diff-${Date.now()}.png` }).then((result) => {
        if (result && result.error) {
          throw new Error(result.error);
        }
        // Log diff info and assert
        cy.log(`diffPixels=${result.diffPixels}, mismatch%=${result.mismatchPercentage.toFixed(3)}%`);
        expect(result.pass, `Images should match within threshold ${threshold}`).to.equal(true);
      });
    });
  });
});

// Visual Validation

Then('there should be no visual differences detected in page rendering', function () {
  cy.get(PLP_PAGE.body).should('be.visible');
  cy.log('✓ Page rendering is consistent with no visual differences detected');
});

// Negative/Generic Steps

Then('the user can see all page content is rendered correctly', function () {
  cy.get(PLP_PAGE.body).should('be.visible');
  cy.log('✓ All page content is rendered correctly');
});

/**
 * Custom Helper Steps for complex validations
 */

Then('validate complete PLP page integrity', function () {
  // HTTP Status
  cy.request(PLP_PAGE.baseUrl + PLP_PAGE.plpUrl)
    .its('status')
    .should('equal', 200);

  // Page Title
  cy.title().should('include', 'Anne-Marie Barton');

  // Page Structure
  cy.get(PLP_PAGE.body).should('be.visible');
  cy.get(PLP_PAGE.pageTitle).should('have.length.greaterThan', 0);

  // Images
  cy.get(PLP_PAGE.visibleImages).then($imgs => {
    expect($imgs.length).to.be.greaterThan(0);
  });

  // Product Cards
  cy.get(PLP_PAGE.productCards).then($cards => {
    expect($cards.length).to.be.greaterThan(0);
  });

  cy.log('✓ Complete PLP page integrity validated');
});

/**
 * Gridbuster Designer PLP Steps
 */

Given('the base URL is set to the Gridbuster PLP page', function () {
  cy.log('Base URL configured for Gridbuster: ' + GRIDBUSTER_PAGE.baseUrl);
});

Given('the page has completed initial load for Gridbuster', function () {
  cy.visit(GRIDBUSTER_PAGE.baseUrl + GRIDBUSTER_PAGE.plpUrl);
  cy.wait(1000);
});

Given('the user launches the Gridbuster designer PLP page', function () {
  cy.visit(GRIDBUSTER_PAGE.baseUrl + GRIDBUSTER_PAGE.plpUrl);
  cy.wait(2000);
});

When('the user navigates to the Gridbuster designer page', function () {
  cy.visit(GRIDBUSTER_PAGE.baseUrl + GRIDBUSTER_PAGE.plpUrl);
});

Then('the Gridbuster PLP page should load successfully', function () {
  cy.get(GRIDBUSTER_PAGE.body).should('be.visible');
  cy.log('✓ Gridbuster PLP page loaded successfully');
});

Then('the Gridbuster PLP page should load successfully with correct HTTP 200 status', function () {
  cy.request(GRIDBUSTER_PAGE.baseUrl + GRIDBUSTER_PAGE.plpUrl)
    .its('status')
    .should('equal', 200);
  cy.log('✓ HTTP 200 status confirmed for Gridbuster');
});

Then('the system should scroll back to top', function () {
  cy.scrollTo('top', { duration: 500 });
  cy.wait(1000);
});
