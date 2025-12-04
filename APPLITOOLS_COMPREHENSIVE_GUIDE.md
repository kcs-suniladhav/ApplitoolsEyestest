# Applitools Comprehensive Guide

Complete documentation for the Cypress + Applitools Eyes visual testing framework.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites & Requirements](#prerequisites--requirements)
3. [System Architecture](#system-architecture)
4. [Applitools Integration](#applitools-integration)
5. [Dependencies & Package Management](#dependencies--package-management)
6. [Project Structure](#project-structure)
7. [Setup & Configuration](#setup--configuration)
8. [Running Tests](#running-tests)
9. [Test Suites](#test-suites)
10. [Visual Comparison Methods](#visual-comparison-methods)
11. [Important Considerations](#important-considerations)
12. [Troubleshooting](#troubleshooting)
13. [Best Practices](#best-practices)
14. [Quick Reference](#quick-reference)

---

## Project Overview

### What is This Project?

This project implements **automated visual testing** for the Visual Comfort website using:
- **Cypress** - Test automation framework
- **Applitools Eyes** - AI-powered visual regression testing (optional dashboard)
- **Pixel-level comparison** - Local image diff using pixelmatch library
- **BDD Framework** - Cucumber feature files (excluded from test runner, reference only)

### Key Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| **Cypress** | Test runner & automation | 13.6.0+ |
| **@applitools/eyes-cypress** | Visual regression (dashboard) | Latest |
| **pixelmatch** | Pixel-level image comparison | 5.3.0 |
| **esbuild** | JavaScript bundler | 0.27.0 |
| **Node.js** | Runtime environment | v24.11.1 |

### Project Goals

✅ Automate visual regression testing  
✅ Detect unexpected UI changes  
✅ Maintain visual consistency across pages  
✅ Provide baseline snapshots for regression  
✅ Generate detailed diff reports  
✅ Integrate with CI/CD pipelines  

---

## Prerequisites & Requirements

### System Requirements

**Minimum:**
- Node.js: **v20.14.0** or higher
- npm: **v10.0.0** or higher
- RAM: **4GB** minimum (8GB recommended)
- Disk: **2GB** free space (for node_modules + screenshots)

**Recommended:**
- Node.js: **v24.11.1** (current in use)
- Cypress Cache: **1GB**
- Screenshots/Diffs: **500MB**

### Operating Systems Supported

- ✅ Windows (PowerShell v5.1+)
- ✅ macOS (10.15+)
- ✅ Linux (Ubuntu 18.04+)

### Browser Support

- ✅ Electron (default, headless)
- ✅ Chrome (headless/headed)
- ✅ Chromium-based browsers

### Software Prerequisites

Before starting, ensure you have:

1. **Node.js & npm installed**
   ```bash
   node --version  # Should be v20.14.0+
   npm --version   # Should be v10.0.0+
   ```

2. **Git installed** (optional, for version control)
   ```bash
   git --version
   ```

3. **Applitools Account** (free tier available)
   - Sign up at https://applitools.com
   - Create free account
   - Retrieve API Key from account settings

4. **Code Editor** (optional)
   - Visual Studio Code (recommended)
   - JetBrains WebStorm
   - Any text editor

### Environment Setup Checklist

- [ ] Node.js v20.14.0+ installed
- [ ] npm v10.0.0+ installed
- [ ] Git installed (optional)
- [ ] Applitools account created
- [ ] Applitools API Key obtained
- [ ] Code editor set up
- [ ] Proxy/VPN configured (if required by network)

---

## System Architecture

### How Components Interact

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Execution Flow                      │
└─────────────────────────────────────────────────────────────┘

1. npm test / npx cypress run
         ↓
2. Cypress loads cypress.config.js
         ↓
3. Preprocessor initialized (esbuild + cucumber support)
         ↓
4. Test specs loaded (.cy.js files from cypress/e2e/)
         ↓
5. Browser launched (Electron/Chrome)
         ↓
6. Page navigation & interactions
         ↓
7. Screenshot captured (cy.screenshot())
         ↓
8. Applitools Eyes receives checkpoint (if API key set)
    ├─ Dashboard updated (optional)
    └─ Screenshot saved locally
         ↓
9. Pixel comparison performed (pixelmatch)
    ├─ Current vs. Baseline
    └─ Diff report generated
         ↓
10. Test results reported
    ├─ Cypress terminal output
    ├─ Screenshots saved to cypress/screenshots/
    └─ Diffs saved to cypress/snapshots/
         ↓
11. Results available in:
    ├─ Terminal (mismatch %)
    ├─ Local files (screenshots/diffs)
    └─ Applitools Dashboard (if configured)
```

### Component Responsibilities

**Cypress**
- Launches browser & automates user interactions
- Manages test execution & reporting
- Provides screenshot & task APIs

**Applitools Eyes Plugin**
- Intercepts `cy.screenshot()` calls
- Sends visual checkpoints to dashboard (if API key present)
- Provides `cy.eyesOpen()`, `cy.eyesCheckWindow()`, `cy.eyesClose()` commands

**pixelmatch + esbuild Bundler**
- Bundles test code with polyfills (stream, etc.)
- Enables feature file preprocessing
- Provides ESM/CommonJS compatibility

**Image Comparison Task**
- Runs pixelmatch algorithm locally
- Compares pixel data between images
- Generates diff visualizations

---

## Applitools Integration

### What is Applitools Eyes?

**Applitools Eyes** is an AI-powered visual regression testing platform that:
- Detects visual changes across versions
- Provides a centralized dashboard for test results
- Uses machine learning to ignore expected rendering differences
- Offers team collaboration features

### How It's Integrated

#### 1. **Plugin Registration** (cypress.config.js)

```javascript
try {
  require('@applitools/eyes-cypress')(module);
} catch (err) {
  console.warn('Applitools Eyes plugin not installed...');
}
```

**What it does:**
- Registers Eyes commands with Cypress
- Patches `cy.screenshot()` to capture visual checkpoints
- Injects API key from environment

#### 2. **Commands Available**

Once registered, these commands are available in tests:

```javascript
// Open Eyes session
cy.eyesOpen({
  appName: 'Visual Comfort',
  testName: 'Anne-Marie PLP',
  matchLevel: 'Strict'  // or 'Layout', 'Content'
});

// Capture visual checkpoint
cy.eyesCheckWindow('Hero Section');

// Close Eyes session
cy.eyesClose();
```

#### 3. **Current Implementation**

In this project:
- Eyes commands are **commented out** in most tests
- Reason: Buffer overflow in headed mode with large screenshots
- Alternative: Using `cy.screenshot()` locally + pixelmatch for comparison
- Applitools dashboard: Optional when API key is set

### Setting Up Applitools API Key

#### Option 1: Environment Variable (Recommended)

**Windows PowerShell:**
```powershell
$env:APPLITOOLS_API_KEY = "your_api_key_here"
npm test
```

**Windows Command Prompt:**
```cmd
set APPLITOOLS_API_KEY=your_api_key_here
npm test
```

**macOS/Linux:**
```bash
export APPLITOOLS_API_KEY=your_api_key_here
npm test
```

#### Option 2: .env File (Local Development)

Create `.env` in project root:
```
APPLITOOLS_API_KEY=your_api_key_here
```

Install dotenv:
```bash
npm install --save-dev dotenv
```

Load in cypress.config.js:
```javascript
require('dotenv').config();
```

#### Option 3: GitHub Actions (CI/CD)

1. Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `APPLITOOLS_API_KEY`
4. Value: Your API key (from Applitools)
5. Save

**Reference in workflow:**
```yaml
env:
  APPLITOOLS_API_KEY: ${{ secrets.APPLITOOLS_API_KEY }}
```

### Getting Your API Key

1. Go to https://applitools.com
2. Sign up / Log in
3. Navigate to **Account Settings** (top-right menu)
4. Find **API Key** section
5. Copy your API key
6. Set as environment variable (see above)

### Enabling Applitools in Tests

To use Applitools Eyes in tests:

**Step 1: Uncomment Eyes commands in test**
```javascript
beforeEach(() => {
  cy.eyesOpen({
    appName: 'Visual Comfort',
    testName: 'Home Page Visual',
    matchLevel: 'Strict'
  });
});

afterEach(() => {
  cy.eyesClose();
});

it('should capture with Eyes', () => {
  cy.visit('/');
  cy.eyesCheckWindow('Homepage loaded');
});
```

**Step 2: Set API key**
```bash
$env:APPLITOOLS_API_KEY = "your_key_here"
npm test
```

**Step 3: View results**
- Check Applitools Dashboard: https://applitools.com/app/test-results
- Results appear in real-time during test execution

### Dashboard Features

Once configured, Applitools dashboard provides:

✅ **Visual Diffs** - Side-by-side comparison of baseline vs. current  
✅ **Checkpoint History** - Track changes over time  
✅ **AI Analysis** - Intelligent diff detection  
✅ **Batch Management** - Group related tests  
✅ **Team Collaboration** - Share results with team  
✅ **Issue Tracking** - Mark expected vs. unexpected changes  
✅ **API Access** - Programmatic result queries  

---

## Dependencies & Package Management

### Core Dependencies

#### 1. **@applitools/eyes-cypress**
- **Purpose:** Visual regression testing dashboard integration
- **Version:** Latest
- **What it does:**
  - Provides `cy.eyesOpen()`, `cy.eyesCheckWindow()`, `cy.eyesClose()` commands
  - Sends visual checkpoints to Applitools dashboard
  - Handles API key authentication
- **Installation:**
  ```bash
  npm install --save-dev @applitools/eyes-cypress
  ```
- **When needed:** Optional if you want dashboard results
- **Note:** Defensive try-catch in config means tests work without it

#### 2. **cypress**
- **Purpose:** Test automation framework & runner
- **Version:** ^13.6.0
- **What it does:**
  - Launches browser (Electron/Chrome)
  - Executes tests
  - Provides APIs: `cy.visit()`, `cy.get()`, `cy.screenshot()`, etc.
  - Manages plugins & preprocessors
- **Installation:**
  ```bash
  npm install --save-dev cypress
  ```
- **Critical:** Required for all tests

#### 3. **pixelmatch**
- **Purpose:** Pixel-level image comparison
- **Version:** ^5.3.0
- **What it does:**
  - Compares two images pixel-by-pixel
  - Calculates mismatch percentage
  - Generates diff visualization
- **Installation:**
  ```bash
  npm install --save-dev pixelmatch
  ```
- **Used in:** `cypress/tasks/compareImages.js`

#### 4. **pngjs**
- **Purpose:** PNG image parsing & manipulation
- **Version:** ^7.0.0
- **What it does:**
  - Reads PNG screenshots
  - Converts to pixel data for comparison
  - Writes diff images
- **Installation:**
  ```bash
  npm install --save-dev pngjs
  ```
- **Dependency of:** pixelmatch

### Preprocessor & Bundler Dependencies

#### 5. **@badeball/cypress-cucumber-preprocessor**
- **Purpose:** Enable `.feature` file support in Cypress
- **Version:** ^21.0.0
- **What it does:**
  - Registers Cucumber step definitions
  - Preprocesses `.feature` files
  - Maps Gherkin steps to JavaScript implementations
- **Installation:**
  ```bash
  npm install --save-dev @badeball/cypress-cucumber-preprocessor
  ```
- **Status:** Included but feature files excluded from test runner

#### 6. **@bahmutov/cypress-esbuild-preprocessor**
- **Purpose:** esbuild-based file preprocessing
- **Version:** ^2.2.0
- **What it does:**
  - Bundles test code
  - Handles ESM/CommonJS transpilation
  - Applies esbuild plugins (including polyfills)
- **Installation:**
  ```bash
  npm install --save-dev @bahmutov/cypress-esbuild-preprocessor
  ```
- **Critical:** Required for bundling

#### 7. **esbuild**
- **Purpose:** Fast JavaScript bundler
- **Version:** ^0.27.0
- **What it does:**
  - Transpiles and bundles JavaScript
  - Applies plugin transformations
  - Provides `esbuild.context()` for watch mode
- **Installation:**
  ```bash
  npm install --save-dev esbuild
  ```
- **Used in:** esbuild-watch scripts & preprocessor

#### 8. **esbuild-plugin-alias**
- **Purpose:** Path alias mapping for esbuild
- **Version:** * (latest)
- **What it does:**
  - Maps Node built-ins to browser polyfills
  - Example: `stream` → `stream-browserify`
- **Installation:**
  ```bash
  npm install --save-dev esbuild-plugin-alias
  ```

#### 9. **stream-browserify**
- **Purpose:** Browser polyfill for Node's `stream` module
- **Version:** ^3.0.0
- **What it does:**
  - Enables use of `stream` in browser context
  - Required by some Applitools dependencies
- **Installation:**
  ```bash
  npm install --save-dev stream-browserify
  ```

### Utility Dependencies

#### 10. **fs-extra**
- **Purpose:** Enhanced file system operations
- **Version:** ^11.1.1
- **What it does:**
  - `readFile()`, `writeFile()`, `copy()`, `ensureDir()`
  - Wrapper around `fs` with better error handling
- **Used in:** Cypress tasks, baseline management

#### 11. **fast-glob**
- **Purpose:** Fast file globbing
- **Version:** ^3.2.12
- **What it does:**
  - Finds files matching patterns (e.g., `cypress/screenshots/**/*.png`)
  - Used in Cypress `findScreenshot` task
- **Used in:** Locating baseline & current screenshots

#### 12. **axios**
- **Purpose:** HTTP client
- **Version:** ^1.13.2
- **What it does:**
  - Makes HTTP requests
  - Handles file downloads
  - Used for API calls
- **Optional:** Not used in current tests but available

#### 13. **cheerio**
- **Purpose:** jQuery-like DOM parsing
- **Version:** 1.0.0-rc.12
- **What it does:**
  - Parses HTML/XML
  - Queries DOM with jQuery selectors
  - Useful for headless extraction
- **Optional:** Not used in current tests

#### 14. **dotenv**
- **Purpose:** Environment variable management
- **Version:** ^16.3.1
- **What it does:**
  - Loads `.env` file into `process.env`
  - Enables local environment configuration
- **Usage:** Optional for local API key management

### Compatibility & Polyfill Dependencies

#### 15. **undici**
- **Purpose:** HTTP client (fetch implementation)
- **Version:** 5.28.4
- **What it does:**
  - Modern fetch API implementation
  - Required by some Node dependencies
- **Included in:** npm v16.13+

#### 16. **which**
- **Purpose:** Locate executable in PATH
- **Version:** 4.0.0
- **What it does:**
  - Finds installed programs (node, npm, etc.)
  - Cross-platform support

#### 17. **hosted-git-info**
- **Purpose:** Git hosting information
- **Version:** 7.0.1
- **Used by:** npm dependencies for package metadata

#### 18. **normalize-package-data**
- **Purpose:** Normalize package.json data
- **Version:** 6.0.1
- **Used by:** npm for package parsing

### Complete Dependency Tree

```
cypress-applitools-visual-testing
├── @applitools/eyes-cypress (Latest)
│   └── @applitools/eyes-webdriverio
├── cypress (^13.6.0)
│   ├── electron
│   └── plugins support
├── Visual Testing
│   ├── pixelmatch (^5.3.0)
│   └── pngjs (^7.0.0)
├── Preprocessors & Bundling
│   ├── @badeball/cypress-cucumber-preprocessor (^21.0.0)
│   ├── @bahmutov/cypress-esbuild-preprocessor (^2.2.0)
│   ├── esbuild (^0.27.0)
│   ├── esbuild-plugin-alias (*)
│   └── stream-browserify (^3.0.0)
├── File Operations
│   ├── fs-extra (^11.1.1)
│   └── fast-glob (^3.2.12)
├── Utilities
│   ├── axios (^1.13.2)
│   ├── cheerio (1.0.0-rc.12)
│   ├── dotenv (^16.3.1)
│   ├── undici (5.28.4)
│   ├── which (4.0.0)
│   ├── hosted-git-info (7.0.1)
│   └── normalize-package-data (6.0.1)
└── @applitools/eyes-webdriverio (^5.59.16)
```

### Installing Dependencies

#### Fresh Installation
```bash
npm install
```

#### Update Dependencies
```bash
npm update
```

#### Add New Dependency
```bash
npm install --save-dev package-name
```

#### Remove Dependency
```bash
npm uninstall --save-dev package-name
```

#### Audit for Vulnerabilities
```bash
npm audit
```

#### Fix Vulnerabilities
```bash
npm audit fix
```

### Dependency Compatibility Matrix

| Dependency | Min Node | Max Node | Compatible Cypress |
|------------|----------|----------|-------------------|
| Cypress | 16.0+ | Latest | 13.6.0+ |
| @applitools/eyes-cypress | 14.0+ | Latest | 10+ |
| pixelmatch | 8.0+ | Latest | Any |
| @badeball/cypress-cucumber-preprocessor | 16.0+ | Latest | 10+ |
| esbuild | 12.0+ | Latest | With v2.2.0+ |

### Important: Node Version Impact

**Node v20.14.0 - Current in Use**
- ✅ All core dependencies work
- ✅ Headless mode fully functional
- ✅ JS tests (.cy.js) run perfectly
- ❌ Feature files (.feature) fail to bundle (preprocessor issue)
- ❌ Some packages require v20.18.1+ (esbuild edge cases)

**Node v24.11.1 - Recommended Upgrade**
- ✅ All dependencies compatible
- ✅ Faster performance
- ✅ Feature files work (if specPattern includes them)
- ✅ Better ES module support

**Node v20.18.1+**
- ✅ Minimum for full feature file support
- ✅ esbuild preprocessor fully compatible

---

## Project Structure

### Directory Layout

```
Demo 3/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI workflow
├── cypress/
│   ├── e2e/
│   │   ├── anne-marie-barton-test.cy.js    # Anne-Marie PLP tests (5 tests)
│   │   ├── home-page-test.cy.js            # Home page tests (6 tests)
│   │   ├── visual-test.cy.js               # Original PLP tests (5 tests)
│   │   └── features/ (excluded from runner)
│   │       ├── anne-marie-barton-plp.feature
│   │       └── home-page-visual.feature
│   ├── screenshots/                 # Generated screenshots
│   │   ├── anne-marie-barton-test.cy.js/
│   │   ├── home-page-test.cy.js/
│   │   └── visual-test.cy.js/
│   ├── snapshots/                   # Generated diff images
│   │   └── diff-*.png
│   ├── support/
│   │   ├── e2e.js                   # Global support file
│   │   ├── commands.js              # Custom Cypress commands
│   │   ├── pageObjects/
│   │   │   └── objects.js           # Page object definitions
│   │   └── stepDefinitions/
│   │       └── stepDefinitions.js   # Cucumber step implementations
│   ├── tasks/
│   │   └── compareImages.js         # Image comparison task (pixelmatch)
│   └── downloads/                   # Downloaded files
├── scripts/
│   ├── esbuild-watch.js             # CommonJS esbuild watcher
│   └── esbuild-watch.mjs            # ESM esbuild watcher
├── cypress.config.js                # Main Cypress configuration
├── package.json                     # Dependencies & npm scripts
├── package-lock.json                # Locked dependency versions
├── .env (optional)                  # Local environment variables
├── .gitignore                       # Git ignore rules
├── README.md                        # Quick start guide
├── APPLITOOLS_COMPREHENSIVE_GUIDE.md   # This file
└── Other docs/
    ├── NODE_UPGRADE_GUIDE.md
    ├── QUICK_START.md
    └── etc.
```

### Key Files Explained

#### `cypress.config.js`
**Purpose:** Central Cypress configuration  
**Contains:**
- Base URL & viewport settings
- Test spec patterns
- Plugin/preprocessor setup
- Task definitions

#### `package.json`
**Purpose:** Node.js project metadata & dependencies  
**Contains:**
- Project name & version
- npm scripts (test, test:open, etc.)
- All dependencies & versions
- License & author info

#### `cypress/e2e/*.cy.js`
**Purpose:** Test specifications  
**Contains:**
- Cypress test code
- describe/it blocks
- cy.visit(), cy.get(), cy.screenshot(), etc.
- Assertions & validations

#### `cypress/support/e2e.js`
**Purpose:** Global test setup  
**Contains:**
- Applitools Eyes import
- Global beforeEach/afterEach hooks
- Custom command registration

#### `cypress/tasks/compareImages.js`
**Purpose:** Image comparison implementation  
**Contains:**
- pixelmatch configuration
- Pixel comparison logic
- Diff image generation

---

## Setup & Configuration

### Initial Setup Steps

#### Step 1: Clone & Navigate

```bash
cd "Demo 3"
```

#### Step 2: Verify Node Version

```bash
node --version
# Should output: v20.14.0 or higher
```

#### Step 3: Install Dependencies

```bash
npm install
```

**Expected output:**
```
added 799 packages, audited 800 packages
6 vulnerabilities (2 low, 4 moderate)
```

#### Step 4: Verify Cypress

```bash
npx cypress verify
# Should output: Verified Cypress!
```

#### Step 5: Configure Applitools (Optional)

Get your API key from https://applitools.com, then:

**Windows PowerShell:**
```powershell
$env:APPLITOOLS_API_KEY = "your_api_key_here"
```

**Or create `.env` file:**
```
APPLITOOLS_API_KEY=your_api_key_here
```

#### Step 6: Run Tests

```bash
npm test
# or
npm run test:open
```

### cypress.config.js Configuration

#### Base URL
```javascript
e2e: {
  baseUrl: 'https://stage7.visualcomfort.com',
  // Tests will navigate to this URL
}
```
**To change:** Replace URL with your target domain

#### Viewport Size
```javascript
viewportWidth: 1280,
viewportHeight: 1024,
```
**To change:** Adjust dimensions for different screen sizes

#### Timeouts
```javascript
defaultCommandTimeout: 10000,    // 10 seconds
requestTimeout: 10000,          // 10 seconds
responseTimeout: 10000,         // 10 seconds
```
**To increase:** Adjust if tests timeout on slow networks

#### Spec Pattern
```javascript
specPattern: ['cypress/e2e/**/*.cy.js'],
```
**Current:** Only `.cy.js` files run  
**To include feature files** (requires Node v20.18.1+):
```javascript
specPattern: ['cypress/e2e/features/**/*.feature', 'cypress/e2e/**/*.cy.js'],
```

### Environment Variables

#### Required for Applitools Dashboard

```bash
APPLITOOLS_API_KEY=your_api_key_here
```

#### Optional Environment Variables

```bash
# Applitools configuration
APPLITOOLS_APP_NAME=Visual Comfort
APPLITOOLS_MATCH_LEVEL=Strict

# CI/CD
CI=true
HEADLESS=true
```

#### Setting Environment Variables

**Windows PowerShell (Temporary):**
```powershell
$env:APPLITOOLS_API_KEY = "key_here"
npm test
```

**Windows PowerShell (Permanent):**
```powershell
[System.Environment]::SetEnvironmentVariable("APPLITOOLS_API_KEY", "key_here", "User")
```

**Windows CMD (Temporary):**
```cmd
set APPLITOOLS_API_KEY=key_here
npm test
```

**macOS/Linux (Temporary):**
```bash
export APPLITOOLS_API_KEY=key_here
npm test
```

**macOS/Linux (Permanent):**
Add to `~/.bash_profile` or `~/.zshrc`:
```bash
export APPLITOOLS_API_KEY=key_here
```

---

## Running Tests

### Command Reference

#### Run All Tests (Headless)
```bash
npm test
# or
npx cypress run
```
- Runs in background (no browser window)
- Faster execution
- Recommended for CI/CD

#### Open Cypress Test Runner (Interactive)
```bash
npm run test:open
# or
npx cypress open
```
- Opens browser-based GUI
- Test list on left side
- Live test execution
- Recommended for development

#### Run with Specific Browser
```bash
npm run test:chrome
# or
npx cypress run --browser chrome
```
- Runs in Chrome instead of Electron

#### Run Single Test File
```bash
npx cypress run --spec "cypress/e2e/home-page-test.cy.js"
```

#### Run with Headed Mode (See Browser)
```bash
npm run test:headed
# or
npx cypress run --headed
```
- Shows browser window
- Good for debugging

### Expected Output (Headless)

```
====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.17.0                                                                        │
  │ Browser:        Electron 118 (headless)                                                        │
  │ Node Version:   v24.11.1 (C:\Program Files\nodejs\node.exe)                                    │
  │ Specs:          3 found (anne-marie-barton-test.cy.js, home-page-test.cy.js, visual-test.cy.js)
  │ Searched:       cypress/e2e/**/*.cy.js                                                         │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘

  Anne Marie Barton Designer PLP - Visual Testing and Page Rendering
    √ 01 - Load the Anne Marie Barton designer page successfully (13761ms)
    √ 02 - Capture page content with scroll and visual inspection (24520ms)
    √ 03 - Take full page visual snapshot with image and grid validation (15006ms)
    √ 04 - Validate PLP page visual rendering and image integrity (22827ms)
    √ 05 - Compare baseline capture with current page snapshot (18926ms)

  5 passing (1m 36s)

  ====================================================================================================

  ✓  All specs passed!                        04:26       16       16        -        -        -
```

### Interpreting Results

**✓ Passing Test**
- Green checkmark ✓
- Test completed successfully
- All assertions passed
- Screenshots captured (if enabled)

**✗ Failing Test**
- Red ✗
- Test encountered error or failed assertion
- Stack trace shown
- Screenshot captured at failure point

**Test Duration**
- Time in parentheses (ms)
- Longer times = more interactions/waits

**Summary**
- Total tests run
- Passing vs. failing counts
- Screenshots captured
- Total duration

---

## Test Suites

### Suite 1: Anne-Marie Barton PLP Tests

**File:** `cypress/e2e/anne-marie-barton-test.cy.js`  
**Tests:** 5  
**Duration:** ~1m 36s  
**Type:** Complete page validation

#### Test Breakdown

| # | Test Name | Purpose | Key Validations |
|---|-----------|---------|-----------------|
| 1 | Load designer page successfully | Verify page loads | HTTP 200, body visible |
| 2 | Capture content with scroll | Validate scroll interaction | Images visible, grid aligned |
| 3 | Full page snapshot | Comprehensive page capture | All images, grid structure |
| 4 | Visual rendering & image integrity | BDD scenario validation | HTTP 200, images loaded, grid consistent |
| 5 | Baseline comparison | Compare current vs. baseline | Mismatch % within threshold |

#### Running This Suite

```bash
npx cypress run --spec "cypress/e2e/anne-marie-barton-test.cy.js"
```

#### Expected Screenshots

- `01-full-page-load.png` - Initial page
- `02-page-after-scroll.png` - After scroll
- `03-full-page-snapshot.png` - Full page view
- `04-plp-validation-baseline.png` - Baseline
- `05-plp-full-page-snapshot.png` - Final snapshot
- `06-plp-current-snapshot.png` - Current for comparison

### Suite 2: Home Page Visual Tests

**File:** `cypress/e2e/home-page-test.cy.js`  
**Tests:** 6  
**Duration:** ~1m 21s  
**Type:** Home page focused validation

#### Test Breakdown

| # | Test Name | Purpose | Key Validations |
|---|-----------|---------|-----------------|
| 1 | Load home page & capture initial | Verify home page load | HTTP 200, hero visible |
| 2 | Scroll & capture images loaded | Validate image loading | All images loaded, scrolling |
| 3 | Capture hero section | Focus on hero banner | Hero visible, centered |
| 4 | Validate grid alignment & heights | Product grid validation | Grid aligned, heights consistent |
| 5 | Capture baseline & compare snapshot | Baseline comparison | Current vs. baseline within threshold |
| 6 | Capture responsive layout snapshot | Responsive validation | Header, footer, nav visible |

#### Running This Suite

```bash
npx cypress run --spec "cypress/e2e/home-page-test.cy.js"
```

#### Expected Screenshots

- `home-01-initial-load.png` - Initial page
- `home-02-images-loaded-scroll.png` - After scroll
- `home-03-hero-section.png` - Hero focus
- `home-04-grid-alignment.png` - Grid view
- `home-05-baseline.png` - Baseline snapshot
- `home-06-full-page-snapshot.png` - Full page
- `home-07-responsive-layout.png` - Responsive view

### Suite 3: Original Visual Tests

**File:** `cypress/e2e/visual-test.cy.js`  
**Tests:** 5  
**Duration:** ~1m 28s  
**Type:** Legacy PLP tests

#### Note

This file contains older test structure. The `anne-marie-barton-test.cy.js` is the updated version with better organization.

### Running All Suites

```bash
npm test
```

**Expected Results:**
```
√  All specs passed!                        04:26       16       16        -        -        -
```

- 3 spec files
- 16 total tests
- All passing
- ~4.5 minutes total duration

---

## Visual Comparison Methods

### Method 1: Local Pixel Comparison (Current Implementation)

**How It Works:**
1. `cy.screenshot()` captures current page → `current.png`
2. Compare against baseline → `baseline.png`
3. pixelmatch analyzes pixel differences
4. Diff image generated → `diff-*.png`
5. Mismatch percentage calculated

**Configuration (cypress/tasks/compareImages.js):**
```javascript
cy.task('compareImages', {
  expected: baselinePath,        // Baseline image
  actual: currentPath,           // Current screenshot
  threshold: 0.1,                // 1% pixel diff threshold
  diffName: `diff-${Date.now()}.png`
});
```

**Threshold Explanation:**
- `0.1` = Allow 0.1% pixel difference per pixel
- Accounts for anti-aliasing, font rendering
- Higher = more lenient

**Mismatch Tolerance:**
```javascript
const allowedMismatchPercent = 25.0;
expect(result.mismatchPercentage).to.be.at.most(allowedMismatchPercent);
```
- `25%` = Up to 25% of total pixels can differ
- Allows for dynamic content, timing differences
- Configurable per test

**Results:**
- ✅ Pass if mismatch ≤ threshold
- ❌ Fail if mismatch > threshold
- 📊 Diff image shows pixel differences

### Method 2: Applitools Eyes (Optional)

**How It Works:**
1. Set `APPLITOOLS_API_KEY` environment variable
2. Uncomment `cy.eyesOpen()` in test
3. `cy.eyesCheckWindow()` sends checkpoint to dashboard
4. AI compares against baseline on Applitools servers
5. Results available in Applitools dashboard

**Code Example:**
```javascript
beforeEach(() => {
  cy.eyesOpen({
    appName: 'Visual Comfort',
    testName: 'Anne-Marie PLP',
    matchLevel: 'Strict'
  });
});

it('should capture with Eyes', () => {
  cy.visit('/');
  cy.eyesCheckWindow('Hero Section');
});

afterEach(() => {
  cy.eyesClose();
});
```

**Comparison Features:**
- AI-powered diff detection
- Ignores expected rendering differences (fonts, anti-aliasing)
- Layout matching modes: Strict, Layout, Content
- Human review & approval workflow

**Results Location:**
- Dashboard: https://applitools.com/app/test-results
- Shows baseline vs. current
- Highlight differences
- Approve/reject changes

### Method 3: Manual Visual Review

**When to Use:**
- For complex layout changes
- When pixel matching too strict
- For UI redesigns

**Steps:**
1. Open `cypress/screenshots/` folder
2. Compare baseline vs. current images
3. Visual review of differences
4. Update baseline if changes intentional

**Baseline Location:**
- `cypress/screenshots/[suite-name]/[test-name]-baseline.png`

---

## Important Considerations

### 1. Node.js Compatibility

**Current Environment:**
```
Node: v24.11.1
npm: v10.5.0+
```

**Critical Notes:**
- Feature files require Node >= v20.18.1 (currently excluded)
- Preprocessor may have edge cases on v20.14.0
- Recommended: Keep Node updated

**Check Version:**
```bash
node --version
npm --version
```

**Upgrade Node:**
```bash
# Using nvm-windows (Windows)
nvm install 24.11.1
nvm use 24.11.1

# Using official installer
# Visit: https://nodejs.org/en/download/
```

### 2. Dependency Vulnerabilities

**Current Audit Status:**
```
6 vulnerabilities (2 low, 4 moderate)
```

**These are acceptable** because:
- Vulnerabilities in dev dependencies only
- Not exposed in production
- No runtime exploit vectors for testing

**To audit yourself:**
```bash
npm audit
```

**To fix (may break compatibility):**
```bash
npm audit fix
```

### 3. Screenshot Management

**Important:**
- Screenshots stored in `cypress/screenshots/`
- Diff images in `cypress/snapshots/`
- Baselines are first-run references
- Update baselines only when changes are intentional

**Baseline Update Process:**
1. Review differences in screenshot
2. Confirm changes are expected
3. Copy current → baseline
4. Re-run tests

**Scripted Update:**
```bash
npm run update:baseline
# (if available)
```

### 4. Timeouts & Performance

**Current Settings (cypress.config.js):**
```javascript
defaultCommandTimeout: 10000,    // 10 seconds
requestTimeout: 10000,          // 10 seconds
responseTimeout: 10000,         // 10 seconds
```

**When to Increase:**
- Slow network environments
- Heavy page rendering
- Large image downloads

**Example Adjustment:**
```javascript
defaultCommandTimeout: 15000,    // 15 seconds
```

### 5. Browser Compatibility

**Tested Browsers:**
- ✅ Electron 118 (default)
- ✅ Chrome (headless/headed)

**Not Tested:**
- Firefox
- Safari
- Edge

**To Use Different Browser:**
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox  # May not work
```

### 6. Network & Proxy

**If Behind Proxy:**

Add to cypress.config.js:
```javascript
e2e: {
  proxyUrl: 'http://your-proxy:port',
  // or for secure:
  proxyUrl: 'https://your-proxy:port',
}
```

**Or set environment:**
```bash
$env:HTTP_PROXY = "http://proxy:port"
$env:HTTPS_PROXY = "https://proxy:port"
```

### 7. Large Screenshot Handling

**Issue:** Buffer overflow in headed mode with large screenshots

**Symptoms:**
- RangeError: offset out of range
- Screenshots fail in Test Runner
- Works in headless

**Solution:**
- Use headless mode: `npm test`
- Or disable Eyes checkpoints in headed mode
- Or split tests into smaller suites

### 8. API Key Security

**DO:**
- ✅ Store in environment variables
- ✅ Use GitHub Secrets for CI/CD
- ✅ Never commit .env file
- ✅ Rotate keys periodically

**DON'T:**
- ❌ Commit API keys to Git
- ❌ Share keys in Slack/Email
- ❌ Store in public files
- ❌ Use in local git history

**Security Checklist:**
- [ ] `.env` in `.gitignore`
- [ ] API key in environment variables
- [ ] GitHub Secret configured for CI
- [ ] No hardcoded keys in code

### 9. CI/CD Integration

**For GitHub Actions:**

1. Add to `.github/workflows/ci.yml`:
```yaml
env:
  APPLITOOLS_API_KEY: ${{ secrets.APPLITOOLS_API_KEY }}

- name: Run tests
  run: npm test
```

2. Add secret to GitHub repo:
   - Settings → Secrets and variables → Actions
   - New secret: `APPLITOOLS_API_KEY`

### 10. Image File Management

**Screenshot Growth:**
- Each test generates 5-7 screenshots
- PNGs typically 100KB-500KB each
- Diffs add additional images
- Disk usage: ~200MB per 1000 runs

**Cleanup:**
```bash
# Remove all screenshots
rm -r cypress/screenshots/*

# Remove all diffs
rm -r cypress/snapshots/diff-*
```

**Git Management:**
- Add `cypress/screenshots/` to `.gitignore`
- Add `cypress/snapshots/` to `.gitignore`
- Don't commit large image files

---

## Troubleshooting

### Problem: Tests Fail on First Run

**Symptoms:**
- "Baseline not found" errors
- Comparison fails immediately

**Cause:**
- First run has no baseline
- Tests expect pre-existing baseline

**Solution:**
1. Run tests once to generate baseline:
   ```bash
   npm test
   ```
2. Screenshots generated in `cypress/screenshots/`
3. Baselines are created automatically
4. Re-run tests → should pass

### Problem: "Cannot read properties of undefined (reading '__cypress_cucumber_preprocessor_dont_use_this')"

**Symptoms:**
- Feature files fail to bundle
- Error during spec preparation

**Cause:**
- Node version incompatibility
- Preprocessor bug with old Node

**Solution:**
- Option 1: Upgrade Node to v24.11.1
  ```bash
  nvm install 24.11.1
  npm ci
  ```
- Option 2: Exclude feature files
  - Currently excluded in `cypress.config.js`
  - Tests in `.cy.js` format instead

### Problem: Tests Pass Headless but Fail in Test Runner

**Symptoms:**
- `npm test` passes
- `npm run test:open` fails
- Buffer errors with large screenshots

**Cause:**
- Browser memory limitations
- Large image processing

**Solution:**
1. Use headless mode: `npm test`
2. Or split tests into smaller suites
3. Or disable Eyes checkpoints

### Problem: Screenshots Not Generated

**Symptoms:**
- `cypress/screenshots/` is empty
- No visual comparisons

**Cause:**
- Tests don't call `cy.screenshot()`
- Tests failed before screenshot step

**Solution:**
1. Verify tests reach screenshot steps
2. Check for failed assertions before screenshot
3. Add explicit `cy.screenshot()` calls

### Problem: Applitools Dashboard Shows No Results

**Symptoms:**
- Tests run fine locally
- Nothing appears on https://applitools.com

**Cause:**
- API key not set
- API key incorrect
- Eyes commands commented out

**Solution:**
1. Verify API key set:
   ```bash
   $env:APPLITOOLS_API_KEY
   ```
2. Verify it's correct from account settings
3. Uncomment Eyes commands in tests
4. Re-run tests

### Problem: npm install Fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Cause:**
- Dependency conflicts
- Node/npm version mismatch

**Solution:**
```bash
# Force resolution
npm install --legacy-peer-deps

# Or clean and reinstall
rm -r node_modules package-lock.json
npm install
```

### Problem: Cypress Won't Open

**Symptoms:**
```
Error: Failed to connect to the browser
```

**Cause:**
- Cypress cache corrupted
- Browser not installed

**Solution:**
```bash
# Clear Cypress cache
npx cypress cache clear

# Reinstall Cypress
npm install --force cypress

# Verify installation
npx cypress verify
```

### Problem: Timeouts During Tests

**Symptoms:**
```
Timed out retrying after 10000ms
```

**Cause:**
- Slow network
- Page takes too long to load
- Selector not found

**Solution:**
1. Increase timeouts:
   ```javascript
   // cypress.config.js
   defaultCommandTimeout: 15000,
   ```
2. Check network: Test on better connection
3. Verify selectors exist in page DOM

### Problem: Image Comparison Always Fails

**Symptoms:**
- Mismatch % always high
- Same test, consistent failure

**Cause:**
- Dynamic content on page
- Baseline outdated
- Selector changes

**Solution:**
1. Check if changes are intentional
2. Update baseline if expected
3. Increase mismatch threshold
4. Review diff images in `cypress/snapshots/`

---

## Best Practices

### 1. Test Organization

**DO:**
```javascript
// Good: Descriptive suite name
describe('Anne Marie Barton Designer PLP - Visual Testing', () => {
  it('01 - Load the Anne Marie Barton designer page successfully', () => {
    // Test code
  });
});
```

**DON'T:**
```javascript
// Bad: Vague naming
describe('Tests', () => {
  it('test 1', () => {
    // Test code
  });
});
```

### 2. Wait Times

**DO:**
```javascript
// Explicit wait for page to settle
cy.wait(2000);  // 2 seconds for page render
```

**DON'T:**
```javascript
// No waits - tests may be flaky
cy.screenshot('page');
```

### 3. Screenshot Naming

**DO:**
```javascript
cy.screenshot('01-full-page-load');
cy.screenshot('02-page-after-scroll');
```

**DON'T:**
```javascript
cy.screenshot('screenshot');  // Confusing
```

### 4. Error Handling

**DO:**
```javascript
cy.get('[data-testid="product"], .product').then($cards => {
  if ($cards.length > 0) {
    cy.log(`Found ${$cards.length} products`);
  } else {
    cy.log('No products found - may be expected');
  }
});
```

**DON'T:**
```javascript
// Fails if selector not found
cy.get('[specific-old-selector]').should('exist');
```

### 5. API Key Management

**DO:**
```bash
# Use environment variables
$env:APPLITOOLS_API_KEY = "key_here"
npm test
```

**DON'T:**
```javascript
// NEVER hardcode keys
const API_KEY = 'your_key_here';  // BAD!
```

### 6. Baseline Management

**DO:**
```
- Keep baselines in version control
- Document baseline update dates
- Review changes before updating baseline
- Use diff images to validate
```

**DON'T:**
```
- Update baseline on every failure
- Delete old baselines without backup
- Ignore large mismatches
```

### 7. Test Independence

**DO:**
```javascript
// Each test is independent
beforeEach(() => {
  cy.visit(baseUrl + '/page');
  cy.wait(1500);
});

it('should work independently', () => {
  // No dependencies on other tests
});
```

**DON'T:**
```javascript
// DON'T: Tests that depend on order
it('test 1: setup', () => {
  // Creates data for test 2
});

it('test 2: uses test 1 data', () => {
  // Fails if run separately
});
```

### 8. Comment & Documentation

**DO:**
```javascript
it('should validate product grid alignment', () => {
  // Test loads PLP and validates product cards are aligned in rows
  // Expected: Products in consistent rows with max 20% height variance
  
  cy.get('.product-card').then($cards => {
    // Logic here
  });
});
```

**DON'T:**
```javascript
it('test', () => {
  cy.get('.product-card').then($cards => {
    // No explanation
  });
});
```

### 9. Timeout Configuration

**DO:**
```javascript
// Increase for known slow operations
cy.scrollTo('bottom', { duration: 1500 });
cy.wait(1500);
```

**DON'T:**
```javascript
// Rapid scrolling without waits
cy.scrollTo('bottom');
cy.screenshot();
```

### 10. Environment Management

**DO:**
```
- Use .env for local development
- Use GitHub Secrets for CI
- Use environment variables for sensitive data
- Document required env vars
```

**DON'T:**
```
- Commit .env to Git
- Store keys in code
- Mix environments
```

---

## Quick Reference

### Installation

```bash
npm install
```

### Run Tests

```bash
npm test                    # Headless
npm run test:open          # Interactive
npm run test:headed        # With browser window
npm run test:chrome        # In Chrome
```

### Configuration

**Set Applitools API Key:**
```bash
$env:APPLITOOLS_API_KEY = "your_key"    # Windows
export APPLITOOLS_API_KEY="your_key"    # macOS/Linux
```

### Test Suites

| Suite | File | Tests | Duration |
|-------|------|-------|----------|
| Anne-Marie Barton | `anne-marie-barton-test.cy.js` | 5 | 1m 36s |
| Home Page | `home-page-test.cy.js` | 6 | 1m 21s |
| Original Visual | `visual-test.cy.js` | 5 | 1m 28s |
| **TOTAL** | **3 files** | **16** | **~4m 30s** |

### Key Files

| File | Purpose |
|------|---------|
| `cypress.config.js` | Main configuration |
| `package.json` | Dependencies |
| `cypress/e2e/*.cy.js` | Test specs |
| `cypress/tasks/compareImages.js` | Image comparison |
| `cypress/support/e2e.js` | Global setup |

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests fail on first run | Run once to generate baseline |
| Feature file error | Exclude from specPattern |
| Screenshot timeout | Use headless mode |
| API key not found | Set environment variable |
| Dependencies error | `npm install --legacy-peer-deps` |

### Quick Debug

```bash
# Clear cache
npx cypress cache clear

# Reinstall
rm -r node_modules && npm install

# Verify setup
npx cypress verify

# Run single test
npx cypress run --spec "cypress/e2e/home-page-test.cy.js"
```

---

## Summary

This comprehensive guide covers:

✅ Full project architecture  
✅ Applitools integration setup  
✅ All dependencies explained  
✅ Configuration options  
✅ Test execution methods  
✅ Visual comparison techniques  
✅ Critical considerations  
✅ Troubleshooting strategies  
✅ Best practices  
✅ Quick reference for common tasks  

**Ready to start visual testing!** 🚀

---

*Last Updated: December 4, 2025*  
*Cypress Version: 13.6.0+*  
*Node Version: v24.11.1 (recommended)*  
*Applitools Eyes: Latest*
