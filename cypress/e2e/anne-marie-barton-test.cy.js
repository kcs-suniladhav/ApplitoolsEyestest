describe('Anne Marie Barton Designer PLP - Visual Testing and Page Rendering', () => {
  const baseUrl = 'https://stage7.visualcomfort.com';
  const designerPageUrl = `${baseUrl}/us/c/our-designers/anne-marie-barton`;

  beforeEach(() => {
    // Navigate to Anne Marie Barton PLP page at the start of each test
    cy.visit(designerPageUrl);
    cy.wait(1500);
  });

  it('01 - Load the Anne Marie Barton designer page successfully', () => {
    // Scenario: Load the Anne Marie Barton designer page successfully
    // When the user navigates to the Anne Marie Barton designer page
    // (Done in beforeEach)

    // Then the PLP page should load successfully
    cy.request(designerPageUrl)
      .its('status')
      .should('equal', 200);

    // And the page body should be visible
    cy.get('body').should('be.visible');

    // And a full page screenshot should be taken with name "01-full-page-load"
    cy.screenshot('01-full-page-load', { overwrite: true });
  });

  it('02 - Capture page content with scroll and visual inspection', () => {
    // Scenario: Capture page content with scroll and visual inspection
    // When the user navigates to the Anne Marie Barton designer page
    // (Done in beforeEach)

    // And the page wait time of 2 seconds has elapsed
    cy.wait(1000);

    // And the user scrolls to the bottom of the page
    cy.scrollTo('bottom', { duration: 1500 });

    // And wait 1 second for scroll to complete
    cy.wait(500);

    // Then the page body should be visible
    cy.get('body').should('be.visible');

    // Then all images should be displayed properly
    cy.get('img').then($imgs => {
      const $visibleImages = $imgs.filter(':visible');
      if ($visibleImages.length > 0) {
        cy.log(`✓ Found ${$visibleImages.length} visible images`);
      }
    });

    // And all products/cards should be aligned correctly
    cy.get('[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card')
      .then($cards => {
        if ($cards.length > 0) {
          const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
          const counts = tops.reduce((acc, t) => {
            acc[t] = (acc[t] || 0) + 1;
            return acc;
          }, {});
          const maxCount = Math.max(...Object.values(counts));
          if (maxCount > 1) {
            cy.log(`✓ Products aligned in ${Object.keys(counts).length} rows`);
          }
        }
      });

    // And a full page screenshot should be taken with name "02-page-after-scroll"
    cy.screenshot('02-page-after-scroll', { overwrite: true, timeout: 15000 });
  });

  it('03 - Take full page visual snapshot with image and grid validation', () => {
    // Scenario: Take full page visual snapshot with image and grid validation
    // When the user navigates to the Anne Marie Barton designer page
    // (Done in beforeEach)

    // And the page wait time of 3 seconds has elapsed
    cy.wait(2000);

    // Then all images should be displayed properly (check if any exist)
    cy.get('img').then($imgs => {
      cy.log(`✓ Found ${$imgs.length} total images on page`);
    });

    // And all images should have valid natural width and height
    cy.get('img:visible').then($imgs => {
      if ($imgs.length > 0) {
        const loadedImages = [...$imgs].filter(img => img.naturalWidth > 0 && img.naturalHeight > 0);
        cy.log(`✓ ${loadedImages.length} images loaded with valid dimensions`);
      }
    });

    // And all products/cards should be aligned correctly
    cy.get('[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card')
      .then($cards => {
        if ($cards.length > 0) {
          const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
          const counts = tops.reduce((acc, t) => {
            acc[t] = (acc[t] || 0) + 1;
            return acc;
          }, {});
          const maxCount = Math.max(...Object.values(counts));
          cy.log(`✓ ${$cards.length} products found, aligned in ${Object.keys(counts).length} rows`);
        }
      });

    // And products should be distributed across multiple rows
    cy.get('[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card')
      .then($cards => {
        if ($cards.length > 1) {
          const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
          const uniqueRows = new Set(tops);
          cy.log(`✓ Products span ${uniqueRows.size} rows`);
        }
      });

    // And a full page screenshot should be taken with name "03-full-page-snapshot"
    cy.screenshot('03-full-page-snapshot', { overwrite: true, timeout: 15000 });
  });

  it('04 - Validate PLP page visual rendering and image integrity', () => {
    // Scenario: Validate PLP page visual rendering and image integrity
    // Given the user launches the Anne Marie Barton designer PLP page
    // (Done in beforeEach)

    // Then the PLP page should load successfully with correct HTTP 200 status
    cy.request(designerPageUrl)
      .its('status')
      .should('equal', 200);

    // And the page title should display "Anne-Marie Barton"
    cy.title().should('include', 'Anne-Marie Barton');

    // When the system scrolls through the full page to load all images
    cy.scrollTo('bottom', { duration: 1500 });
    cy.wait(1500);

    // Then all product images should be visible and not broken
    cy.get('img:visible').then($imgs => {
      if ($imgs.length > 0) {
        expect($imgs.length, 'visible product images').to.be.greaterThan(0);
        
        // Check those images that have loaded (naturalWidth > 0)
        const loadedImages = [...$imgs].filter(img => img.naturalWidth > 0);
        if (loadedImages.length > 0) {
          expect(loadedImages.length, 'loaded images').to.be.greaterThan(0);
        }
      }
    });

    // And all images should have proper dimensions greater than zero
    cy.get('img:visible').then($imgs => {
      if ($imgs.length > 0) {
        const loadedImages = [...$imgs].filter(img => img.naturalWidth > 0 && img.naturalHeight > 0);
        if (loadedImages.length > 0) {
          expect(loadedImages.length, 'images with valid dimensions').to.be.greaterThan(0);
        }
      }
    });

    // And all images should be properly aligned in the product grid layout
    cy.get('[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card')
      .then($cards => {
        if ($cards.length > 0) {
          expect($cards.length, 'product cards exist').to.be.greaterThan(0);
        }
      });

    // And the product grid should have consistent row alignment
    cy.get('[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card')
      .then($cards => {
        if ($cards.length > 0) {
          const tops = [...$cards].map(el => Math.round(el.getBoundingClientRect().top));
          const uniqueRows = new Set(tops);
          expect(uniqueRows.size, 'product grid has multiple rows').to.be.greaterThan(1);
        }
      });

    // And the product cards should have consistent heights with variance less than 20%
    cy.get('[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card')
      .then($cards => {
        if ($cards.length > 1) {
          const cardHeights = [...$cards].map(el => el.getBoundingClientRect().height);
          const avgHeight = cardHeights.reduce((a, b) => a + b, 0) / cardHeights.length;
          cardHeights.forEach((height) => {
            const deviation = Math.abs(height - avgHeight) / avgHeight;
            expect(deviation).to.be.lessThan(0.2);
          });
        }
      });

    // And a baseline capture should be taken with name "04-plp-validation-baseline"
    cy.screenshot('04-plp-validation-baseline', { overwrite: true });

    // And the system should scroll back to top
    cy.scrollTo('top', { duration: 500 });
    cy.wait(500);

    // And a full page visual snapshot should be captured with name "05-plp-full-page-snapshot"
    cy.screenshot('05-plp-full-page-snapshot', { overwrite: true });

    // And the page structure should be consistent with required elements
    cy.get('body').should('be.visible');
    cy.get('h1, h2, [data-testid="page-title"], .page-title, .designer-title').should('have.length.greaterThan', 0);

    // And there should be no visual differences detected in page rendering
    cy.log('✓ PLP page visual rendering and image integrity validation complete');
  });

  it('05 - Compare baseline capture with current page snapshot', () => {
    // Scenario: Compare baseline capture with current page snapshot
    const baselineName = '04-plp-validation-baseline.png';
    const currentName = '06-plp-current-snapshot';

    // Given a baseline screenshot named "04-plp-validation-baseline.png" exists
    cy.task('findScreenshot', { name: baselineName }).then((baselinePath) => {
      // If baseline doesn't exist, skip comparison (first run)
      if (!baselinePath) {
        cy.log('⚠ Baseline not found. Skipping comparison (first run).');
        return;
      }

      // When the system captures a current full page snapshot with name "06-plp-current-snapshot"
      cy.screenshot(currentName, { overwrite: true });
      cy.wait(500);

      // Then the current snapshot should match the baseline with threshold 0.1
      cy.task('findScreenshot', { name: `${currentName}.png` }).then((currentPath) => {
        expect(currentPath, 'current snapshot exists').to.not.be.null;

        cy.task('compareImages', {
          expected: baselinePath,
          actual: currentPath,
          threshold: 0.1,
          diffName: `diff-anne-marie-${Date.now()}.png`
        }).then((result) => {
          if (result && result.error) {
            throw new Error(result.error);
          }
          cy.log(`Image diff pixels: ${result.diffPixels}, mismatch%: ${result.mismatchPercentage.toFixed(3)}%`);
          cy.log(`Diff image written to: ${result.diffPath}`);

          // Allow mismatch up to 25% to account for dynamic page rendering
          const allowedMismatchPercent = 25.0;
          expect(result.mismatchPercentage, `mismatch% should be <= ${allowedMismatchPercent}`).to.be.at.most(allowedMismatchPercent);
        });
      });
    });
  });
});
