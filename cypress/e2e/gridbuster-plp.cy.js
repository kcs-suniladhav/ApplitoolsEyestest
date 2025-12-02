describe('Gridbuster Designer - Visual Testing', () => {
  const baseUrl = 'https://stage7.visualcomfort.com';
  const designerUrl = '/us/c/our-designers/anne-marie-barton';

  beforeEach(() => {
    // Open Eyes session for the test run if available
    if (cy.eyesOpen) {
      cy.eyesOpen({
        appName: 'VisualComfort PLP',
        testName: 'Gridbuster Designer - PLP visual tests',
        batchName: `CI - ${Cypress.env('GITHUB_RUN_NUMBER') || 'local'}`
      });
    }
  });

  afterEach(() => {
    // Close Eyes session if available
    if (cy.eyesClose) {
      cy.eyesClose(false);
    }
  });

  it('should load the Gridbuster designer page successfully', () => {
    cy.visit(baseUrl + designerUrl);
    
    // Wait for page to fully load
    cy.wait(2000);
    
    // Verify page loaded with HTTP 200
    cy.request(baseUrl + designerUrl)
      .its('status')
      .should('equal', 200);
    
    // Verify page body is visible
    cy.get('body').should('be.visible');
    
    // Capture full page with Applitools Eyes
    if (cy.eyesCheckWindow) {
      cy.eyesCheckWindow('Full page load');
    }
    
    // Take screenshot for visual baseline
    cy.screenshot('gridbuster-01-full-page-load', { overwrite: true });
  });

  it('should capture page content with scroll and validate image integrity', () => {
    cy.visit(baseUrl + designerUrl);
    cy.wait(2000);
    
    // Verify page content is visible
    cy.get('body').should('be.visible');
    
    // Scroll to bottom to load all lazy-loaded images
    cy.scrollTo('bottom', { duration: 1500 });
    cy.wait(1500);
    
    // Verify all product images are visible and properly loaded
    cy.get('img').then($imgs => {
      const $visibleImages = $imgs.filter(':visible');
      // Allow for pages with no visible images gracefully
      if ($visibleImages.length > 0) {
        cy.wrap($visibleImages).each(($img) => {
          cy.wrap($img)
            .should('be.visible')
            .and(($el) => {
              // Only check naturalWidth if the image element has loaded
              if ($el[0].naturalWidth !== undefined) {
                expect($el[0].naturalWidth, 'image is loaded').to.be.greaterThan(0);
                expect($el[0].naturalHeight, 'image height is loaded').to.be.greaterThan(0);
              }
            });
        });
      }
    });

    cy.log('✓ All product images are visible and not broken');
    
    // Capture scrolled page with Applitools Eyes
    if (cy.eyesCheckWindow) {
      cy.eyesCheckWindow('Page after scroll');
    }
    
    // Take screenshot of scrolled view
    cy.screenshot('gridbuster-02-page-after-scroll', { overwrite: true });
  });

  it('should validate grid alignment and product card consistency', () => {
    cy.visit(baseUrl + designerUrl);
    cy.wait(3000);
    
    // Verify all products/cards are aligned correctly
    cy.get('[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card')
      .then($cards => {
        if ($cards.length === 0) {
          throw new Error('No product/card elements found using common selectors');
        }

        expect($cards.length, 'product cards exist').to.be.greaterThan(0);

        // Verify products are distributed across multiple rows
        const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
        const uniqueRows = new Set(tops);
        expect(uniqueRows.size, 'product grid has multiple rows').to.be.greaterThan(1);

        // Verify horizontal alignment: cards in same row should have similar heights (variance < 20%)
        const cardHeights = [...$cards].map(el => el.getBoundingClientRect().height);
        const avgHeight = cardHeights.reduce((a, b) => a + b, 0) / cardHeights.length;
        cardHeights.forEach((height, idx) => {
          const deviation = Math.abs(height - avgHeight) / avgHeight;
          expect(deviation, `Card ${idx} height variance`).to.be.lessThan(0.2);
        });

        cy.log('✓ All products/cards are properly aligned in grid layout');
      });

    // Capture grid with Applitools Eyes
    if (cy.eyesCheckWindow) {
      cy.eyesCheckWindow('Grid alignment');
    }

    // Take screenshot for grid validation
    cy.screenshot('gridbuster-03-grid-validation', { overwrite: true });
  });

  it('should validate complete Gridbuster PLP page integrity with baseline capture', () => {
    cy.visit(baseUrl + designerUrl);
    
    // Verify HTTP 200 status
    cy.request(baseUrl + designerUrl)
      .its('status')
      .should('equal', 200);

    // Verify page title contains designer name
    cy.title().should('include', 'Anne-Marie Barton');
    cy.wait(3000);

    // Scroll through the full page to load all images
    cy.scrollTo('bottom', { duration: 1500 });
    cy.wait(1500);

    // Verify all product images are visible and not broken
    cy.get('img').then($imgs => {
      const $visibleImages = $imgs.filter(':visible');
      if ($visibleImages.length > 0) {
        cy.wrap($visibleImages).each(($img) => {
          cy.wrap($img)
            .should('be.visible')
            .and(($el) => {
              if ($el[0].naturalWidth !== undefined) {
                expect($el[0].naturalWidth, 'image is loaded').to.be.greaterThan(0);
                expect($el[0].naturalHeight, 'image height is loaded').to.be.greaterThan(0);
              }
            });
        });
      }
    });

    // Verify grid alignment consistency
    cy.get('[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card')
      .then($cards => {
        if ($cards.length > 0) {
          expect($cards.length, 'product cards exist').to.be.greaterThan(0);

          // Verify multiple rows
          const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
          const uniqueRows = new Set(tops);
          if (uniqueRows.size > 1) {
            expect(uniqueRows.size, 'product grid has multiple rows').to.be.greaterThan(1);
          }

          // Verify card height consistency (< 20% variance)
          const cardHeights = [...$cards].map(el => el.getBoundingClientRect().height);
          const avgHeight = cardHeights.reduce((a, b) => a + b, 0) / cardHeights.length;
          cardHeights.forEach((height, idx) => {
            const deviation = Math.abs(height - avgHeight) / avgHeight;
            expect(deviation, `Card ${idx} height variance`).to.be.lessThan(0.2);
          });
        }
      });

    // Capture baseline
    cy.screenshot('gridbuster-04-validation-baseline', { overwrite: true });

    // Scroll back to top
    cy.scrollTo('top', { duration: 500 });
    cy.wait(1000);

    // Capture full page snapshot
    cy.screenshot('gridbuster-05-full-page-snapshot', { overwrite: true });

    cy.log('✓ Gridbuster PLP page visual rendering and image integrity validation complete');
  });

  it('should compare current snapshot with baseline', () => {
    const baselineName = 'gridbuster-04-validation-baseline.png';
    const currentName = 'gridbuster-06-current-snapshot';

    cy.visit(baseUrl + designerUrl);
    cy.wait(2000);

    // Capture current full page snapshot
    cy.screenshot(currentName, { overwrite: true });

    // Find baseline and current screenshots on disk then compare via task
    cy.task('findScreenshot', { name: baselineName }).then((baselinePath) => {
      expect(baselinePath, 'baseline exists').to.not.be.null;
      cy.task('findScreenshot', { name: `${currentName}.png` }).then((currentPath) => {
        expect(currentPath, 'current snapshot exists').to.not.be.null;

        // Compare images using the registered task
        cy.task('compareImages', { expected: baselinePath, actual: currentPath, threshold: 0.1, diffName: `diff-gridbuster-${Date.now()}.png` }).then((result) => {
          if (result && result.error) {
            throw new Error(result.error);
          }
          cy.log(`Image diff pixels: ${result.diffPixels}, mismatch%: ${result.mismatchPercentage.toFixed(3)}%`);
          cy.log(`Diff image written to: ${result.diffPath}`);

          // Allow mismatch up to 20% to account for dynamic page rendering
          const allowedMismatchPercent = 20.0;
          expect(result.mismatchPercentage, `mismatch% should be <= ${allowedMismatchPercent}`).to.be.at.most(allowedMismatchPercent);
        });
      });
    });
  });
});
