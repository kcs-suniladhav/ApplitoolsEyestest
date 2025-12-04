# Dependencies Quick Reference

Fast lookup guide for all project dependencies, what they do, and when to use them.

---

## 📦 Dependency Overview

**Total Dependencies:** 26 packages  
**Production Dependencies:** 0  
**Dev Dependencies:** 26  
**Total Size:** ~400MB (with node_modules)  

---

## Core Testing Dependencies

### Cypress (^13.6.0)
- **What:** Test automation framework & runner
- **Used for:** Launching browser, running tests, capturing screenshots
- **Commands:** `cy.visit()`, `cy.get()`, `cy.screenshot()`, `cy.task()`
- **Status:** CRITICAL - Required
- **Install:** `npm install --save-dev cypress`
- **Verify:** `npx cypress verify`
- **Docs:** https://docs.cypress.io

**Key Config:**
```javascript
// cypress.config.js
e2e: {
  baseUrl: 'https://stage7.visualcomfort.com',
  specPattern: ['cypress/e2e/**/*.cy.js']
}
```

### @applitools/eyes-cypress (Latest)
- **What:** Applitools Eyes visual regression plugin
- **Used for:** Dashboard uploads, visual checkpoints (optional)
- **Commands:** `cy.eyesOpen()`, `cy.eyesCheckWindow()`, `cy.eyesClose()`
- **Status:** OPTIONAL - Works without it
- **Install:** `npm install --save-dev @applitools/eyes-cypress`
- **Setup:** Set `APPLITOOLS_API_KEY` environment variable
- **Docs:** https://applitools.com/docs/topics/sdk/cypress-sdk

**When to Enable:**
```javascript
// Enable when API key is set
cy.eyesOpen({ appName: 'Visual Comfort' });
cy.eyesCheckWindow('Screenshot');
cy.eyesClose();
```

---

## Visual Comparison Dependencies

### pixelmatch (^5.3.0)
- **What:** Pixel-level image comparison library
- **Used for:** Comparing current vs. baseline screenshots
- **How:** Analyzes each pixel, calculates mismatch percentage
- **Status:** CRITICAL for local comparison
- **Install:** `npm install --save-dev pixelmatch`
- **Used in:** `cypress/tasks/compareImages.js`

**Output Example:**
```javascript
{
  diffPixels: 5420,
  mismatchPercentage: 3.25,
  diffPath: 'cypress/snapshots/diff-*.png'
}
```

### pngjs (^7.0.0)
- **What:** PNG image parsing library
- **Used for:** Reading PNG files into pixel data
- **Dependency of:** pixelmatch
- **Status:** CRITICAL
- **Install:** `npm install --save-dev pngjs`

**Workflow:**
```
Screenshot (PNG file)
      ↓
pngjs.parse() → Pixel data
      ↓
pixelmatch() → Compare pixels
      ↓
Diff image (PNG)
```

---

## Preprocessor & Bundler Dependencies

### @badeball/cypress-cucumber-preprocessor (^21.0.0)
- **What:** Cucumber/BDD preprocessor for Cypress
- **Used for:** `.feature` file support (currently excluded)
- **Status:** INSTALLED but not used in test runner
- **Install:** `npm install --save-dev @badeball/cypress-cucumber-preprocessor`
- **How it works:** Maps Gherkin steps to JavaScript functions
- **Config:** Registered in `cypress.config.js`

**Feature File Example:**
```gherkin
Scenario: Load page
  Given the user navigates to home page
  When the page is fully loaded
  Then a screenshot should be taken
```

**Step Definition:**
```javascript
Given('the user navigates to home page', () => {
  cy.visit('/');
});
```

### @bahmutov/cypress-esbuild-preprocessor (^2.2.0)
- **What:** esbuild-based Cypress file preprocessor
- **Used for:** Bundling test code with polyfills
- **Status:** CRITICAL
- **Install:** `npm install --save-dev @bahmutov/cypress-esbuild-preprocessor`
- **Key feature:** Applies esbuild plugins (polyfills, aliases)
- **Config:** `setupNodeEvents()` in `cypress.config.js`

**Why Needed:**
- Bundles `.cy.js` test files
- Applies polyfills for Node built-ins
- Handles ESM/CommonJS transpilation
- Enables plugin system

