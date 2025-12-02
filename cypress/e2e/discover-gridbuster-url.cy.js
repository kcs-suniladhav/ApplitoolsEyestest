describe('Gridbuster URL Discovery', () => {
  const baseUrl = 'https://stage7.visualcomfort.com';

  it('should find the Gridbuster designer page URL', () => {
    // Try to find the Gridbuster page by visiting the designers section
    const possibleUrls = [
      '/us/c/our-designers/gridbuster',
      '/us/c/our-designers/GridBuster',
      '/us/c/our-designers/grid-buster',
      '/us/c/brands/gridbuster',
      '/us/c/gridbuster-designer',
    ];

    let foundUrl = null;

    cy.visit(baseUrl + '/us/c/our-designers', { failOnStatusCode: false }).then(() => {
      cy.log('Designers page loaded - check browser console for links');
      // Log all designer links found
      cy.get('a[href*="designer"], a[href*="our-designer"]', { timeout: 5000 }).then(($links) => {
        const links = $links.map((_, el) => el.getAttribute('href')).get();
        cy.log(`Found ${links.length} designer links`);
        links.forEach(link => cy.log(link));
        
        // Try to find Gridbuster in the links
        const gridBusterLink = links.find(link => link && link.toLowerCase().includes('grid'));
        if (gridBusterLink) {
          cy.log(`✓ Found Gridbuster link: ${gridBusterLink}`);
          foundUrl = gridBusterLink;
        }
      });
    });
  });
});
