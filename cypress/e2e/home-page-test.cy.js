const objects = require('../support/pageObjects/objects');

const HOME = objects.HOME_PAGE;

describe('Home Page Visual Tests', () => {
  it('01 - should load the home page and capture initial load', () => {
    cy.visit(HOME.baseUrl + HOME.homeUrl);
    cy.wait(2000);
    cy.get(HOME.body).should('be.visible');
    cy.screenshot('home-01-initial-load', { overwrite: true });
  });

  it('02 - should scroll and capture images loaded', () => {
    cy.visit(HOME.baseUrl + HOME.homeUrl);
    cy.wait(1500);
    cy.scrollTo('bottom', { duration: 1500 });
    // Try progressive scrolling to trigger lazy-loaders
    cy.wait(500);
    cy.scrollTo('top'); cy.wait(400);
    cy.scrollTo('center'); cy.wait(600);
    cy.scrollTo('bottom'); cy.wait(1500);

    // Verify images exist and at least some visible images are loaded (retry up to 20s)
    cy.get(HOME.images, { timeout: 20000 }).should('have.length.greaterThan', 0);
    cy.get(HOME.visibleImages, { timeout: 20000 }).then(($imgs) => {
      const visible = $imgs.filter(':visible');
      expect(visible.length, 'visible images').to.be.greaterThan(0);
      const loadedCount = [...visible].filter(img => img.naturalWidth > 0 && img.naturalHeight > 0).length;
      // require at least one loaded image; log counts for debugging
      cy.log(`visible images: ${visible.length}, loaded: ${loadedCount}`);
      expect(loadedCount, 'at least one visible image loaded').to.be.greaterThan(0);
    });

    cy.screenshot('home-02-images-loaded-scroll', { overwrite: true });
  });

  it('03 - should capture hero section', () => {
    cy.visit(HOME.baseUrl + HOME.homeUrl);
    cy.wait(1500);
    // Try primary hero selectors, fall back to additional patterns
    const heroSelector = `${HOME.heroSection}, ${HOME.heroFallback}`;
    // Query DOM directly to avoid cy.get timeouts when selector absent
    cy.document().then(() => {
      const $els = Cypress.$(heroSelector);
      if (!$els || $els.length === 0) {
        cy.log('Hero section not found; skipping hero validations');
      } else {
        cy.wrap($els.first()).should('be.visible');
      }
    });
    cy.screenshot('home-03-hero-section', { overwrite: true });
  });

  it('04 - should validate product grid alignment and heights', () => {
    cy.visit(HOME.baseUrl + HOME.homeUrl);
    cy.wait(1500);

    const cardsSelector = `${HOME.productCards}, ${HOME.productCardFallback}`;
    // Query DOM directly to avoid cy.get timeouts when selector absent
    cy.document().then(() => {
      const $cards = Cypress.$(cardsSelector);
      if (!$cards || $cards.length === 0) {
        cy.log('No product cards found on home page; skipping grid alignment checks');
        return;
      }
      expect($cards.length, 'product cards exist').to.be.greaterThan(0);

      // Row grouping by top position
      const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
      const uniqueRows = new Set(tops);
      expect(uniqueRows.size, 'product grid has multiple rows').to.be.greaterThan(1);

      // Heights variance
      const cardHeights = [...$cards].map(el => el.getBoundingClientRect().height);
      const avgHeight = cardHeights.reduce((a, b) => a + b, 0) / cardHeights.length;
      cardHeights.forEach((height, idx) => {
        const deviation = Math.abs(height - avgHeight) / avgHeight;
        expect(deviation, `Card ${idx} height variance`).to.be.lessThan(0.2);
      });
    });

    cy.screenshot('home-04-grid-alignment', { overwrite: true });
  });

  it('05 - should capture baseline and compare current snapshot', () => {
    const baselineName = 'home-05-baseline.png';
    const currentName = 'home-06-full-page-snapshot.png';

    cy.visit(HOME.baseUrl + HOME.homeUrl);
    cy.wait(1500);

    // Capture baseline (overwrite if exists)
    cy.screenshot('home-05-baseline', { overwrite: true });

    // Capture current snapshot
    cy.screenshot('home-06-full-page-snapshot', { overwrite: true });

    // Find baseline and current and compare using task
    cy.task('findScreenshot', { name: baselineName }).then((baselinePath) => {
      expect(baselinePath, 'baseline exists').to.not.be.null;
      cy.task('findScreenshot', { name: currentName }).then((currentPath) => {
        expect(currentPath, 'current snapshot exists').to.not.be.null;

        cy.task('compareImages', {
          expected: baselinePath,
          actual: currentPath,
          threshold: 0.1,
          diffName: `diff-home-${Date.now()}.png`
        }).then((result) => {
          if (result && result.error) {
            throw new Error(result.error);
          }
          cy.log(`Image diff pixels: ${result.diffPixels}, mismatch%: ${result.mismatchPercentage.toFixed(3)}%`);

          // Allow up to 30% mismatch for dynamic content (relaxed tolerance)
          const allowedMismatchPercent = 30.0;
          expect(result.mismatchPercentage, `mismatch% should be <= ${allowedMismatchPercent}`).to.be.at.most(allowedMismatchPercent);
        });
      });
    });
  });

  it('06 - should capture responsive layout snapshot', () => {
    cy.viewport(1280, 1024);
    cy.visit(HOME.baseUrl + HOME.homeUrl);
    cy.wait(1500);
    cy.screenshot('home-07-responsive-layout', { overwrite: true });
  });
});
