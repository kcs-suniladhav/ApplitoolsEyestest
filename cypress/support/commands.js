/* global cy */

// Import Applitools Eyes commands
import '@applitools/eyes-cypress';

// Create custom commands for visual testing
Cypress.Commands.add('visualSnapshot', (snapshotName) => {
  cy.eyesCheckWindow({
    tag: snapshotName,
    target: 'window',
    fully: true
  });
});

Cypress.Commands.add('initializeVisualTest', (appName, testName) => {
  cy.eyesOpen({
    appName: appName,
    testName: testName
  });
});

Cypress.Commands.add('finalizeVisualTest', () => {
  cy.eyesClose();
});
