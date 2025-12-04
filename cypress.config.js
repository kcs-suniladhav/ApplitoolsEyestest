const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
let createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
createEsbuildPlugin = createEsbuildPlugin && createEsbuildPlugin.default ? createEsbuildPlugin.default : createEsbuildPlugin;

// Alias plugin to map Node built-ins to browser polyfills for esbuild
let esbuildAlias;
try {
  esbuildAlias = require('esbuild-plugin-alias');
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('esbuild alias plugin not available; Node built-ins may fail to bundle.');
}

// Provide a mapping for common Node built-ins used by Applitools packages
const aliasMap = {
  stream: require.resolve('stream-browserify')
};

// Load Applitools Eyes plugin - MUST be done at config time
let appliToolsPlugin;
try {
  // This patches Cypress to provide cy.eyesOpen, cy.eyesCheckWindow, cy.eyesClose, etc.
  appliToolsPlugin = require('@applitools/eyes-cypress');
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('⚠ Applitools Eyes plugin not installed. Install @applitools/eyes-cypress to enable visual testing.');
  console.warn('Command: npm install @applitools/eyes-cypress');
}

async function setupNodeEvents(on, config) {
  // Cucumber preprocessor
  try {
    await preprocessor.addCucumberPreprocessorPlugin(on, config);
  } catch (err) {
    // surface errors during plugin init
    // eslint-disable-next-line no-console
    console.error('Error installing cucumber preprocessor plugin', err && err.stack ? err.stack : err);
    throw err;
  }
  
  // esbuild bundler
  const bundlerPlugins = [createEsbuildPlugin()];
  if (esbuildAlias) {
    bundlerPlugins.push(esbuildAlias(aliasMap));
  }
  const bundler = createBundler({ plugins: bundlerPlugins });
  on('file:preprocessor', bundler);

  // Image comparison task
  const { compareImages } = require('./cypress/tasks/compareImages');
  on('task', {
    compareImages: (args) => compareImages(args),
    fileExists: ({ path: p }) => {
      const fs = require('fs-extra');
      const path = require('path');
      const full = path.isAbsolute(p) ? p : path.join(process.cwd(), p);
      return fs.pathExists(full).then(exists => exists);
    }
    ,
    findScreenshot: ({ name }) => {
      const fg = require('fast-glob');
      const path = require('path');
      const cwd = process.cwd();
      const pattern = `cypress/screenshots/**/${name}`;
      return fg(pattern, { cwd }).then(matches => (matches && matches.length ? path.join(cwd, matches[0]) : null));
    }
  });
  
  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://stage7.visualcomfort.com',
    viewportWidth: 1280,
    viewportHeight: 1024,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    // Run only .cy.js tests (feature files excluded for Cypress + Applitools framework)
    specPattern: ['cypress/e2e/**/*.cy.js'],
    setupNodeEvents,
    // Initialize Applitools plugin at module level
    setupFilesAfterEnv: [],
  },
});

// Initialize Applitools plugin if available
if (appliToolsPlugin) {
  appliToolsPlugin(module);
}