### esbuild (^0.27.0)
- **What:** Fast JavaScript bundler
- **Used for:** Bundling test code, development watch mode
- **Status:** CRITICAL
- **Install:** `npm install --save-dev esbuild`
- **Uses:** `esbuild.context()` + `ctx.watch()` for incremental builds

**Scripts Using esbuild:**
```bash
npm run watch:esbuild     # CommonJS watcher
npm run watch:esbuild:esm # ESM watcher
```

### esbuild-plugin-alias (*)
- **What:** Path aliasing plugin for esbuild
- **Used for:** Mapping Node built-ins to polyfills
- **Status:** RECOMMENDED
- **Install:** `npm install --save-dev esbuild-plugin-alias`

**Config Example:**
```javascript
const aliasMap = {
  stream: require.resolve('stream-browserify')
};
// Redirects Node's stream → browser polyfill
```

### stream-browserify (^3.0.0)
- **What:** Browser polyfill for Node's `stream` module
- **Used for:** Enabling `stream` in browser context
- **Why:** Applitools & other packages need it
- **Status:** RECOMMENDED
- **Install:** `npm install --save-dev stream-browserify`

**When Used:**
- esbuild encounters `require('stream')`
- Alias redirects to `stream-browserify`
- Browser can now use stream API

---

## File Operation Dependencies

### fs-extra (^11.1.1)
- **What:** Enhanced file system operations
- **Used for:** Reading/writing files, copying, checking existence
- **Commands:** `fs.readFile()`, `fs.writeFile()`, `fs.copy()`, `fs.ensureDir()`
- **Status:** RECOMMENDED
- **Install:** `npm install --save-dev fs-extra`
- **Used in:** Cypress tasks, baseline management

**Usage Example:**
```javascript
const fs = require('fs-extra');
fs.copy('screenshot.png', 'baseline.png');
fs.ensureDir('cypress/screenshots');
```

### fast-glob (^3.2.12)
- **What:** Fast file globbing (pattern matching)
- **Used for:** Finding files matching patterns
- **Status:** RECOMMENDED
- **Install:** `npm install --save-dev fast-glob`
- **Used in:** Cypress `findScreenshot` task

**Usage Example:**
```javascript
const fg = require('fast-glob');
const files = fg.sync('cypress/screenshots/**/*.png');
// Returns: ['cypress/screenshots/test1.png', ...]
```

---

## Utility Dependencies

### axios (^1.13.2)
- **What:** HTTP client for API requests
- **Used for:** Making API calls, downloading files
- **Status:** OPTIONAL - Not used in current tests
- **Install:** `npm install --save-dev axios`
- **Available for:** Future API integration tests

**Usage Example:**
```javascript
const axios = require('axios');
const response = await axios.get('https://api.example.com/data');
```

### cheerio (1.0.0-rc.12)
- **What:** jQuery-like DOM parser for Node.js
- **Used for:** Parsing HTML/XML, querying DOM
- **Status:** OPTIONAL - Not used in current tests
- **Install:** `npm install --save-dev cheerio`
- **Available for:** Headless DOM testing

**Usage Example:**
```javascript
const cheerio = require('cheerio');
const $ = cheerio.load('<h1>Test</h1>');
console.log($('h1').text()); // 'Test'
```

### dotenv (^16.3.1)
- **What:** Environment variable loader
- **Used for:** Loading `.env` file into `process.env`
- **Status:** OPTIONAL - For local development
- **Install:** `npm install --save-dev dotenv`

**Usage:**
1. Create `.env` file:
   ```
   APPLITOOLS_API_KEY=your_key_here
   ```
2. Load in code:
   ```javascript
   require('dotenv').config();
   ```

---

## Compatibility & Support Dependencies

### undici (5.28.4)
- **What:** HTTP client (fetch implementation)
- **Used for:** Modern fetch API, HTTP requests
- **Status:** RECOMMENDED
- **Included in:** Node 16.13+
- **Why included:** Explicit version control for consistency

### which (4.0.0)
- **What:** Locate executable in PATH
- **Used for:** Finding system programs (node, npm, etc.)
- **Status:** OPTIONAL
- **Install:** `npm install --save-dev which`

