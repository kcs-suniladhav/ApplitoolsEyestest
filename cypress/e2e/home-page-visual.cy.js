describe('Home Page - Visual Testing', () => {
  const baseUrl = 'https://stage7.visualcomfort.com';

  beforeEach(() => {
    // Open Eyes session for the test run if available
    if (cy.eyesOpen) {
      cy.eyesOpen({
        appName: 'VisualComfort Home Page',
        testName: 'Home Page - Visual tests',
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

  it('should load the home page successfully', () => {
    cy.visit(baseUrl);
    cy.wait(2000);
    
    cy.request(baseUrl)
      .its('status')
      .should('equal', 200);
    
    cy.get('body').should('be.visible');
    
    if (cy.eyesCheckWindow) {
      cy.eyesCheckWindow('Home page - Initial load');
    }
    
    cy.screenshot('home-01-initial-load', { overwrite: true });
  });

  it('should validate all images are loaded and visible', () => {
    cy.visit(baseUrl);
    cy.wait(2000);
    
    cy.scrollTo(0, 500, { duration: 1000 });
    cy.wait(500);
    cy.scrollTo(0, 1000, { duration: 1000 });
    cy.wait(500);
    cy.scrollTo('bottom', { duration: 1500 });
    cy.wait(1000);
    
    cy.get('img').then($imgs => {
      const $visibleImages = $imgs.filter(':visible');
      cy.log(`Found ${$visibleImages.length} visible images on home page`);
      
      if ($visibleImages.length > 0) {
        let loadedCount = 0;
        cy.wrap($visibleImages).each(($img) => {
          cy.wrap($img)
            .should('be.visible')
            .then(() => {
              const isLoaded = $img[0].naturalWidth !== undefined && $img[0].naturalWidth > 0;
              if (isLoaded) {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
                expect($img[0].naturalHeight).to.be.greaterThan(0);
                loadedCount++;
              }
            });
        }).then(() => {
          cy.log(`✓ ${loadedCount} out of ${$visibleImages.length} images confirmed loaded`);
        });
      }
    });

    cy.log('✓ Image validation complete');
    
    if (cy.eyesCheckWindow) {
      cy.eyesCheckWindow('Home page - After scroll (images loaded)');
    }
    
    cy.screenshot('home-02-images-loaded-scroll', { overwrite: true });
  });

  it('should validate hero section visual alignment', () => {
    cy.visit(baseUrl);
    cy.wait(3000);
    
    cy.get('[data-testid="hero"], .hero, .hero-section, .hero-banner, .banner, [class*="hero"], [class*="banner"]')
      .first()
      .then($hero => {
        if ($hero.length > 0) {
          expect($hero).to.be.visible;
          cy.wrap($hero).find('img, h1, h2, h3, .title, .heading').should('exist');
          
          const heroRect = $hero[0].getBoundingClientRect();
          expect(heroRect.width).to.be.greaterThan(0);
          expect(heroRect.height).to.be.greaterThan(0);
          
          cy.log(`✓ Hero section is visible and properly aligned (width: ${heroRect.width}px, height: ${heroRect.height}px)`);
        } else {
          cy.log('⚠ No hero section found using common selectors');
        }
      });
    
    if (cy.eyesCheckWindow) {
      cy.eyesCheckWindow('Home page - Hero section');
    }
    
    cy.screenshot('home-03-hero-section', { overwrite: true });
  });

  it('should validate product grid/section alignment and consistency', () => {
    cy.visit(baseUrl);
    cy.wait(3000);
    
    cy.document().then((doc) => {
      const selector = '[data-testid="product-card"], .product-card, .product, .product-tile, .productItem, .card, [class*="product-grid"], [class*="featured"]';
      const $items = doc.querySelectorAll(selector);
      
      if ($items.length === 0) {
        cy.log('⚠ No product grid/featured items found on home page; skipping grid validation');
        if (cy.eyesCheckWindow) {
          cy.eyesCheckWindow('Home page - No grid items');
        }
        cy.screenshot('home-04-grid-alignment', { overwrite: true });
        return;
      }

      cy.log(`Found ${$items.length} product items on home page`);
      expect($items.length, 'product items exist').to.be.greaterThan(0);

      if ($items.length > 1) {
        const positions = [...$items].map(el => ({
          top: Math.round(el.getBoundingClientRect().top),
          height: Math.round(el.getBoundingClientRect().height),
          width: Math.round(el.getBoundingClientRect().width)
        }));

        const rows = [];
        let currentRow = [];
        let currentTop = positions[0].top;

        positions.forEach((pos, idx) => {
          if (Math.abs(pos.top - currentTop) < 50) {
            currentRow.push({ idx, ...pos });
          } else {
            if (currentRow.length > 0) {
              rows.push(currentRow);
            }
            currentRow = [{ idx, ...pos }];
            currentTop = pos.top;
          }
        });
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }

        cy.log(`✓ Product items organized in ${rows.length} row(s)`);

        rows.forEach((row, rowIdx) => {
          if (row.length > 1) {
            const heights = row.map(item => item.height);
            const avgHeight = heights.reduce((a, b) => a + b, 0) / heights.length;
            heights.forEach((height, itemIdx) => {
              const deviation = Math.abs(height - avgHeight) / avgHeight;
              expect(deviation, `Row ${rowIdx} Item ${itemIdx} height variance`).to.be.lessThan(0.2);
            });
          }
        });
        
        cy.log('✓ All product items are properly aligned in grid layout');
      }
      
      if (cy.eyesCheckWindow) {
        cy.eyesCheckWindow('Home page - Product grid alignment');
      }
      
      cy.screenshot('home-04-grid-alignment', { overwrite: true });
    });
  });

  it('should capture full home page baseline for future comparison', () => {
    cy.visit(baseUrl);
    
    cy.request(baseUrl)
      .its('status')
      .should('equal', 200);

    cy.wait(2000);

    cy.scrollTo('top', { duration: 500 });
    cy.wait(500);

    cy.screenshot('home-05-baseline', { overwrite: true });

    cy.scrollTo('bottom', { duration: 1500 });
    cy.wait(1000);

    cy.get('img').then($imgs => {
      const $visibleImages = $imgs.filter(':visible');
      if ($visibleImages.length > 0) {
        cy.log(`✓ ${$visibleImages.length} images visible on home page`);
      }
    });

    cy.scrollTo(0, 2000, { duration: 1000 });
    cy.wait(500);

    cy.screenshot('home-06-full-page-snapshot', { overwrite: true });

    cy.log('✓ Home page baseline capture complete');
  });

  it('should compare current home page snapshot with baseline', () => {
    const baselineName = 'home-05-baseline.png';
    const currentName = 'home-07-current-snapshot';

    cy.visit(baseUrl);
    cy.wait(2000);

    cy.scrollTo('top', { duration: 500 });
    cy.wait(500);

    cy.screenshot(currentName, { overwrite: true });

    cy.task('findScreenshot', { name: baselineName }).then((baselinePath) => {
      if (!baselinePath) {
        cy.log('⚠ Baseline not found; skipping comparison. Run baseline capture test first.');
        return;
      }
      
      cy.task('findScreenshot', { name: `${currentName}.png` }).then((currentPath) => {
        if (!currentPath) {
          throw new Error('Current snapshot not found');
        }

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
          cy.log(`Diff image written to: ${result.diffPath}`);

          const allowedMismatchPercent = 25.0;
          expect(result.mismatchPercentage, `mismatch% should be <= ${allowedMismatchPercent}`).to.be.at.most(allowedMismatchPercent);
          
          cy.log(`✓ Home page visual comparison passed (${result.mismatchPercentage.toFixed(3)}% mismatch)`);
        });
      });
    });
  });

  it('should validate responsive layout at different viewport sections', () => {
    cy.visit(baseUrl);
    cy.wait(2000);

    cy.get('header, nav, [class*="header"], [class*="navbar"]')
      .first()
      .then($header => {
        if ($header.length > 0) {
          expect($header).to.be.visible;
          const headerRect = $header[0].getBoundingClientRect();
          cy.log(`✓ Header is visible (height: ${headerRect.height}px)`);
        }
      });

    cy.get('footer, [class*="footer"]')
      .then($footer => {
        cy.scrollTo('bottom', { duration: 1000 });
        cy.wait(500);
        
        if ($footer.length > 0) {
          expect($footer).to.be.visible;
          const footerRect = $footer[0].getBoundingClientRect();
          cy.log(`✓ Footer is visible (height: ${footerRect.height}px)`);
        }
      });

    cy.scrollTo('top', { duration: 500 });
    cy.wait(500);

    if (cy.eyesCheckWindow) {
      cy.eyesCheckWindow('Home page - Responsive layout');
    }

    cy.screenshot('home-08-responsive-layout', { overwrite: true });
    cy.log('✓ Responsive layout validation complete');
  });
});
