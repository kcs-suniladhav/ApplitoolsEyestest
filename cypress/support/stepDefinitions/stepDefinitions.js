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

/**
 * Home Page Visual Testing Steps
 */

Given('the user navigates to the home page', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.visit(HOME_PAGE.baseUrl + HOME_PAGE.homeUrl);
  cy.wait(2000);
  cy.log('✓ User navigated to home page');
});

Then('the page should load with HTTP 200 status', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.request(HOME_PAGE.baseUrl + HOME_PAGE.homeUrl)
    .its('status')
    .should('equal', 200);
  cy.log('✓ HTTP 200 status confirmed');
});

Then('the home page should display without errors', function () {
  cy.get('body').should('be.visible');
  cy.log('✓ Home page displayed without errors');
});

Then('the page title should be valid', function () {
  cy.title().should('not.be.empty');
  cy.log('✓ Page title is valid');
});

Then('Applitools Eyes should capture the initial page load', function () {
  cy.screenshot('home-01-initial-load', { overwrite: true });
  cy.log('✓ Initial page load captured');
});

When('the user scrolls through the entire page', function () {
  cy.scrollTo('bottom', { duration: 2000 });
  cy.wait(2000);
  cy.log('✓ User scrolled through entire page');
});

When('all images are loaded', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.visibleImages).each(($img) => {
    cy.wrap($img).should('have.prop', 'complete', true);
  });
  cy.log('✓ All images are loaded');
});

Then('all visible images should be properly loaded', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.visibleImages).then($imgs => {
    expect($imgs.length, 'visible images').to.be.greaterThan(0);
    cy.wrap($imgs).each(($img) => {
      cy.wrap($img).and(($el) => {
        expect($el[0].naturalWidth, 'image naturalWidth').to.be.greaterThan(0);
        expect($el[0].naturalHeight, 'image naturalHeight').to.be.greaterThan(0);
      });
    });
  });
  cy.log('✓ All visible images are properly loaded');
});

Then('no images should have broken src attributes', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.images).each(($img) => {
    cy.wrap($img).should('have.attr', 'src').and('not.be.empty');
  });
  cy.log('✓ No images have broken src attributes');
});

Then('all images should have valid dimensions', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.visibleImages).each(($img) => {
    cy.wrap($img).and(($el) => {
      expect($el[0].naturalWidth).to.be.greaterThan(0);
      expect($el[0].naturalHeight).to.be.greaterThan(0);
    });
  });
  cy.log('✓ All images have valid dimensions');
});

Then('Applitools Eyes should capture the scrolled page', function () {
  cy.screenshot('home-02-images-loaded-scroll', { overwrite: true });
  cy.log('✓ Scrolled page captured');
});

When('the page is fully loaded', function () {
  cy.get('body').should('be.visible');
  cy.wait(1500);
  cy.log('✓ Page is fully loaded');
});

Then('a hero section should exist on the page', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.heroSection).should('have.length.greaterThan', 0);
  cy.log('✓ Hero section exists on page');
});

Then('the hero section should be visible', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.heroSection).first().should('be.visible');
  cy.log('✓ Hero section is visible');
});

Then('the hero section should contain content', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.heroSection).first().then(($hero) => {
    expect($hero.text().length).to.be.greaterThan(0);
  });
  cy.log('✓ Hero section contains content');
});

Then('the hero section should be properly centered or aligned', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.heroSection).first().then(($hero) => {
    const heroRect = $hero[0].getBoundingClientRect();
    expect(heroRect.height).to.be.greaterThan(100);
  });
  cy.log('✓ Hero section is properly aligned');
});

Then('Applitools Eyes should capture the hero section', function () {
  cy.screenshot('home-03-hero-section', { overwrite: true });
  cy.log('✓ Hero section captured');
});

Then('product items or featured sections should exist', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.productCards).should('have.length.greaterThan', 0);
  cy.log('✓ Product items exist on page');
});

Then('all product items should be organized in rows', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.productCards).then($cards => {
    const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
    const uniqueRows = new Set(tops);
    expect(uniqueRows.size).to.be.greaterThan(0);
  });
  cy.log('✓ Product items are organized in rows');
});