### hosted-git-info (7.0.1)
- **What:** Parse git hosting service information
- **Used for:** Package metadata parsing
- **Status:** OPTIONAL
- **Included by:** npm dependencies

### normalize-package-data (6.0.1)
- **What:** Normalize package.json data
- **Used for:** Package validation
- **Status:** OPTIONAL
- **Included by:** npm dependencies

### @applitools/eyes-webdriverio (^5.59.16)
- **What:** Applitools Eyes for WebdriverIO
- **Status:** DEPENDENCY of eyes-cypress
- **Included in:** @applitools/eyes-cypress package

---

## Installation Scenarios

### Minimal Installation (JS tests only)

```bash
# Core only
npm install --save-dev \
  cypress \
  pixelmatch \
  pngjs \
  @bahmutov/cypress-esbuild-preprocessor \
  esbuild \
  fs-extra \
  fast-glob
```

**Result:** Cypress + local image comparison (no Applitools)

### Full Installation (Current)

```bash
npm install
# Includes all 26 packages
```

**Result:** Cypress + Applitools + all utilities

### Adding to Existing Project

```bash
# Add Cypress
npm install --save-dev cypress

# Add visual testing
npm install --save-dev pixelmatch pngjs

# Add Applitools (optional)
npm install --save-dev @applitools/eyes-cypress

# Add utilities
npm install --save-dev fs-extra fast-glob dotenv
```

---

## Version Compatibility Matrix

### Node.js Compatibility

| Dependency | Node 20.14.0 | Node 24.11.1 | Notes |
|------------|--------------|--------------|-------|
| Cypress | ✅ | ✅ | Works on both |
| @applitools/eyes-cypress | ✅ | ✅ | No issues |
| pixelmatch | ✅ | ✅ | Pure JS |
| esbuild | ✅ | ✅ | Better on newer |
| @badeball/cypress-cucumber-preprocessor | ⚠️ | ✅ | Works better on v24 |

**Legend:**
- ✅ Full support
- ⚠️ Works but with issues
- ❌ Not supported

### Cypress Compatibility

| Dependency | Cypress 13.6.0 | Cypress 12 | Cypress 11 |
|------------|-----------------|------------|------------|
| @bahmutov/cypress-esbuild-preprocessor | ✅ | ✅ | ✅ |
| @badeball/cypress-cucumber-preprocessor | ✅ | ✅ | ❌ |

---

## Common Issues & Solutions

### Issue: "pixelmatch is not a function"

**Cause:** pixelmatch imported incorrectly  
**Fix:**
```javascript
// Correct
const pixelmatch = require('pixelmatch');
const Jimp = require('pngjs').PNG;

// Wrong
const { pixelmatch } = require('pixelmatch');
```

### Issue: "Cannot find module 'stream'"

**Cause:** stream polyfill not available  
**Fix:**
```bash
npm install --save-dev stream-browserify esbuild-plugin-alias
```

### Issue: "esbuild plugin error"

**Cause:** esbuild version mismatch  
**Fix:**
```bash
npm install --save-dev @bahmutov/cypress-esbuild-preprocessor@2.2.0
```

### Issue: "npm audit warns of vulnerabilities"

**Status:** Expected - 6 vulnerabilities (2 low, 4 moderate)  
**Safety:** All in dev dependencies, non-critical  
**Fix if needed:**
```bash
npm audit fix --force  # May break compatibility
```

---

## Upgrade Guide

### Update Single Package

```bash
npm install --save-dev cypress@latest
npm install --save-dev pixelmatch@latest
```

### Update All Packages

```bash
npm update
```

### Update with Latest Major Version

```bash
# Cypress
npm install --save-dev cypress@latest

# Applitools
npm install --save-dev @applitools/eyes-cypress@latest
```

### Clean Installation

```bash
rm -r node_modules package-lock.json
npm install
```

---

## Dependency Visualization

