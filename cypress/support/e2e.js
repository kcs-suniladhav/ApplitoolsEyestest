// *** Global configuration and behavior ***

// Disable fetch/XHR logging in Cypress console
const app = window.top;

if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');

  app.document.head.appendChild(style);
}

// Applitools Eyes commands for visual testing
// Provides cy.eyesOpen, cy.eyesCheckWindow, cy.eyesClose, etc.
try {
  require('@applitools/eyes-cypress/commands');
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('Applitools Eyes commands not available. Install @applitools/eyes-cypress to enable.');
}