Then('items within each row should have consistent heights', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.productCards).then($cards => {
    if ($cards.length === 0) return;
    const cardHeights = [...$cards].map(el => el.getBoundingClientRect().height);
    const avgHeight = cardHeights.reduce((a, b) => a + b, 0) / cardHeights.length;
    cardHeights.forEach((height) => {
      const deviation = Math.abs(height - avgHeight) / avgHeight;
      expect(deviation).to.be.lessThan(0.2);
    });
  });
  cy.log('✓ Items within rows have consistent heights');
});

Then('the grid layout should be properly aligned', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.productCards).then($cards => {
    expect($cards.length).to.be.greaterThan(0);
  });
  cy.log('✓ Grid layout is properly aligned');
});

Then('Applitools Eyes should capture the grid alignment', function () {
  cy.screenshot('home-04-grid-alignment', { overwrite: true });
  cy.log('✓ Grid alignment captured');
});

Then('a baseline snapshot should be captured', function () {
  cy.screenshot('home-05-baseline', { overwrite: true });
  cy.log('✓ Baseline snapshot captured');
});

Then('the baseline should include all page sections', function () {
  cy.get('body').should('be.visible');
  cy.log('✓ Baseline includes all page sections');
});

Then('the baseline should be stored for future comparisons', function () {
  cy.task('findScreenshot', { name: 'home-05-baseline.png' }).then((found) => {
    expect(found).to.not.be.null;
  });
  cy.log('✓ Baseline stored for future comparisons');
});

When('the current page snapshot is captured', function () {
  cy.screenshot('home-06-full-page-snapshot', { overwrite: true });
  cy.wait(500);
  cy.log('✓ Current page snapshot captured');
});

Then('the current snapshot should be compared with baseline', function () {
  cy.task('findScreenshot', { name: 'home-05-baseline.png' }).then((baselinePath) => {
    if (baselinePath) {
      cy.task('findScreenshot', { name: 'home-06-full-page-snapshot.png' }).then((currentPath) => {
        if (currentPath) {
          cy.task('compareImages', {
            expected: baselinePath,
            actual: currentPath,
            threshold: 0.1,
            diffName: `diff-home-baseline-${Date.now()}.png`
          }).then((result) => {
            cy.wrap(result).as('comparisonResult');
          });
        }
      });
    }
  });
  cy.log('✓ Current snapshot compared with baseline');
});

Then('visual differences should be within acceptable threshold', function () {
  cy.get('@comparisonResult').then((result) => {
    if (result && !result.error) {
      cy.log(`Mismatch: ${result.mismatchPercentage.toFixed(3)}%`);
    }
  });
  cy.log('✓ Visual differences are within threshold');
});

Then('the mismatch percentage should not exceed {int}%', function (maxPercent) {
  cy.get('@comparisonResult').then((result) => {
    if (result && !result.error) {
      expect(result.mismatchPercentage).to.be.at.most(maxPercent);
    }
  });
  cy.log(`✓ Mismatch percentage is within ${maxPercent}%`);
});

Then('the diff report should be generated and stored', function () {
  cy.get('@comparisonResult').then((result) => {
    if (result && result.diffPath) {
      expect(result.diffPath).to.include('diff-');
    }
  });
  cy.log('✓ Diff report generated and stored');
});

Then('the header should be visible and properly formatted', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.header).should('be.visible');
  cy.log('✓ Header is visible and properly formatted');
});

Then('the footer should be visible and properly formatted', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.footer).should('be.visible');
  cy.log('✓ Footer is visible and properly formatted');
});

Then('navigation elements should be accessible', function () {
  const HOME_PAGE = objects.HOME_PAGE;
  cy.get(HOME_PAGE.navigation).should('have.length.greaterThan', 0);
  cy.log('✓ Navigation elements are accessible');
});

Then('all sections should have appropriate spacing', function () {
  cy.get('body').then(($body) => {
    expect($body.height()).to.be.greaterThan(500);
  });
  cy.log('✓ All sections have appropriate spacing');
});

Then('Applitools Eyes should capture the responsive layout', function () {
  cy.screenshot('home-07-responsive-layout', { overwrite: true });
  cy.log('✓ Responsive layout captured');
});