```
cypress-applitools-visual-testing
│
├─ Testing Framework
│  └─ cypress (^13.6.0)
│
├─ Visual Regression (Optional)
│  └─ @applitools/eyes-cypress
│     └─ @applitools/eyes-webdriverio
│
├─ Image Comparison (Local)
│  ├─ pixelmatch (^5.3.0)
│  └─ pngjs (^7.0.0)
│
├─ Preprocessors & Bundling (CRITICAL)
│  ├─ @badeball/cypress-cucumber-preprocessor (^21.0.0)
│  ├─ @bahmutov/cypress-esbuild-preprocessor (^2.2.0)
│  ├─ esbuild (^0.27.0)
│  ├─ esbuild-plugin-alias (*)
│  └─ stream-browserify (^3.0.0)
│
├─ File Operations
│  ├─ fs-extra (^11.1.1)
│  └─ fast-glob (^3.2.12)
│
├─ Utilities (Optional)
│  ├─ axios (^1.13.2)
│  ├─ cheerio (1.0.0-rc.12)
│  └─ dotenv (^16.3.1)
│
└─ Compatibility Support
   ├─ undici (5.28.4)
   ├─ which (4.0.0)
   ├─ hosted-git-info (7.0.1)
   └─ normalize-package-data (6.0.1)
```

---

## Performance Optimization

### Reduce npm install Time

```bash
# Use --legacy-peer-deps (faster)
npm install --legacy-peer-deps

# Use --prefer-offline (uses cache)
npm install --prefer-offline
```

### Reduce node_modules Size

```bash
# Remove optional dependencies
npm install --no-optional

# Remove dev dependencies for production
npm install --production
# (Not applicable for this project - all are dev)
```

### Optimize esbuild Watch

Edit `scripts/esbuild-watch.js`:
```javascript
const ctx = await esbuild.context({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  minify: false,        // No minify for speed
  sourcemap: 'inline',  // For debugging
});
```

---

## Security Considerations

### Audit Vulnerabilities

```bash
npm audit
```

### Check Specific Package

```bash
npm audit @applitools/eyes-cypress
```

### Update Vulnerable Packages

```bash
npm audit fix
```

### Security Best Practices

- ✅ Keep node_modules in `.gitignore`
- ✅ Don't commit `package-lock.json` unless intentional
- ✅ Regularly run `npm audit`
- ✅ Use exact versions for critical deps
- ✅ Review security advisories

---

## Troubleshooting Installation

### "npm ERR! code ERESOLVE"

**Cause:** Dependency conflict  
**Solutions:**
```bash
# Use --legacy-peer-deps
npm install --legacy-peer-deps

# Or remove conflicts manually
npm rm conflicting-package
npm install
```

### "Module not found"

**Cause:** Incomplete installation  
**Solution:**
```bash
npm install
npx cypress verify
```

### "Permission denied"

**Cause:** File permissions  
**Solution:**
```bash
# Windows: Run as Administrator
# macOS/Linux: Use sudo (not recommended)
sudo npm install
```

### "Cypress cache corrupted"

**Solution:**
```bash
npx cypress cache clear
npm install --force cypress
```

---

## Quick Reference Table

| Package | Version | Type | Required | Used For |
|---------|---------|------|----------|----------|
| cypress | ^13.6.0 | Test | YES | Test runner |
| @applitools/eyes-cypress | Latest | Test | NO | Dashboard |
| pixelmatch | ^5.3.0 | Compare | YES | Pixel comparison |
| pngjs | ^7.0.0 | Image | YES | PNG parsing |
| @badeball/cypress-cucumber | ^21.0.0 | Preprocess | NO | Feature files |
| @bahmutov/cypress-esbuild | ^2.2.0 | Bundle | YES | Code bundling |
| esbuild | ^0.27.0 | Bundle | YES | Bundler |
| esbuild-plugin-alias | * | Plugin | YES | Path aliases |
| stream-browserify | ^3.0.0 | Polyfill | YES | Stream API |
| fs-extra | ^11.1.1 | FS | YES | File ops |
| fast-glob | ^3.2.12 | Glob | YES | File matching |
| axios | ^1.13.2 | HTTP | NO | API calls |
| cheerio | 1.0.0-rc.12 | Parser | NO | DOM parsing |
| dotenv | ^16.3.1 | Config | NO | Env vars |

---

## Summary

- **Total Packages:** 26 dev dependencies
- **Critical (must have):** 9 packages
- **Optional (nice to have):** 6 packages
- **Auto-included (transitive):** 11 packages
- **Total Size:** ~400MB (including node_modules)

**Ready to install & use!** 🚀

---

*Last Updated: December 4, 2025*
